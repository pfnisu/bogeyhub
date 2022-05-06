import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request, path} from './util';

export const ScoreInput = (props) => {
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + params.compId);
            resp ? setCompetition(resp) : props.setErr('Loading competition failed');
        })();
    }, []);
    return (
        <>
            <h2>Score input</h2>
        </>
    );
};
