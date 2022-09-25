import { useState } from 'react'

export default function Login() {

    const [ credentials, setCredentials ] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch(`/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        if(res.status === 200) {
            
        }
    }

    return (
        <form action='/user/login' method='post'>
            <div>
                <label for='email'>Email</label>
                <input 
                    type='email' 
                    required
                    name='email'
                    id='email'
                    value={credentials.email}
                    onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                />
                <label for='password'>Password</label>
                <input 
                    type='password' 
                    required
                    name='password'
                    id='password'
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                />
            </div>
            <input type='submit' value='login'/>
        </form>
    )
}