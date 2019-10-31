import React, { useState, Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, removeItem, updateItem } from './cartHelpers';

const Card = ({
    product,
    showViewProductBtn=true,
    showAddToCartBtn=false,
    cartUpdate=false,
    removeBtn=false,
    setRun = f => f,
    run = undefined
  }) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount]=  useState(product.count);

  const showViewBtn = (showViewProductBtn) =>{
    return(
      showViewProductBtn && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary my-2 mr-2">
            View Product
          </button>
        </Link>
      )
    )
  }

  const addToCart  = () => {
    addItem(product, ()=>{
      setRedirect(true);
    })
  }

  const shouldRedirect = redirect =>{
    if(redirect){
      return <Redirect to ="/cart"/>
    }
  }

  const showCartBtn = (showAddToCartBtn) =>{
    return(
      showAddToCartBtn && (

          <button className="btn btn-outline-success my-2" onClick={addToCart}>
            Add to cart
          </button>

      )
    )
  }

  const showRemoveBtn = (removeBtn) =>{
    return(
      removeBtn && (

          <button className="btn btn-outline-danger my-2" onClick={
            ()=>{
              removeItem(product._id);
              setRun(!run)
            }
          }>
            Remove
          </button>

      )
    )
  }
  const showStock = (quantity) => {
    return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span className="badge badge-primary badge-pill">Out of Stock</span>;
  }

  const handleChange = productId => event => {
    setRun(!run)
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if(event.target.value >= 1){
      updateItem(productId, event.target.value)
    }
  }


  const showCartUpdateOptions = cartUpdate =>{
    return cartUpdate && <Fragment>
      <div className="input-group-prepend">
        <span className="input-group-text">
          Adjust Quality
        </span>
        <input
          type="number"
          className="form-control"
          value={count}
          onChange={handleChange(product._id)}
        />
      </div>
    </Fragment>
  }
  return (
    // <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          {/* {shouldRedirect(redirect)} */}
          <ShowImage item={product} url="product"/>
          <p className="lead mt-2">{product.description.substring(0,100)}</p>
          <p className="black-9">${product.price}</p>
          <p className="black-8">Category: {product.category && product.category.name}</p>
          <p className="black-8">
            Added {moment(product.createdAt).fromNow()}
          </p>

              {showViewBtn(showViewProductBtn)}
              {showCartBtn(showAddToCartBtn)}
              {showRemoveBtn(removeBtn)}
              <br/>
              {showStock(product.quantity)}

              {showCartUpdateOptions(cartUpdate)}






        </div>
      </div>
    // </div>
  )
}

export default Card;
