import { action, makeAutoObservable, runInAction } from "mobx"
import moment from "moment"
import { ErrorCode, HandledError } from "../error"
import { IUser } from "../interfaces"
import Api from "../services/Api"
import BrowserService from "../services/BrowserService"
import { MobxValidator } from "../validation/mobx"
import { UserValidator } from "../validators"
import DialogStore from "./dialog/DialogStore"

export class UsersStore {
    public isLoading = false
    public isUpdating = false
    public isDeleting = false
    public error: Error | null = null
    public items: IUser[] | null = null
    public item: IUser | null = null
    public copyItem: IUser | null = null

    public readonly validator = new MobxValidator(UserValidator.rules())

    private loadIndex = 0

    constructor() {
        makeAutoObservable(this)

        if (BrowserService.pathname.split("/").slice(-1)[0] === "new") {
            this.item = {
                id: 0,
                name: "",
                lastName: "",
                dateOfBirth: "",
                email: "",
                password: "",
            }
        }
    }

    @action
    public setValue(key: keyof IUser, value: string): void {
        if (!this.item) {
            return
        }

        ;(this.item[key] as string) = value
        this.validator.validateProperty(this.item, key)
    }

    @action
    public async post(): Promise<void> {
        if (!this.item) {
            return
        }

        if (this.validator.validateAll(this.item).size) {
            return
        }

        this.isLoading = true

        const body = {
            name: this.item.name,
            lastName: this.item.lastName,
            dateOfBirth: moment(this.item.dateOfBirth).format("YYYY-MM-DD"),
            email: this.item.email,
            password: this.item.password,
        }

        try {
            await DialogStore.execFullScreen(Api.post("/users", body))
            BrowserService.push("/users")
        } catch (e) {
            if (e instanceof HandledError && e.code === ErrorCode.EmailInUse) {
                this.setValue("email", "")
            }

            DialogStore.error(e)
        }

        runInAction(() => {
            this.isLoading = false
        })
    }

    @action
    public async update(id: string): Promise<void> {
        if (!this.item) {
            return
        }

        if (this.validator.validateAll(this.item).size > 1) {
            return
        }

        this.isUpdating = true

        const body = {
            name: this.item.name,
            lastName: this.item.lastName,
            dateOfBirth: moment(this.item.dateOfBirth).format("YYYY-MM-DD"),
        }

        try {
            await DialogStore.execFullScreen(Api.put(`/users/${id}`, body))
            BrowserService.push(`/users/${id}`)
        } catch (e) {
            DialogStore.error(e)
        }

        runInAction(() => {
            this.isUpdating = false
        })
    }

    @action
    public async load(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.items = null

        const loadIndex = ++this.loadIndex
        let items: IUser[] | null = null
        let error: Error | null = null

        try {
            items = await Api.get<IUser[]>("/users")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.items = items
            this.error = error
        })
    }

    @action
    public async loadById(id: string): Promise<void> {
        this.isLoading = true
        this.error = null
        this.item = null

        const loadIndex = ++this.loadIndex
        let item: IUser | null = null
        let error: Error | null = null

        try {
            item = await Api.get<IUser>(`/users/${id}`)
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.item = item
            this.copyItem = item
            this.error = error
        })
    }

    @action
    public async delete(id: number): Promise<void> {
        this.isDeleting = true

        const loadIndex = ++this.loadIndex

        try {
            await Api.delete(`/users/${id}`)
            BrowserService.replace(`/users`)
        } catch (e) {
            DialogStore.error(e)
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isDeleting = false
        })
    }
}
