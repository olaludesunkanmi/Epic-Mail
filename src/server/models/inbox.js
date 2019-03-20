import db from "../config/index";

const createReceivedMessagesTable = `DROP TABLE IF EXISTS receivedmessagestable CASCADE;
CREATE TABLE IF NOT EXISTS receivedmessagestable (
    id  SERIAL PRIMARY KEY NOT NULL,
    receiverId SERIAL NOT NULL,
    messageId SERIAL NOT NULL,
    createdOn  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (messageId) REFERENCES messagetable (id) on DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users (id) on DELETE CASCADE
  )`;

  export default async function receivedMessagesTable() {
    try {
      const create = await db.query(createReceivedMessagesTable);
    } catch (error) {
      console.log(error);
    }
  }
