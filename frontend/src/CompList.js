import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';

const path = 'competition';
const uri = 'http://localhost:8080/';

export const CompList = () => {
    const [competitions, setCompetitions] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            let resp = await fetch(uri + path);
            console.log(resp);
            let json = await resp.json();
            console.log(json);
            setCompetitions([...json]);
        })();
    }, []);

    return (
        <>
            <h1>Competitions</h1>
            <ul>
                {competitions.map(c => <li key={c.id}>{c.name}, {c.date}</li>)}
            </ul>
        </>
    );
};
