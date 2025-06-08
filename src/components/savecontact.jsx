import React, { useState } from 'react';

const SaveContact = ({model}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSave = async() => {
         
         try{
            const response = await fetch('https://whatsapp-clone-tzf0.onrender.com/user/saveContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                userEmail: email
            }),
        });
        if(response.ok){
            
                setError('contact saved.');
                window.location.reload();
            } 
        else {
                setError('failed to save contact.');
            }
        }
        
        catch(err){
            setError('Network error. Please try again.');
        }
    };

    
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h3>Save Contact</h3>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                />
                {error && <div >{error}</div>}
                <div style={styles.buttonRow}>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                    <button onClick={(e)=>{model(!e)}} style={styles.cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    popup: {
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        minWidth: 300,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    input: {
        padding: 8,
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
        width: '100%',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
    },
    saveBtn: {
        background: '#25d366',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 4,
        cursor: 'pointer',
    },
    cancelBtn: {
        background: '#eee',
        color: '#333',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 4,
        cursor: 'pointer',
    },
};

export default SaveContact;