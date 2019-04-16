import React from 'react'
import axios from 'axios';
import config from '../config'
import Skeleton from 'react-loading-skeleton';
class ImagePortal extends React.Component {
    state = {
        categories: [],
        isloading:false
    }
    componentDidMount() {
        this.getcategories();
    }
    getcategories() {
        this.setState({isloading:true})
        console.log("categories")
        axios({
            method: 'GET',
            url: config.apiUrl + '/imagesList',
            headers: {
                // 'Content-Type':  'application/json',
                // "Authorization":  token
            }
        })
            .then(response => {
                console.log("response111", response)
                const data = response.data
                console.log("datasfsfsf", data)
                this.setState({ categories: data.data ,isloading:false})
                console.log("data", this.state.categories)
            })
    }


    // delete(uid) {
    //     console.log("u clicked on delete");
        
    //     var id=uid
    //     axios({
    //         method: 'DELETE',
    //         url: config.apiUrl + '/images/delete/'+id,
    //         headers: {
    //             // 'Content-Type':  'application/json',
    //             // "Authorization":  token
    //         }
    //     })
    //         .then(response => {
    //             console.log("responsedelete", response)
    //         })
    // }



    render() {
        console.log("categerories", );  
        return (
        !this.state.isloading?
            <div>
                <h1>Categories</h1>
                {this.state.categories && this.state.categories.map((category, index) => (
                    <div className="imagelayout"  key={index} onClick={()=>this.props.history.push(`/Category/?id=${category.category}`)}>
                        <div className="imageCardWrapp">
                            <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`  }   />
                            <p>{category.category}</p>
                        </div>
                        <div className="imagebox"  >
                            {/* <h2 onClick={()=>this.delete(category.id)}>KIRAN</h2> */}
                             <h2>INDIGITEL</h2> 
                            <p>Fashion</p>
                        </div>
                    </div>
                ))} 
                 
            </div>: <div style={{ fontSize: 20, lineHeight: 2 }}>
        <h1>{this.props.title || <Skeleton />}</h1>
        {this.props.body || <Skeleton count={100} />}
      </div>);
    }
}
export default ImagePortal