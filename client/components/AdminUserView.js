import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../store/users";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export class AdminUserView extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.fetchUsers();
      console.log(this.props.users);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    if (this.props.users.length) {
      return (
        <div>
          <div class='title-user-list'>Admin List:</div>
          <div id="admin-list">
            {this.props.users.map((user) => (user.isAdmin?(
              <div key={user.id} id="user-card">
                <div className="user-info-view">
                  <Link to={`/admin/users/${user.id}`}>
                    {user.username} {user.isAdmin?('(admin)'):(null)}
                  </Link>
                </div>
                <div className="user-info-email">{user.email}</div>
                <div className="user-info-delete">
                <button onClick={() => user.isAdmin?(console.log('warning, user is an admin... change to delete ')):(this.props.deleteUser(user.id))}>
                  Delete User
                </button>
                </div>
              </div>
            ):(null)))}
          </div>
          <div class='title-user-list'>All accounts:</div>
          <div id="user-list">
            {this.props.users.map((user) => (
              <div key={user.id} id="user-card">
                <div className="user-info-view">
                  <Link to={`/admin/users/${user.id}`}>
                    {user.username} {user.isAdmin?('(admin)'):(null)}
                  </Link>
                </div>
                <div className="user-info-email">{user.email}</div>
                <div className="user-info-delete">
                <button onClick={() => user.isAdmin?(console.log('warning, user is an admin... change to delete ')):(this.props.deleteUser(user.id))}>
                  Delete User
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <ClipLoader
          color="aqua"
          size={150}
          loading={true}
          speedMultiplier={1.5}
        />
      );
    }
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminUserView);
