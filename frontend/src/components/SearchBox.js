import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline><i className="fa fa-search" aria-hidden="true"></i>
            <Form.Control
                type='text'
                autoComplete='off'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
                style={{ backgroundColor: 'transparent', width: '200px' }}
            ></Form.Control>
        </Form>
    )
}

export default SearchBox
