// orm.ts
import {Options} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import path from 'path';

const options: Options<PostgreSqlDriver> = ({
    entities: [path.join(__dirname, './entities')],
    dbName: 'mydatabase',
    host: 'localhost',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
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