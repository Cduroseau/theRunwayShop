import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Provider } from "react-redux";
import { store } from "./state/store";

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import ImagePortal from './components/pages/ImagePortal'
import Photographer from './components/pages/Photographer'
import Login from './components/auth/Login'
import './App.css';


  function onAuthRequired({ history }) {
    history.push('/login');
  }
  
  class App extends Component {

    componentDidMount() {
      
    }

    render() {
      return (
        <Provider store={store}>
          <Router>
            <Security
              issuer="https://dev-770927.oktapreview.com/oauth2/default"
              client_id="0oaiyzgr3joES4vKM0h7"
              redirect_uri={window.location.origin + '/implicit/callback'}
              onAuthRequired={onAuthRequired}
            >
              <div className="App">
                <Navbar />
                <div className="container">
                <Route path="/Home" exact={true} component={Home} />
                  <Route path="/ImagePortal" exact={true} component={ImagePortal} />
                  <SecureRoute path="/Photographer" exact={true} component={Photographer} />
                  <Route
                    path="/login"
                    render={() => (
                      <Login baseUrl="https://dev-770927.oktapreview.com" />
                    )}
                  />
                  <Route path="/implicit/callback" component={ImplicitCallback} />
                </div>
              </div>
            </Security>
          </Router>
        </Provider>
      );
    }
  }
  
  export default App;
