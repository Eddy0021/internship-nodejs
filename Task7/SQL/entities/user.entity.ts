import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserEntity {
    @PrimaryKey()
    id: string;

    @Property()
    email: string;

    @Property()
    password: string;

    @Property()
    role: "admin" | "user";

    constructor(id: string, email: string, password: string, role: "admin" | "user") {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
