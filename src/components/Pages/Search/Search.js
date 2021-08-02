import { Button, Tab, Tabs } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import { TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './Search.css'
import axios from 'axios'
import { Badge } from '@material-ui/core'
import Card from '../../Card/Card'
import CustomPagination from '../../Pagination/Pagination'


const Search = () => {
    const [type, setType] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    // Fetch Search
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            )
            setData(data.results)
            setNumOfPages(data.total_pages)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
        // eslint-disable-next-line
    }, [type, page])

    return (
        <div>
            <div className='search'>
                <TextField
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="Search"
                    color="primary"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                    onClick={fetchSearch}
                    variant="contained"
                    style={{ marginLeft: 10 }}>
                    <SearchIcon fontSize="large" />
                </Button>
            </div>

            <Tabs
                value={type}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue)
                    setPage(1)
                }}
                style={{ paddingBottom: 5 }}
                aria-label="disabled tabs example">
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />
            </Tabs>

            <div className="trending">
                {
                    data && data.map(c => (
                        <Badge key={c.id} badgeContent={c.vote_average} color={c.vote_average >= 7 ? 'primary' : 'secondary'}>
                            <Card
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name} // title for movie and name for TVSeries
                                date={c.first_air_date || c.release_date} // Same
                                media_type={type ? 'tv' : 'movie'}
                                vote_average={c.vote_average}
                            />
                        </Badge>
                    ))
                }
                {
                    searchText && 
                    !data && 
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Search
