import Search from "../Search";
import Table from "../Table";
import Control from "../Control";
import {useContext, useEffect} from "react";
import {fetchData} from "../utils";
import {Context} from '../context';
const {REACT_APP_NOTES} = process.env

function Content() {
  const {isSignIn, JWT, setNotes} = useContext(Context)

  useEffect(() => {
    if(isSignIn) {
      fetchData(REACT_APP_NOTES,"GET", JWT)
        .then(resp => setNotes(resp))
    }
  }, [JWT])

  return (
      <div className="contacts">
        <Search/>
        <Table/>
        <Control/>
      </div>
  );
}

export default Content;
