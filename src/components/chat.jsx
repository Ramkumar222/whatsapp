import React, { useEffect, useState } from 'react';
import SaveContact from './savecontact';
import Window from './Window';




export default function Chat() {
    const [savedContacts, setSavedContacts] = useState([]);
    const [chatId, setChatId] = useState('');
    const [saveContact, setSaveContact] = useState(false);
    const [msgmodel, setmsgModel] = useState(false);

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
        } else {
            console.error('Failed to fetch contacts');
        }
    }
  
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/';
    };
    
    const handleContactClick = (e,contact) => {
        setmsgModel(!e);
        const userId = localStorage.getItem('userId').toString();
        const contactId = contact.userId.toString();
        localStorage.setItem('receiverId', contact.userId);
        const finalchatId=[userId,contactId].sort();
        setChatId(finalchatId[0]+ finalchatId[1]);
        setmsgModel(e);
    };

    const model =(e)=>{
        setSaveContact(e);
    };

    // const handleSend = () => {
    //     if (!input.trim()) return;
    //     setMessages((prev) => ({
    //         ...prev,
    //         [selectedContact.id]: [
    //             ...(prev[selectedContact.id] || []),
    //             { from: 'You', text: input },
    //         ],
    //     }));
    //     setInput('');
    // };

    return (
        <div style={{ display: 'flex', height: '650px', border: '1px solid #ccc' }}>
            {/* Contacts List */}
            <div style={{ width: '300px', borderRight: '1px solid #eee', overflowY: 'auto' }}>
                <h1>Hi {localStorage.getItem('userName')}</h1>
                <h3 style={{ textAlign: 'center' }}>Contacts</h3>
                <button  type="button" class="btn btn-primary" onClick={(e)=>{setSaveContact(e)}}>add contact</button>
                 <button  type="button" class="btn btn-primary" onClick={(e)=>{logout()}}>logout</button>
                {saveContact && <SaveContact model={model}>save contact</SaveContact>}
                {savedContacts.map((contact) => (
                    <div
                        key={contact.userId}
                        onClick={(e) => {handleContactClick(e,contact)}}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
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
            {/* <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            </div> */}

            {msgmodel && <Window chatId={chatId} />}
        </div>
    );
}