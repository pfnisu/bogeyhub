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
            let resp = await request(props.path + params.compId);
            setCompetition(resp);
        })();
    }, []);
    return (
        <>
            <h2>Score input</h2>
        </>
    );
};
