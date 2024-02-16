import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import { baseUrl } from "config";
import { toast } from 'react-toastify';

export default function VerifyEmail() {
    const { id, hash } = useParams();
    const token = localStorage.getItem('token');
    const [status, setStatus] = useState(false);

    const verifyEmail = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(baseUrl + '/verify-email/' + id + '/' + hash, config).then((response) => {
            toast.success(response.data.message);
            setStatus(true);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    useEffect(() => {
        if(token) verifyEmail();
        else {
            toast.error('Unauthenticated!');
        }
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className={(status ? 'text-blueGray-800' : 'text-red-500') + " text-md font-bold uppercase"}>
                                        Email {status ? 'Verified Successfully!' : 'Verification Failed!'}
                                    </h6>
                                </div>
                                {status && <hr className="mt-6 border-b-1 border-blueGray-300" />}
                            </div>
                            {status && <div className="flex px-4 lg:px-10 py-10 pt-0 content-center items-center justify-center h-full">
                                <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 hover:underline">Click here to go to Dashboard</Link>
                            </div>}
                        </div>
                        {!status &&
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link to="/auth/login" className="text-blueGray-200">
                                    <small>Login to your account</small>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link to="/auth/register" className="text-blueGray-200">
                                    <small>Create new account</small>
                                </Link>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}