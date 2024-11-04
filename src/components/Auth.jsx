import { login, logout, loggedInUserDisplayName } from "../services/authService"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut() {
  return (
    <div className="display-name">
      <div>
      Hello, {loggedInUserDisplayName()}  
      </div>   
      <div>
      <button  className="button" onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}