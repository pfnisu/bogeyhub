import React from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';
import {request} from './index';

export const Groups = (props) => {
    const [groups, setGroups] = React.useState([]);
    const params = useParams();

    // GET groups for compId
    React.useEffect(() => {
        (async () => {
            let resp = await request(props.path + 'group/' + params.compId);
            setGroups(resp);
        })();
    }, []);

    let table = groups.map((grp, idx) => {
        return (
            <tr key={idx} className='score'>
                <td>{grp.start_position}</td><td>{grp.user}</td>
            </tr>
        );
    });
    return (
        <table>
            <tbody>{table}</tbody>
        </table>
    );
};
