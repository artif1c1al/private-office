import {useContext} from 'react'
import {Context} from './context'
import {fetchData} from "./utils";

export default function Search() {
  const { setNotes, searchBy, JWT } = useContext(Context)
  const {REACT_APP_NOTES} = process.env

  const search = (e) => {
    const currentReqest = `${e.target.value}`
    fetchData(REACT_APP_NOTES, 'GET', JWT, '')
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