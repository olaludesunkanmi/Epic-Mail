import { hashSync, compareSync } from 'bcrypt';
import db from "../config/index";
import { generateToken } from '../helpers/helper';
import { createUser, queryUsersByEmail } from '../config/sql.js';

/**
 * UserController class
 */
class UserController {
  static async signUp(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const params = [
      firstname,
      lastname,
      email,
      hashSync(password, 10),
    ];

    try {
      const { rows } = await db.query(createUser, params);
      if (rows) {
        const authUser = rows[0];
        const token = generateToken(authUser);
        return res.status(201).json({
          status: 201,
          data: [{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            token,
          }],
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    const { email } = req.body;
    const params = [email];
    try {
      const { rows } = await db.query(queryUsersByEmail, params);
      if (rows) {
        if (rows[0]) {
          const comparePassword = compareSync(req.body.password, rows[0].password);
          if (comparePassword) {
            const authUser = rows[0];
            const token = generateToken(authUser);
            return res.status(200).json({
              status: 200,
              data: [{
                token
              }],
            });
          }
          if (!comparePassword) {
            return res.status(401).json({
              status: 401,
              error: 'Incorrect login details',
            });
          }
        }
      }
    } catch (error) {
      res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }
}
export default UserController;
