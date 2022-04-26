import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request} from './index';

export const ScoreInput = (props) => {
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            let resp = await fetch(props.path + params.compId);
            let json = await resp.json();
            setCompetition(json);
        })();
    }, []);
    return (
        <>
            <h1>{competition.name}</h1>
        </>
    );
};
