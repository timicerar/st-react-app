import { action, makeAutoObservable, runInAction } from "mobx"
import { IChat } from "../interfaces/Chat"
import Api from "../services/Api"
import BrowserService from "../services/BrowserService"
import { MobxValidator } from "../validation/mobx"
import { ChatValidator } from "../validators"
import DialogStore from "./dialog/DialogStore"

export class ChatsStore {
    public isLoading = false
    public isUpdating = false
    public isDeleting = false
    public error: Error | null = null
    public items: IChat[] | null = null
    public item: IChat | null = null
    public copyItem: IChat | null = null

    public readonly validator = new MobxValidator(ChatValidator.rules())

    private loadIndex = 0

    constructor() {
        makeAutoObservable(this)

        if (BrowserService.pathname.split("/").slice(-1)[0] === "new") {
            this.item = {
                id: 0,
                name: "",
                createdAt: "",
                ownerId: 0,
                users: [],
            }
        }
    }

    @action
    public setValue(key: keyof IChat, value: string): void {
        if (!this.item) {
            return
        }

        ;(this.item[key] as string) = value
        this.validator.validateProperty(this.item, key)
    }

    @action
    public async post(userId: string): Promise<void> {
        const ownerId = parseInt(userId, 10)

        if (!this.item || isNaN(ownerId)) {
            return
        }

        if (this.validator.validateAll(this.item).size) {
            return
        }

        this.isLoading = true

        const body = {
            name: this.item.name,
            ownerId: ownerId,
        }

        try {
            await DialogStore.execFullScreen(Api.post("/chats", body))
            BrowserService.push(`/users/${ownerId}`)
        } catch (e) {
            DialogStore.error(e)
        }

        runInAction(() => {
            this.isLoading = false
        })
    }

    @action
    public async update(chatId: string, userId: string): Promise<void> {
        if (!this.item) {
            return
        }

        if (this.validator.validateAll(this.item).size) {
            return
        }

        this.isUpdating = true

        const body = {
            name: this.item.name,
        }

        try {
            await DialogStore.execFullScreen(Api.put(`/chats/${chatId}`, body, { headers: { id: userId } }))
            BrowserService.push(`/users/${userId}/chat/${chatId}`)
        } catch (e) {
            DialogStore.error(e)
        }

        runInAction(() => {
            this.isUpdating = false
        })
    }

    @action
    public async load(userId: string): Promise<void> {
        this.isLoading = true
        this.error = null
        this.items = null

        const loadIndex = ++this.loadIndex
        let items: IChat[] | null = null
        let error: Error | null = null

        try {
            items = await Api.get<IChat[]>("/chats", { headers: { id: userId } })
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
    public async loadById(id: string, userId: string): Promise<void> {
        this.isLoading = true
        this.error = null
        this.item = null

        const loadIndex = ++this.loadIndex
        let item: IChat | null = null
        let error: Error | null = null

        try {
            item = await Api.get<IChat>(`/chats/${id}`, { headers: { id: userId } })
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
    public async delete(id: number, userId: string): Promise<void> {
        this.isDeleting = true

        const loadIndex = ++this.loadIndex

        try {
            await Api.delete(`/chats/${id}`, { headers: { id: userId } })
            BrowserService.replace(`/users/${userId}`)
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
