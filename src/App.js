import {useEffect, useState} from "react"
import {Context} from "./components/context";
import {Switch, Route, useHistory} from "react-router-dom";
import Content from "./components/pages/Content";
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"

function App() {
  const [notes, setNotes] = useState([])
  const [isRemoveMode, setIsRemoveMode] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [searchBy, setSearchBy] = useState('name')
  const [isSignIn, setIsSignIn] = useState(false);
  const [JWT, setJWT] = useState('');
  const history = useHistory()

  useEffect(() => {
    !isSignIn && history.push('/signin')
  })

  return (
    <div className="App">
      <Context.Provider value={{
        notes, setNotes,
        isRemoveMode, setIsRemoveMode,
        sortBy, setSortBy,
        searchBy, setSearchBy,
        JWT, setJWT,
        isSignIn, setIsSignIn
      }}>
        <Switch>
          <Route exact path='/'>
            <Content/>
          </Route>
          <Route path='/signin'>
            <SignIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
        </Switch>
      </Context.Provider>
    </div>
  );
}

export default App;
