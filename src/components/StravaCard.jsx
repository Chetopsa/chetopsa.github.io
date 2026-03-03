import { useEffect, useState } from "react";
import styled from "styled-components";
import latest from "/latest.json";

// latest_ = {"id": 17554428500,
//   "name": "Morning Run",
//   "distance": 9684.2,
//   "moving_time": 2565,
//   "date": "2026-02-28T09:01:53Z"}

const StravaCard = () => {
  const [activity, setActivity] = useState(null);
  const embedScriptId = "strava-embed-script";

  useEffect(() => {
    setActivity(latest);
  }, []);

  useEffect(() => {
    if (!activity) return;
    // Ensure embed placeholder is rendered before script runs
    // Only inject script if not already present
    if (!document.getElementById(embedScriptId)) {
      const script = document.createElement("script");
      script.src = "https://strava-embeds.com/embed.js";
      script.async = true;
      script.id = embedScriptId;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.StravaEmbed) {
          window.StravaEmbed.init();
        }
      };
    } else {
      if (window.StravaEmbed) {
        window.StravaEmbed.init();
      }
    }
    // No need to remove script on unmount, just re-use
  }, [activity]);

  if (!activity) return <div>Loading latest run...</div>;

  const miles = (activity.distance / 1609.34).toFixed(2);
  const paceSeconds = activity.moving_time / miles;
  const paceMin = Math.floor(paceSeconds / 60);
  const paceSec = Math.round(paceSeconds % 60)
    .toString()
    .padStart(2, "0");

  return (
    <Card>
      {/* <Title>{activity.name}</Title>
      <Stats>
        <div>
          <strong>{miles}</strong>
          <span> miles</span>
        </div>
        <div>
          <strong>{paceMin}:{paceSec}</strong>
          <span> /mile</span>
          <></>
        </div>
      </Stats> */}
      <div
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={activity.id}
        data-style="standard"
        data-from-embed="false"
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          background: "#f8f9fa",
          padding: "16px",
          maxWidth: "600px",
          margin: "0 auto",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      ></div>
    </Card>
  );
}

const Card = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;


export default StravaCard;