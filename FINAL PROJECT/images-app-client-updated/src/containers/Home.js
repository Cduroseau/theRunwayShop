import React from 'react'
import {FlexiImageGrid} from "react-flexi-image-grid";
import Navbarcomponent from "../components/Navbarcomponent"
class Home extends React.Component {
  render() {
    return (
      <div>
            <Navbarcomponent/>
            <div className="container">
                <div >
                    <FlexiImageGrid
                        images={[
                            {
                                src: "https://images-app-uploads.s3.us-east-2.amazonaws.com/public/1554101040469-18-19-7.jpg",
                                className: "img1",
                                id: "idImg1",
                                height: "",
                                alt: "here 1",
                            },
                            {
                                src: "https://gl-images.condecdn.net/image/4NqoVjvJpyD/crop/405/f/blue-dior-gl-26ep17_rex_v.jpg",
                                className: "img2",
                                height: "150px",
                            },
                            {
                                src: "https://ak0.scstatic.net/1/cdn2-cont11.sweetcouch.com/147347019934661030-floral-vintage-fashion-dress.jpg",
                                className: "img3"
                            },
                            {
                                src: "http://www.yukisale.com/images/summer%20dress/wholesale%20fashion%20dress%20k1192%20Green8.jpg",
                                className: "img4"
                            },
                            {
                                src: "https://gl-images.condecdn.net/image/4NqoVjvJpyD/crop/405/f/blue-dior-gl-26ep17_rex_v.jpg",
                                className: "img5"
                            },
                            {
                                src: "https://cdn.cliqueinc.com/cache/posts/227275/french-girl-summer-wardrobe-227275-1526709033071-product.700x0c.jpg",
                                className: "img6"
                            },
                            {
                                src: "https://www.fbbonline.in/media/product/86/322/1-zoom.jpg",
                                className: "img7"
                            },
                            {
                                src: "https://peopledotcom.files.wordpress.com/2018/09/mulally.jpg?w=768",
                                className: "img8"
                            },
                            {
                                src: "https://cdn-img.instyle.com/sites/default/files/images/2018/02/020518-dress-sneakers-lead.jpg",
                                className: "img9"

                            },
                            {
                                src: "https://www.street9.com/media/catalog/product/cache/2/small_image/285x380/18ff9b5ed1bd3738f61d707cc1509711/D/R/DRS00001460_1_6.jpg",
                                className: "img10"
                            },
                            {
                                src: "https://images.evans.co.uk/i/Evans/EV16P29CNVY_M_1.jpg?$w700$",
                                className: "img11"
                            },

                            {
                                src: "https://i.pinimg.com/236x/db/47/91/db4791d4ee35b3faa90c42775a91d18a.jpg",
                                className: "img12"
                            },
                            {
                                src: "https://images-app-uploads.s3.us-east-2.amazonaws.com/public/1554101040469-18-19-7.jpg",
                                className: "img1",
                                id: "idImg1",
                                height: "",
                                alt: "here 1",

                            },
                            {
                                src: "https://www.fbbonline.in/media/product/86/322/1-zoom.jpg",
                                className: "img2",
                                height: "150px",
                            },
                            {
                                src: "https://ak0.scstatic.net/1/cdn2-cont11.sweetcouch.com/147347019934661030-floral-vintage-fashion-dress.jpg",
                                className: "img3"
                            },
                            {
                                src: "http://www.yukisale.com/images/summer%20dress/wholesale%20fashion%20dress%20k1192%20Green8.jpg",
                                className: "img4"
                            },
                            {
                                src: "https://gl-images.condecdn.net/image/4NqoVjvJpyD/crop/405/f/blue-dior-gl-26ep17_rex_v.jpg",
                                className: "img5"
                            }
                            ,
                            {
                                src: "https://cdn.cliqueinc.com/cache/posts/227275/french-girl-summer-wardrobe-227275-1526709033071-product.700x0c.jpg",
                                className: "img6"
                            },
                            {
                                src: "https://www.fbbonline.in/media/product/86/322/1-zoom.jpg",
                                className: "img7"
                            },
                            {
                                src: "https://peopledotcom.files.wordpress.com/2018/09/mulally.jpg?w=768",
                                className: "img8"
                            },
                            {
                                src: "https://cdn-img.instyle.com/sites/default/files/images/2018/02/020518-dress-sneakers-lead.jpg",
                                className: "img9"
                            },
                            {
                                src: "https://www.street9.com/media/catalog/product/cache/2/small_image/285x380/18ff9b5ed1bd3738f61d707cc1509711/D/R/DRS00001460_1_6.jpg",
                                className: "img10"
                            },
                            {
                                src: "https://images.evans.co.uk/i/Evans/EV16P29CNVY_M_1.jpg?$w700$",
                                className: "img11"
                            },
                        ]}
                        numberOfColumns={4}
                        onClick={this.onClickHandler}
                    />
                </div>
            </div>
      </div>
    );
  }
}
export default Home