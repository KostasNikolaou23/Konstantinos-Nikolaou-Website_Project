import React, { useEffect, useState } from "react";
import { addMyList, removeFromMyList, isInMyList, getSession } from "../../UserAPI";
import { useNavigate } from "react-router-dom"; // <-- import this

export function GridItem({
  cardName,
  cardDesc,
  cardImage,
  enableFavoriteButton,
  enableReviewButton,
  mvdbID,
  type = "movie", // or "tvseries"
}) {
  const navigate = useNavigate(); // <-- use this
  const [inMyList, setInMyList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      setLoading(true);
      const session = await getSession();
      if (mounted) {
        setLoggedIn(!!session.userid);
        if (session.userid && enableFavoriteButton && mvdbID) {
          const exists = await isInMyList(mvdbID, type);
          setInMyList(exists);
        }
        setLoading(false);
      }
    }
    check();
    return () => { mounted = false; };
  }, [mvdbID, type, enableFavoriteButton]);

  const handleMyListClick = async () => {
    if (!loggedIn) {
      alert("You must be logged in to use MyList.");
      return;
    }
    if (inMyList) {
      await removeFromMyList(mvdbID, type);
      setInMyList(false);
    } else {
      await addMyList(mvdbID, type);
      setInMyList(true);
    }
  };

  console.log("GridItem props:", {
    cardName,
    cardDesc,
    cardImage,
    enableFavoriteButton,
    enableReviewButton,
    mvdbID,
    type,
  })
  
  const handleWatchNow = () => {
    navigate(`/watchnow/${type}/${mvdbID}`);
  };

  return (
    <div className="card">
      <img src={cardImage} alt={cardName} className="card-image" />
      <div className="card-content">
        <h2>{cardName}</h2>
        <p>{cardDesc.length > 130 ? cardDesc.substring(0, 130) + "..." : cardDesc}</p>
        <div className="row" style={{ marginLeft: "5px", marginRight: "5px" }}>
          <div className="col">
            <button type="button" className="watch-button" onClick={handleWatchNow}>
              Watch Now
            </button>
          </div>
          {enableReviewButton && (
            <div className="col d-flex justify-content-end">
              <button className="btn btn-primary">Rate it</button>
            </div>
          )}
          {enableFavoriteButton && loggedIn && (
            <div className="col d-flex justify-content-end">
              <button
                className={`btn ${inMyList ? "btn-outline-danger" : "btn-danger"}`}
                onClick={handleMyListClick}
                disabled={loading || !loggedIn}
              >
                <i className={inMyList ? "fa fa-heart-broken" : "fa fa-heart"}></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GridItem;