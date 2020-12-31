import React, { useState, useEffect, createRef } from "react";
import { Link } from "react-scroll";

function Portfolio({ content, showModal }) {
  var selectedSlide = 0;
  const [contentLength, setContentLength] = useState(1);
  const [slideRefs, setSlideRefs] = useState([]);

  useEffect(() => {
    setSlideRefs((slideRefs) =>
      Array(contentLength)
        .fill()
        .map((i) => slideRefs[i] || createRef())
    );
  }, [contentLength]);

  useEffect(() => {
    setContentLength(content.length);
    console.log(contentLength);
  }, [content,slideRefs]);

  function slideForward() {
    console.log('before:', selectedSlide);
    var newId = selectedSlide;
    newId += 1;
    console.log('new id', newId);
    selectedSlide = newId;
    console.log('now:', selectedSlide)
    console.log(selectedSlide, contentLength, selectedSlide >= contentLength - 1)
    if (selectedSlide > (contentLength - 1) ){
      selectedSlide = selectedSlide - 1;
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
      console.log('last slide');
      console.log(selectedSlide);
    } else {
      console.log('moving forward from id:',selectedSlide);
      console.log('moving forward to id:',selectedSlide);
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    }
  }
  function slideBackwards() {
    console.log('before:', selectedSlide)
    selectedSlide = selectedSlide - 1;
    console.log('now:', selectedSlide)
    if (selectedSlide > 0) {
      console.log('moving back from id:',selectedSlide);
      console.log('moving back to id:',selectedSlide);
      console.log(selectedSlide);
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
    } else {
      selectedSlide = 0;
      slideRefs[selectedSlide].current.scrollIntoView({ inline: "start" });
      console.log('last slide');
      console.log(selectedSlide);
    }
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
            >
              <img
                alt="img"
                id={item._id}
                src={item.image}
                className="portfolio__image"
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
