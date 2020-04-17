export const allSegments = {
  1942901: {
    name: "Tryvann",
    groups: {
      "klatrekongen-vest": 1,
      klatrekongen: 1,
      allroundern: 1,
      tryvanndobbelen: 1
    }
  },
  4252879: {
    name: "Olaf Bulls vei",
    groups: {
      "klatrekongen-vest": 1
    }
  },
  660072: {
    name: "Grefsenkollen",
    groups: {
      "klatrekongen-vest": 1,
      "Klatrekongen-ost": 1,
      klatrekongen: 1,
      allroundern: 1
    }
  },
  632847: {
    name: "Kongsveien",
    groups: {
      klatrekongen: 1,
      "klatrekongen-ost": 1
    }
  },
  666298: {
    name: "Svartskogbakken",
    groups: {
      "klatrekongen-ost": 1
    }
  },
  2783427: {
    name: "Sognsvann rundt motsols",
    groups: {
      lopekongen: 1,
      allroundern: 1,
      bliss: 1
    }
  },
  2462560: {
    name: "Sognsvann rundt medsols",
    groups: {
      bliss: 1
    }
  },

  2553283: {
    name: "Tour de Finance løp",
    groups: {
      lopekongen: 1,
      bml: 1
    }
  },
  657002: {
    groups: {
      bml: 1
    }
  },
  21317574: {
    groups: {
      bml: 1
    }
  },
  1032853: {
    groups: {
      bml: 1
    }
  },
  11861324: {
    groups: {
      bml: 1
    }
  },
  5891167: {
    name: "Sognsvann - Ullevålseter",
    groups: {
      bliss: 1
    }
  },
  1557103: {
    name: "Vettakollen opp",
    groups: {
      lopekongen: 1,
      allroundern: 1,
      bliss: 1
    }
  },
  5102820: {
    name: "Holmenkollveien",
    groups: {
      tryvanndobbelen: 1
    }
  },
  9358707: {
    name: "Hammeren-Kikutkrysset",
    groups: {
      "kikut-sykkel": 1
    }
  },
  1331159: {
    name: "Zinoberveien - Kikut",
    groups: {
      "kikut-sykkel": 1
    }
  },
  8059590: {
    name: "Grefsenkollen ned",
    groups: {
      utforkongen: 1
    }
  },
  14733934: {
    name: "Tryvann ned",
    groups: {
      utforkongen: 1
    }
  },
  6890951: {
    name: "Greveveien downhill",
    groups: {
      utforkongen: 1
    }
  },
  666794: {
    name: "Sørkedalen",
    groups: {
      tempokongen: 1
    }
  },
  1229519: {
    name: "Maridalen",
    groups: {
      tempokongen: 1
    }
  },
  23325175: {
    groups: {
      "nurc-trondheim": 1
    }
  },
  23330779: {
    groups: {
      "nurc-trondheim": 1
    }
  },
  23330813: {
    groups: {
      "nurc-trondheim": 1
    }
  },
  23330843: {
    groups: {
      "nurc-trondheim": 1
    }
  },
  23330762: {
    groups: {
      "nurc-trondheim": 1
    }
  },
};
//Hacky way to add ids to the objects. Reduces duplication
Object.keys(allSegments).forEach(segmentId => allSegments[segmentId].id = segmentId)


export const types = {
  cycling: "cycling",
  running: "running",
  downhill: "downhill",
  climbing: "climbing",
  bliss: "bliss"
};

export const filterGroupsOnTypes = club => {
  if (!club) return allGroups;
  return Object.keys(allGroups).filter(group =>
    allGroups[group].types.every(
      type => !club.types || club.types.includes(type)
    )
  );
};

const emojis = {
  [types.cycling]: "🚴🏼‍♂️",
  [types.running]: "🏃🏻‍♂️",
  [types.downhill]: " ⬇️ 😵",
  [types.climbing]: " 🗻",
  [types.bliss]: ""
};

export const getEmojis = groupId =>
  allGroups[groupId] && allGroups[groupId].types.map(x => emojis[x]).join(" ");

export const allGroups = {
  klatrekongen: {
    navn: "Klatrekongen",
    types: [types.cycling, types.climbing]
  },
  bml: {
    navn: "Breaking Marathon Limits",
    types: [types.running]
  },
  lopekongen: {
    navn: "Løpekongen",
    types: [types.running]
  },
  "klatrekongen-vest": {
    navn: "Klatrekongen Vest",
    types: [types.cycling, types.climbing]
  },
  "klatrekongen-ost": {
    navn: "Klatrekongen Øst",
    types: [types.cycling, types.climbing]
  },
  tempokongen: {
    navn: "Tempokongen",
    types: [types.cycling]
  },
  utforkongen: {
    navn: "Utforkongen",
    types: [types.cycling, types.downhill]
  },
  tryvanndobbelen: {
    navn: "Tryvanndobbel",
    types: [types.cycling, types.running, types.climbing]
  },
  allroundern: {
    navn: "Allrounder'n",
    types: [types.cycling, types.running]
  },
  bliss: {
    navn: "Bliss",
    types: [types.running, types.bliss]
  },
  "nurc-trondheim": {
    navn: "NURC Trondheim",
    types: [types.running]
  }
};
