import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';



const Checkout = ({
  products,
  setRun = f => f,
  run = undefined
}) =>{

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) =>{
    getBraintreeClientToken(userId, token).then(
      data => {
        if(data.error){
          setData({...data, error: data.error})
        } else {
          setData({

            clientToken: data.clientToken
          })
        }
      }
    )
  }

  useEffect(()=>{
    getToken(userId, token);
  }, [])

  const handleAddress = event => {
    setData({...data, address: event.target.value})
  }

  const getTotal = () =>{
    return products.reduce((currentValue, nextValue)=>{
      return currentValue + (nextValue.count * nextValue.price)
    }, 0)
  }
  const showCheckout = () => (
    isAuthenticated()
      ?
      // <button className="btn btn-success">Checkout</button>
      <div>{showDropIn()}</div>
      : <Link>
          <button className="btn btn-primary">SignIn</button>
        </Link>
  )

  const buy = () =>{
    setData({...data, loading: true});
    //ERROR STARTS HERE. NONCE
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod() //
      .then (data =>{
        console.log(data)
        nonce = data.nonce
        //nonce is card type etc
        //send nonce as paymentmethod nonce

        console.log('send nonce and total to process ', nonce, getTotal(products))

        //SEND DATA TO BACKEND
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        }
        processPayment(userId, token, paymentData)
        .then(response => {
          console.log("processPayment RESPONSE: ", response)
          console.log("DATA: ", data)

          // setData({...data, success: response.success});

          //create order
          const createOrderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            address: data.address
          }
          createOrder(userId, token, createOrderData);

          //empty cart
          emptyCart(()=>{
            console.log('Payment successful. Cart empty.')
            setData({loading: false, success: true})
            // setRun(!run)

          });

        })
        .catch(error=>{
          console.log(error)
          setData({...data, loading: false, error: error.message})
        })

      })
      .catch(error=>{
        console.log('dropin error: ', error);
        setData({...data, error: error.message});
      })

  }

  const showDropIn = () =>(
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div onBlur={
          () => setData({...data, error: ''})
        }>
        <div>
          <div className="form-group mb-3">
            <label htmlFor="" className="text-muted">Delivery Address</label>
            <textarea name="" id="" cols="30" rows="3"
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>
        </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: { flow: 'vault' }
            }}
            onInstance = {instance => (data.instance = instance)}
            />
            <button onClick ={buy} className="btn btn-success btn-block" style={{display: data.success ? 'none' : null}}>Pay</button>
        </div>
      ) : null}
    </div>
  )

  const showError = error => (
    <div className="alert alert-danger" style={{display: error ? null : 'none'}}>
      {error}
    </div>
  )

  const showSuccess = success => (
    <div className="alert alert-success" style={{display: success ? null : 'none'}}>
      Your payment is successful.
    </div>
  )

  const showLoading = loading => (
    loading && <h4>Loading...</h4>
  )
  return <div>
    {/* {JSON.stringify(products)} */}
    <h2>Total: ${getTotal()}</h2>
    {showError(data.error)}
    {showSuccess(data.success)}
    {showLoading(data.loading)}
    {showCheckout()}



  </div>

}
export default Checkout;
