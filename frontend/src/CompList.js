import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';
import {Register} from './Register';

const path = 'competition';
const uri = 'http://localhost:8080/';

export const CompList = () => {
    const [competitions, setCompetitions] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            let resp = await fetch(uri + path);
            let json = await resp.json();
            setCompetitions([...json]);
        })();
    }, []);

    return (
        <>
            <h1>Competitions</h1>
            <ul>
                {competitions.map(c => <Register comp={c} key={c.id} />)}
            </ul>
        </>
    );
};
