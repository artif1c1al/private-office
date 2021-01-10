import Row from './Row'
import {useContext} from 'react'
import {Context} from '../context'

function Table() {
  const {notes} = useContext(Context)

  const fieldsName = {
    fields: {
      name:"Name",
      occupation: "Ocupation",
      phone: "Phone",
      email: "Email",
      CreationDate: "Creation date"
    }
  }

  const ShowRows = ({notes}) => {
    return notes.map((note, i) => <Row currentNote={note} num={i + 1} key={i}/>) || null;
  }

  return (
    <div className="table">
      <div className="table__wrapper">
        <Row currentNote={fieldsName} isFirstRow={true}/>
        <ShowRows notes={notes}/>
      </div>
    </div>
  )
}
export default Table