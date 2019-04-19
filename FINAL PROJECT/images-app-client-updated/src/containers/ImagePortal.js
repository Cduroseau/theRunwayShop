import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
var _ = require('lodash')
class ImagePortal extends React.Component {
    state = {
        categories: [],
        isloading: false,
    }
    componentDidMount() {

        var urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.get('categoryid'))
        var category = urlParams.get('categoryid');
        console.log("id of category", category)
        this.getcategories();
    }
    getcategories() {
        this.setState({ isloading: true })
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
                this.setState({ categories: data.data, isloading: false })
                console.log("data", this.state.categories)
            }).catch(error => {
                if (error) {
                    swal({
                        title: 'Seems like we couldn\'t fetch the data',
                        icon: "warning",
                        dangerMode: true
                    })
                }
            })
    }


    render() {
        console.log("categerories");
        return (
            !this.state.isloading ?
                <div>

                    {this.state.categories && this.state.categories.map((category, index) => (
                        <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Category/?categoryid=${category.category}`)}>
                            <div className="imageCardWrapp">
                                <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                                <p>{category.category}</p>
                            </div>
                            <div className="imagebox"  >
                                <h2>INDIGITEL</h2>
                                <p>The RunwayShop</p>
                            </div>
                        </div>
                    ))}

                </div> :

                <div>

                    <img src='../../img/preloader_ps_fast.gif' />
                </div>
        );
    }
}
export default ImagePortal