import { useState } from 'react'

export default function Search(props){
    let [ search, setSearch ] = useState('')

    return (
        <form onSubmit={e => props.handleSearch(e, search)}>
            <input id='textinput' type='text' placeholder='Search Audix' onChange={e => setSearch(e.target.value)} />
        </form>
    )
}