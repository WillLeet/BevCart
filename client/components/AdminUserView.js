import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../store/users";
import { Link } from "react-router-dom";

export class AdminUserView extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    try {
      await this.props.fetchUsers();
      console.log(this.props.users);
    }
    catch (err){
      console.error(err)
    }
  }
  render() {
    return (
      <div>
          <div id ="user-list">
      {
        this.props.users.map(user=> (
        <div id="user-card" key={user.id}>
          <p >{user.username}</p>
          <p >{user.email}</p>
          <button
          onClick={() => this.props.deleteUser(user.id)}
        >
          Delete User
          </button>

        </div>))
        }
        </div>
      </div>);
  }
}

const mapState = (state) => {
  return {
    users: state.users
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminUserView);
