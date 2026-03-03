import React, { useEffect, useState } from "react";
import id from "/latest.json";

const StravaCard = () => {
    const [activityId, setActivityId] = useState(null);

    useEffect(() => {
        setActivityId(id.id);
        // Dynamically inject Strava embed script
        const script = document.createElement('script');
        script.src = "https://strava-embeds.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div
                className="strava-embed-placeholder"
                data-embed-type="activity"
                data-embed-id={activityId}
                data-style="standard"
                data-from-embed="false"
            ></div>
        </div>
    );
}

export default StravaCard;
