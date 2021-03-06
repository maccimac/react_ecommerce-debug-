import React, { useState, useEffect} from 'react';
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {
  const [productsBySell, setProductsBySell ] = useState([])
  const [productsByArrival, setProductsByArrival] =
  useState([])

  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data=>{
      if(error){
        setError(data.error)
      } else {
        setProductsBySell(data);
      }
    })
  };


  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data=>{
      if(error){
        setError(data.error)
      } else {
        setProductsByArrival(data);
      }
    })
  };

  useEffect(()=>{
    loadProductsByArrival();
    loadProductsBySell();
  }, [])
  return(
    <Layout title="Homepage" description="E-Commerce Store">
      <Search/>
    <h2 className="mb-4">Bestsellers</h2>
    <div className="row">
      {productsBySell.map( (product,i)=>(

          <div className="col-4 mb-3">
            <Card key={i} product={product} />
          </div>


        )
      )}
    </div>

    <h2 className="mb-4">New Arrival</h2>
    <div className="row">
      {productsByArrival.map( (product,i)=>(
        <div className="col-4 mb-3">
            <Card key={i} product={product} />
        </div>  
        )
      )}
    </div>
  </Layout>
  )
}


export default Home;
