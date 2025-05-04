import React from "react";

export function GridItem({ cardName, cardDesc, cardImage, enableFavoriteButton, enableReviewButton }) {
  return (
    <div className="card">
      <img src={cardImage} alt={cardName} className="card-image" />
      <div className="card-content">
        <h2>{cardName}</h2>
        
        <p>{cardDesc.length > 130 ? cardDesc.substring(0, 130) + "..." : cardDesc}</p>

        <div className="row" style={{ marginLeft: "5px", marginRight: "5px" }}>
          <div className="col">
            <button className="watch-button">Watch Now</button>
          </div>

          {enableReviewButton && (
            <div className="col d-flex justify-content-end">
              <button className="btn btn-primary">Rate it</button>
            </div>
          )}

          {enableFavoriteButton && (
            <div className="col d-flex justify-content-end">
              <button className="btn btn-danger"><i className="fa fa-heart"></i></button>
            </div>
          )}
        </div>

        

      </div>
    </div>
  );
}

export default GridItem;