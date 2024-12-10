import React, { useEffect, useRef } from "react";
import Cards from "../../assets/cards/Cards_data";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);

    // Cleanup to avoid memory leaks
    return () => {
      cardsRef.current.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards-container">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="cards-list" ref={cardsRef}>
        {Cards.map((eachCard, index) => (
          <div className="cards" key={index}>
            <img src={eachCard.image} alt={eachCard.name} />
            <p>{eachCard.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
