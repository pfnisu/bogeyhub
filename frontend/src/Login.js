import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';

export const Login = (props) => {
    const userRef = React.createRef();
    const pwRef = React.createRef();

    // Try to login with given credentials
    const login = async () => {
        let credentials = {
            // Optional chaining for logout
            user: userRef?.current?.value || '',
            password: pwRef?.current?.value || '',
        };
        // POST data to backend
        //await request(path, credentials);
        props.setUser(credentials.user);
    }

    return (
        <>
            {props.user === '' && <>
                <h1>Login</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <input ref={userRef} type="text" placeholder="User name" />
                    <input ref={pwRef} type="password" placeholder="Password" />
                    <button onClick={() => login()}>Login</button>
                </form>
            </>}
            {props.user !== '' && <>
                <h1>User profile: {props.user}</h1>
                <button onClick={() => login()}>Logout</button>
            </>}
        </>
    );
};
