import React from 'react';
import ReactDOM from 'react-dom';

export const Register = (props) => {
    return (
        <>
            <button>Register</button>
            <button>View info</button>
            <h2>{props.comp.name}</h2>
            <span>
                {new Date(props.comp.start_date).toJSON().split('T')[0]}
                {props.comp.end_date
                    ?  " - " + new Date(props.comp.end_date).toJSON().split('T')[0]
                    : ""}
                , {props.comp.venue}
                , {props.comp.phase}
            </span>
        </>
    );
};
