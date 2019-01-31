import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { render } from 'react-dom';
import appConfig from '../../config/app';

class ImagePortal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          gallery: []
      }
  }
  componentDidMount() {
      // Request for images tagged xmas       
      axios.get('https://res.cloudinary.com/' + appConfig.CLOUDINARY.cloud_name + '/image/list/xmas.json')
          .then(res => {
              console.log(res.data);
              this.setState({gallery: res.data.resources});
          });
  }
  uploadWidget() {
    // . . .
  }

    render() {
      return (
        <div className="main">
            <h1>Image Portal</h1>
            <div className="gallery">
                <CloudinaryContext cloudName={appConfig.CLOUDINARY.cloud_name} className="row">
                    {
                        this.state.gallery.map(data => {
                            return (
                                <div className="col p-0 mb-3 gallary-item" key={data.public_id}>
                                    <a target="_blank" href={`https://api.cloudinary.com/v1_1/${appConfig.CLOUDINARY.cloud_name}/image/sprite${data.public_id}.jpg`}>
                                        <Image publicId={data.public_id}>
                                            <Transformation
                                                crop="scale"
                                                width="200"
                                                dpr="auto"
                                                responsive_placeholder="blank"
                                            />
                                        </Image>
                                    </a>
                                    {/* <div className="desc">Created at {data.created_at}</div> */}
                                    
                                </div>
                            )
                        })
                    }
                </CloudinaryContext>
                <div className="clearfix"></div>
            </div>
            {/* <p>Images are render from cloudinary - Eample Below</p>
            <img src="indigital.png" alt="example" height="100%" width="100%"></img>

            <p>Each time you click on a image you go deeper into the folder until you get to the designer</p>
            <img src="indigital2.png" alt="example" height="100%" width="100%"></img>

            <img src="indigital3.png" alt="example" height="100%" width="100%"></img>

            <img src="indigital4.png" alt="example" height="100%" width="100%"></img>

            <img src="indigital5.png" alt="example" height="100%" width="100%"></img> */}


            
        </div>

    );
  }
}

export default ImagePortal