export const getClub = (propsClub, lsClub) => {
  if (!propsClub && lsClub) return clubs[lsClub] || lsClub;
  const res = getClubHelper(propsClub);
  return res;
};

const getClubHelper = club => {
  if (clubs[club]) return clubs[club];
  return club ? club : clubs.bekk;
};

export const clubs = { bekk: 8433, bml: 551609, bliss: 597247 };
