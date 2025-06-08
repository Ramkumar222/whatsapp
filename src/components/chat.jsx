import React, { useEffect, useState } from 'react';
import SaveContact from './savecontact';

const contactsData = [
    { id: 1, name: 'Alice', avatar: '🧑‍🦰' },
    { id: 2, name: 'Bob', avatar: '🧑‍🦱' },
    { id: 3, name: 'Charlie', avatar: '🧑‍🦳' },
    { id: 3, name: 'John', avatar: '🧑‍🦳' },
];

const initialMessages = {
    1: [{ from: 'Alice', text: 'Hi there!' }],
    2: [{ from: 'Bob', text: 'Hello!' }],
    3: [{ from: 'Charlie', text: 'Hey!' }],
};

export default function Chat() {
    const [savedContacts, setSavedContacts] = useState([]);
    const [contacts] = useState(contactsData);
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [saveContact, setSaveContact] = useState(false);

    useEffect(() => {
        
            
            getcontacts();
        
    },[]);

    const getcontacts = async () => {
        const response = await fetch('https://whatsapp-clone-tzf0.onrender.com/user/getContacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setSavedContacts(data);
            console.log(data);
        } else {
            console.error('Failed to fetch contacts');
        }
    }

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/';
    };
    
    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const model =(e)=>{
        setSaveContact(e);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => ({
            ...prev,
            [selectedContact.id]: [
                ...(prev[selectedContact.id] || []),
                { from: 'You', text: input },
            ],
        }));
        setInput('');
    };

    return (
        <div style={{ display: 'flex', height: '500px', border: '1px solid #ccc' }}>
            {/* Contacts List */}
            <div style={{ width: '200px', borderRight: '1px solid #eee', overflowY: 'auto' }}>
                <h1>Hi {localStorage.getItem('userName')}</h1>
                <h3 style={{ textAlign: 'center' }}>Contacts</h3>
                <button  type="button" class="btn btn-primary" onClick={(e)=>{setSaveContact(e)}}>add contact</button>
                 <button  type="button" class="btn btn-primary" onClick={(e)=>{logout()}}>logout</button>
                {saveContact && <SaveContact model={model}>save contact</SaveContact>}
                {console.log(localStorage.getItem('userId'))}
                {savedContacts.map((contact) => (
                    <div
                        key={contact.userId}
                        onClick={() => handleContactClick(contact)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            background: selectedContact.userId === contact.userId ? '#f0f0f0' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontSize: '1.5em', marginRight: '10px' }}>{'🧑‍🦰' }</span>
                        {contact.userName}
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                    <strong>{selectedContact.name}</strong>
                </div>
                <div style={{ flex: 1, padding: '10px', overflowY: 'auto', background: '#fff' }}>
                    {(messages[selectedContact.id] || []).map((msg, idx) => (
                        <div key={idx} style={{ marginBottom: '8px' }}>
                            <span style={{ fontWeight: msg.from === 'You' ? 'bold' : 'normal' }}>
                                {msg.from}:
                            </span>{' '}
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', borderTop: '1px solid #eee', padding: '10px', background: '#fafafa' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ flex: 1, marginRight: '10px', padding: '8px' }}
                        placeholder="Type a message..."
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                    />
                    <button onClick={handleSend} style={{ padding: '8px 16px' }}>Send</button>
                </div>
            </div>
        </div>
    );
}