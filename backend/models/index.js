const User = require('./user');
const Project = require('./project');
const Role = require('./role');
const Table = require('./table');
const Permission = require('./permission');
const CentralControl = require('./centralControl');
const Sound = require('./sound');
const UserGroup = require('./userGroup');
const UserDefinedJSON = require('./userDefinedJSON');

// 导出所有模型
module.exports = {
  User,
  Project,
  Role,
  Table,
  Permission,
  CentralControl,
  Sound,
  UserGroup,
  UserDefinedJSON,
};
