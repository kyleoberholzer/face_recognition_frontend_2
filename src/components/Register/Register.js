import React from 'react';


class Register extends React.Component {

  constructor (props){
    super(props);
    this.state ={
      registerUserName: '',
      registerEmail: '',
      registerPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState ({registerEmail: event.target.value}) //curly brackets make this an object
  }
  onUserNameChange = (event) => {
    this.setState ({registerUserName: event.target.value}) //curly brackets make this an object
  }
  onPasswordChange = (event) => {
    this.setState ({registerPassword: event.target.value}) //curly brackets make this an object
  }

  onRegister = (event) => {
    event.preventDefault(); // prevents dafault form from being submitted

    fetch('https://nameless-sands-57279-107bbf6064ff.herokuapp.com/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify ({
        userName: this.state.registerUserName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) { // Assuming backend returns success tag
        this.props.onRouteChange('home'); //call the global route change function
        this.props.loadUser(data.user); //send the user data back to the loadUser function
      } else { // Handle invalid details
        console.error('registration in failed:', data.error);
      }
    })
    .catch(error => {
      console.error('Error signing in:', error);
    });
    
  }

  render () {
    const { onRouteChange }  = this.props; 
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onRegister}> {/*on register function activated at form submit level! not on Click level */}
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="br2 db fw6 lh-copy f6" htmlFor="username">Username</label>
                <input 
                  className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="username" 
                  id="username" 
                  onChange={this.onUserNameChange}
                />
              </div>
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
              <div className="mt3">
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
            <div className="pt2 br2">
              <input 
                
                className="pt2 br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="register" 
              />
            </div>
          </form>
        </main>
      </article>
    );
    }
}

export default Register;