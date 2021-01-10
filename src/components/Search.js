import {useContext} from 'react'
import {Context} from './context'
import {fetchData} from "./utils";

export default function Search() {
  const { setNotes, searchBy, JWT } = useContext(Context)

  const search = (e) => {
    const currentReqest = `${e.target.value}`
    const url = `http://localhost:3002/notes?fields.${searchBy}_like=${currentReqest}`

    fetchData(url, 'GET', JWT, '')
      .then(resp => setNotes(resp))
  }

  return (
    <div className="search">
      <input onChange={search} type="text" placeholder="Search something..." className="search__input"/>
      <button className="search__submit purple">Search</button>
    </div>
  )
}