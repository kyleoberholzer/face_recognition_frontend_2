import React from 'react';
import './SignIn.css'

class SignIn extends React.Component { //has been converted into a smart component with it's own state

  constructor (props){
    super(props);
    this.state ={
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState ({signInEmail: event.target.value}) //curly brackets make this an object
  }

  onPasswordChange = (event) => {
    this.setState ({signInPassword: event.target.value}) //curly brackets make this an object
  }

  onSubmitSignIn = (event) => {
    event.preventDefault(); // prevents dafault form from being submitted

    fetch('https://face-recognition-backend-2.onrender.com/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify ({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) { // Assuming backend returns success tag
        this.props.onRouteChange('home');
        this.props.loadUser(data.user);
      } else {
        // Handle invalid credentials
        console.error('Sign in failed:', data.error);
      }
    })
    .catch(error => {
      console.error('Error signing in:', error);
    });
    
  }

  render ()  {
    const { onRouteChange }  = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="br2 db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address" 
                  id="email-address" 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="br2 v3">
                <label className="br2 db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="br2">
              <input 
                onClick={this.onSubmitSignIn} // changes the route, but must be a function so it doesn't run on load
                className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;