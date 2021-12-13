import React from 'react'
import SearchInput from './SearchInput'
import SortOrderSelect from './SortOrderSelect'
import SortParameterSelect from './SortParameterSelect'

const Filters = ({ reverseItems, sortItems, searchItems }) => {
    return (
        <div className='filters'>
            <div className='search'>
                <label className='search-lbl'>Search</label>
                <SearchInput searchItems={searchItems} />
            </div>
            <div className='sort'>
                <label className='sort-lbl'>Sort by</label>
                <SortParameterSelect sortItems={sortItems} />
                <SortOrderSelect reverseItems={reverseItems} />
            </div>
        </div>
    )
}

export default Filters
