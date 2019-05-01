import React, { Component } from 'react'
import './card.css'
import { TweenMax, TimelineMax } from 'gsap'
class Card extends Component {

  constructor(props) {
    super(props)
    this.tween = null
  }
  componentDidMount() {
    TweenMax.set(this.backCard, { rotationY: -180 });
    this.tween = new TimelineMax({ paused: true });
    this.tween
      .to(this.frontCard, 1, { rotationY: 180 })
      .to(this.backCard, 1, { rotationY: 0 }, 0)
      .to(this.element, .5, { z: 50 }, 0)
      .to(this.element, .5, { z: 0 }, .5);
      this.element.animation = this.tween;

  }

  onMouseOver = () => {
    this.tween.play()
  }

  onMouseLeave = () => {
    this.tween.reverse()
  }
  render() {
    return (
      <div >
        {/* <div className="cardBack" ref={d => this.frontCard = d} style={{background:`url(${this.props.backImg})`}}></div>
            <div className="cardFront" ref={thing => this.backCard = thing} style={{background:`url(${this.props.frontImg})`}}></div> */}
      </div>
    )
  }
}
export default Card;