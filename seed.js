var db = require('./models');

var lifeEvent_list = [
  {
    eventDate: '2015-01-01',
    postDate: 'January 1st, 2016',
    title: 'New Years Eve',
    isPublic: true,
    content: 'New Years Goals started today.',
    tags: 'fun',
    photo: 'http://i.imgur.com/ypUGp1R.png',
    userRating: 8
  },
  {
    eventDate: '2016-12-24',
    postDate: 'January 1st, 2016',
    title: 'Christmas Eve',
    isPublic: false,
    content: 'Best Christmas ever.',
    tags: "Presents",
    photo: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimg.buzzfeed.com%2Fbuzzfeed-static%2Fstatic%2F2013-11%2Fenhanced%2Fwebdr07%2F18%2F16%2Fenhanced-buzz-24223-1384808698-3.jpg%3Fdownsize%3D715%3A*%26output-format%3Dauto%26output-quality%3Dauto',
    userRating: 7
  },
  {
    eventDate: '2016-07-04',
    postDate: 'January 1st, 2016',
    title: 'July 4th',
    isPublic: true,
    content: 'Hot day!',
    tags: 'Summer',
    photo: 'Photo',
    userRating: 5
  },
  {
    eventDate: '2015-10-31',
    postDate: 'January 1st, 2016',
    title: 'Halloween',
    isPublic: true,
    content: 'I was a Mummy!',
    tags: 'costume',
    photo: 'Photo',
    userRating: 7
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
