import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div id="navbar-div">
    {console.log(isAdmin)}
    <div className="nav-left">
      <h3 id="navbar-welcome">Welcome {isLoggedIn?(isAdmin?('Admin'):('User')):('')}</h3>
    </div>
    <Link id="nav-company-name" to="/home">BevCart</Link>
    <nav className="nav-right">
    <div className = "nav-options">
      {isLoggedIn ? (isAdmin ? (
              <div>
              <Link to="/products"> View products</Link>
              <Link to="/admin/users"> View users</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              </div>
          ):(
              <a href="#" onClick={handleClick}>
                Logout
              </a>
      ) ): (
          <div className = "nav-right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </div>
      )}
      </div>
    <Link to="/cart">🛒</Link>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin
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
