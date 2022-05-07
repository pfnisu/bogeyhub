import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useParams} from 'react-router-dom';
import {ScoreTable} from './ScoreTable';
import {ScoreInput} from './ScoreInput';
import {Groups} from './Groups';
import {RegList} from './RegList';
import {request, path, focus} from './util';

export const Competition = (props) => {
    // UI mode: results, registrations, groups, input
    const [ui, setUi] = React.useState('results');
    const [competition, setCompetition] = React.useState({});
    const params = useParams();

    // GET competition with compId from backend at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + params.compId);
            resp ?  setCompetition(resp) : props.setErr('Loading competition failed');
        })();
    }, []);

    return (
        <>
            <h1>{competition.name}</h1>
            <button className='sel' onClick={(ev) => focus(ev, setUi('results'))}>
                &#9733; Results
            </button>
            <button onClick={(ev) => focus(ev, setUi('registrations'))}>
                &#119558; Registrations
            </button>
            <button onClick={(ev) => focus(ev, setUi('groups'))}>&#9776; Groups</button>
            {props.user.name !== '' &&
                <button className='right' onClick={(ev) => focus(ev, setUi('input'))}>
                    &#9998; Input scores
                </button>
            }
            {ui === 'results' && <>
                <ScoreTable id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'registrations' && <>
                <RegList id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'groups' && <>
                <Groups id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'input' && <>
                <ScoreInput id={params.compId} user={props.user} setErr={props.setErr} />
            </>}
        </>
    );
};
