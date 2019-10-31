import React, {useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin'

const AddCategory = () =>{
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localStorage
  const {user, token} = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value)
  }

  const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id, token, {name}).then(
      data =>{
        if(data.error){
          setError(true)
        } else {
          setError("");
          setSuccess(true)
        }
      }
    )
    // make request to api to create category

  }

  const newCategoryForm = () =>(
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required autoFocus/>
      </div>
      <button className="btn btn-primary">Create Category</button>
    </form>
  )

  const showSuccess =  () =>{
    if(success){
      return <h3 className="text-success">{name} is created.</h3>
    }
  }
  const showError =  () =>{
    if(error){
      return <h3 className="text-danger">{name} already exists.</h3>
    }
  }
  const goBack = () =>(

    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-secondary">Back to Dashboard</Link>
    </div>
  )

  return(
    <Layout title="Add Category" className="container">
      <div className="row">

        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          {goBack()}
        </div>

      </div>

    </Layout>
  )
}

export default AddCategory;
