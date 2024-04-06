
export interface UserEntity {
    id: string,
    email: string,
    password: string,
    role: "admin" | "user"
}