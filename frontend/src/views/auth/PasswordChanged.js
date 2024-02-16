import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function PasswordChanged() {
    return (
        <>
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                    <h6 className="text-blueGray-800 text-md font-bold uppercase">
                        Password Changed
                    </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex px-4 lg:px-10 py-10 pt-0 content-center items-center justify-center h-full">
                    <p className="text-sm">Now you can login to start using our Services!</p><br/>
                </div>
                </div>
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
                </div>
            </div>
            </div>
        </div>
        </>
    );
    // return <Redirect to="/" />;
}