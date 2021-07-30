import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import './BottomNavigation.css';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

// Inline styling with material UI
const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#2d313a',
        zIndex: 100
    },
});

const Bottom = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory();

    useEffect(() => {
        switch (value) {
            case 1: 
                history.push('/movie')
                break
            case 2: 
                history.push('/tv')
                break
            case 3: 
                history.push('/search')
                break
            default:
                history.push('/')
                break
        }
    }, [value, history])

    // Handle Change
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}>

            <BottomNavigationAction
                style={{ color: "white" }}
                label="Trending"
                icon={<WhatshotIcon />}
            />

            <BottomNavigationAction 
                label="Movies" 
                icon={<MovieIcon />}
                style={{ color: "white" }}
            />
            
            <BottomNavigationAction 
                label="TV Series" 
                icon={<TvIcon />} 
                style={{ color: "white" }}
            />

            <BottomNavigationAction 
                label="Search" 
                icon={<SearchIcon />} 
                style={{ color: "white" }}
            />
        </BottomNavigation>
    );
}

export default Bottom