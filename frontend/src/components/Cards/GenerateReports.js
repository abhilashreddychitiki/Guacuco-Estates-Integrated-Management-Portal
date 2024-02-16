import React, { useState, useEffect } from "react";
import ReportsList from "./ReportsList";
import DatePicker from 'react-datepicker';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// components

export default function GenerateReports() {
    const token = localStorage.getItem('token');

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filter, setFilter] = useState('');
    const [reports, setReports] = useState([]);

    const handleCancel = () => {
        setName('');
        setStartDate(null);
        setEndDate(null);
        setFilter('');
    };

    const getReports = () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
  
        axios.get(baseUrl + '/report', config).then((response) => {
          setReports(response.data.data);
        }).catch((error) => {
          toast.error(error.response.data.message);
        });
      };

    const handleGenerate = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const payload = {
            name,
            startDate,
            endDate,
            filter,
            status: 'Processing'
        };
        
        axios.post(baseUrl + '/report', payload, config).then((response) => {
            handleCancel();
            getReports();
            toast.success(response.data.message);
        }).catch((error) => {
            const errors = Object.keys(error.response.data.validation_errors);
            for (let i = 0; i < errors.length; i++) {
                const err = error.response.data.validation_errors[errors[i]].toString();
                toast.error(err);
            }
        });
    };

    useEffect(() => {
        getReports();
    }, []);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Generate Reports</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                    <form>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Report Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={(event) => setName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Date Range
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd MMM yyyy"
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="dd MMM yyyy"
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText="End Date"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Filter
                                    </label>
                                    <select
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={(event) => setFilter(event.target.value)}
                                        value={filter}
                                    >
                                        <option value="" disabled>Select Filter</option>
                                        <option value="residents">Residents</option>
                                        <option value="timings">Timings</option>
                                        <option value="vehicles">Vehicles</option>
                                        <option value="visitors">Visitors</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full px-4 text-right mt-6">
                                <div className="relative w-full mb-3">
                                    <button className="mr-4 text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleGenerate}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr className="border-b-1 border-blueGray-300" />
                <ReportsList
                    reports={reports}
                />
            </div>
        </>
    );
}
