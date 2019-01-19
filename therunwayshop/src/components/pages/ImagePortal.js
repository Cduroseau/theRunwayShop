import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { render } from 'react-dom';


  class ImagePortal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          gallery: []
      }
  }
//   componentDidMount() {
//       // Request for images tagged xmas       
//       axios.get('https://res.cloudinary.com/christekh/image/list/xmas.json')
//           .then(res => {
//               console.log(res.data.resources);
//               this.setState({gallery: res.data.resources});
//           });
//   }
  uploadWidget() {
     // . . .
  }

    render() {
      return (
        <div className="main">
            <h1>Image Portal</h1>
            <div className="gallery">
                <CloudinaryContext cloudName="CLOUDNAME">
                    {
                        this.state.gallery.map(data => {
                            return (
                                <div className="responsive" key={data.public_id}>
                                    <div className="img">
                                        <a target="_blank" href={`https://api.cloudinary.com/v1_1/dhaolytme/image/sprite${data.public_id}.jpg`}>
                                            <Image publicId={data.public_id}>
                                                <Transformation
                                                    crop="scale"
                                                    width="300"
                                                    height="200"
                                                    dpr="auto"
                                                    responsive_placeholder="blank"
                                                />
                                            </Image>
                                        </a>
                                        <div className="desc">Created at {data.created_at}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </CloudinaryContext>
                <div className="clearfix"></div>
            </div>
        </div>

    );
  }
}

  export default ImagePortal