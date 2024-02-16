import React from "react";
import VehiclesTable from "./VehiclesTable";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// components

export default function VehiclesRegistration() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [tagNumber, setTagNumber] = useState('');
    const [drivingLicense, setDrivingLicense] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [vehicles, setVehicles] = useState(null);

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    const getVehicles = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(baseUrl + '/vehicle', config).then((response) => {
            setVehicles(response.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    useEffect(() => {
        getVehicles();
    }, []);

    const handleTagNumberChange = (event) => {
        setTagNumber(event.target.value);
    };

    const handleDrivingLicenseChange = (event) => {
        setDrivingLicense(event.target.value);
    };

    const handleNumberPlateChange = (event) => {
        setNumberPlate(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCancel = () => {
        setTagNumber('');
        setDrivingLicense('');
        setNumberPlate('');
        setPhone('');
        setAddress('');
    };

    const registerVehicles = () => {
        if(!tagNumber.length) {
            return toast.error('Invalid Tag Number!');
        }

        if(!drivingLicense.length) {
            return toast.error('Invalid Driving License!');
        }

        if(!numberPlate.length) {
            return toast.error('Invalid Number Plate!');
        }

        if(!isValidPhoneNumber(phone)) {
            return toast.error('Invalid Phone Number!');
        }

        if(!address.length) {
            return toast.error('Invalid Address!');
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        const payload = {
            tag_no: tagNumber,
            driving_license: drivingLicense,
            number_plate: numberPlate,
            phone,
            address,
            userId,
            status: 'Active'
        }
        axios.post(baseUrl + '/vehicle', payload, config).then((response) => {
            handleCancel();
            getVehicles();
            toast.success("Vehicle Registered Successfully!");
        }).catch((error) => {
            const errors = Object.keys(error.response.data.validation_errors);
            for (let i = 0; i < errors.length; i++) {
                const err = error.response.data.validation_errors[errors[i]].toString();
                toast.error(err);
            }
        });
    };

    const handleRegister = () => {
        registerVehicles();
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Vehicle Registration</h6>
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
                                        Tag Number
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={tagNumber}
                                        onChange={handleTagNumberChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Driving License
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={drivingLicense}
                                        onChange={handleDrivingLicenseChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Number Plate
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={numberPlate}
                                        onChange={handleNumberPlateChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                        value={address}
                                        onChange={handleAddressChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 text-right mt-20">
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
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
                <VehiclesTable vehicles={vehicles} />
            </div>
        </>
    );
}
