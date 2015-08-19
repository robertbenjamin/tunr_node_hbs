module.exports = function(sequelize, Sequelize){
  return sequelize.define("work", {
    title: Sequelize.STRING,
    album: Sequelize.STRING,
    previewUrl: Sequelize.STRING,
    artistId: Sequelize.INTEGER
  });
}
