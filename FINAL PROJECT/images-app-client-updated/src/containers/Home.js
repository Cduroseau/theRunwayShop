import React from 'react'
//  import Card from '../components/flipCard'
// import Axios from 'axios';
  import JustifiedGrid from 'react-justified-grid'
import {FlexiImageGrid} from "react-flexi-image-grid";

class Home extends React.Component {

  onClickHandler = (e) => {
    console.log(e.target.id);
    console.log(e.target.className);
    console.log(e.target.src);

};

  state={
    
    // CardList: [
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5ba7e962e5e5f04d1851e321/5ba7e9869140b757637f109f/1537730963559/P9067919.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5ba7e962e5e5f04d1851e321/5ba7e9d1652deafcd6febd18/1537731038544/P9068156.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5c23957db8a045098fa36833/5c23975040ec9a5686235530/1545836396098/P9117036.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5c23957db8a045098fa36833/5c23957dcd83660cb512c48f/1545835929485/P9116392.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5ba06d094fa51aaabc960300/5ba06d18cd8366f6f569f1f6/1537240350975/P9127275.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5ba06d094fa51aaabc960300/5ba06d148a922d20cd8ceb31/1537240347654/P9127246.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5aad23492b6a28af3e947864/5aad238088251b56303ab562/1521296271926/P2131096.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5aad23492b6a28af3e947864/5aad235f1ae6cf0c78a77286/1521296240209/P2130970.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5accbbbe70a6adaedb90fca0/5accbbe7758d46742ab7c9b1/1523366897441/P2092246.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5accbbbe70a6adaedb90fca0/5accbc01575d1fd3939e400a/1523366923402/P2092407.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5a8d990bec212d7be9feeff3/5a8d9970085229e655aac56f/1519229303437/P2139890.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5a8d990bec212d7be9feeff3/5a8d995d8165f569eeab5aa8/1519229284096/P2139757.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5a9b39cc085229f6cafa4990/5a9b39d341920278294f0acf/1520122324176/shay-21.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/5a9b39cc085229f6cafa4990/5a9b39d0ec212db87d25def6/1520122322593/shay-14.jpg?format=750w"
    //   },
    //   {
    //     frontImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/59e92b67b7411c0d79350462/59e92b80914e6b03fd1b5e38/1508453435200/DSC_1933.jpg?format=750w",
    //     backImageURL: "https://static1.squarespace.com/static/56d0fd25356fb009213573d7/59e92b67b7411c0d79350462/59e92bb88c56a8a8e1aeae72/1508453473609/DSC_2049.jpg?format=750w"
    //   },

    // ]
  }

  // componentDidMount() {
  //   Axios.get('https://api.cloudinary.com/v1_1/dhaolytme/image/sprite')
  //     .then(res => {
  //       this.setState({ CardList: res.data })
  //     })
  // }

  render() {

    return (

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

    );
  }

}

export default Home