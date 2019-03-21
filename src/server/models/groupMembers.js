import db from "../config/index";

const createGroupMembersTable = `DROP TABLE IF EXISTS groupmembers CASCADE;
CREATE TABLE IF NOT EXISTS groupmembers (
    id  SERIAL PRIMARY KEY NOT NULL,
    groupId INTEGER NOT NULL,
    memberId INTEGER NOT NULL,
    userrole CHARACTER VARYING(100) NOT NULL DEFAULT ('user'),
    createdOn  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (groupId) references groupstable (id) on delete CASCADE,
    FOREIGN KEY (memberId) references users (id) on delete CASCADE
    )`;

    export default async function groupMembersTable() {
        try {
          const create = await db.query(createGroupMembersTable);
        } catch (error) {
          console.log(error);
        }
      }