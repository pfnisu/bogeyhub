import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {request, path} from './index';

// List of registered users for a competition
export const RegList = (props) => {
    const [regs, setRegs] = React.useState([]);
    const params = useParams();

    // GET registrations for compId
    React.useEffect(() => {
        (async () => {
            props.setErr(null);
            let resp = await request(path.comp + 'registrations/' + params.compId);
            resp ? setRegs(resp) : props.setErr('Loading registrations failed');
        })();
    }, []);

    let table = regs.map((reg, idx) => {
        let date = reg.time.split('T')[0];
        let time = reg.time.split('T')[1].substr(0, 8);
        return (
            <tr key={idx} className='score'>
                <td>{idx + 1}</td><td>{reg.user}</td><td>{reg.division}</td><td>{date}</td><td>{time}</td>
            </tr>
        );
    });
    return (
        <table>
            <tbody>{table}</tbody>
        </table>
    );
};
