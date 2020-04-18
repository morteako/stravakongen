
import ReactGA from 'react-ga';


export const changeClub = club => {
    ReactGA.event({
        category: "Club",
        action: "Changed club",
        label: club.name
    })
}

export const changeSegmentGroup = groupSlug => {
    ReactGA.event({
        category: "Segment group",
        action: "Changed group",
        label: groupSlug
    })
}

export const changePeriod = periodName => {
    ReactGA.event({
        category: "Period",
        action: "Changed period",
        label: periodName
    })
}

export const changeSorting = sortingName => {
    ReactGA.event({
        category: "Sorting",
        action: "Changed sorting",
        label: sortingName
    })
}