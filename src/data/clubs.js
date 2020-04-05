import { types } from "./segments";

export const getClub = (propsClub, lsClub) => {
  if (!propsClub && lsClub) return clubs[lsClub] || lsClub;
  const res = getClubHelper(propsClub);
  return res;
};

const getClubHelper = club => {
  if (clubs[club]) return clubs[club];
  return club ? club : clubs.bekk;
};

export const clubs = {
  bekk: {
    id: 8433,
    name: "Bekk",
    types: Object.values(types)
  },
  bml: {
    id: 551609,
    name: "Breaking Marathon Limits",
    types: [types.running, types.downhill]
  },
  bliss: {
    id: 597247,
    name: "Bliss",
    types: [types.running, types.downhill, types.bliss]
  }
};
