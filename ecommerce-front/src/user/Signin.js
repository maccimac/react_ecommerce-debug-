import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';


const Signin = () => {
  const [values, setValues] = useState({
    email: 'josh@mail.com',
    password: 'password123',
    error: '',
    loading: false,
    redirectToReferrer: false
  })
  const {email,password,error,loading, redirectToReferrer} = values;
  const { user } = isAuthenticated();

  const handleChange = name => event =>{
    setValues({ ...values, error: false, [name]: event.target.value
    })

  } //» One function returning another function

  const clickSubmit = event =>{
    event.preventDefault();
    // signin({name: name, email: email, password: password})
    setValues({...values, loading: true, error: false})
    signin({email, password})
      .then( data => {
        if(data.error){
          setValues({...values, error: data.error, loading:false})
        } else {
          authenticate(data, ()=> {
            setValues({
              ...values,
              redirectToReferrer: true
            })
          })
        }
      })
  }



  const signInForm = () =>(
    <form>
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
      <button onClick={clickSubmit} className="btn btn-primary">Login</button>

    </form>
  )


  const showError = () => (
    <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>{error}</div>
  )
  const showLoading = () => (
    <div className="alert alert-info" style={{display : loading ? '' : 'none'}}>
      Loading...
    </div>
  )
  const redirectUser = () =>{
    if(redirectToReferrer){
      // return <Redirect to="/" />
      if (user && user.role == 1){
        return <Redirect to="/admin/dashboard"/>
      } else {
        return <Redirect to ="/user/dashboard" />
      }

      if (isAuthenticated()){
        return <Redirect to ="/" />
      }
    }
  }
  return (
    <Layout
      title="Sign In"
      className="container col-md-8 offset-md-2 "
      >
      {signInForm()}
      {showError()}
      {showLoading()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  )

}

export default Signin;
