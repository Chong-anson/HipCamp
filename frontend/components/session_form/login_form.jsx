import React from "react";
import { Link } from "react-router-dom";
import ErrorShowContainer from "../error_show";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoClick = this.handleDemoClick.bind(this);
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleDemoClick(e) {
    e.preventDefault();
    const user = {
      email: "edgardo@raynorflatley.org",
      password: "198el8",
    };
    this.props.processForm(user).then(() => {
      const url = this.props.match.url;
      if (url.includes("campsite")) {
        this.props.clearErrors();
        this.props.history.push(url.replace("/login", ""));
      } else {
        this.props.closeModal();
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      const url = this.props.match.url;
      if (url.includes("campsite")) {
        this.props.clearErrors();
        this.props.history.push(url.replace("/login", ""));
      } else {
        this.props.closeModal();
      }
    });
  }

  render() {
    const url = this.props.match.url;
    const signupForm = url.includes("campsites") ? (
      <button
        className="redirect-button"
        onClick={() => {
          this.props.clearErrors();
          this.props.history.push(url.replace("/login", "/signup"));
        }}
      >
        Sign up!
      </button>
    ) : (
      this.props.signupForm
    );

    return (
      <div className="login-component session-component">
        <form className="login-form form" onSubmit={this.handleSubmit}>
          <div className="title">
            <h1>Welcome Back!</h1>
            <p>It"s about time for another camping trip</p>
          </div>
          <input
            className="session-form-control"
            type="text"
            placeholder="Email:"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <input
            className="session-form-control"
            type="password"
            placeholder="Password:"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
          <Link to="/">Forgot your password?</Link>
          <br />
          <ErrorShowContainer type={"session"} />
          <button className="btn session-btn">Log In</button>
        </form>
        <div className="demo-container">
          <button className="btn session-btn" onClick={this.handleDemoClick}>
            Demo User
          </button>
        </div>
        <div className="session-component-footer">
          <span>Don"t have a Hopcamp account? </span>
          <span>{signupForm}</span>
        </div>
      </div>
    );
  }
}

export default LoginForm;
