import React from 'react'

const SearchInput = ({ searchItems }) => {
    
    return (
        <input type='search' onChange={e => searchItems(e.target.value)}>               
        </input>
    )
}

export default SearchInput
