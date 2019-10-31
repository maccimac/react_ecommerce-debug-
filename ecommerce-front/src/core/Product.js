import React, { useState, useEffect} from 'react';
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

const Product = (props) => {

  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data=>{
        if(data.error){
          setError(data.error)
        } else {
          setProduct(data);
          //fetch related product
          listRelated(data._id).then(newData => {
            if(newData.error){
              setError(newData.error)
            } else {
              setRelatedProducts(newData)
            }
          })
        }
      })
    };

  useEffect(()=>{
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return(
    <Layout
      title = {product && product.name}
      description = {product && product.description}
      className = "container">

      <div className="row">
        <div className="col-8">
          {product && product.description && <Card product={product} showViewProductBtn={false} showAddToCartBtn={true}/>}
        </div>
        <div className="col-4">
          <h4>Related Product</h4>
          {product
            && relatedProducts
            && relatedProducts.map(
              (product, index) =>(
                <Card product={product}/>
              )
            )}

        </div>
      </div>
      <div className="row">

      </div>
      {/* {product ? JSON.stringify(relatedProducts) : null} */}

    </Layout>
  )
}


export default Product;
