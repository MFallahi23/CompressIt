// Display usr img
const displayImg = (profilePic) => {
  if (profilePic?.startsWith("https")) {
    return profilePic;
  } else {
    return "http://localhost:3000/images/" + profilePic;
  }
};

const displayDownloadedImg = (img) => {
  return "http://localhost:3000/images/compressed/" + img;
};
export { displayImg, displayDownloadedImg };
