const express = require('express');
const server = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.PORT || 'development']);
server.use(express.json());

const movies = [
  { title: 'Mean Girls' },
  { title: 'Hackers' },
  { title: 'The Grey' },
  { title: 'Sunshine' },
  { title: 'Ex Machina' }
];

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  next();
});

server.get('/movies?', (req, res) => {
  knex('movies')
    .modify((soFar) => {
      if (req.query?.title) {
        soFar.whereLike('title', `%${req.query.title}%`)
      }
    })
    .then(data => {
      console.log(data);
      res.status(200).type('json').json(data);
    })
    .catch(err => {
      res.status(404).type('json').json({
        message: `Could not get movies. ${err}`
      })
    })
});

server.post('/movies', (req, res) => {
  const newMovie = req.body;

  knex('movies')
    .insert(newMovie, ['*'])
    .then(data => {
      res.status(200).type('json').json(data);
    })
    .catch(err => {
      res.status(404).type('json').json({
        message: `Could not post movie. ${err}`
      })
    })
})

server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});