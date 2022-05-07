import React from 'react';
import ReactDOM from 'react-dom';
import {request, path} from './util';

export const Login = (props) => {
    // UI mode: login, create
    const [ui, setUi] = React.useState('login');
    const nameRef = React.createRef();
    const pwRef = React.createRef();
    const repwRef = React.createRef();
    const sexRef = React.createRef();
    const yearRef = React.createRef();

    // Try to login with given credentials
    const login = async () => {
        props.setErr(null);
        nameRef.current.classList.remove('error');
        pwRef.current.classList.remove('error');
        // Name and password can't be empty
        if (!nameRef.current.value) {
            nameRef.current.classList.add('error');
            return false;
        }
        if (!pwRef.current.value) {
            pwRef.current.classList.add('error');
            return false;
        }

        let credentials = {
            name: nameRef.current.value,
            password: pwRef.current.value,
        };
        // POST data to backend
        let resp = await request(path.user + 'login/', 'POST', credentials);
        // Set user to response value if success
        resp ? props.setUser(resp) : props.setErr('Login failed');
    }

    // Set user to empty
    const logout = async () => {
        props.setUser({
            name: '',
            id: null,
        });
    }

    // POST new account
    const createAccount = async () => {
        nameRef.current.classList.remove('error');
        pwRef.current.classList.remove('error');
        repwRef.current.classList.remove('error');
        // Username can't be empty
        if (!nameRef.current.value) {
            nameRef.current.value = '';
            nameRef.current.classList.add('error');
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
            name: nameRef.current.value,
            password: pwRef.current.value,
        };
        // POST data to backend
        let resp = await request(path.user + 'create/', 'POST', credentials);

        // Login as the created user and re-set ui
        resp ? props.setUser(resp) : props.setErr('Account creation failed');
        setUi('login');
    }

    // Update user data
    const update = async () => {
    }

    React.useEffect(() => { props.setErr(null) }, []);
    React.useEffect(() => { props.setErr(null) }, [ui]);

    return (
        <>
            {ui === 'login' && <>
                {props.user.name === '' && <>
                    <h1>Login</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <input ref={nameRef} type='text' placeholder='User name' autoFocus />
                        <input ref={pwRef} type='password' placeholder='Password' />
                        <button onClick={() => login()}>Login</button>
                    </form>
                    <h1>New user?</h1>
                    <form onSubmit={e => e.preventDefault()}>
                    <p>Create account</p>
                    <button className='right' onClick={() => setUi('create')}>Create account &#187;</button>
                    </form>
                </>}
                {props.user.name !== '' && <>
                    <h1>User profile: {props.user.name}</h1>
                    <button className='right' onClick={() => logout()}>Logout</button>
                    <p>User id: {props.user.id}</p>
                    <p>Age:</p>
                    <p>Sex:</p>
                    <h2>Change your profile settings</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <input ref={pwRef} type='password' placeholder='Change password' />
                        <input ref={repwRef} type='password' placeholder='Re-type new password' />
                        <input ref={yearRef} type='number' placeholder='Birth year' />
                        <select ref={sexRef} defaultValue=''>
                            <option value=''>Sex</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <button onClick={() => update()}>&#10003; Save changes</button>
                    </form>
                </>}
            </>}
            {ui === 'create' && <>
                <h1>Create account</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <input ref={nameRef} type='text' placeholder='User name' autoFocus />
                    <input ref={pwRef} type='password' placeholder='Password' />
                    <input ref={repwRef} type='password' placeholder='Re-type password' />
                    <button onClick={() => createAccount()}>&#10023; Create account</button>
                    <button onClick={() => setUi('login')}>&#171; Cancel</button>
                </form>
            </>}
        </>
    );
};
