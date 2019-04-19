import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
var _ = require('lodash')
class Seasons extends React.Component {
  state = {
    seasons: [],
    isloading: false,
    seasonsname: "",
    categoryname: "",
    citiesname: "",

  }
  componentDidMount() {

    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('categoryid');
    console.log("category", category)
    var season = urlParams.get('seasonid');
    var city = urlParams.get('cityid');
    this.setState({ categoryname: category, seasonsname: season, citiesname: city });
    this.getcategories(category, season);
  }
  
  getcategories(category,season) {
    this.setState({isloading:true})
      var body = { 
        category:category,
        season:season
       }
      console.log("body",body);
      axios({
        method: 'POST', 
        url:config.apiUrl + '/images/season',
    
      headers: {
      // 'Content-Type':  'application/json',
      // "Authorization":  token
     },
      data:JSON.stringify(body),
      })
      .then(response => {
        if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.setState({ seasons: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
        }
      }).catch(error => {
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

    var data = this.state.seasons
    console.log("this.data", data);
    return (
      !this.state.isloading ?
        <div>
          <div className="text-left" onClick={() => this.props.history.push(`/Category/?categoryid=${this.state.categoryname}&&seasonid=${this.state.seasonsname}&&cityid=${this.state.citiesname}`)}><button className="cate-but"><img src='../../img/back.png' /> {this.state.seasonsname} </button></div>
          {
           data && Array.isArray(data) && data.length ?
           data.map((category, index) => (
            <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Cities/?categoryid=${category.category}&&seasonid=${category.season}&&cityid=${category.city}`)}>
              <div className="imageCardWrapp">
                <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                <p>{category.city}</p>
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
         
        </div> : <div >
        <div>
        <img src='../../img/preloader_ps_fast.gif'/>
    </div>
        </div>);
  }
}
export default Seasons