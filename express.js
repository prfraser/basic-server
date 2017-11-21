// Call Express
const express = require('express');
// Create our express app
const app = express();
// Require middleware to parse JSON
const bodyParser = require('body-parser');
// Set port number 
const port = 3000;

// Initialize some students
let todo = [
	{ id: 0, task: "Go for a run", status: false },
	{ id: 1, task: "Do a backflip", status: true }
]
let currentId = 1
// Use bodyparser to parse all incoming requests
app.use(bodyParser.json());

// Set URLS and handle Requests / Responses.
app.get('/api/todo', (req, res) => res.send(todo));
app.get('/api/todo/:id', (req, res) => {
	console.log(`Finding task with an id of ${parseInt(req.params.id)}`)
	res.send(todo.filter((task) => {
			return task.id === parseInt(req.params.id)
		})
	)
});
app.post('/api/todo', (req, res) => {
	console.log(`Recieved POST request: ${req.body.task} | Status: ${req.body.status}`)
	let newTask = {}
	newTask = req.body;
	newTask.id = ++currentId;
	console.log(newTask);
	todo.push(newTask);
	res.send(todo);
});
app.put('/api/todo/:id', (req, res) => {
	console.log(`Updating task with an id of ${parseInt(req.params.id)}`)
	let taskIndex = todo.findIndex(task => task.id === parseInt(req.params.id));
	todo[taskIndex].task = req.body.task;
	todo[taskIndex].status = req.body.status;
	res.send(todo);
})
app.delete('/api/todo/:id', (req, res) => {
	console.log(`Deleting task with an id of ${parseInt(req.params.id)}`)
	todo = todo.filter((task) => {
		return task.id !== parseInt(req.params.id)
	})
	res.send(todo);
})

// Handle wrong urls
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

// Turn the app on.
app.listen(port, () => console.log('Example app listening on port 3000!'))