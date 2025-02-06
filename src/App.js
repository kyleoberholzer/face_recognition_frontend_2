import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'

const initialState = {
    input: '',
    imageUrl:'',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',

    }
  }


class App extends Component  {
    constructor(){
      super();
      this.state = initialState
    }

    loadUser = (userData) => {
      this.setState({user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          entries: userData.entries,
          joined: userData.joined
      }})
    }

    onInputChange = (event) => {
      this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input}, () => {
        const IMAGE_URL = this.state.imageUrl;
       
        fetch('https://nameless-sands-57279-107bbf6064ff.herokuapp.com/imageurl', {  // New endpoint in backend to handle the API call
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            imageUrl: IMAGE_URL,
          })
        })
          .then(response => response.json())        //recieves and parses the response from clarifai
          .then(response => {
                fetch('https://nameless-sands-57279-107bbf6064ff.herokuapp.com/image', {  //image endpoint request to update the user's count through the backend
                  method: 'put',
                  headers: {'content-type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id            // only sending the user ID, 
                  })
                })
                  .then(response => response.json())  //recieves and parses response from the backend
                  .then(data => {                    //grabs the id from the response
                    this.setState(Object.assign(this.state.user, {entries: data.entries }))  //updates the current user count state
                  })
                  .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                  });
          this.displayFaceBox(this.calculatefaceLocation(response)) //acting off of data contained in promise from the API call.
          })
          .catch(error => console.log('error:', error));
      });
    }

    calculatefaceLocation = (data) => { //returns 4 variables for creating a facebox using css
      //grab the data from the response
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; //assigns the bounding box data to a variable
      //Now were doing DOM manipulation - grabbing the image which is aalready displayed
      const image = document.getElementById('inputimage');
      const width = Number(image.width); //calculates the pixel width of the image
      const height = Number(image.height); //calculates the pixel height of the image
      
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    }

    displayFaceBox = (boxData) => {
      this.setState({box : boxData})

    }

    onRouteChange = (route) => {
      if (route === 'signin') {
        this.setState(initialState);
      } else if (route === 'home') {
        this.setState({ isSignedIn: true })
      }
      this.setState({ route: route })
    }


    render() {
    const { isSignedIn, route, box, imageUrl } = this.state;

      return (
        <div className="App">
          <ParticlesBg type="cobweb" num={50} bg={true} color="#FFFFFF" />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'signin'  //by wrapping in curley brackets it becomes JSX, allowing to use if statements
          ? <div> 
            <Logo />
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            </div>
          : this.state.route === 'register'
          ?  <div>
                <Logo />
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            </div>
          : <div> 
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box = {box} imageUrl={imageUrl} />
            </div>
          } 
        </div> 
      );
    }
}

export default App;
