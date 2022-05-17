import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const ScoreTable = (props) => {
    const [par, setPar] = React.useState(0);

    // GET results for compId
    React.useEffect(() => {
        // Calculate round par only once
        setPar(props.round.holes.reduce((sum, h) => sum += h.par, 0));
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + 'result/' + props.id);
            resp ? props.setResults(resp) : props.setErr('Loading results failed');

            // Set current hole based on already inputted scores
            props.setHole(state => {
                let idx = 0;
                // Check score data to determine hole
                resp && resp.forEach(row => {
                    if (row.user.id === props.user.id) {
                        idx = row.scores.length;
                        // Wrap to first hole after last
                        if (idx >= props.round.holes.length) idx = 0;
                    }
                });
                return {
                    index: idx,
                    roundId: state.roundId,
                    ...props.round.holes[idx],
                };
            });
        })();
    }, []);

    let table = [...props.results];
    // Sort results by total score
    table.sort((a, b) =>
        a.scores.reduce((sum, s) => sum += s) >
            b.scores.reduce((sum, s) => sum += s)
    );

    // Generate results table from score rows
    table = table.map((row, idx) => {
        let total = row.scores.reduce((sum, s) => sum += s);
        // Use pars for rest of the round to calculate +/- for incomplete round
        let relative = props.round.holes
            .slice(row.scores.filter(score => score).length)
            .reduce((sum, h) => sum += h.par, total - par);

        // Null-pad incomplete scores
        while (row.scores.length < props.round.holes.length) row.scores.push(null);

        return (
            <tr key={idx} className='score'>
                <td>{row.user.name}</td>
                {row.scores.map((s, idx) =>
                    // Highlight scores under par
                    <td className={s && s < props.round.holes[idx].par ? 'important' : ''}
                        key={idx}>{s}</td>)}
                <td>{total}</td>
                <td className={relative < 0 ? 'important' : 'normal'}>
                    {relative}
                </td>
            </tr>
        );
    });

    return (
        <>
            <p>&#9873; {props.round.course}, par {par}</p>
            <table>
                <tbody>
                    <tr className='score'>
                        <td>Player</td>
                        {props.round.holes.map((h, idx) => <td key={idx}>{h.name}</td>)}
                        <td>&#8721;</td>
                        <td>+/-</td>
                    </tr>
                    {table}
                </tbody>
            </table>
        </>
    );
};
