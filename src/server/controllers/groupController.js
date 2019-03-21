import db from "../config/index";

import { formGroup, findUserById, insertAdmin, insertGroupMember, queryUsersByEmail, fetchSpecificGroupByUser, fetchAllGroupsByUser, getGroupByName, removeGroupMembers, updateGroupName } from '../config/sql';


class GroupController {
  static async createGroup(req, res) {
    const { id } = req.authData.id;
    try {
      const { rows } = await db.query(findUserById, [id]);
      const { email } = rows[0];
      const { name } = req.body;
      const params = [name, email];
      const result = await db.query(formGroup, params);
      const inputs = [result.rows[0].id, id];
      await db.query(insertAdmin, inputs);
      const newGroup = result.rows[0];
      return res.status(201).json({
        status: 201,
        data: [newGroup],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  static async getAllGroups(req, res) {
    const { id } = req.authData;
    try {
      const { rows, rowCount } = await db.query(fetchAllGroupsByUser, [id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No groups created yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }

  static async editGroupName(req, res) {
    const { foundGroup } = req.body;
    try {
      const { rows } = await db.query(updateGroupName, [req.body.name, foundGroup.groupid]);
      const updatedGroup = rows[0];
      const { id, name, role } = updatedGroup;
      return res.status(200).json({
        status: 200,
        data: [{
          id,
          name,
          role,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

    static async deleteSpecificUser(req, res) {
        const { foundGroup } = req.body;
        const member = Number(req.params.userId);
        try {
          const removeMember = await db.query(removeGroupMembers, [foundGroup.groupid, member]);
          if (!removeMember) {
            return res.status(404).json({
              status: 404,
              error: 'The user cannot be found',
            });
          }
          return res.status(200).json({
            status: 200,
            data: 'User was removed from the group',
          });
        } catch (error) {
          return res.status(400).json({
            status: 400,
            error: error.message,
          });
        }
      }

    static async addNewMember(req, res) {
      const { foundGroup, email } = req.body;
      try {
        const foundUser = await db.query(queryUsersByEmail, [email]);
        if (!foundUser) {
          return res.status(404).json({
            status: 404,
            error: 'User does not exist',
          });
        }
        const { rows } = await db.query(insertGroupMember,
          [foundGroup.groupid, foundUser.rows[0].id]);
        return res.status(201).json({
          status: 201,
          data: rows,
        });
      } catch (error) {
        return res.status(404).json({
          status: 404,
          error: error.message,
        });
      }
    }
}
    

export const { 
  createGroup, 
  getAllGroups, 
  editGroupName, 
  deleteSpecificUser, 
  addNewMember } = GroupController;
