import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {CreateComp} from './CreateComp';
import {CompList} from './CompList';
import './index.css';

const uri = 'http://localhost:8080/';
export const request = async (resource, data, method = 'POST') => {
    try {
        let resp = await fetch(uri + resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(resp);
        return resp;
    } catch(e) {
        console.log('DB update failed.');
    }
}

const App = () => {

    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Disc golf scoring</NavLink>
                <NavLink to='/admin'>Admin</NavLink>
            </nav>
            <main>
                <Routes>
                    <Route path='/' element={<CompList/>} />
                    <Route path='admin/*' element={<CreateComp/>} />
                    <Route path='*' element={<h1>Invalid url</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
