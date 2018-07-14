import React, { Component } from 'react';
import { loginUser } from '../../apiCalls';
import { toggleUserLogin, userIsFalse } from '../../Actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      hasErrored: false,
      pathAddition: 'new'
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event)=>{
    event.preventDefault();
    this.setState({isLoading: true});
    const user = await loginUser(this.state); 
    if (!user){
      this.setState({hasErrored: true, isLoading: false});
      this.props.userIsFalse(user);
    } else {
      this.setState({ isLoading: false });
      this.props.toggleUserLogin(user); 
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {
          this.state.hasErrored && 
        <h2>Email has already been used.</h2>
        }
        <h2>SIGNUP</h2>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Name"
          value={this.state.name}
          name="name"
        />
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="email"
          value={this.state.email}
          name="email"
        />
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="password"
          value={this.state.password}
          name="password"   
        />
        <button
        >Sign Up</button>
      </form>
    );
  }
}

Signup.propTypes = {
  toggleUserLogin: PropTypes.func.isRequired,
  userIsFalse: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => ({
  loginStatus: state.user.loginStatus
});

export const mapDispatchToProps = (dispatch)=>({
  toggleUserLogin: (user)=>dispatch(toggleUserLogin(user)),
  userIsFalse: (user)=>dispatch(userIsFalse(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);