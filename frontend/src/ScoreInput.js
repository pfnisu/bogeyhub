import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request, path, check} from './util';

export const ScoreInput = (props) => {
    const params = useParams();

    // POST scores and advance to next hole
    const next = async (ev) => {
        props.setErr(null);
        let inputs = document.querySelectorAll('input');
        let data = [];
        // Push all groups scores to data
        for (let i = 0; i<inputs.length; i++) {
            // Hack to work around refs
            if (!check({current: inputs[i]})) return false;
            data.push({
                result: inputs[i].value,
                hole_id: props.hole.id,
                user_id: props.group[i].id,
            });
        }

        // POST data to backend
        let resp = await request(path.user + 'score/' + props.round.id, 'POST', data);

        if (resp) {
            props.setHole(state => {
                let idx = ++state.index;
                // Wrap to first hole after last
                if (idx >= props.round.holes.length) idx = 0;
                // Clear inputs
                inputs.forEach(i => i.value = '');
                return {
                    index: idx,
                    roundId: state.roundId,
                    ...props.round.holes[idx],
                };
            });
        } else props.setErr('Failed to save scores');
    };

    // Return to previous hole
    const prev = (ev) => {
    };

    let form = props.group.map((user, idx) =>
        <span className="score" key={idx}>
            <label>{user.name}</label>
            <input type='number' />
        </span>
    );

    // Set focus to first input
    React.useEffect(() => {
        document.querySelector('input').focus();
    }, []);

    return (
        <>
            <p>&#9873; {props.round.course}: hole {props.hole.name}, par {props.hole.par}</p>
            <form onSubmit={e => e.preventDefault()}>
                {form}
                <button onClick={(ev) => prev(ev)}>&#171; Prev hole</button>
                <button onClick={(ev) => next(ev)}>Next hole &#187;</button>
            </form>
        </>
    );
};
