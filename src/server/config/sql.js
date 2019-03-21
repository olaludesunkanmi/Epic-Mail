export const createUser = 'INSERT INTO users (firstname,lastname,email, password) VALUES ($1, $2, $3, $4) returning *';
export const findUserById = 'SELECT * FROM users WHERE id = $1';
export const queryUsersByEmail = 'SELECT * FROM users where email = $1';
export const sendMessage = 'INSERT INTO messagetable (subject, message, parentMessageId, status, counter) VALUES ($1, $2, $3, $4, $5) returning *';
export const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
export const populateSent = 'INSERT INTO sentmessagestable (messageId, senderId) VALUES ($1, $2) returning *';
export const populateInbox = 'INSERT INTO receivedmessagestable (messageId, receiverId) VALUES ($1, $2) returning *';
// export const findMessageById = 'SELECT * FROM messagetable WHERE id = $1';
export const allReceivedMessages = 'SELECT * FROM messagetable LEFT JOIN receivedmessagestable ON messagetable.id = receivedmessagestable.messageId WHERE receivedmessagestable.receiverId = $1';
export const allSentMessages = 'SELECT * FROM messagetable LEFT JOIN sentmessagestable ON messagetable.id = sentmessagestable.messageId WHERE sentmessagestable.senderId = $1';
export const unreadMessages = 'SELECT * FROM messagetable LEFT JOIN receivedmessagestable ON messagetable.id = receivedmessagestable.messageId WHERE (receivedmessagestable.receiverId, messagetable.status) = ($1, $2)';
export const queryString = 'SELECT *, receivedmessagestable.receiverId, sentmessagestable.senderId FROM messagetable LEFT JOIN receivedmessagestable on receivedmessagestable.messageId = messagetable.id LEFT JOIN sentmessagestable on sentmessagestable.messageid = messagetable.id WHERE messagetable.id = $1';
export const updateStatus = 'UPDATE messagetable SET status = $1 WHERE id = $2 returning *';
export const draftQuery = 'SELECT * FROM messagetable WHERE (counter, status, id) = ($1, $2, $3)';
export const deleteMessage = 'DELETE FROM messagetable WHERE (counter, status, id) = ($1, $2, $3) returning *';
export const deleteSent = 'DELETE FROM sentmessagestable WHERE (senderid, messageid) = ($1, $2) returning *';
export const deleteInbox = 'DELETE FROM receivedmessagestable WHERE (receiverid, messageid) =($1, $2) returning *';

// Groups
export const formGroup = 'INSERT INTO groupstable (name, creator) VALUES ($1, $2) returning *';
export const insertAdmin = 'INSERT INTO groupmembers (groupId, memberId, userrole) VALUES ($1, $2, $3) returning *';
export const insertGroupMember = 'INSERT INTO groupmembers (groupId, userId) VALUES ($1, $2) returning *';
export const fetchSpecificGroupByUser = 'SELECT groupstable,name,role FROM groupstable INNER JOIN groupmembers on groupmembers.groupId = groupstable.id WHERE memberId = $1 AND groupId = $2;';
export const fetchAllGroupsByUser = 'SELECT groupstable,name,role FROM groupstable INNER JOIN groupmembers on groupmembers.groupId = groupstable.id WHERE memberId = $1;';
export const getGroupByName = 'SELECT * FROM groupstable WHERE name = $1';
export const removeGroupMembers = 'DELETE FROM groupmembers WHERE (groupId, memberId) = ($1, $2) returning *';
export const updateGroupName = 'UPDATE groupstable SET name = $1 WHERE id = $2 returning * ';
