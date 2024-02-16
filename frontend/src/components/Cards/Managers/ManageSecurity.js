import React from "react";
import ManagersList from "./ManagersList";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../../config';
import { toast } from 'react-toastify';
import validator from "validator";

// components

export default function ManageSecurity() {
    const token = localStorage.getItem('token');
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [securityManagers, setSecurityManagers] = useState(null);
    const [editId, setEditId] = useState('');
    const [action, setAction] = useState('register');
  
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    const getSecurityManagers = () => {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.get(baseUrl + '/users/security_manager', config).then((response) => {
        setSecurityManagers(response.data.data);
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    };

    useEffect(() => {
        getSecurityManagers();
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setAction('register');
    };
    
    const registerSecurityManager = () => {
        if(!name.length) {
            return toast.error('Invalid Name!');
        }
      
        if(!validator.isEmail(email)) {
            return toast.error('Invalid Email!');
        }
      
        if(!isValidPhoneNumber(phone)) {
            return toast.error('Invalid Phone Number!');
        }

        if(!address.length) {
            return toast.error('Invalid Address!');
        }

        const payload = {
            name: name,
            email: email,
            password: 'password',
            phone: phone,
            address: address,
            role: 'security_manager',
        }
        axios.post(baseUrl + '/register', payload).then((response) => {
            handleCancel();
            getSecurityManagers();
            toast.success("Registered Security Manager Successfully!");
        }).catch((error) => {
            const errors = Object.keys(error.response.data.validation_errors);
            for (let i = 0; i < errors.length; i++) {
                const err = error.response.data.validation_errors[errors[i]].toString();
                toast.error(err);
            }
        });
    };

    const handleRegister = () => {
        registerSecurityManager();
    };

    const handleEdit = (editData) => {
        setName(editData.name);
        setEmail(editData.email);
        setPhone(editData.phone);
        setAddress(editData.address);
        setAction('edit');
    };

    const handleUpdate = () => {
        if(!name.length) {
            return toast.error('Invalid Name!');
        }
      
        if(!validator.isEmail(email)) {
            return toast.error('Invalid Email!');
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
            name: name,
            email: email,
            phone: phone,
            address: address
        };

        axios.post(baseUrl + '/user/' + editId, payload, config)
        .then((response) => {
            toast.success("Security Manager Details updated Successfully!");
            handleCancel();
            getSecurityManagers();
        }).catch((error) => {
            toast.error(error);
        });
    };

    const handleStatus = (id, status) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        const payload = {
            status: (status === 'Active') ? 'Inactive' : 'Active'
        };

        axios.post(baseUrl + '/user/' + id, payload, config)
        .then((response) => {
            toast.success("Status updated Successfully!");
            getSecurityManagers();
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    const handleAction = (actionData) => {
        if(actionData.action === 'edit') {
            let editData = securityManagers.find(o => o.id === actionData.id);
            setEditId(actionData.id);
            handleEdit(editData);
        }
        else if(actionData.action === 'status') {
            let statusData = securityManagers.find(o => o.id === actionData.id);
            handleStatus(actionData.id, statusData.status);
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Manage Security Managers</h6>
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
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={handleNameChange}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={handleEmailChange}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={handlePhoneChange}
                                        value={phone}
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
                                        onChange={handleAddressChange}
                                        value={address}
                                    ></textarea>
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
                                    {action === 'register' ?
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                    :
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
                <ManagersList
                    title="Security Managers"
                    managers={securityManagers}
                    onAction={handleAction}
                />
            </div>
        </>
    );
}
