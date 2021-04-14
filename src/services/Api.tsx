/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, CancelTokenSource } from "axios"
import _ from "lodash"
import { ErrorCode, HandledError } from "../error"

const apiUrl = "http://localhost:3001/api/v1"

enum HttpMethod {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}

interface IFetchOptions {
    allow204?: boolean
    cancelTokenSource?: CancelTokenSource
    headers?: Record<string, string>
}

class Api {
    private httpAgent = axios.create()

    public get<T>(url: string, options?: IFetchOptions): Promise<T> {
        const headers = options?.headers ? _.clone(options.headers) : undefined

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                method: HttpMethod.GET,
                headers,
                withCredentials: true,
            },
            options,
        )
    }

    public put<T>(url: string, body?: {} | FormData, options?: IFetchOptions): Promise<T> {
        const headers = options?.headers ? _.clone(options.headers) : {}

        let parsedBody: string | FormData | undefined

        if (body instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data"
            parsedBody = body
        } else if (body) {
            headers["Content-Type"] = "application/json"
            parsedBody = JSON.stringify(body)
        }

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                data: parsedBody,
                headers,
                method: HttpMethod.PUT,
                withCredentials: true,
            },
            options,
        )
    }

    public post<T>(url: string, body?: {} | FormData, options?: IFetchOptions): Promise<T> {
        const headers = options?.headers ? _.clone(options.headers) : {}

        let parsedBody: string | FormData | undefined

        if (body instanceof FormData) {
            parsedBody = body
            headers["Content-Type"] = "multipart/form-data"
        } else if (body) {
            headers["Content-Type"] = "application/json"
            parsedBody = JSON.stringify(body)
        }

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                data: parsedBody,
                headers,
                method: HttpMethod.POST,
                withCredentials: true,
            },
            options,
        )
    }

    public delete(url: string, options?: IFetchOptions): Promise<void> {
        const headers = options?.headers ? _.clone(options.headers) : {}

        return this.request<void>(
            {
                url: this.generateApiUrl(url),
                headers,
                method: HttpMethod.DELETE,
                withCredentials: true,
            },
            { allow204: true, ...options },
        )
    }

    public generateApiUrl(url: string): string {
        return `${apiUrl}${url}`
    }

    private async request<T>(requestConfig: AxiosRequestConfig, options?: IFetchOptions): Promise<T> {
        if (options && options.cancelTokenSource) {
            requestConfig.cancelToken = options.cancelTokenSource.token
        }

        try {
            const { data } = await this.httpAgent.request<T>(requestConfig)

            if (!data && !options?.allow204) {
                throw new HandledError(ErrorCode.InvalidResponse, "Invalid response")
            }

            return data
        } catch (error) {
            const axiosError = error as AxiosError

            if (axios.isCancel(axiosError)) {
                throw new HandledError(ErrorCode.CanceledRequest, axiosError.message)
            }

            if (axiosError.isAxiosError) {
                let errorCode: ErrorCode
                let serverResponse: HandledError | undefined

                if (axiosError.response) {
                    serverResponse = axiosError.response.data as HandledError
                    errorCode = serverResponse.code
                } else {
                    errorCode = ErrorCode.NetworkError
                }

                throw new HandledError(errorCode, serverResponse?.message || "", serverResponse?.data)
            } else {
                throw new HandledError(ErrorCode.UnhandledError, "Unknown error")
            }
        }
    }
}

export default new Api()
