import React, { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

function Window({chatId}) {
    const [getAllMessages,setAllMessages] =useState([]);
    const [messages, setMessages] = useState();
    const stompClientRef =useRef(null);
    const [update,setUpdate] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://whatsapp-clone-tzf0.onrender.com/chat/getAllMessages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ chatId: chatId }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllMessages(data);
                } else {
                    console.error('Failed to fetch messages');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        setTimeout(() => {
        fetchMessages();
            // const msgelement = document?.querySelector('.message');
            // (msgelement[msgelement.length])?.focus();
            // console.log('Messages fetched',msgelement[msgelement.length-1]);
        }, 1000);
    }, [chatId,update]);

    useEffect(() => {  
        const connection = new SockJS('https://whatsapp-clone-tzf0.onrender.com/ws');
    const stompClient = new Client({
        webSocketFactory: () => connection,
        debug: (str) => { console.log(str); },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log('Connected to WebSocket');
            const userId = localStorage.getItem('userId');
            stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
                const msg = JSON.parse(message.body);
                setAllMessages((prevMessages) => [...prevMessages, msg]);
            });
        },
        onStompError : (error) => {
        console.error('WebSocket error:', error);
    }
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
    return () => {
            stompClient.deactivate();
    }
    },[chatId]) 

   

    const sendmessage = (e,message) => {
        if (!message || !chatId) return;
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const receiverId = localStorage.getItem('receiverId');
        const msg = {
            chatId: chatId,
            senderName: userName,
            senderId: userId,
            receiverId: receiverId,
            messageValue: message,
           
        };
        
        stompClientRef.current.publish(
            { destination: '/app/chat', body: JSON.stringify(msg) }
        );
        setUpdate(message)
    }
    
console.log(getAllMessages);
  return (<>
  <div>
    <div className='msg-window' style={{height: '580px', overflowY: 'auto',width: '800px'}}>
      {getAllMessages.map((message, index) => (
        <div key={index} className='message'>
          <strong>{message.senderName}:</strong> {message.messageValue}
        </div>
      ))}
      
    </div>
    <div className='msg-input'style={{  marginTop:'565x',height: '80px',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
      <input style={{width:'750px'}}type='text' placeholder='Type a message...' value={messages} onChange={(e)=> setMessages(e.target.value)}/>
      <button onClick={(e) => sendmessage(e,messages)}>Send</button>
    </div>
    </div>
    </>
  )
}

export default Window