import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
var _ = require('lodash')

class Category extends React.Component {
  state = {
    categories: [],
    isloading: false,
    categoryname: ""
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('categoryid'))
    var category = urlParams.get('categoryid');
    this.setState({ categoryname: category });
    console.log("id of category", category)
    this.getcategories(category);
  }
  getcategories(category) {
    this.setState({ isloading: true })
    var body = {
      category: category
    }
    console.log("body", body);

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
      alert(error)
      if (error) {
        swal({
          title: 'sorry data not found',
          icon: "warning",
          dangerMode: true
        })
      }
    })
  }



  render() {
    var data = this.state.categories
 
    return (
      !this.state.isloading ?
        <div>
          <div className="text-left" onClick={() => this.props.history.push("/ImagePortal")}><button className="cate-but"><img src='../../img/back.png' /> {this.state.categoryname} </button></div>
          {
            data && Array.isArray(data) && data.length ?
            data.map((category, index) => (
                <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Seasons/?categoryid=${category.category}&&seasonid=${category.season}`)}>
                  <div className="imageCardWrapp">
                    <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                    <p>{category.season}</p>
                  </div>
                  <div className="imagebox"  >
                    <h2>INDIGITEL</h2>
                    <p>The RunwayShop</p>
                  </div>
                </div>
              ))
              :
              <div><img width="350px" height="350px" src='../../img/resize.gif' /><h3>Data not Found !</h3> </div>
          }
        </div> : <div>
        <div>
        <img src='../../img/preloader_ps_fast.gif'/> 
    </div>
        </div>)
      ;
  }
}
export default Category