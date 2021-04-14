import { ErrorCode } from "./ErrorCode"

export class HandledError extends Error {
    constructor(public readonly code: ErrorCode, message: string, public readonly data?: {}, public readonly internalData?: {}) {
        super(message)
    }

    public get status(): number {
        switch (this.code) {
            case ErrorCode.Forbidden:
                return 403

            case ErrorCode.Unauthorized:
                return 401

            case ErrorCode.UnhandledError:
                return 400

            default:
                return 404
        }
    }
}
