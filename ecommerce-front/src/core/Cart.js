import React, { useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { getCart, updateItem, removeItem } from './cartHelpers'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(()=>{
    setItems(getCart())
  }, [run]);

  const showItems = items => {
    // let num = var.length;
    return (
          <div>
              <h2>Your cart has {`${items.length}`} items</h2>
              <hr />
              {items.map((product, i) => (
                  <Card
                    key={i}
                    product={product}
                    cartUpdate={true}
                    removeBtn={true}
                    setRun = {setRun}
                    run = {run}
                  />
              ))}
          </div>
      );
  }

  const noItems = () =>(
    <Fragment>
      <h2>Your cart is empty.</h2>
      <Link to="/shop">
        <button>Continue Shopping</button>
      </Link>
    </Fragment>

  )

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add / remove products. Checkout."
      >
        <div className="row">
          <div className="col-8">
            {items.length > 0 ? showItems(items) : noItems()}
          </div>
          <div className="col-4">
            <h3>Your Cart Summary</h3>
            <Checkout products={items}/>
          </div>



        </div>


    </Layout>
  )
}

export default Cart;
