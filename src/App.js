import React from 'react'
import './App.css'
import Header from './components/Header/Header';
import Bottom from './components/BottomNavigation/BottomNavigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Trending from './components/Pages/Trending/Trending'
import Movie from './components/Pages/Movies/Movie';
import TvSeries from './components/Pages/TvSeries/TvSeries';
import Search from './components/Pages/Search/Search';

function App() {

    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <Container>
                    <Switch>
                        <Route path="/" component={Trending} exact/>
                        <Route path="/movie" component={Movie}/>
                        <Route path="/tv" component={TvSeries}/>
                        <Route path="/search" component={Search}/>
                    </Switch>
                </Container>
            </div>
            <Bottom />
        </BrowserRouter>
    );
}

export default App;
