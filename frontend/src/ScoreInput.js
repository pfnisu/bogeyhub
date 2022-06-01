import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request, path, check} from './util';

// Group-specific score input for a round
export const ScoreInput = (props) => {
    const params = useParams();

    // PUT scores and advance to next hole
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

        // PUT data to backend
        let resp = await request(path.user + 'score/' + props.round.id, 'PUT', data);

        if (resp) {
            props.setHole(state => {
                let idx = ++state.index;
                // Wrap to first hole after last
                if (idx >= props.round.holes.length) idx = 0;
                // Clear inputs and focus first
                inputs.forEach(i => i.value = '');
                inputs[0].focus();
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
        props.setErr(null);
        let inputs = document.querySelectorAll('input');
        props.setHole(state => {
            let idx = --state.index;
            // Wrap to last hole after first
            if (idx < 0) idx = props.round.holes.length - 1;
            // Clear inputs and focus first
            inputs[0].focus();
            return {
                index: idx,
                roundId: state.roundId,
                ...props.round.holes[idx],
            };
        });
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
            <p>&#9873; {props.round.course}: hole {props.hole.name}, par {props.hole.par}, {props.hole.meters}m</p>
            <form onSubmit={e => e.preventDefault()}>
                {form}
                <button onClick={(ev) => prev(ev)}>&#171; Prev hole</button>
                <button onClick={(ev) => next(ev)}>Next hole &#187;</button>
            </form>
        </>
    );
};
