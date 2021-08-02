import { Badge } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card'
import './Trending.css'
import CustomPagination from '../../Pagination/Pagination'

const Trending = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    // Fetch API
    const fetchAPI = async () => {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        )

        // Promise
        setData(data.results)
        setNumOfPages(data.total_pages)
    }

    
    useEffect(() => {
        fetchAPI()
        // eslint-disable-next-line
    }, [page]) 

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {                               // {} check condition: have data and display Card
                    data && data.map(c => ( 
                        <Badge key={c.id} badgeContent={c.vote_average} color={c.vote_average >= 7 ? 'primary' : 'secondary'}>
                            <Card
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name} // title for movie and name for TVSeries
                                date={c.first_air_date || c.release_date} // Same
                                media_type={c.media_type}
                                vote_average={c.vote_average}
                            />
                        </Badge>
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} numberOfPages={numOfPages}/>
        </div>
    )
}

export default Trending
