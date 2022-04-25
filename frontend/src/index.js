import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {CreateComp} from './CreateComp';
import {CompList} from './CompList';
import {Competition} from './Competition';
import {ScoreInput} from './ScoreInput';
import './index.css';

const uri = 'http://localhost:8080/';
export const request = async (resource, data, method = 'POST') => {
    try {
        let resp = await fetch(uri + resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
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
                    <Route path='/' element={<CompList path={uri + 'competition/'} />} />
                    <Route path='admin/*' element={<CreateComp/>} />
                    <Route path='competition/'>
                        <Route path=':compId' element={
                            <Competition path={uri + 'competition/'} />} />
                    </Route>
                    <Route path='input/'>
                        <Route path=':compId' element={
                            <ScoreInput path={uri + 'input/'} />} />
                    </Route>
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
