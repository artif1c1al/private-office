import {useContext} from 'react'
import {Context} from './context'
import {fetchData} from "./utils";

function Control() {
  const {
    notes, setNotes,
    isRemoveMode, setIsRemoveMode,
    sortBy, setSortBy,
    setSearchBy,
    JWT
  } = useContext(Context)
  const {REACT_APP_NOTES} = process.env

  const addHandler = () => {
    const newNote = {
      id: `${notes.length + 1}`,
      visualized: false,
      fields: {
        name: "",
        occupation: "",
        phone: "",
        email: "",
        CreationDate: ""
      }
    }

    fetchData(REACT_APP_NOTES, "POST", JWT, '', newNote)
      .then(note => setNotes([...notes, note]))
  }

  const removeHandler = (e) => {
    const $removeBtn = e.target
    setIsRemoveMode(!isRemoveMode)
    $removeBtn.classList.toggle('red')
    const visRows = notes
      .filter(note => note.visualized === true)
      .map(note => note.id)

    visRows.forEach(removeNoteId => {
      fetchData(REACT_APP_NOTES, "DELETE", JWT, removeNoteId)
        .then(() => {
          fetchData(urlDelete, "GET", JWT)
            .then(notes => setNotes(notes))
        })
    })
  }

  const changeSortSettings = (e) => {
    const sortMethod = e.target.value
    setSortBy(sortMethod)

    const sortNotes = (a, b) => {
      const first = a.fields[sortMethod].toLowerCase()
      const second = b.fields[sortMethod].toLowerCase()
      if (first < second) {
        return -1
      } else if (first > second) {
        return 1
      }
      return 0
    }

    setNotes(notes.sort(sortNotes))
  }


  const changeSearchSettings = (e) => {
    const searchMethod = e.target.value
    setSearchBy(searchMethod)
  }

  return (
    <div className="control">
      <div className="control__rows">
        <button onClick={addHandler} className="control__addRow blue">Add row</button>
        <button onClick={removeHandler} className="control__removeRow blue">Remove mode</button>
      </div>
      <div className="control__sorts">
        <select
          onChange={changeSortSettings}
          className="control__sortSettings purple" name="sort"
          value={sortBy}
        >
          <option value="name">Name</option>
          <option value="occupation">Occupation</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="CreationDate">Date</option>
        </select>
        <select
          onClick={changeSearchSettings}
          className="control__searchSettings purple"
          name="sort"
        >
          <option value="name">Search name</option>
          <option value="occupation">Search occupation</option>
          <option value="phone">Search phone</option>
          <option value="email">Seartch email</option>
          <option value="Creation">Search Date</option>
        </select>
      </div>
    </div>
  )
}

export default Control