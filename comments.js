// Create web server
const express = require('express');
const app = express();
// Use body-parser to parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create comments array
const comments = [];

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).send(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.status(200).send(comments);
});

// Get comment by ID
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];
  if (comment) {
    res.status(200).send(comment);
  } else {
    res.status(404).send();
  }
});

// Update comment by ID
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  if (comments[id]) {
    comments[id] = newComment;
    res.status(200).send(newComment);
  } else {
    res.status(404).send();
  }
});

// Delete comment by ID
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  if (comments[id]) {
    comments.splice(id, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});