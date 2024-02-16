import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

export default function ChatMessenger() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [contactMessagesList, setContactMessagesList] = useState([]);
    const [awaitMessage, setAwaitMessage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState('');

    const getContactMessages = () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
  
        axios.get(baseUrl + '/chats', config).then((response) => {
            if(!response.data.data.length) {
                setAwaitMessage('There are no messages to show');
            }
            else {
                setContactMessagesList(response.data.data);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    const readMessages = (senderId, receiverId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(baseUrl + '/chat/' + senderId + '/' + receiverId, config).then((response) => {
            getContactMessages();
            setMessages(response.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    const showMessages = (messageObj) => {
        readMessages(userId, messageObj.contact_id);
        setSelectedMessage(messageObj);
    };

    const sendMessage = () => {
        if(message && message.length > 0) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const payload = {
                senderId: userId,
                receiverId: selectedMessage.contact_id,
                message
            };
    
            axios.post(baseUrl + '/chat', payload, config).then((response) => {
                getContactMessages();
                readMessages(userId, selectedMessage.contact_id);
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
        }
    };

    const handleContactSearch = (event) => {
        const searchContact = event.target.value;
        if(searchContact.length) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
            axios.get(baseUrl + '/users?search=' + searchContact, config).then((response) => {
                let users = response.data.data;
                let contactMsgsList = [];
                for (let i = 0; i < users.length; i++) {
                    contactMsgsList.push({
                        contact_id: users[i].id,
                        contact_name: users[i].name,
                        last_message_date: '',
                        last_message: '',
                        unread_count: 0
                    });
                }
                setContactMessagesList(contactMsgsList);
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
        }
    };

    useEffect(() => {
        setAwaitMessage('Loading Messages..');
        getContactMessages();
    }, []);

    return (
        <>
            <div className="container">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
                    <div className="px-4 relative w-full lg:w-4/12 mb-6">
                        <div className="flex flex-col justify-center bg-white border-0 shadow-lg rounded-lg relative min-w-0 break-words w-full max-h-screen-55">
                            <div className="bg-blueGray-200 rounded-t-lg">
                                <div className="my-4 mb-3 px-3 relative">
                                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                        <span className="z-10 h-full flex absolute text-center text-blueGray-300 text-sm items-center w-8 pl-3">
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <input
                                            placeholder="Search Contact"
                                            className="border-transparent shadow px-3 py-2 text-sm  w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 pl-10"
                                            onChange={handleContactSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex pl-0 mb-3 flex-col overflow-y-auto">
                                {contactMessagesList.length > 0 ? (contactMessagesList.map((contactMessage, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={"cursor-pointer mx-4 rounded-md relative block my-1 " + ((selectedMessage?.contact_id === contactMessage.contact_id) ? "bg-blueGray-800 text-white" : "bg-blueGray-200 text-blueGray-800")}
                                            onClick={() => showMessages(contactMessage)}
                                        >
                                            <div className="flex items-center p-3">
                                                <div className="flex-1">
                                                    <div className="justify-between items-center">
                                                        <div className="pl-2 w-64 flex justify-between items-center">
                                                            <h6 className="text-lg font-semibold leading-normal">{contactMessage.contact_name}</h6>
                                                            {contactMessage.last_message_date && <span className="text-sm">{new Date(contactMessage.last_message_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</span>}
                                                        </div>
                                                        <div className="pl-2 w-64 flex justify-between items-center">
                                                            <span className={"block truncate" + ((selectedMessage?.contact_id === contactMessage.contact_id) ? "text-blueGray-100" : "text-blueGray-700")}>{contactMessage.last_message.message}</span>
                                                            {contactMessage.unread_count > 0 &&
                                                                <div className="rounded-full h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center">{contactMessage.unread_count}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                                :
                                <div className="mx-4 rounded-md relative block my-1 text-blueGray-800 text-center text-sm">
                                    {awaitMessage}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    {selectedMessage ?
                        (<div className="md:pl-6 lg:text-right lg:self-center px-4 relative w-full lg:w-8/12 max-h-screen">
                            <div className="flex justify-center border-0 flex-col min-w-0 break-words bg-white w-full mb-5 shadow-xl rounded-lg">
                                <div className="bg-blueGray-800 inline-block rounded-t-lg px-5 py-1">
                                    <div className="py-4 flex flex-row justify-between">
                                        <div className="flex items-center">
                                            <div className="text-left flex-1">
                                                <div className="justify-between items-center">
                                                    <h5 className="text-xl text-white font-semibold leading-tight">{selectedMessage.contact_name}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 flex flex-col-reverse flex-auto max-h-screen-40 overflow-auto overflow-x-hidden bg-blueGray-200">
                                    {messages?.map((messageObj, idx) => {
                                        return (<div key={idx} className={((messageObj.senderId.toString() === userId) ? "justify-end text-right" : "justify-start text-left") + " flex flex-wrap -mx-4"}>
                                            <div className="px-4 relative w-auto">
                                                <div className={"relative flex px-4 py-2 my-4 break-words shadow-lg rounded-lg " + ((messageObj.senderId.toString() === userId) ? "bg-lightBlue-500 text-white" : "bg-blueGray-100 text-blueGray-800")}>
                                                    <div>
                                                        <p className="mb-1 text-md leading-relaxed">{messageObj.message}</p>
                                                        <p className="block uppercase font-semibold opacity-75 text-sm">
                                                            <span className="mr-2">{new Date(messageObj.created_at).toLocaleTimeString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toLocaleUpperCase()}</span>
                                                            <i className="fas fa-check"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                    })
                                    }
                                </div>
                                <div className="flex flex-col md:flex-row bg-white rounded-b-lg px-4 py-3 border-t border-blueGray-300 items-center">
                                    <input
                                        type="text"
                                        placeholder="Type your message"
                                        className="border-blueGray-300 px-3 py-1.5 text-sm w-full md:w-5/6 placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="md:mt-0 ml-3 md:ml-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-200 whitespace-nowrap"
                                        onClick={sendMessage}
                                    >
                                    <i className="fas fa-paper-plane"></i> Send
                                    </button>
                                </div>

                            </div>
                        </div>)
                        :
                        (<div className="md:pl-6 lg:text-right lg:self-center px-4 relative w-full lg:w-8/12 max-h-screen">
                        </div>)
                    }
                </div>
            </div>
        </>
    );
}
