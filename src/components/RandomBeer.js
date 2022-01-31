import React from 'react';
import { instance } from './instance.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RandomBeer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      beerName: '',
      beerDescription: '',
      beerImage: ''
    };
    this.ramdomBeerButton = this.ramdomBeerButton.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.ramdomBeerButton();
  }

  ramdomBeerButton() {
    instance.get(`random`, {
    })
      .then(response => {
        const beerLabel = response.data[0].name;
        const beer_Description = response.data[0].description;
        const beerImg = response.data[0].image_url;

        if ((beerImg === null) || (beer_Description === '')) {
          toast.error('No beer to display, please click, again');
        }
        else {
          if (this._isMounted) {
            this.setState
              ({
                //set beerName state to beer name from response
                beerName: beerLabel,
                //set beerDescription state to beer Description from response
                beerDescription: beer_Description,
                //set image state to imageURL from response
                beerImage: beerImg
              })
          }
        }
      })
      .catch(err => {
        console.log("ERROR: " + err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className='beerContainer'>
        <button type="submit" onClick={this.ramdomBeerButton} className='button'>Random Beer</button>
        <div className='beerName'>
          {this.state.beerName}
        </div>
        <div className='beerDesc'>
          {this.state.beerDescription}
        </div>
        <img alt='img-preview' src={this.state.beerImage} className="img-container" />
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}
export default RandomBeer;
