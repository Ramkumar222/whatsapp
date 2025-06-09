import React, {  useState } from 'react';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const login = async () =>{
        try{
            const response = await fetch('https://whatsapp-clone-tzf0.onrender.com/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: form.email,
                userPassword: form.password
            }),
        });
        if(response.ok){
            const data = await response.json();
            if(data){
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userName', data.userName);
                if(localStorage.getItem('userId')!== null && localStorage.getItem('userName')!== null){
                window.location.href = '/chat';
            } else {
                setError(data.error || 'Login failed.');
            }
            }
        }
    }
        catch(err){
            setError('Network error. Please try again.');
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy validation
        if (!form.email || !form.password) {
            setError('Please enter both email and password.');
            return;
        }
        // TODO: Implement actual login logic here
        login();
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Login</h2>
                {error && <div style={styles.error}>{error}</div>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ece5dd',
    },
    form: {
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
    },
    input: {
        margin: '0.5rem 0',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        marginTop: '1rem',
        padding: '0.75rem',
        borderRadius: '4px',
        border: 'none',
        background: '#25d366',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
    },
};

export default Login;