import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import guideService from './services/guides'
import LoginForm from './components/LoginForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [user, setUser] = useState({name:"", id:null})
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // Login functionality
  const Login = (details) => {
    guideService
      .find(details.id)
      .then(response => {
        console.log(response)
        setUser({
          name: response.data.name,
          id: response.data.id
        })
      })
      .catch(error => {
        setLoginError("Wrong secret id")
      })
  }

  const Logout = () => {
    setUser({name:"", id: null})
  }

  return (
    <div>
      {(user.name !== "") ? 
        <div>
          <h1>Welcome {user.name}</h1>
          <h1>Notes</h1>
            <Notification message={errorMessage} />
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {notesToShow.map((note, i) => 
              <Note
                key={i}
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            )}
          </ul>
          <form onSubmit={addNote}>
            <input 
              value={newNote}
              onChange={handleNoteChange}
            />
            <button type="submit">save</button>
          </form>
          <button onClick={() => Logout()}>
            Logout
          </button>
        </div> :
        <div>
          <h1>FinTour webapp</h1>
          <p>Enter tourguide id to log in:</p>
          {(loginError !== "") ? <h2>{loginError}</h2> : ""}
          <LoginForm Login={Login} error={loginError}/>
        </div>
        }
      
      <Footer />
    </div>
  )
}

export default App 