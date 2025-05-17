import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import { getMovieDetails, getTVDetails, getMovieWatchProviders, getTVWatchProviders } from "../Components/API";

export default function WatchNow() {
    const { type, id } = useParams();
    const [data, setData] = useState(null);
    const [providers, setProviders] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let details, providerData;
                if (type === "movie") {
                    details = await getMovieDetails(id);
                    providerData = await getMovieWatchProviders(id);
                } else if (type === "tvseries") {
                    details = await getTVDetails(id);
                    providerData = await getTVWatchProviders(id);
                } else {
                    setError("Invalid content type");
                    return;
                }
                setData(details);
                setProviders(providerData);
                
            } catch (err) {
                setError("Error fetching details");
            }
        }
        fetchData();
    }, [type, id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const name = data.original_title || data.title || data.name;

    // Helper to render provider buttons
    const renderProviderButtons = (arr) =>
        arr?.length > 0 ? (
            arr.map((prov) => {
                
                let providerLink = providers.link;
                if (prov.provider_name === "Netflix") {
                    providerLink = "https://www.netflix.com";
                } else if (prov.provider_name === "Amazon Prime Video") {
                    providerLink = "https://www.amazon.com/Prime-Video";
                } else if (prov.provider_name === "Disney+") {
                    providerLink = "https://www.disneyplus.com";
                } else if (prov.provider_name === "Hulu") {
                    providerLink = "https://www.hulu.com";
                } else if (prov.provider_name === "HBO Max") {
                    providerLink = "https://www.hbomax.com";
                } else if (prov.provider_name === "Apple TV+") {
                    providerLink = "https://tv.apple.com";
                } else if (prov.provider_name === "Paramount+") {
                    providerLink = "https://www.paramountplus.com";
                } else if (prov.provider_name === "YouTube") {
                    providerLink = "https://www.youtube.com";
                } else if (prov.provider_name === "Google Play Movies") {
                    providerLink = "https://play.google.com/store/movies";
                }

                return (
                    <Button
                        key={prov.provider_id}
                        variant="outline-primary"
                        style={{ marginRight: 10, marginBottom: 8, display: "inline-flex", alignItems: "center" }}
                        as="a"
                        href={providerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w45${prov.logo_path}`}
                            alt={prov.provider_name}
                            title={prov.provider_name}
                            style={{ verticalAlign: "middle", marginRight: 8, background: "#fff", borderRadius: 4 }}
                        />
                        {prov.provider_name}
                    </Button>
                );
            })
        ) : (
            <span style={{ color: "#888" }}>-</span>
        );

    return (
        <Card
            className="my-4 mx-auto"
            style={{ maxWidth: "700px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
            <Card.Body>
                <Card.Title
                    as="h2"
                    className="mb-3 d-flex align-items-center justify-content-between"
                >
                    Watch "{name}" from:
                </Card.Title>
                <Card.Text style={{ fontSize: "1.15rem" }}>
                    {providers ? (
                        <>
                            {providers.link && (
                                <div style={{ marginBottom: 10 }}>
                                    <a href={providers.link} target="_blank" rel="noopener noreferrer">
                                        Official Watch Link (TMDB)
                                    </a>
                                </div>
                            )}
                            <div>
                                <strong>Streaming (flatrate):</strong> {renderProviderButtons(providers.flatrate)}
                            </div>
                            <div>
                                <strong>Rent:</strong> {renderProviderButtons(providers.rent)}
                            </div>
                            <div>
                                <strong>Buy:</strong> {renderProviderButtons(providers.buy)}
                            </div>
                        </>
                    ) : (
                        <span>No platforms available for Greece (GR).</span>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
