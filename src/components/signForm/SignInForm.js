import {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Input from "./Intput";
import {Context} from "../context";
import {fetchData} from "../utils";


function SignInForm() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {JWT, setJWT, setIsSignIn} = useContext(Context)

  const emailChage = (e) => setEmail(e.target.value)
  const passwordChange = (e) => setPassword(e.target.value)

  const submit = (event) => {
    event.preventDefault()
    const payload = {
      email,
      password
    }

    fetchData("http://localhost:3002/login", "POST", JWT, '', payload)
      .then(res => {
        setJWT(res.accessToken)
        if (res.accessToken) {
          setIsSignIn(true)
          history.push('/')
        }
      })
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__container">
        <h2 className="form__header">Sign in Form</h2>
        <div className="form__inputs">
          <Input onChange={emailChage} name="Email"/>
          <Input onChange={passwordChange} name="Password" type="password"/>
        </div>
        <button className="form__btn" type="submit">LOGIN</button>
        <div className="form__redirect">Not a member? <Link to='signup'>Sign up now</Link></div>
      </div>
    </form>
  )
}

export default SignInForm