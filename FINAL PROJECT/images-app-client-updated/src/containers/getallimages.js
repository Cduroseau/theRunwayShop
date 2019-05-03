// import React from 'react'
// import axios from 'axios';
// import config from '../config'
// import Skeleton from 'react-loading-skeleton';

// class getallimages extends React.Component {
//     state = {
//         getallimages: [],
//         isloading:false
//     }
//     componentDidMount() {
//         this.getcategories();
//     }
//    async  getcategories() {
//         this.setState({isloading:true})


//         await getallimagesname((response)=>{
//             const data = response.data
//             this.setState({ getallimages: data,isloading:false})
//           })
//     }

//     render() {
//         console.log("categerories", );  
//         return (
//         !this.state.isloading?
//             <div>
//                 <h1>All Images</h1>
//                 {this.state.getallimages && this.state.getallimages.map((image, index) => (
//                     <div className="imagelayout"  key={index}>
//                         <div className="imageCardWrapp">
//                             <img className="imageCard" alt="card" src={`${config.imageBaseURL}${image.attachment}`  }   />
//                             <p>{image.category}</p>
//                         </div>
//                         <div className="imagebox"  >
//                             {/* <h2 onClick={()=>this.delete(category.id)}>KIRAN</h2> */}
//                              <h2>INDIGITEL</h2> 
//                             <p>Fashion</p>
//                         </div>
//                     </div>                  
//                 ))} 
                 
//             </div>: <div style={{ fontSize: 20, lineHeight: 2 }}>
//         <h1>{this.props.title || <Skeleton />}</h1>
//         {this.props.body || <Skeleton count={100} />}
//       </div>);
//     }
// }
// export default getallimages