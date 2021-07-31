import React from 'react'
import './Card.css' 
import { img_300, unavailable } from '../config/config'

const Card = ({id, poster, title, date, media_type, vote_average}) => {
    return (
        <div className="media">
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
            <b className="title">{title}</b>
            <span className="subTitle">{media_type === 'tv' ? 'TV' : 'Movie'}
                <span className="subTitle">{date}</span>
            </span>
        </div>
    )
}

export default Card
