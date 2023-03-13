const express = require('express');
const cors = require('cors');
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id =  JSON.parse(request.params.id);
  const note = notes.find(note => {
    return note.id === id});
  if (note) {
    response.json(note);
  } else {
    response.status(404).end(`cannot GET /api/notes/${id}`);
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = JSON.parse(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end(`content with id ${id} deleted`);
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;
  
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  };
  
  notes = notes.concat(note);
  //response.status(204);
  response.json(note);
});

app.put('/api/notes/:id', (request, response) => {
  const body = request.body;

  //console.log('body', body);
  
  console.log('body', body.important);
  const note = {
    id: body.id,
    content: body.content,
    important: !body.important
  };
  console.log('note', !body.important);
  //console.log('note', note);

  //console.log(notes.filter(note => note.id !== body.id));
  notes = notes.filter(note => note.id !== body.id).concat(note);
  //console.log(notes);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
