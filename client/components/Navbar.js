import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

let isAdmin = true;

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar-div">
    <div className="nav-left">
      <h3 id="navbar-welcome">Welcome {isLoggedIn?('User'):(isAdmin?('Admin'):(''))}</h3>
    </div>
    <Link id="nav-company-name" to="/home">BevCart</Link>
    <nav className="nav-right">
      {isLoggedIn ? (
        <div className = "nav-options">
                    {/* The navbar will show these links after you log in */}
                    {isAdmin ? (
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
          )}
        </div>
      ) : (
        <div className = "nav-options">
          {/* The navbar will show these links before you log in */}
          <div className = "nav-right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </div>
          </div>
      )}
    <Link to="/cart">🛒</Link>
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
