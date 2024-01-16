import React from 'react';
import ReactDOM from 'react-dom';
import {Link, useParams} from 'react-router-dom';
import {ScoreTable} from './ScoreTable';
import {ScoreInput} from './ScoreInput';
import {Groups} from './Groups';
import {RegList} from './RegList';
import {request, str, path, focus} from './util';

// View a single competition
export const Competition = (props) => {
    // UI mode: results, registrations, groups, input
    const [ui, setUi] = React.useState('results');
    const [round, setRound] = React.useState({});
    const [groups, setGroups] = React.useState([]);
    const [group, setGroup] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const params = useParams();

    // GET competition and rounds data at component mount
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + params.compId);
            resp ?  props.setCompetition(resp) : props.setErr('Loading competition failed');
        })();
    }, []);

    // GET round data if phase is after registration
    React.useEffect(() => {
        document.title = props.competition.name + ' - ' + str.site;
        props.competition.phase_id > 2 && (async () => {
            props.setErr(null);
            let rnds = await request(path.comp + 'rounds/' + params.compId);
            // Only 1 round is supported currently
            rnds[0] ?  setRound(rnds[0]) : props.setErr('Round info not found');
        })();
    }, [props.competition]);

    // GET groups after round is loaded
    React.useEffect(() => {
        round.id && (async () => {
            let grps = await request(path.comp + 'groups/' + round.id);
            grps ? setGroups(grps) : props.setErr('Loading groups failed');
        })();
    }, [round]);

    // Find user's group
    // Score input is activated if user is in a group
    React.useEffect(() => {
        groups.length && (async () => {
            setGroup(groups.find((g, idx) => g.find(user => user.id === props.user.id)));
        })();
    }, [groups]);

    return (
        <>
            <h1>{props.competition.name}</h1>
            <button className='sel' onClick={(ev) => focus(ev, setUi('results'))}>
                &#9733; Results
            </button>
            <button onClick={(ev) => focus(ev, setUi('registrations'))}>
                &#119558; Registrations
            </button>
            <button onClick={(ev) => focus(ev, setUi('groups'))}>&#9776; Groups</button>
            {!!group?.length && props.competition.phase_id === 4 &&
                <button className='right' onClick={(ev) => focus(ev, setUi('input'))}>
                    &#9998; Input scores
                </button>
            }
            {ui === 'results' && round.id && <>
                <ScoreTable id={params.compId} user={props.user}
                    round={round} setHole={props.setHole}
                    results={results} setResults={setResults} setErr={props.setErr} />
            </>}
            {ui === 'registrations' && <>
                <RegList id={params.compId} setErr={props.setErr} />
            </>}
            {ui === 'groups' && <>
                <Groups groups={groups} setErr={props.setErr} />
            </>}
            {ui === 'input' && !!group?.length && <>
                <ScoreInput round={round} group={group}
                    hole={props.hole} setHole={props.setHole}
                    user={props.user} setErr={props.setErr} />
            </>}
        </>
    );
};
