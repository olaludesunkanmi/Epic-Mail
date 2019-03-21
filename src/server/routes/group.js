import express from 'express';
import { createGroup, getAllGroups, editGroupName, deleteSpecificUser, addNewMember } from '../controllers/groupController';
import { verifyToken } from '../helpers/helper';
import GroupControls from '../helpers/groupValidator';


const { findSpecificGroup } = GroupControls;

const groupRouter = express.Router();

// post a group route
groupRouter.post('/', verifyToken, createGroup);

// get all group route
groupRouter.get('/', verifyToken, getAllGroups);

// edit a specific group name
groupRouter.patch('/:groupId/name', verifyToken, findSpecificGroup, editGroupName);

// delete a specific User from group
groupRouter.delete('/:groupId', verifyToken, findSpecificGroup, deleteSpecificUser);

// Add a user to a  group
groupRouter.post('/:groupId/users', verifyToken, findSpecificGroup, addNewMember);

// export groupRouter
export default groupRouter;
