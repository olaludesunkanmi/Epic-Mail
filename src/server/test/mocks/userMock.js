export const validSignUp = [
    // Good credentials
    {
      email: 'jackbauer@yahoo.com',
      firstname: 'Jack',
      lastname: 'bauer',
      password: 'bauer737',
    },
  ];
  
  export const invalidSignUp = [
    // Empty email======>[0]
    {
      email: '',
      firstname: 'Jack',
      lastname: 'bauer',
      password: 'bauer737',
    },
    // Empty firstname=====>[1]
    {
      email: 'Bauer',
      firstname: '',
      lastname: 'bauer',
      password: 'bauer737',
    },
    // Empty lastname=======>[2]
    {
      email: 'Bauer',
      firstname: 'Jack',
      lastname: '',
      password: 'bauer737',
    },
    // Empty password========>[3]
    {
      email: 'example@ex.com',
      firstname: 'Jack',
      lastname: 'Bauer',
      password: '',
    },
    // Invalid firstname format===>[4]
    {
      email: 'example@ex.com',
      firstname: '@Jack',
      lastname: 'Bauer',
      password: 'bauer737',
    },
    // Invalid lastname format====>[5]
    {
      email: 'example@ex.com',
      firstname: 'Jack',
      lastname: '@Bauer',
      password: 'bauer737',
    },
    // Invalid email format=======>[6]
    {
      email: 'example@zoom12345',
      firstname: 'Jack',
      lastname: 'Bauer',
      password: 'bauer737',
    },
    // Duplicate email check=======>[7]
    {
      email: 'jackbauer@yahoo.com',
      firstname: 'Jack',
      lastname: 'Gates',
      password: 'jackgates456',
    },
    // Short password check=======>[8]
    {
      email: 'uidoe@yahoo.com',
      firstname: 'Jack',
      lastname: 'Gates',
      password: 'hi12',
    },
  ];
  
  export const invalidLogin = [
    // User not signed up
    {
      email: 'lordthanos@yahoo.com',
      password: 'thanos4real',
    },
    // Signed up user providing empty email
    {
      email: '',
      password: 'bauer737',
    },
    // Signed up user providing empty password
    {
      email: 'jackbauer@yahoo.com',
      password: '',
    },
    // Signed up user providing wrong password
    {
      email: 'jackbauer@yahoo.com',
      password: 'jackis419',
    },
  ];
  