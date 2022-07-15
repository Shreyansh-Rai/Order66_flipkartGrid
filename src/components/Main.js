import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.reset();
  }
  reset() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      resellPrice: ''
    };
  }
  updateInputValue(evt) {
    const val = evt.target.value;
    // ...       
    this.setState({
      resellPrice: val
    });
  }
  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input}}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input value={this.state.resellPrice} className="form-control" onChange={evt => this.updateInputValue(evt)} placeholder="Re-Sell Price"/>
          </div>

          <button type="submit" className="btn btn-warning">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>{(product.owner==this.props.account) ? <span>
                    <button name={product.id} onClick={(event)=>{
                      console.log(event.target.name, " ", this.state.resellPrice)
                      this.props.ResellProduct(event.target.name, window.web3.utils.toWei(this.state.resellPrice.toString(), 'Ether')) 
                      }}>Re-Sell</button></span>:null}
                  </td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)                            
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;

{/* <input
              id="productPrice2"
              type="text"
              ref={(input) => { this.productPrice2 = input }}
              className="form-control"
              placeholder="Product Price"
              // {(event)=>{this.props.ResellProduct(event.target.id, event.target.value)}}
              required /> */}