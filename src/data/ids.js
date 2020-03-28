export const clubs = {
  bekk: { id: 8433, name: "Bekk" },
  bml: { id: 551609, name: "Breaking Marathon Limits" }
};

export const getClubName = id =>
  Object.values(clubs).find(x => x.id === id).name;
