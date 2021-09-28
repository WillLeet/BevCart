import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import { sendOrder } from "../store/order";
import { fetchUserByToken } from "../store/singleUser";

const PaymentInfo = (props) => {
    const handleSubmit = async (evt)=>{
      evt.preventDefault()
      if (window.localStorage.token) {
        const user = await props.fetchUserByToken(window.localStorage.token);
        console.log(user);
        await props.sendOrder(user.user.id);
        console.log("Sending the forms");
      } else {
        console.log("Clearing the guest cart");
      }
      props.history.push('/home')
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="Card number"
            placeholder="Card number..."
          />
          <input
            type="text"
            name="Expiration"
            placeholder="Expiration..."
          />
          <input
            type="text"
            name="CVV"
            placeholder="CVV..."
          />
          <span>
            <button to='home' type="submit">
              Submit
            </button>
          </span>
        </div>
      </form>
    );
  }

  const mapDispatch = (dispatch) => {
    return {
      sendOrder: (id) => dispatch(sendOrder(id)),
      fetchUserByToken: (token) => dispatch(fetchUserByToken(token)),
    };
  };
  
  export default connect(null, mapDispatch)(PaymentInfo);