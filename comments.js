// Create web server
const express = require('express');
const app = express();
app.use(express.json());

const comments = require('./comments');
const users = require('./users');

// Send a GET request to /comments to read all comments
app.get('/comments', (req, res) => {
    res.status(200).send(comments);
});
// Send a POST request to /comments to create a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    if (newComment && newComment.body) {
        comments.push({
            ...newComment,
            id: comments.length + 1,
            createdAt: new Date().toISOString()
        });
        res.status(201).send(newComment);
    } else {
        res.status(400).send({ message: 'Please provide a comment' });
    }
});
// Send a GET request to /comments/:id to read one comment
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === parseInt(id));
    if (comment) {
        res.status(200).send(comment);
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }
});
// Send a PUT request to /comments/:id to update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const updatedComment = req.body;
    const commentIndex = comments.findIndex(comment => comment.id === parseInt(id));
    if (commentIndex !== -1) {
        comments[commentIndex] = {
            id: parseInt(id),
            ...updatedComment,
            createdAt: new Date().toISOString()
        };
        res.status(200).send(comments[commentIndex]);
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }
});
// Send a DELETE request to /comments/:id to delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const commentIndex = comments.findIndex(comment => comment.id === parseInt(id));
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }