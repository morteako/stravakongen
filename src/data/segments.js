

export const cyclingSegments = {
    1942901 :  {
        id: 1942901,
        name: "Tryvann"
    },
    4252879: {
        id: 4252879,
        name: "Olaf Bulls vei"
    },
    660072: {
        id: 660072,
        name: "Grefsenkollen"
    }
};

export const runningSegments = {
    2783427 : {
        id: 2783427,
        name: "Sognsvann motsols, strand til strand"
    },
    10100312: {
        id:10100312,
        name:"Sognsvann-Ullevålseter"
    },
    2553283: {
        id:2553283,
        name:"Tour de Finance løp"
    },
    1557103 : {
        id:1557103,
        name:"Vettakollen opp langs eggen 2"
    }
};


Object.values(runningSegments).forEach( x => x.activityType = "running");
Object.values(cyclingSegments).forEach( x => x.activityType = "cycling");

export const allSegments = {...runningSegments,...cyclingSegments};

