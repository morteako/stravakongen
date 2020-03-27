export const allSegments = {
  1942901: {
    id: 1942901,
    name: "Tryvann",
    groups: {
      "klatrekongen-vest": 1,
      klatrekongen: 1,
      allroundern: 1,
      tryvanndobbelen: 1
    }
  },
  4252879: {
    id: 4252879,
    name: "Olaf Bulls vei",
    groups: {
      "klatrekongen-vest": 1
    }
  },
  660072: {
    id: 660072,
    name: "Grefsenkollen",
    groups: {
      "klatrekongen-vest": 1,
      "Klatrekongen-ost": 1,
      klatrekongen: 1,
      allroundern: 1
    }
  },
  632847: {
    id: 632847,
    name: "Kongsveien",
    groups: {
      klatrekongen: 1,
      "klatrekongen-ost": 1
    }
  },
  666298: {
    id: 666298,
    name: "Svartskogbakken",
    groups: {
      "klatrekongen-ost": 1
    }
  },
  2783427: {
    id: 2783427,
    name: "Sognsvann motsols, strand til strand",
    groups: {
      lopekongen: 1,
      allroundern: 1
    }
  },
  2553283: {
    id: 2553283,
    name: "Tour de Finance løp",
    groups: {
      lopekongen: 1,
      breaking: 1
    }
  },
  1557103: {
    id: 1557103,
    name: "Vettakollen opp langs eggen 2",
    groups: {
      lopekongen: 1,
      allroundern: 1
    }
  },
  5102820: {
    id: 5102820,
    name: "Holmenkollveien",
    groups: {
      tryvanndobbelen: 1
    }
  },
  9358707: {
    id: 9358707,
    name: "Hammeren-Kikutkrysset",
    groups: {
      "Kikut Sykkel": 1
    }
  },
  1331159: {
    id: 1331159,
    name: "Zinoberveien - Kikut",
    groups: {
      "Kikut Sykkel": 1
    }
  },
  8059590: {
    id: 8059590,
    name: "Grefsenkollen ned",
    groups: {
      utforkongen: 1
    }
  },
  14733934: {
    id: 14733934,
    name: "Tryvann ned",
    groups: {
      utforkongen: 1
    }
  },
  6890951: {
    id: 6890951,
    name: "Greveveien downhill",
    groups: {
      utforkongen: 1
    }
  },
  666794: {
    id: 666794,
    name: "Sørkedalen",
    groups: {
      tempokongen: 1
    }
  },
  1229519: {
    id: 1229519,
    name: "Maridalen",
    groups: {
      tempokongen: 1
    }
  }
};

const bikeE = "🚴🏼‍♂️";
const runE = "🏃🏻‍♂️";
const bothE = bikeE + " " + runE;
const downhillE = "⬇️ " + "😵 " + "⚰️";
const bikeDownhillE = bikeE + " " + downhillE;
// const emojis = {
//   bike : "🚴🏼‍♂️",
//   run : "🏃🏻‍♂️",
//   bikeRun : emojis.bike + " " + emojis.run,
//   downhill : "⬇️ " + "😵 " + "⚰️",
//   bikeDownhill : bike
// }
export const allGroups = {
  klatrekongen: {
    navn: "Klatrekongen",
    emoji: bikeE
  },
  breaking: {
    navn: "Breaking Marathon Limits",
    emoji: bikeE
  },
  lopekongen: {
    navn: "Løpekongen",
    emoji: runE
  },
  "klatrekongen-vest": {
    navn: "Klatrekongen Vest",
    emoji: bikeE
  },
  "klatrekongen-ost": {
    navn: "Klatrekongen Øst",
    emoji: bikeE
  },
  tempokongen: {
    navn: "Tempokongen",
    emoji: bikeE
  },
  utforkongen: {
    navn: "Utforkongen",
    emoji: bikeDownhillE
  },
  tryvanndobbelen: {
    navn: "Tryvanndobbel",
    emoji: bothE
  },
  allroundern: {
    navn: "Allrounder'n",
    emoji: bothE
  }
};

// export const groupEmojis = {
//   Klatrekongen: bikeE,
//   Løpekongen: runE,
//   "Klatrekongen Vest": bikeE,
//   "Klatrekongen Øst": bikeE,
//   Tempokongen: bikeE,
//   Utforkongen: bikeDownhillE,
//   // "Kikut Sykkel": bikeE,
//   Tryvanndobbelen: bothE,
//   AllRoundern: bothE,
//   breaking: runE
// };

// export const groupSlugs = Object.keys(groups);
