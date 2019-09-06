import queryString from "query-string";
import snoowrap from "snoowrap";
import {useState} from "react";
import React from "react";

const r = new snoowrap({
    userAgent: navigator.userAgent,
    clientId: 'nwiOupyNLyAOpQ',
    clientSecret: 'XyCCPFWCmMUd7GuGNgbZuooCwgQ',
    username: 'Jaco__',
    password: 'Jacoboy123'
  });


const Reddit = (props) => {
    

    const values = queryString.parse(props.location.pathname);
    // const clientId = values["/id"];
    // const secret= values["secret"];

    const [hot,setHot] = useState([]);

    r.getHot().map(post => post.title).then(h => setHot(h));

    const p = "r/me_irl/about";


    return (
        hot.map( x => <p> {x} </p>)
    );
}

export default Reddit;


