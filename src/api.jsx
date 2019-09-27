import axios from "axios";
import { clubs } from "./data/ids";

const strava = "https://www.strava.com/api/v3/";

export const getRequest = url =>
  axios.request(url, {
    params: {
      access_token: "76b4ec0f6143822d5f5d33a42fc554daa5f9f82d"
      // access_token: "8e7c1f0a3911e6c54150ebc3cbdbde9066270ee4"
    }
  });

// const addBekk = url => `${url}?club_id=${clubs.bekk}`
// const addThisYear = url => `${url}?date_range=this_year`

const addParam = (url, key, value) => `${url}&${key}=${value}`;

const addToStrava = (...args) => strava + args.join("/") + "?";

export const createAthlete = id => addToStrava("athletes", id);
export const createSegment = id => addToStrava("segments", id);

export const createSegmentLeaderboard = id =>
  addToStrava("segments", id, "leaderboard");

export const createSegmentLeaderboardBekk = id =>
  addParam(addToStrava("segments", id, "leaderboard"), "club_id", clubs.bekk);

export const createSegmentLeaderboardBekkFull = id =>
  addParam(createSegmentLeaderboardBekk(id), "per_page", 50);

export const createSegmentLeaderboardBekkThisYear = id =>
  addParam(createSegmentLeaderboardBekk(id), "date_range", "this_year");

export const identity = x => x;
