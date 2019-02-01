import React from 'react'
import Card from '../flipCard'


class Home extends React.Component {

  state={
    CardList: [
      {
        frontImageURL: "https://s.cdpn.io/33073/lorempixe1l.jpg",
        backImageURL: "http://unlimitedpotentialnow.com/wp-content/uploads/2012/01/Bouquet-cs.jpg"
      },
      {
        frontImageURL: "https://s.cdpn.io/33073/lorempixe1l.jpg",
        backImageURL: "http://unlimitedpotentialnow.com/wp-content/uploads/2012/01/Bouquet-cs.jpg"
      },
      {
        frontImageURL: "https://s.cdpn.io/33073/lorempixe1l.jpg",
        backImageURL: "http://unlimitedpotentialnow.com/wp-content/uploads/2012/01/Bouquet-cs.jpg"
      },
      {
        frontImageURL: "https://s.cdpn.io/33073/lorempixe1l.jpg",
        backImageURL: "http://unlimitedpotentialnow.com/wp-content/uploads/2012/01/Bouquet-cs.jpg"
      },

    ]
  }

  componentDidMount() {
    //do axios call to DB and get all card images.
    //in callback set this to the cardList array
  }

  render() {

    return (

      <div>
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