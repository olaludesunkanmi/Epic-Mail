import db from "../config/index";

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id  SERIAL PRIMARY KEY NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password  VARCHAR(225) NOT NULL,
    registeredon TIMESTAMP WITH TIME ZONE DEFAULT now()
 )`;

 export default async function usersTable() {
    try {
      const create = await db.query(createUsersTable);
    } catch (error) {
      console.log(error);
    }
  }
