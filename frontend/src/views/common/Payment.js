import React from "react";
import { useState } from 'react';
import { toast } from 'react-toastify';

// components

export default function Payment() {
    const token = localStorage.getItem('token');

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [name, setName] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('$ 1000');

    const handlePayment = () => {
        if(cardNumber.length !== 16) {
            return toast.error('Card Number should be of Length 16');
        }
        if(expiryDate.length !== 5) {
            return toast.error('Invalid Expiry Date');
        }
        if(expiryDate.length === 5) {
            for (let i = 0; i < expiryDate.length; i++) {
                if((isNaN(parseInt(expiryDate[i])) && i !== 2) || (i === 2 && expiryDate[i] !== '/')) {
                    return toast.error('Invalid Expiry Date Format');
                }
            }
        }
        if(!name.length) {
            return toast.error('Name on the Card is required');
        }
        if(cvv.length !== 3) {
            return toast.error('CVV should be of Length 3');
        }
        if(cardNumber.length === 16 && expiryDate.length === 5 && name.length && cvv.length === 3) {
            return toast.success('Payment Completed Successfully!');
        }
        else {
            return toast.error('Something went wrong!');
        }
    };

    return (
        <>
            <div className="flex flex-wrap w-full px-10">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <h6 className="text-blueGray-700 text-xl font-bold">Payment</h6>
                        <span className="text-xs">(Note: This payment covers both Rent and Membership Charges)</span>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                        <form>
                            <div className="flex flex-wrap mt-6">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            Card Number
                                        </label>
                                        <input
                                            type="number"
                                            maxlength="16"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            pattern="(0[1-9]|1[0-2])\/\d{2}"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            Name on the Card
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            CVV
                                        </label>
                                        <input
                                            type="number"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4 text-right mt-8">
                                    <div className="relative w-full mb-3">
                                        <button
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handlePayment}
                                        >
                                            Make Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <hr className="mt-3 border-b-1 border-blueGray-300" />
                </div>
            </div>
        </>
    );
}