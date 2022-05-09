import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const ScoreTable = (props) => {
    const [results, setResults] = React.useState([]);
    const [par, setPar] = React.useState(0);

    // GET results for compId
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            // Calculate round par only once
            setPar(props.round.pars.reduce((s, sum) => sum += s));
            let resp = await request(path.comp + 'result/' + props.id);
            resp ? setResults(resp) : props.setErr('Loading results failed');
        })();
    }, []);

    let table = results.map((row, idx) => {
        let total = row.scores.reduce((s, sum) => sum += s);
        // Use pars for rest of the round to calculate +/- for incomplete round
        let relative = props.round.pars
            .slice(row.scores.length)
            .reduce((s, sum) => sum += s, total - par);

        // Null-pad incomplete scores
        while (row.scores.length < props.round.holes.length) row.scores.push(null);

        return (
            <tr key={idx} className='score'>
                <td>{row.user}</td>
                {row.scores.map((s, idx) =>
                    // Highlight scores under par
                    <td className={s && s < props.round.pars[idx] ? 'important' : ''}
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
                        {props.round.holes.map((h, idx) => <td key={idx}>{h}</td>)}
                        <td>&#8721;</td>
                        <td>+/-</td>
                    </tr>
                    {table}
                </tbody>
            </table>
        </>
    );
};
