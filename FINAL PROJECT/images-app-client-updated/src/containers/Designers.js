import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
import {getdesignerimages} from '../api-gateway'

class Designers extends React.Component {
    state = {
      Designers: [],
      isloading:false,
 
   }
    componentDidMount()
     {
      var urlParams = new URLSearchParams(window.location.search);
      var category = urlParams.get('categoryid');
      var season = urlParams.get('seasonid');
      var city = urlParams.get('cityid');
      var designer = urlParams.get('designerid');
      this.getcategories(category,season,city,designer);
    }
   async  getcategories(category,season,city,designer) {
    this.setState({isloading:true})

      var body = { 
        category,
        season,
        city,
        designer
       }
      console.log("body in designer",body);
      await getdesignerimages(body,(response)=>{
        console.log("response designermjjjj",response) 
        const data = response.data
        this.setState({ Designers: data,isloading:false})
        console.log("datagjbgjgbppppp", this.state.Designers) 
      })
    }
    render() {
        return (
          !this.state.isloading?
            <div>
                <h1>Designer Images</h1>
                {this.state.Designers && this.state.Designers.map((Designer, index) => (
                    <div className="imagelayout" key={index} >
                        <div className="imageCardWrapp">

                        <img className="imageCard" alt="card" src={`${config.imageBaseURL}${Designer.attachment}`}  />
                        </div>

                        {/* <p>{Designer.designer}</p>  */}
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
export default Designers


