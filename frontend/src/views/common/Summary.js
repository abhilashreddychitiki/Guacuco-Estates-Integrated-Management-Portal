import React from "react";
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";

export default function Summary() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [analytics, setAnalytics] = useState(null);

  const getAnalytics = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(baseUrl + '/analytics', config).then((response) => {
      setAnalytics(response.data.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart data={analytics}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart data={analytics}/>
        </div>
      </div>
    </>
  );
}
