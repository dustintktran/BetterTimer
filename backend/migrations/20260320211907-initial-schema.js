'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
var fs = require('fs');
var path = require('path');

exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '001_initial_schema.sql');
  return db.runSql(fs.readFileSync(filePath, {encoding: 'utf8'}));
};

exports.down = function(db) {
  return db.runSql('DROP TABLE timer_sequence; DROP TABLE timers; DROP TABLE clocks;');
};