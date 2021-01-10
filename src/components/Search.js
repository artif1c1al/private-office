import {useContext} from 'react'
import {Context} from './context'
import {fetchData} from "./utils";

export default function Search() {
  const { setNotes, searchBy, JWT } = useContext(Context)

  const search = (e) => {
    const currentReqest = `${e.target.value}`
    // console.log(currentReqest)
    // const url = `http://localhost:3002/notes?fields.${searchBy}_like=${currentReqest}`
    const notesUrl = `http://localhost:3002/notes`
    fetchData(notesUrl, 'GET', JWT, '')
      .then(resp => {

        const checkEquality = (substr, str, note) => {
          const substrLength = substr.length
          if(str.slice(0, substrLength) === substr){
            return note
          }
        }


        const notes = resp.filter(
          note => note.fields[searchBy]
            .slice(0, currentReqest.length)
            .toLowerCase() === currentReqest.toLowerCase()
        )
        // const notes = resp.map(note => checkEquality(currentReqest, note.fields.name, note))
        setNotes(notes)
      })
  }

  return (
    <div className="search">
      <input onChange={search} type="text" placeholder="Search something..." className="search__input"/>
      <button className="search__submit purple">Search</button>
    </div>
  )
}