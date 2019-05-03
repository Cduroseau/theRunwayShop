import React, { Component, Fragment } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";
import swal from 'sweetalert';
import { Link} from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.signIn(this.state.email, this.state.password).then(res => {
        localStorage.setItem("username", res.username)
        localStorage.setItem("imageID", res.userDataKey)

        Auth.currentUserCredentials()
          .then(credentials => {
            localStorage.setItem('awsCredentials', JSON.stringify(credentials.data));
            console.log("credentials in localstorege", credentials.data);
          }).catch(err => {
          });
      });

        swal({
          title: 'You are successfully Logged in',
          icon: "success",
          success: true,
        })
          .then(willDelete => {
            if (willDelete) {
              this.props.userHasAuthenticated(true);
              this.props.history.push("/Dashboard");
            }
          });
    } catch (e) {
      this.setState({ isLoading: false });
      if (e) {
        swal({
          title: "Unable to login !",
          icon: "warning",
          dangerMode: true
        })
      }
    }
  }

  render() {
    return (
      <div>
          <div className="App container-fluid">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">The RunwayShop</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight >
              <LinkContainer to="/ImagePortal">
                <NavItem> Image Portal</NavItem>
              </LinkContainer>
              <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
          
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
      </div>
    );
  }
}