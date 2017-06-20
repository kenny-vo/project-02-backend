var db = require('./models');

var lifeEvent_list = [
  {
    eventDate: 'January 1st, 2016',
    postDate: 'January 1st, 2016',
    title: 'New Years Eve',
    isPublic: true,
    content: 'New Years Goals started today.',
    tags: 'fun',
    photo: 'photo',
    userRating: 8
  },
  {
    eventDate: 'December 24th, 2016',
    postDate: 'January 1st, 2016',
    title: 'Christmas Eve',
    isPublic: false,
    content: 'Best Christmas ever.',
    tags: "Presents",
    photo: 'Photo',
    userRating: 7
  },
  {
    eventDate: 'July 4th, 2016',
    postDate: 'January 1st, 2016',
    title: 'July 4th',
    isPublic: true,
    content: 'Hot day!',
    tags: 'Summer',
    photo: 'Photo',
    userRating: 5
  }
]

db.LifeEvent.remove({}, function(err, removedLifeEvents){
  if(err){return console.log(err);}

  db.LifeEvent.create(lifeEvent_list, function(err, lifeEvents){
    if(err){return console.log(err);}
    console.log(lifeEvents);
    process.exit(1);
  });
});
