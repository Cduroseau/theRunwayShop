import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
import {getcategoriesname} from '../api-gateway'
class Category extends React.Component {
    state = {
       categories: [],
       isloading:false,
     }
  
    componentDidMount()
     {

      var urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.get('id'))
      var category = urlParams.get('id');
      console.log("id of category",category)
     this.getcategories(category);
    }
    async getcategories(category) {
      this.setState({isloading:true})
      var body = { 
        category:category
       }
      console.log("body",body);


      await getcategoriesname(body,(response)=>{
        console.log("1response",response)
          
        console.log("categories &&&&&&&&&&&&&&&&", response)
        const data = response.data
        this.setState({ categories: data,isloading:false})
        console.log("data", this.state.seasons) 
      })
    }

    render() {
      console.log("category ========>", this.state.categories)
        return (   
          !this.state.isloading?     
            <div>
                <h1>Seasons</h1>
                {this.state.categories && this.state.categories.map((category, index) => (
                  <div className="imagelayout" key={index} onClick={()=>this.props.history.push(`/Seasons/?id=${category.category}&&seasonid=${category.season}`)}>
                      <div className="imageCardWrapp">
                <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`}  />   
                <p>{category.season}</p>    
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
export default Category