import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';

export const ScoreTable = (props) => {
    const [results, setResults] = React.useState([]);

    // GET results for compId
    React.useEffect(() => {
        (async () => {
            let resp = await fetch(props.path + 'result/' + props.id);
            let json = await resp.json();
            setResults(json);
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
