
const messages = [
  {
    id: 1,
    createdOn: "Fri, 08 Mar 2019 10:23:35 GMT",
    subject: 'Coders Summit',
    message: 'Bootcamp is upon us',
    parentMessageId: 1,
    status: 'sent'
  },
  {
    id: 2,
    createdOn: "Sat, 09 Mar 2019 10:23:35 GMT",
    subject: 'Andela Invite',
    message: 'Welcome to Bootcamp',
    parentMessageId: 3,
    status: 'read'
  },
  {
    id: 3,
    createdOn: "Fri, 08 Mar 2019 10:23:35 GMT",
    subject: 'Invitation to Bootcamp',
    message: 'Bootcamp is here',
    parentMessageId: 2,
    status: 'unread'
  },
  {
    id: 4,
    createdOn: "Mon, 11 Mar 2019 10:33:35 GMT",
    subject: 'Bootcamp Continues',
    message: 'You are almost there',
    parentMessageId: 3,
    status: 'draft'
  },
];

export default messages;
