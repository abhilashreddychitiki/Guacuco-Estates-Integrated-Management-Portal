import React from "react";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// components
import TimingsList from "./TimingsList";

export default function ManageTimings(props) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [name, setName] = useState('');
    const [weekDays, setWeekDays] = useState('');
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('17:00');
    const [activityTimings, setActivityTimings] = useState(null);
    const [editId, setEditId] = useState('');
    const [action, setAction] = useState('add');

    const getTimings = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(baseUrl + '/timing/' + props.activity, config).then((response) => {
            setActivityTimings(response.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    useEffect(() => {
        getTimings();
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCancel = () => {
        setName('');
        setWeekDays('');
        setStartTime('08:00');
        setEndTime('17:00');
        setActivityTimings('');
        setEditId('');
        setAction('add');
    };

    const addTiming = () => {
        const daysOfTheWeek = weekDays.map(day => day.value).join(',');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            name,
            weekDays: daysOfTheWeek,
            startTime,
            endTime,
            activity: props.activity,
            status: 'Active'
        }
        axios.post(baseUrl + '/timing', payload, config).then((response) => {
            handleCancel();
            getTimings();
            toast.success(`${props.activity} Timing added Successfully!`);
        }).catch((error) => {
            const errors = Object.keys(error.response.data.validation_errors);
            for (let i = 0; i < errors.length; i++) {
                const err = error.response.data.validation_errors[errors[i]].toString();
                toast.error(err);
            }
        });
    };

    const handleAdd = () => {
        if(!name.length) toast.error(`${props.activity} Name is missing!`);
        if(!weekDays.length) toast.error(`${props.activity} Days of the Week is missing!`);
        if(!startTime.length) toast.error(`${props.activity} Start Time is missing!`);
        if(!endTime.length) toast.error(`${props.activity} End Time is missing!`);
        addTiming();
    };

    const handleEdit = (editData) => {
        setName(editData.name);
        editData.weekDays = editData.weekDays.split(',');
        const formattedWeekDays = [];
        for (let i = 0; i < editData.weekDays.length; i++) {
            formattedWeekDays.push({ value: editData.weekDays[i], label: editData.weekDays[i] });
        }
        setWeekDays(formattedWeekDays);
        setStartTime(editData.startTime);
        setEndTime(editData.endTime);
        setAction('edit');
    };

    const handleUpdate = () => {
        const daysOfTheWeek = weekDays.map(day => day.value).join(',');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            name,
            weekDays: daysOfTheWeek,
            startTime,
            endTime,
            activity: props.activity,
            userId
        };

        axios.post(baseUrl + '/timing/' + editId, payload, config)
            .then((response) => {
                toast.success(`${props.activity} Timings updated Successfully!`);
                handleCancel();
                getTimings();
            }).catch((error) => {
                toast.error(error);
            });
    };

    const handleStatus = (id, status) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            userId,
            status: (status === 'Active') ? 'Inactive' : 'Active'
        };

        axios.post(baseUrl + '/timing/' + id, payload, config)
            .then((response) => {
                toast.success(`${props.activity} Status updated Successfully!`);
                getTimings();
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const handleAction = (actionData) => {
        if (actionData.action === 'edit') {
            let editData = activityTimings.find(o => o.id === actionData.id);
            setEditId(actionData.id);
            handleEdit(editData);
        }
        else if (actionData.action === 'status') {
            let statusData = activityTimings.find(o => o.id === actionData.id);
            handleStatus(actionData.id, statusData.status);
        }
    };

    const daysOfWeek = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ];

    const handleWeekDaysChange = (selectedOptions) => {
        setWeekDays(selectedOptions);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Manage {props.activity} Timings</h6>
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
                                        {props.activity} Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Days of the Week
                                    </label>
                                    <Select
                                        id="dayOfWeek"
                                        name="dayOfWeek"
                                        options={daysOfWeek}
                                        value={weekDays}
                                        onChange={handleWeekDaysChange}
                                        isSearchable={false}
                                        isMulti
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 flex flex-wrap">
                                <div className="relative w-full mb-3 pr-2">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Start Time
                                    </label>
                                    <input
                                        id="startTime"
                                        type="time"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        className="w-full md:w-1/2 px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 flex flex-wrap">
                                <div className="relative w-full mb-3 pl-2">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        End Time
                                    </label>
                                    <input
                                        id="endTime"
                                        type="time"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                        className="w-full md:w-1/2 px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4 text-right mt-6">
                                <div className="relative w-full mb-3">
                                    <button
                                        className="mr-4 text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    {action === 'add' ?
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleAdd}
                                    >
                                        Add Timing
                                    </button>
                                    :
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleUpdate}
                                    >
                                        Update Timing
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
                <TimingsList
                    activity={props.activity}
                    timings={activityTimings}
                    onAction={handleAction}
                />
            </div>
        </>
    );
}
