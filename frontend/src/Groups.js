import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const Groups = (props) => {
    let table = props.groups.map((grp, idx) => {
        return (
            <tr key={idx} className='score'>
                <td>{grp.start_position}</td><td>{grp.user}</td>
            </tr>
        );
    });
    return (
        <table>
            <tbody>
                <tr className='score'>
                    <td>Start order</td>
                    <td>Player</td>
                </tr>
                {table}
            </tbody>
        </table>
    );
};
