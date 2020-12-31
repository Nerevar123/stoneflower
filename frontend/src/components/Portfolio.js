import React, { useState, useEffect, createRef, useRef } from "react";
import { Link } from "react-scroll";
import useMousePosition from '../hooks/useMousePosition';

function Portfolio({ content, showModal }) {
  let selectedSlide = 0;
  const [contentLength, setContentLength] = useState(1);
  const [slideRefs, setSlideRefs] = useState([]);
  const [isScrolling, setScrolling] = useState(false);
  const [mouseXCoordinateOnClick, setMouseXCoordinateOnClick] = useState(0);
  const [mouseXCoordinateOnDrag, setMouseXCoordinateOnDrag] = useState(0);
  const [translateDelta, setTranslateDelta] = useState('')

  // const sliderContainerRef = useRef();
  const mouseCoordinates = useMousePosition();

  useEffect(() => {
    setMouseXCoordinateOnDrag(mouseCoordinates.x)
    if(!isScrolling) {
      setMouseXCoordinateOnClick(mouseCoordinates.x);
    }
    setTranslateDelta(`translateX(${mouseXCoordinateOnDrag - mouseXCoordinateOnClick}px)`);
    if((mouseXCoordinateOnDrag - mouseXCoordinateOnClick) < -100) {
      setScrolling(false);
      slideForward();
    }
    if((mouseXCoordinateOnDrag - mouseXCoordinateOnClick) > 100) {
      setScrolling(false);
      slideBackwards();
    }
    console.log('delta',translateDelta)
  }, [mouseCoordinates])



  useEffect(() => {
    setSlideRefs((slideRefs) =>
      Array(contentLength)
        .fill()
        .map((i) => slideRefs[i] || createRef())
    );
  }, [contentLength]);

  useEffect(() => {
    setContentLength(content.length);

  }, [content,slideRefs]);
  function slideForward() {
    selectedSlide += 1;
    console.log(selectedSlide);
    if (selectedSlide > (contentLength - 1) ){
      selectedSlide = selectedSlide - 1;
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    } else {
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    }
  }
  function slideBackwards() {
    selectedSlide = selectedSlide - 1;
    console.log(selectedSlide > 0);
    if (selectedSlide > 0) {
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    } else {
      console.log('here');
      selectedSlide = 0;
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    }
  }

  function enableScrolling() {
    setMouseXCoordinateOnClick(mouseCoordinates.x)
    setScrolling(true)
    // console.log('on-click',mouseXCoordinateOnClick);
  }
  function disableScrolling() {
    setTranslateDelta(0);
    setScrolling(false);
  }
  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_advices">Портфолио</h2>

      <div className="portfolio__slider">
        {content &&
          content.map((item) => (
            <div
              key={item._id}
              ref={slideRefs[item._id]}
              id={`image_${item._id}`}
              className="portfolio__slide"
              onMouseDown={enableScrolling}
              onMouseUp={disableScrolling}
              style={{
                transform: `${isScrolling? translateDelta :''}`,
              }}
            >
              <img
                alt="img"
                id={item._id}
                src={item.image}
                className="portfolio__image"
                draggable="false"
              />
            </div>
          ))}
        <div className="portfolio__slide portfolio__slide_type_empty"></div>
      </div>
      <button onClick={slideForward}>&rarr;</button>
      <button onClick={slideBackwards}>&larr;</button>
    </article>
  );
}

export default Portfolio;
