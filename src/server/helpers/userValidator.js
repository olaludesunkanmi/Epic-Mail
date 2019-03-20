import { queryUsersByEmail } from '../config/sql';
import db from '../config';

/**
 * User validator class.
 */
class UserValidator {
  static async signUpValidator(req, res, next) {
    let { firstname, lastname, email, password } = req.body;
    if (!firstname) {
      return res.status(400).json({
        status: 400,
        error: 'firstname is required',
      });
    }
    firstname = firstname.toLowerCase().trim();
    if (!lastname) {
      return res.status(400).json({
        status: 400,
        error: 'lastname is required',
      });
    }
    lastname = lastname.toLowerCase().trim();
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    const nameValidate = /^[a-zA-Z ]+$/;
    if (!nameValidate.test(firstname)) {
      return res.status(400).json({
        status: 400,
        error: 'firstname format is invalid',
      });
    }
    if (!nameValidate.test(lastname)) {
      return res.status(400).json({
        status: 400,
        error: 'lastname format is invalid',
      });
    }

    email = email.toLowerCase().trim();
    const emailVerifier = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailVerifier.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email format is invalid',
      });
    }
    try {
      const { rows } = await db.query(queryUsersByEmail, [email]);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Email already exists',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    // Password Validations
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }

  /**
   * login User to the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async loginValidator(req, res, next) {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    email = email.toLowerCase().trim();
    try {
      const { rows } = await db.query(queryUsersByEmail, [email]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Authentication failed',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }

    password = password.trim();
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}

export default UserValidator;
