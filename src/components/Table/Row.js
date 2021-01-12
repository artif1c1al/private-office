import {Context} from '../context'
import {useState, useContext} from 'react'
import ContentEditable from 'react-contenteditable'
import {fetchData} from "../utils";


function Row({currentNote, num, isFirstRow = false}) {
  const {fields} = currentNote
  const arrOfFields = Object.values(fields)
  const {
    notes,
    setNotes,
    isRemoveMode,
    JWT,
  } = useContext(Context)
  const {REACT_APP_NOTES} = process.env

  const ShowFields = ({fieldsArr}) => {
    const [isContentEditable, setIsContentEdiatble] = useState(false)


    const toggleContentEditable = () => {
      setIsContentEdiatble(!isContentEditable)
    }

    const getXYofCell = (target) => {
      const cellX = target.dataset.cell
      const cellY = target.closest('[data-row]').dataset.row
      return {cellX, cellY}
    }

    const cellChange = (e) => {
      const {cellX, cellY} = getXYofCell(e.currentTarget)
      let keys = ["name", "occupation", "phone", "email", "CreationDate"]
      const {textContent} = e.currentTarget

      let changedNote = {}
      const changedNotePromise =
        fetchData(REACT_APP_NOTES, "GET", JWT)
        .then(arr => {
          return arr.filter(el => el.id === cellY)[0]
        })
        .then(note => {
          changedNote = note
          return note
        })

      const sendedChangesPromise =
      changedNotePromise
        .then(() => {
          changedNote.fields[keys[cellX - 1]] = textContent
          return fetchData(REACT_APP_NOTES, "PUT", JWT, cellY, changedNote)
        })
    }

    return fieldsArr.map((field, i) => {
      return (
        <div
          className="table__cell"
          data-cell={i+1}
          onInput={cellChange}
          onDoubleClick={toggleContentEditable}
          contentEditable={isFirstRow || isContentEditable}
          suppressContentEditableWarning={true}
          key={i}
        >
          {field}
        </div>
      );
    })
  }

  const handleClick = (e) => {
    if (isRemoveMode) {
      const visRowNum = e.currentTarget.dataset.row
      setNotes(notes.map(note => {
        if (note.id === visRowNum) {
          note.visualized = !note.visualized
        }
        return note
      }))
    }
  }


  const rowVisualize = () => {
    return `table__row ${isFirstRow ? "purple" : currentNote.visualized && "lightblue"}`
  }

  return (
    <div
      onClick={handleClick}
      className={rowVisualize()}
      data-row={currentNote.id}
    >
      <div className="table__cell">{!isFirstRow && num}</div>
      <ShowFields fieldsArr={arrOfFields}/>
    </div>
  )
}

export default Row
