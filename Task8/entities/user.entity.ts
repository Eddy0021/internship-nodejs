import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserEntity {
    @PrimaryKey()
    id!: string;

    @Property({ unique: true })
    email: string;

    @Property()
    password!: string;

    @Property()
    role: "admin" | "user";

    constructor(email: string, password: string, role: "admin" | "user") {
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
