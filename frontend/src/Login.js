import React from 'react';
import ReactDOM from 'react-dom';
import {request} from './index';

export const Login = (props) => {
    // UI mode: login, create
    const [ui, setUi] = React.useState('login');
    const userRef = React.createRef();
    const pwRef = React.createRef();
    const repwRef = React.createRef();
    const sexRef = React.createRef();
    const ageRef = React.createRef();

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

    // POST new account
    const createAccount = async () => {
        userRef.current.classList.remove('error');
        pwRef.current.classList.remove('error');
        repwRef.current.classList.remove('error');
        // Username can't be empty
        if (!userRef.current.value) {
            userRef.current.value = '';
            userRef.current.classList.add('error');
            return false;
        }
        // Passwords have to match and can't be empty
        if (pwRef.current.value === '' ||
            pwRef.current.value !== repwRef.current.value) {
            repwRef.current.value = '';
            pwRef.current.classList.add('error');
            repwRef.current.classList.add('error');
            return false;
        }
        let credentials = {
            user: userRef.current.value,
            password: pwRef.current.value,
        };
        // POST data to backend
        console.log(props.path);
        console.log(credentials);
        //await request(path, credentials);

        // Login as the created user and re-set ui
        props.setUser(credentials.user);
        setUi('login');
    }

    // Update user data
    const update = async () => {
    }

    return (
        <>
            {ui === 'login' && <>
                {props.user === '' && <>
                    <h1>Login</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <input ref={userRef} type='text' placeholder='User name' />
                        <input ref={pwRef} type='password' placeholder='Password' />
                        <button onClick={() => login()}>Login</button>
                        <button onClick={() => setUi('create')}>Create account</button>
                    </form>
                </>}
                {props.user !== '' && <>
                    <h1>User profile: {props.user}</h1>
                    <button className='right' onClick={() => login()}>Logout</button>
                    <p>User id:</p>
                    <p>Age:</p>
                    <p>Sex:</p>
                    <h2>Change your profile settings</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <input ref={userRef} type='text' placeholder='Change user name' />
                        <input ref={pwRef} type='password' placeholder='Change password' />
                        <input type='password' placeholder='Re-type new password' />
                        <input ref={ageRef} type='number' placeholder='Age' />
                        <select ref={sexRef} defaultValue=''>
                            <option value=''>Sex</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <button onClick={() => update()}>Save changes</button>
                    </form>
                </>}
            </>}
            {ui === 'create' && <>
                <h1>Create account</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <input ref={userRef} type='text' placeholder='User name' />
                    <input ref={pwRef} type='password' placeholder='Password' />
                    <input ref={repwRef} type='password' placeholder='Re-type password' />
                    <button onClick={() => createAccount()}>Create account</button>
                    <button onClick={() => setUi('login')}>Cancel</button>
                </form>
            </>}
        </>
    );
};
