import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMyList, removeFromMyList, isInMyList, getSession } from "../../../UserAPI";
import Stack from "react-bootstrap/Stack";

export function GridCard({
    name,
    poster,
    type,
    added,
    mvdbID,
    enableWatchButton = false,
    enableFavoriteButton = false,
}) {
    const navigate = useNavigate();
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

    const handleWatchNow = () => {
        navigate(`/watchnow/${type}/${mvdbID}`);
    };

    return (
        <div className="card">
            <img src={poster} alt={name} className="card-image" />
            <div className="card-content">
                <h2 className="card-seriesname">{name}</h2>
                <Stack gap={3}>
                    Added: {added} <br />
                </Stack>
                <div className="d-flex gap-2 mt-2">
                    {enableWatchButton && (
                        <button
                            type="button"
                            className="watch-button"
                            onClick={handleWatchNow}
                            data-mvdbid={mvdbID}
                            data-type={type}
                        >
                            Watch Now
                        </button>
                    )}
                    {enableFavoriteButton && loggedIn && (
                        <button
                            className={`btn ${inMyList ? "btn-outline-danger" : "btn-danger"}`}
                            onClick={handleMyListClick}
                            disabled={loading || !loggedIn}
                            data-mvdbid={mvdbID}
                            data-type={type}
                        >
                            <i className={inMyList ? "fa fa-heart-broken" : "fa fa-heart"}></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GridCard;
