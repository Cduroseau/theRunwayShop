import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
import Navbarcomponent from "../components/Navbarcomponent"
var _ = require('lodash')
class ImagePortal extends React.Component {
    state = {
        categories: [],
        isloading: false,
        error: false
    }
    componentDidMount() {
    /*..urlParams TO handle Ids..*/
        var urlParams = new URLSearchParams(window.location.search);
        var category = urlParams.get('categoryid');
        this.getcategories();
    }

/*...getcategories Api Call ...*/
    getcategories() {
        this.setState({ isloading: true })
        axios({
            method: 'GET',
            url: config.apiUrl + '/imagesList',
            headers: {
            }
        })
            .then(response => {
                const data = response.data
                this.setState({ categories: data.data, isloading: false })
            }).catch(error => {
                if (error) {
                    this.setState({ isloading: false, error: true })
                }
            })
    }
    render() {
        return (
            <div>
                 <Navbarcomponent/>
                 {
            !this.state.isloading ?
                <div>
                    {
                        !this.state.error ?
                            this.state.categories && this.state.categories.map((category, index) => (
                                <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Category/?categoryid=${category.category}`)}>
                                    <div className="imageCardWrapp">
                                        <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                                        <p>{category.category}</p>
                                    </div>
                                    <div className="imagebox"  >
                                        <p>The RunwayShop</p>
                                    </div>
                                </div>
                            ))
                                    : <div>   <img src='../../img/404-Air.gif' />
                                        <h1>Something Went wrong on our End  or Make sure your internet conection is Active</h1></div>}
                </div> :
                <div>
                    <img src='../../img/preloader_ps_fast.gif' />
                </div>
                 }
            </div>
           
        );
    }
}
export default ImagePortal