import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
import {getseasonsimages} from '../api-gateway'

class Seasons extends React.Component {
    state = {
        seasons: [],
        isloading:false,
    }
    componentDidMount()
     {
      var urlParams = new URLSearchParams(window.location.search);
      var category = urlParams.get('id');
      console.log("category",category)
      var season = urlParams.get('seasonid');
      console.log("category",season)
      this.getcategories(category,season);
    }
   async  getcategories(category,season) {
    this.setState({isloading:true})
      var body = { 
        category:category,
        season:season
       }

      await getseasonsimages(body,(response)=>{
        console.log("response",response) 
        const data = response.data
        this.setState({ seasons: data,isloading:false})
        console.log("data", this.state.seasons) 
      })
      console.log("body",body);
 
    }
    render() {
        return (
            !this.state.isloading?
            <div>
                <h1>Cities</h1>
                {this.state.seasons && this.state.seasons.map((category, index) => (
                    <div className="imagelayout" key={index} onClick={()=>this.props.history.push(`/Cities/?categoryid=${category.category}&&seasonid=${category.season}&&cityid=${category.city}`)}>
                        <div className="imageCardWrapp">
                        <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`}  />
                        <p>{category.city}</p>
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
export default Seasons