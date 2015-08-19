var express = require("express");
var router = express.Router();
var models = require("../db/connection").models;
var Work = models.Work;
var Artist = models.Artist;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

function worksWithArtistNames(works, artists){
  var s, a;
  for(s in works){
    for(a in artists){
      if(artists[a].id == works[s].artistId){
        works[s].artistName = artists[a].name;
        break;
      }
    }
  }
  return works;
}

router.get("/works", function(req, res){
  var works;
  Work.findAll()
  .then(function(s){
    works = s;
    return Artist.findAll()
  })
  .then(function(artists){
    res.render("works/index", {works: worksWithArtistNames(works, artists)});
  });
});

router.get("/works/new", function(req, res){
  res.render("works/new");
})

router.post("/works", function(req, res){
  if(!req.body.artistId) return error(res, "Artist not found");
  Work.create(req.body).then(function(work){
    res.redirect("/works/" + work.id)
  });
});

router.get("/works/:id", function(req, res){
  var work;
  Work.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    work = s;
    return work.getArtist();
  })
  .then(function(artist){
    work.artistName = artist.name;
    res.render("works/show", {work: work});
  });
});

router.get("/works/:id/edit", function(req, res){
  Work.findById(req.params.id).then(function(work){
    if(!work) return error(res, "not found");
    res.render("works/edit", {work: work});
  });
});

router.put("/works/:id", function(req, res){
  var work;
  if(!req.body.artistId) return error(res, "Artist not found");
  Work.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    work = s;
    return work.updateAttributes(req.body);
  })
  .then(function(updatedWork){
    res.redirect("/works/" + updatedWork.id);
  });
});

router.delete("/works/:id", function(req, res){
  Work.findById(req.params.id)
  .then(function(work){
    if(!work) return error(res, "not found");
    return work.destroy();
  })
  .then(function(){
    res.redirect("/works");
  });
});

module.exports = router;
