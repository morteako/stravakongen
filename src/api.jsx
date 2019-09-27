import axios from "axios";

const strava = "https://www.strava.com/api/v3/";

export const getRequest = url =>
  axios.request(url, {
    params: {
      access_token: "76b4ec0f6143822d5f5d33a42fc554daa5f9f82d"
    }
  });

const addParam = (url, key, value) => `${url}&${key}=${value}`;

const addToStrava = (...args) => strava + args.join("/") + "?";

export const createAthlete = id => addToStrava("athletes", id);
export const createSegment = id => addToStrava("segments", id);

export const createSegmentLeaderboard = id =>
  addToStrava("segments", id, "leaderboard");

export const createSegmentLeaderboardClub = (club, id) =>
  addParam(addToStrava("segments", id, "leaderboard"), "club_id", club);

export const createSegmentLeaderboardClubFull = (club, id) =>
  addParam(createSegmentLeaderboardClub(club, id), "per_page", 50);

export const createSegmentLeaderboardClubThisYear = (club, id) =>
  addParam(
    createSegmentLeaderboardClubFull(club, id),
    "date_range",
    "this_year"
  );
