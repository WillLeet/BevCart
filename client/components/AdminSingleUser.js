import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUser } from "../store/singleUser";

export class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      isAdmin: false,
      id: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        username: this.props.user.username,
        email: this.props.user.email,
        isAdmin: this.props.user.isAdmin,
        id: this.props.user.id,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newUser = this.state;
    this.props.updateUser(newUser);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const user = this.state;
    console.log(user);
    return (
      <div id="single">
        <form onSubmit={this.handleSubmit}>
          <div id="single-user-details">
            <input
              name="username"
              onChange={this.handleChange}
              value={user.username}
            />
            <input
              name="email"
              onChange={this.handleChange}
              value={user.email}
            />
            <select
              name="isAdmin"
              value={user.isAdmin}
              onChange={this.handleChange}
            >
              <option value="true">admin</option>
              <option value="false">user</option>
            </select>
          </div>
          <button>Submit Changes</button>
        </form>
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
