import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className='div-form'>
      <form onSubmit={handleSubmit} name={name} className='form-login'>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {name === "signup" ? (
          <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email"/>
        </div>
        ) : <Link to="/signup">Register now!</Link> }
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {

      if (evt.target.name === 'login') {
        evt.preventDefault()
        const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        dispatch(authenticate(username, password, formName))
      } else {
        evt.preventDefault()
        const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        const email = evt.target.email.value;
        dispatch(authenticate(username, password, formName, email))

      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
