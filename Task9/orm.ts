// orm.ts
import {Options} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import path from 'path';

import dotenv from "dotenv";

dotenv.config();

const options: Options<PostgreSqlDriver> = ({
    entities: [path.join(__dirname, './entities')],
    dbName: process.env.DB_NAME || 'mydatabase',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    driver: PostgreSqlDriver, 
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: path.join(__dirname, './migrations')
    },
    seeder: {
        defaultSeeder: 'DatabaseSeeder',
        emit: 'ts',
        path: path.join(__dirname, './seeders')
    },
    extensions: [Migrator, SeedManager],
});

export default options;