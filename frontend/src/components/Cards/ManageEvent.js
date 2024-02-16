import React from "react";
import EventsList from "./EventsList";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';
import { Checkbox } from '@notus-pro/react';

// components

export default function ManageEvent() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [advertise, setAdvertise] = useState(false);
    const [events, setEvents] = useState(null);

    const getEvents = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(baseUrl + '/event', config).then((response) => {
            setEvents(response.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setAdvertise(false);
    };

    const createEvent = () => {
        if(!title.length) {
            return toast.error('Invalid Title!');
        }

        if(!description.length) {
            return toast.error('Invalid Description!');
        }

        if(!imageUrl.length) {
            return toast.error('Invalid Image URL!');
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        const payload = {
            title,
            description,
            image: imageUrl,
            advertisement: advertise,
            userId,
            status: 'Active'
        }

        axios.post(baseUrl + '/event', payload, config).then((response) => {
            handleCancel();
            getEvents();
            toast.success("Event Created Successfully!");
        }).catch((error) => {
            const errors = Object.keys(error.response.data.validation_errors);
            for (let i = 0; i < errors.length; i++) {
                const err = error.response.data.validation_errors[errors[i]].toString();
                toast.error(err);
            }
        });
    };

    const handleCreate = () => {
        createEvent();
    };

    const handleAction = (actionData) => {
        if(actionData.getData) getEvents();
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Manage Events</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                    <form>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={imageUrl}
                                        onChange={handleImageUrlChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 py-6">
                                <div className="relative w-full">
                                    <Checkbox
                                        label="Advertise"
                                        checked={advertise}
                                        onChange={() => setAdvertise(!advertise)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4 text-right">
                                <div className="relative w-full mb-3">
                                    <button
                                        className="mr-4 text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCreate}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
                <EventsList
                    events={events}
                    onAction={handleAction}
                />
            </div>
        </>
    );
}
