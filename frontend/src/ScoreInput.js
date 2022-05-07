import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request, path} from './util';

export const ScoreInput = (props) => {
    const [competition, setCompetition] = React.useState({});
    const params = useParams();
    const p1Ref = React.createRef();
    const p2Ref = React.createRef();
    const p3Ref = React.createRef();
    const p4Ref = React.createRef();

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
            <form onSubmit={e => e.preventDefault()}>
                <span className="score">
                    <label>{props.user.name}</label>
                    <input ref={p1Ref} type='number' autoFocus />
                </span>
                <span className="score">
                    <label>{props.user.name}</label>
                    <input ref={p2Ref} type='number' />
                </span>
                <span className="score">
                    <label>{props.user.name}</label>
                    <input ref={p3Ref} type='number' />
                </span>
                <span className="score">
                    <label>{props.user.name}</label>
                    <input ref={p4Ref} type='number' />
                </span>
                <button onClick={(ev) => prev(ev)}>&#171; Prev hole</button>
                <button onClick={(ev) => next(ev)}>Next hole &#187;</button>
            </form>
        </>
    );
};
