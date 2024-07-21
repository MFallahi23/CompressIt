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
  } else if (role === "moderator") {
    return <span className=" text-sm pl-1">Moderator</span>;
  } else {
    return (
      <span className=" text-sm px-1 bg-amber-400 w-fit rounded-lg">Admin</span>
    );
  }
};

export { getUserRoleLabel };
