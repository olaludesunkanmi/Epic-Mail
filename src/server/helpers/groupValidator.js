import db from '../config/index';
import { fetchSpecificGroupByUser } from '../config/sql';



class GroupControls {
  static async findSpecificGroup(req, res, next) {
    const { id } = req.authData.id;
    const gId = Number(req.params.groupId);
    try {
      const { rows, rowCount } = await db.query(fetchSpecificGroupByUser, [id, gId]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Group does not exist',
        });
      }
      const foundGroup = rows[0];
      req.body.foundGroup = foundGroup;
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default GroupControls;
