import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteService
      .getAll()
      .then(initialNotes => {
        console.log(initialNotes);
        setNotes(initialNotes)
      });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id);
    const changeNote = {...note, important: !note.important };

    noteService
    .update(id, changeNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      console.log(error.message)
      setErrorMessage(`the note '${note.content}' was already deleted from server`);

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      // alert(
      //   `the note '${note.content}' was already deleted from server`
      // )
      setNotes(notes.filter(n => n.id !== id));
    })
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    };
    noteService
      .create(noteObject)
      //.post('http://localhost:3001/notes', noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
        <button type="submit">save</button>
      </form>
    </div>  
  );
};

export default App;
