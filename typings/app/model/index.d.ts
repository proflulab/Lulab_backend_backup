// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser = require('../../../app/model/adminUser');
import ExportArticle = require('../../../app/model/article');
import ExportCommand = require('../../../app/model/command');
import ExportFans = require('../../../app/model/fans');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    AdminUser: ReturnType<typeof ExportAdminUser>;
    Article: ReturnType<typeof ExportArticle>;
    Command: ReturnType<typeof ExportCommand>;
    Fans: ReturnType<typeof ExportFans>;
    User: ReturnType<typeof ExportUser>;
  }
}
