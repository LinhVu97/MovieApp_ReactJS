import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import './Pagination.css'

const CustomPagination = ({setPage, numberOfPages = 20}) => {
    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }

    return (
        <div className='pagination'>
            <Pagination 
                count={numberOfPages} 
                onChange={(e) => handlePageChange(e.target.textContent)} // Choose content in page
                hideNextButton
                hidePrevButton
                color='primary'
            />
        </div>
    )
}

export default CustomPagination
