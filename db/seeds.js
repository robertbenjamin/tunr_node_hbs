var DB = require("./connection");
var Seeds = {
  artists: require("./artist_data"),
  works: require("./song_data")
}

DB.models.Artist.bulkCreate(Seeds.artists)
.then(function(){
  return DB.models.Artist.findAll();
})
.then(function(artists){
  var a, artist, s, work, works, output = [];
  for(a = 0; a < artists.length; a++){
    artist = artists[a];
    works = Seeds.works[artist.name];
    for(s = 0; s < works.length; s++){
      work = works[s];
      work.artistId = artist.id;
      output.push(work);
    }
  }
  return DB.models.Work.bulkCreate(output);
})
.then(function(){
  process.exit();
});
