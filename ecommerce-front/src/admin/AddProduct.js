import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })
  const {user, token} = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    photo,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  //load getCategories
  const init = () =>{
    getCategories()
    .then(data=>{
      if(data.error){
        setValues({
          ...values,
          error:data.error})
      } else {
        setValues({
            ...values,
           categories: data,
           formData: new FormData()
         })
         console.log(data)
      }
    })
  }

  // useEffect(()=>{
  //   setValues({...values, formData: new FormData()}, [])
  // })

  useEffect(() => {
      init();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value})
  }


  const clickSubmit = event =>{
    event.preventDefault();
    setValues({...values, error: '', loading: true});
    createProduct(user._id, token, formData)
    .then(data => {
      console.log(data);
      if(data.erorr){
        setValues({...values, error: data.error})
      } else {
        setValues({...values,
          name: '',
          description:'',
          photo:'',
          price:'',
          quantity: '',
          loading: false,
          createdProduct: data.name
        })
      };
    })
  }


  const newPostForm = () =>(
    <form className="mb-3" onSubmit={clickSubmit}>

      <div className="form-group">
        <label >Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('name')}
          value={name}/>
      </div>
      <div className="form-group">
        <label htmlFor="">Description</label>
        <textarea
          type="text"
          className="form-control"
          value={description}
          onChange={handleChange('description')}/>
      </div>
      <div className="form-group">
        <label htmlFor="">Price</label>
        <input type="number" className="form-control" value={price} onChange={handleChange('price')}/>
      </div>
      <div className="form-group">
        <label htmlFor="">Category</label>
        <select className="form-control"  onChange={handleChange('category')}>
          <option>Please select...</option>
          {categories &&
             categories.map(
              (c,i)=>(
              <option value={c._id}> {c.name} </option>
            ))
          }

        </select>

      </div>
      <div className="form-group">
        <label htmlFor="">Quantity</label>
        <input type="number" className="form-control" value={quantity} onChange={handleChange('quantity')}/>
      </div>
      <div className="form-group">
        <label htmlFor="">Shipping</label>
        <select className="form-control"  onChange={handleChange('shipping')}>
          <option>Please select...</option>
          <option value='0'>False</option>
          <option value='1'>True</option>
        </select>
      </div>
      <div className="form-group">
        <label className="btn btn-primary" htmlFor="">
          <input type="file" className="file" onChange={handleChange('photo')}/>
        </label>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )
  const showError = () =>(
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>Error: {error}</div>
  )

  const showSuccess = () =>(
    <div className="alert alert-success" style={{display: createdProduct ? '' : 'none'}}>{`${createdProduct} is created!`}</div>
  )

  const showLoading = () =>(
    loading && (<div className="alert alert-success">Loading</div>)
  )
  return(
    <Layout
      title="Add new product"
      description={`Hi, ${user.name}! Ready to add a new product?`}>

      <div className="row">
        <div className="offset-lg-2 col-lg-8 ">
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
        </div>

      </div>

    </Layout>
  )
}

export default AddProduct;
