import { Migration } from '@mikro-orm/migrations';

export class Migration20240415213033 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cart_entity" ("id" varchar(255) not null, "user_id" varchar(255) not null, "is_deleted" boolean not null default false, constraint "cart_entity_pkey" primary key ("id"));');

    this.addSql('create table "product_entity" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_entity_pkey" primary key ("id"));');

    this.addSql('create table "cart_item_entity" ("id" varchar(255) not null, "product_id" varchar(255) not null, "count" int not null, constraint "cart_item_entity_pkey" primary key ("id"));');

    this.addSql('create table "order_entity" ("id" varchar(255) not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items_id" varchar(255) not null, "payment_type" varchar(255) not null, "address" varchar(255) not null, "credit_card" varchar(255) not null, "delivery_type" varchar(255) not null, "delivery_address" varchar(255) not null, "comments" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_entity_pkey" primary key ("id"));');

    this.addSql('create table "cart_entity_items" ("cart_entity_id" varchar(255) not null, "cart_item_entity_id" varchar(255) not null, constraint "cart_entity_items_pkey" primary key ("cart_entity_id", "cart_item_entity_id"));');

    this.addSql('create table "user_entity" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null, constraint "user_entity_pkey" primary key ("id"));');

    this.addSql('alter table "cart_item_entity" add constraint "cart_item_entity_product_id_foreign" foreign key ("product_id") references "product_entity" ("id") on update cascade;');

    this.addSql('alter table "order_entity" add constraint "order_entity_items_id_foreign" foreign key ("items_id") references "cart_item_entity" ("id") on update cascade;');

    this.addSql('alter table "cart_entity_items" add constraint "cart_entity_items_cart_entity_id_foreign" foreign key ("cart_entity_id") references "cart_entity" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "cart_entity_items" add constraint "cart_entity_items_cart_item_entity_id_foreign" foreign key ("cart_item_entity_id") references "cart_item_entity" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_entity_items" drop constraint "cart_entity_items_cart_entity_id_foreign";');

    this.addSql('alter table "cart_item_entity" drop constraint "cart_item_entity_product_id_foreign";');

    this.addSql('alter table "order_entity" drop constraint "order_entity_items_id_foreign";');

    this.addSql('alter table "cart_entity_items" drop constraint "cart_entity_items_cart_item_entity_id_foreign";');

    this.addSql('drop table if exists "cart_entity" cascade;');

    this.addSql('drop table if exists "product_entity" cascade;');

    this.addSql('drop table if exists "cart_item_entity" cascade;');

    this.addSql('drop table if exists "order_entity" cascade;');

    this.addSql('drop table if exists "cart_entity_items" cascade;');

    this.addSql('drop table if exists "user_entity" cascade;');
  }

}
