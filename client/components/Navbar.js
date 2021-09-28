import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import PacmanLoader from "react-spinners/PacmanLoader";

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div id="navbar-div">
    <div className="nav-left">
    <Link id="nav-company-name" to="/home">BevCart</Link>
    </div>
    <PacmanLoader
          color={'#1B9AAA'}
          size={15}
          loading={true}
          speedMultiplier={0.3}
        />
    <nav className="nav-right">
    <div className = "nav-options">
      {isLoggedIn ? (isAdmin ? (
              <div>
              <Link className="nav-options"to="/products"> View products</Link>
              <Link className="nav-options"to="/admin/users"> View users</Link>
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
            <Link className="nav-options"to="/login">Login</Link>
            <Link className="nav-options"to="/signup">Sign Up</Link>
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
