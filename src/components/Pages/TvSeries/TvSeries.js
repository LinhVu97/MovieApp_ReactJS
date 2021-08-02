import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge } from '@material-ui/core'
import Card from '../../Card/Card'
import CustomPagination from '../../Pagination/Pagination'
import Genres from '../../Genres/Genres'
import useGenres from '../../../hooks/useGener'
import './TvSeries.css'

const TVSeries = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const genreForURL = useGenres(selectedGenres)

    // Fetch API Movie
    const fetchAPI = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
        )
        setData(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchAPI()
        // eslint-disable-next-line
    }, [page, genreForURL])

    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <Genres
                type='tv'
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
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
                                media_type="tv"
                                vote_average={c.vote_average}
                            />
                        </Badge>
                    ))
                }
            </div>

            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOfPages={numOfPages} />
            )}
        </div>
    )
}

export default TVSeries
