import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './Register';
import {request} from './index';

export const CompList = (props) => {
    const [competitions, setCompetitions] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            let resp = await fetch(props.path);
            let json = await resp.json();
            setCompetitions([...json]);
        })();
    }, []);

    return (
        <>
            <h1>Competitions</h1>
            <ul>
                {competitions.length === 0
                    ? <li>Loading...</li>
                    : competitions.map(c => <Register comp={c} key={c.id} />)}
            </ul>
        </>
    );
};
