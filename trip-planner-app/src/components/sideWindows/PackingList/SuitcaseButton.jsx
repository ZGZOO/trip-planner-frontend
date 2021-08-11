import React from "react";
import "./SuitcaseButton.scss";

const SuitcaseButton = ({ suitcaseClickHandler, packingListData }) => {
  let displayListNum = "";
  if (packingListData) {
    displayListNum = packingListData.length;
  }
  return (
    <div className="suitcase-button-container" onClick={suitcaseClickHandler}>
      <button className="suitcase-button">
        <img
          src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1595100865/BeTrippin%20Assets/icons8-suitcase-96_nwijdu.png"
          alt="suitcase-button"
        />
      </button>
      <div className="suitcase-button-overlay">
        <div className="suitcase-text">{displayListNum} Items</div>
      </div>
    </div>
  );
};

export default SuitcaseButton;
