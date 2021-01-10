import Input from "./Intput"
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {useState} from "react"

function ShowModal({isLogin}) {
  if(isLogin) {
    return <SignUpForm/>
  }
  return <SignUpForm/>
}

function SignForm() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <ShowModal isLogin={isLogin}/>
  )
}

export default SignForm