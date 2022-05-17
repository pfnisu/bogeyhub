import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const Groups = (props) => {
    let tables = props.groups.map((grp, idx) => {
        return (
            <div key={idx}>
                <p>&#9776; Group {idx + 1}</p>
                <table>
                    <thead>
                        <tr className='score'>
                            <td>Start order</td>
                            <td>Player</td>
                        </tr>
                    </thead>
                    <tbody>
                        {grp.map((user, idx) =>
                            <tr className='score' key={idx}>
                                <td>{idx + 1}</td><td>{user.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    });
    return (
        <>{tables}</>
    );
};
