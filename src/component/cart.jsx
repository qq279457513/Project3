import React, { Component } from "react";
import authContext from "../authContext";
import { colRef, deleteCart, updateCartItem, updateHistory } from "../firebase";
import { getDocs } from "firebase/firestore";
import { BsFillTrashFill } from "react-icons/bs";
import _ from "lodash";

class Cart extends Component {
  state = {
    books: authContext._currentValue.cart,
    cId: authContext._currentValue.cId,
    init: authContext._currentValue.init,
    amount: 0,
  };

  componentDidMount() {
    this.initialize();
  }
  componentDidUpdate() {
    this.updateBooks();
  }
  initialize = () => {
    this.setState({
      books: authContext._currentValue.cart,
      cId: authContext._currentValue.cId,
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
          books: authContext._currentValue.cart,
          cId: authContext._currentValue.cId,
          init: authContext._currentValue.init,
        });
      });
    }
    if (this.state.init == 2) {
      let sum = 0;
      this.state.books.forEach((data) => {
        this.state.amount += data.price * data.qty;
      });
      let array = this.state.books;
      return (
        <React.Fragment>
          <div className="cartContainer">
            {array &&
              array.map((data) => (
                <div
                  key={data.cId}
                  className="cart"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div className="cartDataList">
                    <p>{data.name}</p>
                    <p>${data.price}.00</p>
                    <p>
                      Qty:
                      <input
                        className="qtyField"
                        type="number"
                        name={data.cId}
                        onChange={this.updateQty}
                        placeholder={data.qty}
                        min="1"
                      ></input>
                    </p>
                    <p>Cost: ${data.price * data.qty}.00</p>
                  </div>
                  <div className="removeField">
                    <button
                      className="btnRemove"
                      onClick={this.handleRemove}
                      value={data.cId}
                    >
                      <BsFillTrashFill disabled={true} size="30px" />
                    </button>
                  </div>
                </div>
              ))}
            <div id="cart_amount">
              <p> </p>
              <p>TOTAL: ${this.state.amount}</p>
            </div>
            <div id="checkout">
              <button id="btnCheckout" onClick={this.CheckOut}>
                Check Out
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }

    // this.state.books.forEach((data)=>{
    //     console.log("detail:", data);
    // })
    return (
      <React.Fragment>
        <p>Something Wrong</p>
      </React.Fragment>
    );
  }
  handleRemove = (e) => {
    deleteCart(e.target.valueAsNumber);
    _.remove(authContext._currentValue.cart, function (data) {
      return data.cId == e.target.value;
    });
    this.setState({ books: authContext._currentValue.cart, amount: 0 });
  };
  //update qty
  updateQty = (e) => {
    this.state.books.forEach((data) => {
      if (data.cId == e.target.name) {
        data.qty = e.target.valueAsNumber;
      }
    });
    updateCartItem(e.target.name, {
      qty: e.target.valueAsNumber,
    });
    this.setState({ books: this.state.books, amount: 0 });
  };

  //check out
  CheckOut = () => {
    alert("check out");
    let history = this.simplifyData(this.state.books);
    const data = this.combineData(history, this.state.books);
    updateHistory(data);
    _.forEach(this.state.books, (data) => {
      deleteCart(data.cId);
    });
    authContext._currentValue.cart = [];
    this.setState({ books: authContext._currentValue.cart, amount: 0 });
  };

  //invoice number convert to string
  convertInvoice(num) {
    return _.padStart(`${num}`, 6, "0");
  }

  //remove extra info, keep id and unit price only
  simplifyData(book) {
    let books_h = [];
    book.forEach((data) => {
      books_h.push({
        pId: data.pId,
        title: data.name,
        price: data.price,
        qty: 0,
        cost: 0,
      });
    });
    return books_h;
  }
  //compare two data and combine together
  combineData(data1, data2) {
    let total = 0;
    let today = new Date().toLocaleDateString();
    data1 = _.uniqBy(data1, "pId");
    data2.forEach((n1) => {
      data1.forEach((n2) => {
        if (n1.pId == n2.pId) {
          n2.qty += n1.qty;
          n2.cost += n1.price * n1.qty;
          total += n1.price * n1.qty;
        }
      });
    });
    let inv = this.convertInvoice(authContext._currentValue.invoiceID);
    authContext._currentValue.invoiceID += 1;
    return {
      invoice: inv,
      items: data1,
      total: total,
      date: today,
    };
  }
}

export default Cart;
