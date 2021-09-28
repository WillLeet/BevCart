import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

const PaymentInfo = (props) =>{
    const handleSubmit = (evt)=>{
      evt.preventDefault()
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

export default PaymentInfo
