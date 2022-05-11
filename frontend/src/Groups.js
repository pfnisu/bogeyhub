import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const Groups = (props) => {
    let tables = props.groups.map((grp, idx) => {
        return (
            <>
                <p>Group {idx + 1}</p>
                <table>
                    <tbody>
                        <tr className='score'>
                            <td>Start order</td>
                            <td>Player</td>
                        </tr>
                            {grp.map((user, idx) =>
                                <tr className='score'>
                                    <td>{idx + 1}</td><td>{user.name}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </>
        );
    });
    return (
        <>{tables}</>
    );
};
