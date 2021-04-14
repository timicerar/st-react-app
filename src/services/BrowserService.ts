import * as H from "history"
import { makeObservable, observable, runInAction } from "mobx"

class BrowserService {
    @observable public search = window.location.search

    public readonly history: H.History = H.createBrowserHistory({
        basename: process.env.PUBLIC_URL || undefined,
    })

    private _historyLength = 0

    constructor() {
        makeObservable(this)

        this.history.listen((location, action) => {
            runInAction(() => {
                this.search = location.search
            })

            switch (action) {
                case "PUSH":
                    ++this._historyLength
                    break

                case "POP":
                    --this._historyLength
                    break

                case "REPLACE":
                default:
                    // ignore
                    break
            }
        })
    }

    public get pathname(): string {
        const pathname = this.history.location.pathname

        if (pathname.endsWith("/")) {
            return pathname.substring(0, pathname.length - 1)
        }

        return pathname
    }

    public goBack(n = -1): void {
        if (this._historyLength) {
            this.history.go(n)
        } else {
            const path = this.getPrevPath()
            --this._historyLength
            this.history.push(path)
        }
    }

    public push(path: string): void {
        this.history.push(path)
    }

    public replace(path: string): void {
        this.history.replace(path)
    }

    public getPrevPath(): string {
        let path = this.history.location.pathname

        const index = path.lastIndexOf("/")
        if (index !== -1) {
            path = path.substring(0, index)
        }

        return path
    }
}

export default new BrowserService()
