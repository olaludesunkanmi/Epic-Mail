import users from '../data/userdb';

class UserValidator {
  static signUpValidator(req, res, next) {
    let {
      firstname,
      lastname,
      email,
      password,
    } = req.body;
    if (!firstname) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname is required',
      });
    }
    firstname = firstname.toLowerCase().trim();
    if (!lastname) {
      return res.status(400).json({
        status: 400,
        error: 'Lastname is required',
      });
    }
    lastname = lastname.toLowerCase().trim();
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email should be a string',
      });
    }
    const nameValidate = /^[a-zA-Z ]+$/;
    if (!nameValidate.test(firstname)) {
      return res.status(400).json({
        status: 400,
        error: 'First Name field cannot contain numbers and symbols',
      });
    }
    if (!nameValidate.test(lastname)) {
      return res.status(400).json({
        status: 400,
        error: 'Last Name field cannot contain numbers and symbols',
      });
    }

    email = email.toLowerCase().trim();
    const emailVerifier = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailVerifier.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email format is invalid',
      });
    }
    if (email.length < 10 || email.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Email should be 10 to 50 characters long',
      });
    }
    const duplicateEmail = users.find(user => user.email === email);
    if (duplicateEmail) {
      return res.status(400).json({
        status: 400,
        error: 'Email already exists!',
      });
    }

    // Password Validations
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        status: 400,
        error: 'Password should be 8 to 20 characters long',
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }

  static loginValidator(req, res, next) {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    email = email.toLowerCase().trim();
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) {
      return res.status(401).json({
        status: 401,
        error: 'Authentication failed',
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Pasword is required',
      });
    }

    password = password.trim();
    if (foundUser && password !== foundUser.password) {
      return res.status(401).json({
        status: 401,
        error: 'Authentication failed',
      });
    }
    req.body.foundUser = foundUser;
    req.body.password = password;
    return next();
  }
}

export default UserValidator;
