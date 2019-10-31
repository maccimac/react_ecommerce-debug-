import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';

import {signup} from '../auth';


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })
  const {name, email, password, error, success} = values;
  const handleChange = name => event =>{
    setValues({ ...values, error: false, [name]: event.target.value
    })

  } //» One function returning another function

  const clickSubmit = event =>{
    event.preventDefault();
    // signup({name: name, email: email, password: password})
    setValues({...values, error: false})
    signup({email, password, name})
      .then( data => {
        if(data.error){
          setValues({...values, error: data.error, success:false})
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true
          })
        }
      })
  }



  const signUpForm = () =>(
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
          />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="text"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

    </form>
  )


  const showError = () => (
    <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>{error}</div>
  )
  const showSuccess = () => (
    <div className="alert alert-info" style={{display : success ? '' : 'none'}}>
      New Account Created. <Link to="/signin">Please sign in</Link>.
    </div>
  )

  return (
    <Layout
      title="Sign up"
      className="container col-md-8 offset-md-2 "
      >
      {signUpForm()}
      {showError()}
      {showSuccess()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  )

}

export default Signup;
