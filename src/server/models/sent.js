import db from "../config/index";

const createSentMessagesTable = `DROP TABLE IF EXISTS sentmessagestable CASCADE;
      CREATE TABLE IF NOT EXISTS sentmessagestable (
        id  SERIAL PRIMARY KEY NOT NULL,
        senderId SERIAL NOT NULL,
        messageId SERIAL NOT NULL,
        createdOn  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        FOREIGN KEY (messageId) REFERENCES messagetable (id) on DELETE CASCADE,
        FOREIGN KEY (senderId) REFERENCES users (id) on DELETE CASCADE
      )`;

      export default async function sentMessagesTable() {
        try {
          const create = await db.query(createSentMessagesTable);
        } catch (error) {
          console.log(error);
        }
      }