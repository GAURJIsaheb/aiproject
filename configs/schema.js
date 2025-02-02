
import { boolean, pgTable, serial, varchar, jsonb,uuid, text } from "drizzle-orm/pg-core";



export const schema_var=pgTable('tablename',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageurl:varchar('imageurl'),
    subscription:boolean('subscription').default(false)
})


// New Table for Video Data Storage

export const videoDataTableName = pgTable("videoDataTableName", {
  id: uuid("id").defaultRandom().primaryKey(), // Generates UUID automatically
  videoScript: jsonb("video_script").notNull(), 
  audiofileUrl: text("audiofile_url").notNull(),
  captions: jsonb("captions").notNull(),
  imagesUrl: jsonb("images_url").notNull(),
});

