import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useParams} from 'react-router-dom';
import {ScoreTable} from './ScoreTable';
import {request} from './index';

export const Competition = (props) => {
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
            <Link to={'input/'}>
                <button>Input scores</button>
            </Link>
            <Link to={'groups/'}>
                <button>View groups</button>
            </Link>
            <ScoreTable path={props.path} id={params.compId} />
        </>
    );
};
