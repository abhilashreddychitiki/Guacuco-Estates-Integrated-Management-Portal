import React from "react";
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [analytics, setAnalytics] = useState(null);

  let showStats = '';
  if (role.includes('resident')) {
    showStats = 'false';
  }
  else if (role.includes('visitor')) {
    showStats = 'false';
  }
  else if (role.includes('building_manager')) {
    showStats = 'true';
  }
  else if (role.includes('garden_manager')) {
    showStats = 'true';
  }
  else if (role.includes('pool_manager')) {
    showStats = 'true';
  }
  else if (role.includes('security_manager')) {
    showStats = 'true';
  }

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
      {/* Header */}
      <div className="relative bg-lightBlue-600 pb-32 pt-20">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div style={{ display: (showStats === 'true') ? '' : 'none' }}>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="VEHICLES"
                  statTitle={analytics?.count?.vehicles_count}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="VISITORS"
                  statTitle={analytics?.count?.visitors_count}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ACTIVITIES"
                  statTitle={analytics?.count?.activities_count}
                  statPercentColor="text-red-500"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="EVENTS"
                  statTitle={analytics?.count?.events_count}
                  statPercentColor="text-emerald-500"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
