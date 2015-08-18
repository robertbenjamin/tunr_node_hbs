var express = require("express");
var router = express.Router();
var Artist = require("../db/connection").models.Artist;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/artists", function(req, res){
  Artist.findAll().then(function(artists){
    res.render("artists/index", {artists: artists});
  });
});

router.get("/artists/new", function(req, res){
  res.render("artists/new");
});

router.post("/artists", function(req, res){
  Artist.create(req.body).then(function(artist){
    res.redirect("/artists/" + artist.id)
  });
});

router.get("/artists/:id", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.getSongs().then(function(songs){
      res.render("artists/show", {artist: artist, songs: songs});
    });
  });
});

router.get("/artists/:id/edit", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    res.render("artists/edit", {artist: artist});
  });
});

router.put("/artists/:id", function(req, res){
  console.log(req.body)
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.updateAttributes(req.body).then(function(updatedArtist){
      updatedArtist.getSongs().then(function(songs){
        res.render("artists/show", {artist: updatedArtist, songs: songs});
      });
    });
  });
});

router.delete("/artists/:id", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.destroy().then(function(){
      res.redirect("/artists")
    });
  });
});

module.exports = router;
