import usersTable from './users';
import contactsTable from './contacts';
import messagesTable from './messages';
import sentMessagesTable from './sent';
import receivedMessagesTable from './inbox';
import groupsTable from './groups';
import groupMembersTable from './groupmembers';

const createTable = async () => {
  try {
    await usersTable();
    await contactsTable();
    await groupsTable();
    await groupMembersTable();
    await messagesTable();
    await sentMessagesTable();
    await receivedMessagesTable();
  } catch (err) {
    console.log(err);
  }
}

export {
    createTable
}

require ('make-runnable');

