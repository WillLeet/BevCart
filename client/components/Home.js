import React from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div id="homepage">
      <h1>Welcome{username?(' Back '+username + '!'):('!')}</h1>
      <img id="home-image" src='https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'></img>
      <Link to="/products"><button>SEE ALL PRODUCTS</button></Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
