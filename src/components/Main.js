import React, { Component } from "react";
import { Switch } from "react-switch-input";
class Main extends Component {
  constructor(props) {
    super(props);
    this.reset();
  }
  reset() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      resellPrice: "",
      checked: false,
    };
  }
  updateInputValue(evt) {
    const val = evt.target.value;
    // ...
    this.setState({
      resellPrice: val,
    });
  }
  handleChangeSwitch = (e) => {
    const checked = e.target.checked;
    this.setState({ checked });
  };
  render() {
    return (
      <div id="content" className="col-12 col-8-sm">
        <div className="row">
          {this.state.checked ? (
            <h1 className="col-4 col-sm-8">Resell</h1>
          ) : (
            <h1 className="col-4 col-sm-8">Add</h1>
          )}

          <Switch
            className="col-1"
            checked={this.state.checked}
            onChange={this.handleChangeSwitch}
          />
          {this.state.checked ? (
            <h2 className="col-3">Add</h2>
          ) : (
            <h2 className="col-3">Resell</h2>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, price);
          }}
        >
          { !this.state.checked ? <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          :
          null
          }

          {
            !this.state.checked ?
            <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div> : null
          }
          
          {
            this.state.checked ?
            <div className="form-group mr-sm-2">
            <input
              value={this.state.resellPrice}
              className="form-control"
              onChange={(evt) => this.updateInputValue(evt)}
              placeholder="Re-Sell Price"
              required
            />
          </div> :null
          }

          {
            !this.state.checked ? <button type="submit" className="btn btn-warning">
            Add Product
          </button> : null
          }
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col" className="d-none d-sm-table-cell">
                Owner
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td className="d-none d-sm-table-cell">{product.owner}</td>
                  <td>
                    {product.owner == this.props.account && this.state.checked ? (this.state.resellPrice? 
                    (
                      <span>
                        <button
                          name={product.id}
                          className="btn btn-warning"
                          onClick={(event) => {
                            console.log(
                              event.target.name,
                              " ",
                              this.state.resellPrice
                            );
                            
                            this.props.ResellProduct(
                              event.target.name,
                              window.web3.utils.toWei(
                                this.state.resellPrice.toString(),
                                "Ether"
                              )
                            );
                          }}
                        >
                          Re-Sell
                        </button>
                      </span>
                    ) : <button className="btn btn-warning" disabled>Enter Price</button>
                    
                    ): null}
                  </td>
                  <td>
                    {!product.purchased &&
                    product.owner != this.props.account && !this.state.checked ? (
                      <button
                        className="btn btn-warning"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;

{
  /* <input
              id="productPrice2"
              type="text"
              ref={(input) => { this.productPrice2 = input }}
              className="form-control"
              placeholder="Product Price"
              // {(event)=>{this.props.ResellProduct(event.target.id, event.target.value)}}
              required /> */
}
