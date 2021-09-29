import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, isAdmin } = props;

  return (
    <div id="homepage">
      <h1>
        Welcome
        {username
          ? " back " + username + (isAdmin ? "(admin)" : '') + "!"
          : "!"}
      </h1>
      <Link to="/products">
        <button className="btn btn-primary mb-2">SEE ALL PRODUCTS</button>
      </Link>

      <img
        id="home-image"
        src="https://images.unsplash.com/photo-1527960471264-932f39eb5846?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
        className="rounded"
      ></img>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);
