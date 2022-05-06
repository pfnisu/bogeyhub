import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const ScoreTable = (props) => {
    const [results, setResults] = React.useState([]);

    // GET results for compId
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + 'result/' + props.id);
            resp ? setResults(resp) : props.setErr('Loading results failed');
        })();
    }, []);

    let table = results.map((row, idx) => {
        let total = row.scores.reduce((s, sum) => sum += s);
        let relative = total - row.scores.length * 3;
        return (
            <tr key={idx} className='score'>
                <td>{row.user}</td>
                {row.scores.map((s, idx) => <td key={idx}>{s}</td>)}
                <td>{total}</td>
                <td className={relative < 0 ? 'important' : 'normal'}>
                    {relative}
                </td>
            </tr>
        );
    });
    return (
        <table>
            <tbody>{table}</tbody>
        </table>
    );
};
