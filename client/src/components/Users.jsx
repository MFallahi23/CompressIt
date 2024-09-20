import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserRoleLabel } from "../utils/roleUtils";

const Users = ({ users }) => {
  return (
    <div className="my-10 w-[80vw] border rounded-lg flex flex-col gap-2 ">
      {users && users.length > 0 ? (
        users.map((user, i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between  w-[100%] p-2 max-[600px]:text-xs user"
            >
              <div className=" max-[500px]:hidden">{user.username}</div>
              <div className="truncate max-w-56">{user.email}</div>
              <div className="">{getUserRoleLabel(user.role)}</div>

              <Link
                className=" bg-slate-500 rounded-full p-2 hover:opacity-50 cursor-pointer"
                to={`/user/${user.user_id}`}
              >
                <FaEye />
              </Link>
            </div>
          );
        })
      ) : (
        <div>Your app doesn't have users</div>
      )}
    </div>
  );
};

export default Users;
