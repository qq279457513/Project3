import React, { Component } from "react";
import { getBooks } from "../firebase";
import authContext from "../authContext";
import { colRef } from "../firebase";
import { getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addBookforUser } from "../firebase";

/**init:
 * 1: initialized, books data unloaded
 * 2: books data loaded
 **/
class Products extends Component {
  state = {
    books: authContext._currentValue.allBooks,
    cId: authContext._currentValue.cId,
    init: authContext._currentValue.init,
    test: 0,
  };

  componentDidMount() {
    this.initialize();
  }
  componentDidUpdate() {
    this.updateBooks();
  }
  initialize = () => {
    this.setState({
      books: authContext._currentValue.allBooks,
      cId: authContext._currentValue.cId,
      init: authContext._currentValue.init,
    });
  };
  updateBooks() {
    if (authContext._currentValue.init == 0 && this.state.init != 2) {
      authContext._currentValue.init = 2;
      this.setState({ init: 2 });
    }
  }
  render() {
    if (this.state.init == 1) {
      getDocs(colRef).then((snapshot) => {
        this.setState({
          books: authContext._currentValue.allBooks,
          cId: authContext._currentValue.cId,
          init: authContext._currentValue.init,
          login: false,
        });
      });
    }
    if (this.state.init == 2) {
      let array = this.state.books;
      return (
        <React.Fragment>
          <div className="productContainer">
            {array &&
              array.map((data) => (
                <Card key={data.pid} >
                  <Card.Img variant="top" src={data.url} />
                  <Card.Body>
                    <Card.Title id={data.name}>{data.name}</Card.Title>
                    <Card.Text>${data.price}.00</Card.Text>
                    <Button
                      variant="primary"
                      value={data.pid}
                      id={data.pid}
                      onClick={this.addToCart}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>Something wrong!!!</h1>
        </React.Fragment>
      );
    }
  }

  addToCart = (e) => {
    let book;
    this.state.books.forEach((data) => {
      if (e.target.value == data.pid) {
        book = data;
      }
    });
    authContext._currentValue.cId += 1;
    alert("trigger add to cart");
    addBookforUser(book, this.state.cId + 1, 1);
    this.setState({ cId: authContext._currentValue.cId });
  };
}

export default Products;
