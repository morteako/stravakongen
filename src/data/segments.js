export const allSegments = {
  1942901: {
    id: 1942901,
    name: "Tryvann",
    groups: {
      "Klatrekongen Vest": 1,
      Klatrekongen: 1,
      AllRoundern: 1,
      Tryvanndobbelen: 1
    }
  },
  4252879: {
    id: 4252879,
    name: "Olaf Bulls vei",
    groups: {
      "Klatrekongen Vest": 1
    }
  },
  660072: {
    id: 660072,
    name: "Grefsenkollen",
    groups: {
      "Klatrekongen Vest": 1,
      Klatrekongen: 1,
      AllRoundern: 1
    }
  },
  632847: {
    id: 632847,
    name: "Kongsveien",
    groups: {
      Klatrekongen: 1
    }
  },
  2783427: {
    id: 2783427,
    name: "Sognsvann motsols, strand til strand",
    groups: {
      Løpekongen: 1,
      AllRoundern: 1
    }
  },
  2553283: {
    id: 2553283,
    name: "Tour de Finance løp",
    groups: {
      Løpekongen: 1
    }
  },
  1557103: {
    id: 1557103,
    name: "Vettakollen opp langs eggen 2",
    groups: {
      Løpekongen: 1,
      AllRoundern: 1
    }
  },
  5102820: {
    id: 5102820,
    name: "Holmenkollveien",
    groups: {
      Tryvanndobbelen: 1
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
      Utforkongen: 1
    }
  },
  14733934: {
    id: 14733934,
    name: "Tryvann ned",
    groups: {
      Utforkongen: 1
    }
  },
  666794: {
    id: 666794,
    name: "Sørkedalen",
    groups: {
      Tempokongen: 1
    }
  },
  1229519: {
    id: 1229519,
    name: "Maridalen",
    groups: {
      Tempokongen: 1
    }
  }
};

const bikeE = "🚴🏼‍♂️";
const runE = "🏃🏻‍♂️";
const bothE = bikeE + " " + runE;
const downhillE = "⬇️ " + "😵 " + "⚰️";
const bikeDownhillE = bikeE + " " + downhillE;

export const groupEmojis = {
  Klatrekongen: bikeE,
  Løpekongen: runE,
  "Klatrekongen Vest": bikeE,
  Tempokongen: bikeE,
  Utforkongen: bikeDownhillE,
  // "Kikut Sykkel": bikeE,
  Tryvanndobbelen: bothE,
  AllRoundern: bothE
};

export const groups = Object.keys(groupEmojis);
