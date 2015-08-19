var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///tunr_db");
var Artist = sequelize.import("../models/artist");
var Work = sequelize.import("../models/work");

Work.belongsTo(Artist);
Artist.hasMany(Work);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    Work: Work,
    Artist: Artist
  }
}
