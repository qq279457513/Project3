import React, { Component } from "react";
import authContext from "../authContext";
import { colRef } from "../firebase";
import { getDocs } from "firebase/firestore";

class History extends Component {
  state = {
    orders: authContext._currentValue.orderHistory,
    init: authContext._currentValue.init,
  };

  componentDidMount() {
    this.initialize();
  }
  componentDidUpdate() {
    this.updateBooks();
  }
  initialize = () => {
    this.setState({
      orders: authContext._currentValue.orderHistory,
      init: authContext._currentValue.init,
    });
  };
  updateBooks() {
    if (authContext._currentValue.init == 0 && this.state.init != 2) {
      this.setState({ init: 2 });
    }
  }
  render() {
    if (this.state.init == 1) {
      getDocs(colRef).then((snapshot) => {
        this.setState({
          orders: authContext._currentValue.orderHistory,
          init: authContext._currentValue.init,
        });
      });
    }
    if (this.state.init == 2) {
      this.state.orders.forEach((data) => {});
      let array = this.state.orders;
      return (
        <React.Fragment>
          <div className="historyContainer">
            {array &&
              array.map((data) => (
                <div className="orderHistory" key={data.invoice}>
                  <div className="orderDate">
                    <h2>Invoice: {data.invoice}</h2>
                    <p>Date: {data.date}</p>
                  </div>
                  {data.items &&
                    data.items.map((item) => (
                      <div className="itemList">
                        <ul>
                          <li>{item.title}</li>
                          <li>Price: {item.price}</li>
                          <li>Qty: {item.qty}</li>
                        </ul>
                      </div>
                    ))}
                  <div className="orderAmount">
                    <h4>Amount: ${data.total}</h4>
                  </div>
                </div>
              ))}
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment></React.Fragment>;
  }
}

export default History;
