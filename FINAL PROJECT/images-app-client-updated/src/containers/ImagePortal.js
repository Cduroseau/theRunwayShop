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
        var urlParams = new URLSearchParams(window.location.search);
        var category = urlParams.get('categoryid');
        this.getcategories();
    }
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
                    swal({
                        title: "sorry ! something went wrong",
                        icon: "warning",
                        dangerMode: true
                    })
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
                            : <div>   <img src='../../img/errors.png' />
                                <h2>Sorry there is a  problem  occured...</h2></div>}
                </div> :
                <div>
                    <img src='../../img/preloader_ps_fast.gif' />
                    <h2>Loading...</h2>
                </div>
                 }
            </div>
           
        );
    }
}
export default ImagePortal