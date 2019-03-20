import db from "../config/index";

const createGroupsTable = `DROP TABLE IF EXISTS groupstable CASCADE;
CREATE TABLE IF NOT EXISTS groupstable (
    id  SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT ('admin'),
    createdOn  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (creator) references users (email) on delete CASCADE
    )`;

    export default async function groupsTable() {
        try {
          const create = await db.query(createGroupsTable);
        } catch (error) {
          console.log(error);
        }
      }