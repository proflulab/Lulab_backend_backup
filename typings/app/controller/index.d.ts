// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/controller/article');
import ExportCommand = require('../../../app/controller/command');
import ExportFans = require('../../../app/controller/fans');
import ExportHome = require('../../../app/controller/home');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    command: ExportCommand;
    fans: ExportFans;
    home: ExportHome;
    user: ExportUser;
  }
}
