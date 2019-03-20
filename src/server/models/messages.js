import db from "../config/index";

const createMessagesTable = `DROP TABLE IF EXISTS messagetable CASCADE;
CREATE TABLE IF NOT EXISTS messagetable (
    id  SERIAL PRIMARY KEY NOT NULL,
    createdOn  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    parentMessageId INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL
  )`;

  export default async function messagesTable() {
    try {
      const create = await db.query(createMessagesTable);
    } catch (error) {
      console.log(error);
    }
  }