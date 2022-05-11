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
    const [round, setRound] = React.useState({});
    const [groups, setGroups] = React.useState([]);
    const params = useParams();

    // GET competition and rounds data at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + params.compId);
            resp ?  setCompetition(resp) : props.setErr('Loading competition failed');
        })();
        (async () => {
            props.setErr(null);
            let rnds = await request(path.comp + 'rounds/' + params.compId);
            // Only 1 round is supported currently
            rnds[0] ?  setRound(rnds[0]) : props.setErr('Loading round info failed');
        })();
    }, []);

    // GET groups after round is loaded
    React.useEffect(() => {
        round.id && (async () => {
            let grps = await request(path.comp + 'groups/' + round.id);
            grps ? setGroups(grps) : props.setErr('Loading groups failed');
        })();
    }, [round]);

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
            {ui === 'results' && round.id && <>
                <ScoreTable id={params.compId} round={round} setErr={props.setErr} />
            </>}
            {ui === 'registrations' && <>
                <RegList id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'groups' && <>
                <Groups groups={groups} setErr={props.setErr} />
            </>}
            {ui === 'input' && <>
                <ScoreInput id={params.compId} groups={groups} user={props.user} setErr={props.setErr} />
            </>}
        </>
    );
};
