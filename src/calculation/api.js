import axios from "axios";
import { useStoreActions } from "easy-peasy";
import React from "react";

const strava = "https://www.strava.com/api/v3/";

export const useAccesToken = () => {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    axios
      .post(strava + "oauth/token", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: "refresh_token",
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: process.env.REACT_APP_REFRESH_TOKEN
      })
      .then(x => {
        setToken(x.data.access_token);
      })
      .catch(x => console.log(x));
  }, []);

  useStoreActions(actions => actions.addAccessToken)(token);
};

export const getRequest = (access_token, url) => {
  console.log("request", url);
  return axios.request(url, {
    params: { access_token }
  });
};
const addParam = (url, key, value) => `${url}&${key}=${value}`;

const addToStrava = (...args) => strava + args.join("/") + "?";

// export const createAthlete = id => addToStrava("athletes", id);
export const createSegment = id => addToStrava("segments", id);

export const createSegmentLeaderboard = id =>
  addToStrava("segments", id, "leaderboard");

export const createSegmentLeaderboardClub = (club, id) =>
  addParam(addToStrava("segments", id, "leaderboard"), "club_id", club);

export const createSegmentLeaderboardClubFull = (club, id) =>
  addParam(createSegmentLeaderboardClub(club, id), "per_page", 200);

export const createSegmentLeaderboardClubThisYear = (club, id) =>
  addParam(
    createSegmentLeaderboardClubFull(club, id),
    "date_range",
    "this_year"
  );
