import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMyList, removeFromMyList, isInMyList, getSession } from "../../../UserAPI";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
        <Card className="card">
            <Card.Img variant="top" src={poster} alt={name} className="card-image" />
            <Card.Body>
                <Card.Title className="card-seriesname">{name}</Card.Title>
                <Stack gap={3}>
                    Added: {added} <br />
                </Stack>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {enableWatchButton && (
                        <Button variant="primary" onClick={handleWatchNow}>
                            Watch Now
                        </Button>
                    )}
                    {enableFavoriteButton && loggedIn && (
                        <button
                            className={`btn ${inMyList ? "btn-outline-danger" : "btn-danger"}`}
                            onClick={handleMyListClick}
                            disabled={loading || !loggedIn}
                            style={{ marginLeft: "auto" }}
                        >
                            <i className={inMyList ? "fa fa-heart-broken" : "fa fa-heart"}></i>
                        </button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default GridCard;
