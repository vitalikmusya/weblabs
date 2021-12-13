import React, { useState } from 'react'
import Select from 'react-select'

const SortOrderSelect = ({ reverseItems }) => {
    const options = [
        {
          value: 'asc',
          label: 'in ascending order'
        },
        {
          value: 'desc',
          label: 'in descending order'
        }
    ]

    return (
        <Select className='select right'
            placeholder={'in ascending order'}
            options={options}
            onChange={reverseItems}
        />
    )
}

export default SortOrderSelect
