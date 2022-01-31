import React from 'react'
import { instance } from './instance.js';
import TextTruncate from 'react-text-truncate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BeerSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brewedBefore: '',
      searchField: '',
      radioButton: '',
      items: [],
      isTrueVal: false
    };
    this.beerSearchForm = this.beerSearchForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  beerSearchForm() {
    const items = [];
    //test to make sure search field and radio button are selected
    if (this.state.radioButton === '' || this.state.searchField === '') {
      toast.error('Enter search field and select a radio button');
    } else {
      instance.get(`?${this.state.radioButton}=${this.state.searchField}`, {
      })
        .then(response => {
          response.data.forEach(item => {
            const beerInfo = {
              name: item.name,
              brewedBefore: item.brewed_before,
              desc: item.description,
              imageURL: item.image_url
            };
            items.push(beerInfo);
          });
          this.setState({
            items
          });
        },

        )
        .catch(err => {
          console.log("ERROR: " + err);
        });
    }
  }

  handleInputChange = e => {
    const { value } = e.target;
    const isTrueVal = !value || this.urlPatternValidation(value);
    this.setState({
      searchField: e.target.value,
      isTrueVal
    });
  }

  handleRadioChange = e => {
    this.setState({
      radioButton: e.target.value
    });
  }

  urlPatternValidation = input => {
    const regex = new RegExp(/^[0-9A-Za-z_-\s]+$/);
    return regex.test(input);
  };

  render() {
    const { isTrueVal } = this.state;
    return (
      <div className='beerContainer'>
        {!this.state.isTrueVal && (
          <div className='errorMsg'>Invalid characters, only letters, numbers, hyphens and spaces allowed</div>
        )
        }
        <input className='beerSearchInput' type="search" onChange={this.handleInputChange} value={this.state.searchField} />
        <div className="radio-button">
          <input type="radio" value="beer_name" name="radio" onChange={this.handleRadioChange} /> Beer Name
        </div>
        <div className="radio-button">
          <input type="radio" value="brewed_before" name="radio" onChange={this.handleRadioChange} /> Brewed Before mm-yyyy
        </div>
        <button className='button' type="submit" onClick={this.beerSearchForm} disabled={!isTrueVal}>Search</button>
        <div>
          <div>
            {this.state.items.map((item) => (
              <div key={item.name}>
                <div className='beerName'>
                  {<img alt='previewImg' src={item.imageURL} className="beerIcon" />} {item.name}
                </div>
                <div className='beerDesc'>
                  <TextTruncate
                    line={1}
                    element="span"
                    truncateText="…"
                    text={item.desc} />
                </div>
              </div>
            ))}
          </div>
          <ToastContainer autoClose={3000} />
        </div>
      </div >
    )
  }
}
export default BeerSearch;
