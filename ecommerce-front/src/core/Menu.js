import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom'; // — Link does not reload page
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};
const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,'/')} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
          Shop
        </Link>
      </li>
      {!isAuthenticated() && (
        <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link"  style={isActive(history,'/signin')} to="/signin">
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">
            Signup
          </Link>
        </li>
        </React.Fragment>
      )}


      {isAuthenticated() && (
        <React.Fragment>
        <li className="nav-item">
          <span className="nav-link" style={{cursor: 'pointer', color:'#fff'}} onClick={()=>{
              signout( ()=>{
              history.push("/");
            })
          }
        }>
            Signout
          </span>
        </li>
        {isAuthenticated().user.role === 0 && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">
                Dashboard
              </Link>
            </li>
          </Fragment>

        )}
        {isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">
              Admin Dashboard
            </Link>
          </li>
        )}




        </React.Fragment>

      )}

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history,'/cart')} to="/cart">
          Cart <sup><small className="cart-badge">
            {itemTotal() ? itemTotal() : null}
          </small></sup>
        </Link>
      </li>

    </ul>

  </div>

)


export default withRouter(Menu);

{/* <li className="nav-item">
  <Link className="nav-link"  style={isActive(history,'/signin')} to="/signin">
    Signin
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">
    Signup
  </Link>
</li> */}
