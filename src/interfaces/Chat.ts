import { IUser } from "./User"

export interface IChat {
    id: number
    name: string
    createdAt: string
    ownerId: number
    users: IUser[]
}
