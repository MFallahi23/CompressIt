// Get user label
const getUserRoleLabel = (role) => {
  if (role === "user") {
    return (
      <span className=" text-sm px-1 bg-slate-300 w-fit rounded-lg">
        Free tier
      </span>
    );
  } else if (role === "premium") {
    return (
      <span className=" text-sm pl-1 bg-sky-800 rounded-lg text-white px-1">
        Premium
      </span>
    );
  } else if (role === "starter") {
    return (
      <span className=" text-sm pl-1 bg-neutral-800 rounded-lg text-white  p-1">
        Starter
      </span>
    );
  } else if (role === "vip") {
    return (
      <span className="text-sm pl-1 bg-lime-400 rounded-lg text-white p-1">
        Vip
      </span>
    );
  } else {
    return (
      <span className=" text-sm px-1 bg-amber-400 w-fit rounded-lg">Admin</span>
    );
  }
};

export { getUserRoleLabel };
