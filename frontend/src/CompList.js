import React from 'react';
import ReactDOM from 'react-dom';
import {Register} from './Register';
import {request} from './index';

export const CompList = (props) => {
    const [competitions, setCompetitions] = React.useState([]);

    // GET competitions from backend to state array at component mount
    React.useEffect(() => {
        (async () => {
            let resp = await request(props.path);
            setCompetitions([...resp]);
        })();
    }, []);

    return (
        <>
            <h1>Competitions</h1>
            <ul>
                {competitions.length === 0
                    ? <li>Loading...</li>
                    : competitions.map(c =>
                        <Register user={props.user} comp={c} key={c.id} />)}
            </ul>
        </>
    );
};
