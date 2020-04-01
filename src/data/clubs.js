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
  bekk: { id: 8433, types: Object.values(types) },
  bml: { id: 551609, types: [types.running, types.downhill] },
  bliss: { id: 597247, types: [types.running, types.downhill, types.bliss] }
};
