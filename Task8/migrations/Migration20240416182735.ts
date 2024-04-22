import { Migration } from '@mikro-orm/migrations';

export class Migration20240416182735 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "order_entity_items" ("order_entity_id" varchar(255) not null, "cart_item_entity_id" varchar(255) not null, constraint "order_entity_items_pkey" primary key ("order_entity_id", "cart_item_entity_id"));');

    this.addSql('alter table "order_entity_items" add constraint "order_entity_items_order_entity_id_foreign" foreign key ("order_entity_id") references "order_entity" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "order_entity_items" add constraint "order_entity_items_cart_item_entity_id_foreign" foreign key ("cart_item_entity_id") references "cart_item_entity" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "order_entity" drop constraint "order_entity_items_id_foreign";');

    this.addSql('alter table "order_entity" drop column "items_id";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order_entity_items" cascade;');

    this.addSql('alter table "order_entity" add column "items_id" varchar(255) not null;');
    this.addSql('alter table "order_entity" add constraint "order_entity_items_id_foreign" foreign key ("items_id") references "cart_item_entity" ("id") on update cascade;');
  }

}
