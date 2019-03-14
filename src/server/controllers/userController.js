import users from '../data/userDb';
import Helpers from '../helpers/helper';

const { generateToken } = Helpers;

class UserController {
  static signUp(req, res) {
    const newUser = {
      id: users[users.length - 1].id + 1,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const token = generateToken(newUser);
    users.push(newUser);
    return res.status(201).json({
      status: 201,
      data: [{
        name : req.body.firstname,
        token,
      }],
    });
  }

  static login(req, res) {
    const { foundUser } = req.body;
    const token = generateToken(foundUser);
    return res.status(200).json({
      status: 200,
      data: [{
        name : req.body.firstname,
        token,
      }],
    });
  }
}
export default UserController;
