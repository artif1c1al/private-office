import {useState, useContext} from 'react';
import Input from "./Intput";
import {Link, useHistory} from "react-router-dom";
import {fetchData} from "../utils";
import {Context} from "../context";

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory()
  const {JWT} = useContext(Context)
  const {REACT_APP_REGISTR} = process.env

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      alert('Passwords are not equal!')
      return
    }
    const payload = {
      email: email,
      password: password
    }
    fetchData(REACT_APP_REGISTR, "POST", JWT, '', payload)
      .then(resp => console.log(resp))
      .then(() => history.push('/signin'))
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__container">
        <h2 className="form__header">Register form</h2>
        <div className="form__inputs">
          <Input onChange={onEmailChange} name="Email"/>
          <Input onChange={onPasswordChange} name="Password" type="password"/>
          <Input onChange={onConfirmPasswordChange} name="Password again" type="password"/>
        </div>
        <button className="form__btn" type="submit">SIGNUP</button>
        <div className="form__redirect">Are you a member? <Link to='signin'>Login!</Link></div>
      </div>
    </form>
  )
}
export default SignUpForm