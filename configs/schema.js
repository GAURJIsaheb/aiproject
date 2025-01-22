
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const schema_var=pgTable('tablename',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageurl:varchar('imageurl'),
    subscription:boolean('subscription').default(false)
})