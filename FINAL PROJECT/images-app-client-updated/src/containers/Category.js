import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
import Navbarcomponent from "../components/Navbarcomponent"
var _ = require('lodash')
var querystring = require('querystring')

class Category extends React.Component {
  state = {
    categories: [],
    isloading: false,
    categoryname: "",
    error: false
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('categoryid');
    this.setState({ categoryname: category });
    this.getcategories(category);
  }
  getcategories(category) {
    this.setState({ isloading: true })
    var body = {
      category: category
    }
    axios({
      method: 'POST',
      url: config.apiUrl + '/images/category',
      headers: {
      },
      data: JSON.stringify(body),
    }).then(response => {
      if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
        this.setState({ categories: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
      }
    }).catch(error => {
      if (error) {
        this.setState({ isloading: false, error: true })
      }
    })
  }
  render() {
    var data = this.state.categories
    return (
      <div>
        <Navbarcomponent/>
        {
          !this.state.isloading ?
            <div>
              <div className="text-left" onClick={() => this.props.history.push("/ImagePortal")}><button className="cate-but"><img src='../../img/back.png' /> {this.state.categoryname} </button></div>

              {
                !this.state.error ?
                  data && Array.isArray(data) && data.length ?
                    data.map((category, index) => (
                      <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Seasons/?categoryid=${category.category}&&seasonid=${category.season}`)}>
                        <div className="imageCardWrapp">
                          <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                          <p>{category.season}</p>
                        </div>
                        <div className="imagebox"  >
                          <p>The RunwayShop</p>
                        </div>
                      </div>
                    ))
                    :
                    <div><img src='../../img/data-not-found.gif' /><h3>Data not Found !</h3> </div> : <div>
                    <img src='../../img/404-Air.gif' />
                    <h1>Something Went wrong on our End  or Make sure your internet conection is Active</h1>
                  </div>
              }
            </div> : <div>
              <div>
                <img src='../../img/preloader_ps_fast.gif' />
              </div>
            </div>
        }
      </div>
    )

  }
}
export default Category