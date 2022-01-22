import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>NBA-Fantasy</h1>
    <nav>
      {isLoggedIn ? (
        <div className='links'>
          <Link to="/players">All Players</Link>
          <Link to="/my-team">My Team</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className='links'>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
