import { Admin } from "./Admin"

export type Word = {
    id: number,
    type: string,
    description: string,
    admin: Admin
}