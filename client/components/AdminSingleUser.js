import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUser } from "../store/singleUser";

export class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.fetchUser(this.props.match.params.id);
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        value: this.props.user.isAdmin ? "admin" : "user",
      });
    }
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const newUser = this.props.user;
  //   newUser.isAdmin = event.target.value === "admin" ? true : false;
  //   this.props.updateUser(newUser);
  // }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    const newUser = this.props.user;
    newUser.isAdmin = event.target.value === "admin" ? true : false;
    this.props.updateUser(newUser);
  }

  render() {
    const user = this.props.user;
    return (
      <div id="single-user">
        <div id="single-user-details">
          <div id="single-user-name">Name: {user.username}</div>
          <div id="single-user-email">Email: {user.email}</div>
          <div id="single-user-isAdmin">
            isAdmin: {user.isAdmin ? "true" : "false"}
          </div>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </form>
          {/* <EditProduct /> */}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (id) => {
      dispatch(fetchUser(id));
    },
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
