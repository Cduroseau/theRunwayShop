import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
import {getcitiesimages} from '../api-gateway'
import swal from 'sweetalert';
class Cities extends React.Component {
    state = {
        cities: [],
        isloading:false,
       }
    componentDidMount()
     {
      var urlParams = new URLSearchParams(window.location.search);
      var category = urlParams.get('categoryid');
      var season = urlParams.get('seasonid');
      var city = urlParams.get('cityid');
      var designer = urlParams.get('designerid');
      console.log("city",city)
      this.getcategories(category,season,city);
    }
   async  getcategories(category,season,city) {
    this.setState({isloading:true})
      var body = { 
        category,
        season,
        city
       }
      console.log("body in cities ",body);
      await getcitiesimages(body,(response)=>{
        console.log("response",response) 
        const data = response.data
        this.setState({ cities: data,isloading:false})
        console.log("data", this.state.seasons) 
      }).catch(error => {
        if (error){
          swal({
            title: 'Please login to proceed',
            icon: "warning",
              dangerMode:true
          })
            .then(willDelete => {
              if (willDelete) {
                this.props.history.push('/login')
              }
            });

        }
        })
    
    }
    render() {
        return (
          !this.state.isloading?
            <div>
                <h1>Designers</h1>
                {this.state.cities && this.state.cities.map((city, index) => (
                    <div className="imagelayout" key={index} onClick={()=>this.props.history.push(`/Designers/?categoryid=${city.category}&&seasonid=${city.season}&&cityid=${city.city}&&designerid=${city.designer}`)}>
                        <div className="imageCardWrapp">

                        <img className="imageCard" alt="card" src={`${config.imageBaseURL}${city.attachment}`}  />
                        <p>{city.designer}</p>  
                        </div>      
                        <div className="imagebox"  >
                            <h2>INDIGITEL</h2>
                            <p>Fashion</p>
                        </div>         
                    </div>
                ))}
            </div>:<div style={{ fontSize: 20, lineHeight: 2 }}>
        <h1>{this.props.title || <Skeleton />}</h1>
        {this.props.body || <Skeleton count={100} />}
      </div>);
    }
}
export default Cities