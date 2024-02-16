import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'react-toastify';

// components

import HeaderStats from "components/Headers/HeaderStats.js";
import FooterDashboard from "components/Footers/FooterDashboard.js";

// views

import Sidebar from "components/Sidebar/Sidebar";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Vehicles from "views/common/Vehicles";
import Timings from "views/common/Timings";
import Driving from "views/visitor/Driving";
import Chat from "views/common/Chat";
import Security from "views/managers/building/Security";
import Pool from "views/managers/building/Pool";
import Garden from "views/managers/building/Garden";
import Residents from "views/managers/building/Residents";
import Visitors from "views/managers/building/Visitors";
import Report from "views/managers/building/Report";
import GardenTimings from "views/managers/garden/Timings";
import PoolTimings from "views/managers/pool/Timings";
import SecurityManagement from "views/managers/security/Manage";
import Membership from "views/resident/Membership";
import Summary from "views/common/Summary";
import CreateEvent from "views/common/CreateEvent";
import RegisterEvents from "views/common/RegisterEvents";
import Payment from "views/common/Payment";

export default function Dashboard() {
  const [status, setStatus] = useState(false);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email_verified = localStorage.getItem('email_verified');

  if(token && role) {
    if(!email_verified && !status) {
      setStatus(true);
      toast.error('Please verify your Email!');
    }
  
    let showStats = '';
    if(role.includes('resident')) {
      showStats = 'false';
    }
    else if(role.includes('visitor')) {
      showStats = 'false';
    }
    else if(role.includes('building_manager')) {
      showStats = 'true';
    }
    else if(role.includes('garden_manager')) {
        showStats = 'true';
    }
    else if(role.includes('pool_manager')) {
        showStats = 'true';
    }
    else if(role.includes('security_manager')) {
        showStats = 'true';
    }

    return (
      <>
        <Sidebar />
        <div className="relative ml-64 md:ml-72 bg-blueGray-100">
          <DashboardNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Switch>
              <Route path="/dashboard/vehicles" exact component={Vehicles} />
              <Route path="/dashboard/driving-instructions" exact component={Driving} />
              <Route path="/dashboard/timings" exact component={Timings} />
              <Route path="/dashboard/membership" exact component={Membership} />
              <Route path="/dashboard/chat" exact component={Chat} />
              <Route path="/dashboard/security-managers" exact component={Security} />
              <Route path="/dashboard/pool-managers" exact component={Pool} />
              <Route path="/dashboard/garden-managers" exact component={Garden} />
              <Route path="/dashboard/residents" exact component={Residents} />
              <Route path="/dashboard/visitors" exact component={Visitors} />
              <Route path="/dashboard/generate-reports" exact component={Report} />
              <Route path="/dashboard/garden-timings" exact component={GardenTimings} />
              <Route path="/dashboard/pool-timings" exact component={PoolTimings} />
              <Route path="/dashboard/security" exact component={SecurityManagement} />
              <Route path="/dashboard/summary" exact component={Summary} />
              <Route path="/dashboard/create-event" exact component={CreateEvent} />
              <Route path="/dashboard/register-event" exact component={RegisterEvents} />
              <Route path="/dashboard/payment" exact component={Payment} />
              <Redirect from="/dashboard" to={showStats==='true' ? "/dashboard/summary" : "/dashboard/vehicles"} />
            </Switch>
            <FooterDashboard />
          </div>
        </div>
      </>
    );
  }
  return <Redirect to="/auth" />;
}