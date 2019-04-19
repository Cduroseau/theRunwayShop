import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
var _= require('lodash')
class Cities extends React.Component {
    state = {
        cities: [],
        isloading:false,
        citiesname:"",
        seasonsname:"",
        categoryname:""
        
       }
    componentDidMount()
     {
      var urlParams = new URLSearchParams(window.location.search);
      console.log('urlParams',urlParams)
      var category = urlParams.get('categoryid');
      console.log('category',category)
      var season = urlParams.get('seasonid');
      console.log('season',season);
      var city = urlParams.get('cityid');
      this.setState({citiesname:city,categoryname:category,seasonsname:season});
      console.log("city",city)
      this.getcategories(category,season,city);
    }

 
    getcategories(category,season,city) {
      this.setState({isloading:true})
        var body = { 
          category,
          season,
          city
         }
        console.log("body",body);
        axios({
          method: 'POST', 
          url:config.apiUrl + '/images/city ',
      
        headers: {
        // 'Content-Type':  'application/json',
        // "Authorization":  token
       },
        data:JSON.stringify(body),
        })
        .then(response => {
          if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
            this.setState({ cities: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
          }
        }).catch(error => {
        if (error){
          swal({
            title: 'sorry data not found',
            icon: "warning",
              dangerMode:true
          })
        }
        })
    
   }

 
    render() {

      var data = this.state.cities

        return (
          !this.state.isloading?
            <div>
                             <div className="text-left" onClick={()=>this.props.history.push(`/Seasons/?categoryid=${this.state.categoryname}&&seasonid=${this.state.seasonsname}&&cityid=${this.state.citiesname}`)}><button className="cate-but"><img src='../../img/back.png'  /> {this.state.seasonsname} </button></div>
       
                {
                    data && Array.isArray(data) && data.length ?
                                 data.map((city, index) => (
                    <div className="imagelayout" key={index} onClick={()=>this.props.history.push(`/Designers/?categoryid=${city.category}&&seasonid=${city.season}&&cityid=${city.city}&&designerid=${city.designer}`)}>
                        <div className="imageCardWrapp">    

                        <img className="imageCard" alt="card" src={`${config.imageBaseURL}${city.attachment}`}  />
                        <p>{city.designer}</p>  
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
          
            </div>:<div >
            <div>
            <img src='../../img/preloader_ps_fast.gif'/>
    </div>
      </div>);
    }
}
export default Cities