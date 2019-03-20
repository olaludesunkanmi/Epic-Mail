import db from "../config/index";

const createContactsTable = `DROP TABLE IF EXISTS contacts CASCADE;
CREATE TABLE IF NOT EXISTS contacts (
    id  SERIAL PRIMARY KEY NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    userId integer NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    FOREIGN KEY (userId) REFERENCES users (id) on DELETE CASCADE
 )`;

 export default async function contactsTable() {
    try {
      const create = await db.query(createContactsTable);
    } catch (error) {
      console.log(error);
    }
  }