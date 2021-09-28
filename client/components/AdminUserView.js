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
    if (this.props.users) {
      return (
        <div>
          <div id="user-list">
            {this.props.users.map((user) => (
              <div id="user-card">
                <p>
                  <Link key={user.id} to={`/admin/users/${user.id}`}>
                    {user.username}
                  </Link>
                </p>
                <p>{user.email}</p>
                <button onClick={() => this.props.deleteUser(user.id)}>
                  Delete User
                </button>
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
