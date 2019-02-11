import React from 'react'
import Card from '../components/flipCard'
import Axios from 'axios';


class Home extends React.Component {

  state={
    CardList: [
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },
      {
        frontImageURL: "frontImg",
        backImageURL: "backImg"
      },

    ]
  }

  componentDidMount() {
    Axios.get('https://api.cloudinary.com/v1_1/dhaolytme/image/sprite')
      .then(res => {
        this.setState({ CardList: res.data })
      })
  }

  render() {

    return (

      <div className="container">
        <div id="mainWrap">
        {
          this.state.CardList.map((item, key) => {
            return(
              <Card key={key} frontImg={item.frontImageURL} backImg={item.backImageURL} />
            )
          })
        }

          
        </div>
      </div>

    );
  }

}

export default Home