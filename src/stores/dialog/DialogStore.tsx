import React from "react"
import { action, computed, makeAutoObservable, runInAction } from "mobx"
import { AlertDialog, ConfirmDialog, DeleteDialog } from "../../containers/dialog/options"
import ErrorUtils from "../../utils/ErrorUtils"

class DialogStore {
    public fullScreenLoaders = 0
    public dialogs: React.ReactNode[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @computed
    public get showModalPage(): boolean {
        return this.fullScreenLoaders > 0 || this.dialogs.length > 0
    }

    @action
    public async execFullScreen<T>(fn: Promise<T>): Promise<T> {
        ++this.fullScreenLoaders
        try {
            return await fn
        } finally {
            runInAction(() => --this.fullScreenLoaders)
        }
    }

    @action
    public removeNumberOfDialogs(numberOfDialogs: number): void {
        if (this.dialogs.length > 0 && this.dialogs.length >= numberOfDialogs) {
            for (let i = 0; i < numberOfDialogs; i++) {
                this.dialogs.pop()
            }
        }
    }

    @action
    public addDialog(dialog: React.ReactNode): void {
        this.dialogs.push(dialog)
    }

    @action
    public removeLastDialog(): void {
        if (this.dialogs.length > 0) {
            this.dialogs.pop()
        }
    }

    @action
    public alert(text: string, onClose?: () => void): void {
        this.addDialog(
            <AlertDialog
                text={text}
                onClose={() => {
                    this.removeLastDialog()
                    if (onClose) {
                        onClose()
                    }
                }}
            />,
        )
    }

    @action
    public error(error: Error, onClose?: () => void): void {
        const text = ErrorUtils.getErrorMessage(error)
        this.alert(text, onClose)
    }

    @action
    public delete(onDelete?: () => void, onCancel?: () => void, title?: string, message?: string, deleteButtonText?: string): void {
        this.addDialog(
            <DeleteDialog
                title={title}
                message={message}
                deleteButtonText={deleteButtonText}
                onDelete={() => {
                    this.removeLastDialog()
                    if (onDelete) {
                        onDelete()
                    }
                }}
                onCancel={() => {
                    this.removeLastDialog()
                    if (onCancel) {
                        onCancel()
                    }
                }}
            />,
        )
    }

    @action
    public confirm(text: string, onConfirm?: () => void, onCancel?: () => void): void {
        this.addDialog(
            <ConfirmDialog
                text={text}
                onConfirm={() => {
                    this.removeLastDialog()
                    if (onConfirm) {
                        onConfirm()
                    }
                }}
                onCancel={() => {
                    this.removeLastDialog()
                    if (onCancel) {
                        onCancel()
                    }
                }}
            />,
        )
    }
}

export default new DialogStore()
