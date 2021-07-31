import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card'
import './Trending.css'

const Trending = () => {
    // const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    // Fetch API
    const fetchAPI = async () => {
        let {data} = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
            )
 
        // Promise
        setData(data.results)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    data && data.map(c => (
                        <Card 
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name} // title for movie and name for TVSeries
                            date={c.first_air_date || c.release_date} // Same
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Trending
