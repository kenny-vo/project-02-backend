// require express and other modules
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors');

app.use(cors());

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

/************
 * DATABASE *
 ************/
 mongoose.connect(
   process.env.MONGOLAB_URI ||
   process.env.MONGOHQ_URL ||
   'mongodb://localhost/timeline-api'
 );


var db = require('./models');

var LifeEvent = require('./models/lifeEvent');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "timeline-api",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},

    ]
  })
});

function getSingularResponse (err, foundObject) {
  if (err) {
    this.status(500).json({ error: err.message });
  } else {
    if (foundObject === null) {
      this.status(404).json({ error: "Nothing found by this ID." });
    } else {
      this.status(200).json(foundObject);
    }
  }
}

// show all lifeEvents
app.get('/lifeEvents', function (req, res) {
  db.LifeEvent.find({})
    .exec(function(err, lifeEvents){
      if (err) {
        return console.log(err);
      }
      res.json(lifeEvents);
    });
});

// get life event by id
app.get('/lifeEvents/:id', function (req, res) {
  var lifeEventId = req.params.id;
  LifeEvent.findOne({ _id: lifeEventId }, getSingularResponse.bind(res));
});

// create new life event
// app.post('/todos', function (req, res) {
//   var newPost = new Post(req.body);
//
//   newPost.save(function (err, savedPost) {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.status(201).json(savedPost);
//     }
//   });
// });

app.post('/lifeEvents', function (req, res) {
  var newLifeEvent = new db.LifeEvent({
      eventDate: req.body.eventDate,
      postDate: req.body.postDate,
      title: req.body.title,
      isPublic: req.body.isPublic,
      content: req.body.content,
      tags: req.body.tags,
      photo: req.body.photo,
      userRating: req.body.userRating
  });

  db.LifeEvent.create(newLifeEvent, function(err, succ) {
    if (err) {return console.log(err)}
    res.json(succ);
  });

});


// update a post event
app.put('/lifeEvents/:id', function (req, res) {
  var lifeEventId = req.params.id;

  LifeEvent.findOne({ _id: lifeEventId }, function (err, foundLifeEvent) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!foundLifeEvent){
     return res.status(404).json({ error: "Nothing found by this ID." });
    }

    // update the Post's attributes
    foundLifeEvent.eventDate = req.body.eventDate;
    foundLifeEvent.postDate = req.body.postDate;
    foundLifeEvent.title = req.body.title;
    foundLifeEvent.isPublic = req.body.isPublic;
    foundLifeEvent.content = req.body.content;
    foundLifeEvent.tags = req.body.tags;
    foundLifeEvent.photo = req.body.photo;
    foundLifeEvent.userRating = req.body.userRating;

    foundLifeEvent.save(getSingularResponse.bind(res));
  });
});

// delete post
app.delete('/posts/:id', function (req, res) {
  var lifeEventId = req.params.id;

  LifeEvent.findOneAndRemove({ _id: lifeEventId }, getSingularResponse.bind(res));
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on http://localhost:3000/');
});
