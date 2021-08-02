import { Chip } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Genres = ({ type, selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {
    // Add Genres
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => g.id !== genre.id)) // Remove genres have choice from selected genres
        setPage(1);
    }

    // Remove Genres
    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
          )
        setGenres([...genres, genre])
        setPage(1);
    }

    // Fetch API Genres 
    const fetchAPI = async () => {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )

        setGenres(data.genres)
    }

    useEffect(() => {
        fetchAPI()

        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: '6px 0' }}>
            {
                selectedGenres && selectedGenres.map(g => (
                    <Chip
                        key={g.id}
                        label={g.name}
                        style={{ margin: '2px' }}
                        size='small'
                        clickable
                        color='primary'
                        onDelete={() => handleRemove(g)}
                    />
                ))
            }

            {
                genres && genres.map(g => (
                    <Chip
                        key={g.id}
                        label={g.name}
                        style={{ margin: '2px' }}
                        size='small'
                        clickable
                        onClick={() => handleAdd(g)}
                    />
                ))
            }
        </div>
    )
}

export default Genres
