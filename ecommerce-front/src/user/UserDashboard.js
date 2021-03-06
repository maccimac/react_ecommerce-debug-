import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const Dashboard = () =>{
  const {user: {_id, name, email, role}} = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">Update Profile </Link>
          </li>
        </ul>
      </div>
    )
  }
  const userInfo = () => (
    <div className="card mb-5">
      <h4 className="card-header">User Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          {name}
        </li>
        <li className="list-group-item">
          {email}
        </li>
        <li className="list-group-item">
          {role == 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = () => (
    <div className="card mb-5">
      <h4 className="card-header">Purchase History</h4>
      <ul className="list-group">
        <li className="list-group-item">
          12342
        </li>
      </ul>

    </div>
  )
  return(
    <Layout title="User Dashboard" description={"Good day, " + name} className="container">
      <div className="row">
        <div className="col-lg-3">
          {userLinks()}
        </div>
        <div className="col-lg-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>




    </Layout>
  )
};

export default Dashboard;
