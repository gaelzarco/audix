import { useState } from 'react'

export default function Dropdown(props) {

    const [ selectedValue, setSelectedValue ] = useState('')

    return (
        <div>
            <select value={selectedValue} onChange = {e => selectedValue(e.target.value)}>
                {props.options.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
            </select>
            <p>{selectedValue}</p>
        </div>
    )
}