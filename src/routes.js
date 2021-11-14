import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/Logon';
import Lists from './pages/Lists';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/lists' exact component={Lists} />
            </Switch>
        </BrowserRouter>
    );
}