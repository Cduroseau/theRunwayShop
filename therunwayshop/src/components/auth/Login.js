import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { setAccessToken } from '../../state/actions/auth'


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    };
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess = res => {
    return this.props.auth.redirect({
      sessionToken: res.session.token
    });
  };

  onError = err => {
    console.log('error logging in', err);
  };

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ? (
      // <Redirect to={{ pathname: '/' }} />
      <Redirect to={{ pathname: 'ImagePortal' }} />
    ) : (
      <SignInWidget
        baseUrl={this.props.baseUrl}
        onSuccess={this.onSuccess}
        onError={this.onError}
      />
    );
  }
}

const mapStateToProps = state => ({});
const mapStateToDispatch = dispatch => ({
  setAccessToken: (token) => dispatch(setAccessToken(token))
})

export default connect(mapStateToProps, mapStateToDispatch)(withAuth(Login));
