import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const Statistics = ({ setError }) => {
  const [newUsers, setNewUsers] = useState({
    newUsers: { today: 0, thisMonth: 0 },
    activeUsers: { today: 0, thisMonth: 0 },
    newStarters: { today: 0, thisMonth: 0 },
    newPremiums: { today: 0, thisMonth: 0 },
    total: {
      users: 0,
      starters: 0,
      premiums: 0,
      vips: 0,
    },
    visitors: { today: 0, thisMonth: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");

      try {
        const resposne = await axiosPrivate.get("/api/admin/getnewusers");
        const {
          newSignupsToday,
          newSignupsThisMonth,
          activeUsersToday,
          activeUsersThisMonth,
          newStartersToday,
          newStartersThisMonth,
          newPremiumsToday,
          newPremiumsThisMonth,
          totalUsers,
          totalStarters,
          totalPremiums,
          totalVips,
          visitsToday,
          visitsThisMonth,
        } = resposne.data;
        console.log(resposne.data);

        setNewUsers({
          newUsers: { today: newSignupsToday, thisMonth: newSignupsThisMonth },
          activeUsers: {
            today: activeUsersToday,
            thisMonth: activeUsersThisMonth,
          },
          newStarters: {
            today: newStartersToday,
            thisMonth: newStartersThisMonth,
          },
          newPremiums: {
            today: newPremiumsToday,
            thisMonth: newPremiumsThisMonth,
          },
          total: {
            users: totalUsers,
            starters: totalStarters,
            premiums: totalPremiums,
            vips: totalVips,
          },
          visitors: {
            today: visitsToday,
            thisMonth: visitsThisMonth,
          },
        });
      } catch (error) {
        console.error(error);

        if (!error.message) {
          setError(error.message);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="my-10 border rounded-md p-4  w-[90vw] md:w-[700px] flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
        <div className="p-4">
          <h2 className=" text-3xl">New Users</h2>
          <div className="">
            <p>
              Today: <span>{newUsers.newUsers.today}</span>
            </p>
            <p>
              This month: <span>{newUsers.newUsers.thisMonth}</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Active Users</h2>
          <div className="">
            <p>
              Today: <span>{newUsers.activeUsers.today}</span>
            </p>
            <p>
              This month: <span>{newUsers.activeUsers.thisMonth}</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">New Starters</h2>
          <div className="">
            <p>
              Today: <span>{newUsers.newStarters.today}</span>
            </p>
            <p>
              This month: <span>{newUsers.newPremiums.thisMonth}</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">New Premiums</h2>
          <div className="">
            <p>
              Today: <span>{newUsers.newPremiums.today}</span>
            </p>
            <p>
              This month: <span>{newUsers.newPremiums.thisMonth}</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Number of visitors</h2>
          <div className="">
            <p>
              Today: <span>{newUsers.visitors.today}</span>
            </p>
            <p>
              This month: <span>{newUsers.visitors.thisMonth}</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Total Number of Users</h2>
          <div className="">
            <p>{newUsers.total.users}</p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Total Number of Starters</h2>
          <div className="">
            <p>{newUsers.total.starters}</p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Total Number of Premiums</h2>
          <div className="">
            <p>{newUsers.total.premiums}</p>
          </div>
        </div>
        <div className="p-4">
          <h2 className=" text-3xl">Total Number of Vips</h2>
          <div className="">
            <p>{newUsers.total.vips}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
