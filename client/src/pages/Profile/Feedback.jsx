import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [adminFeedbacks, setAdminFeedbacks] = useState([
    { author: "max2", body: "Good but can be better" },
    {
      author: "Vincent",
      body: "Where am i, ther is no conception , no creativity, i'm leaving",
    },
    {
      author: "father of vincent",
      body: "stfu you're 9yold, you;ve just came up from my balls and already criticizing my favorite websites",
    },
  ]);
  const [error, setError] = useState("");
  const { auth } = useAuth();

  //  Function to hanlde submit
  const handeSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) {
      setError("You can't send an empty feedback!");
      return;
    }
    try {
      const response = await axiosPrivate.post("/api/user/feedback", {
        feedback,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [feedback]);

  // useEffect(async () => {
  //   const response = await axiosPrivate.get("/api/admin/feedbacks");
  //   const { feedbacks } = response?.data;
  //   setAdminFeedbacks(feedbacks);
  // }, []);
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mb-20">
      {error && <div className=" font-bold text-red-700">{error}</div>}
      <h1 className=" text-5xl font-extrabold mb-3">Feedback</h1>
      {auth?.role === "user" ||
      auth?.role === "starter" ||
      auth?.role === "premium" ||
      auth?.role === "vip" ? (
        <div className="">
          <p className=" text-center">
            You can leave a comment about your experience with our compressor,
            suggestions or some struggle you've found while using our
            application{" "}
          </p>

          <form
            action=""
            className="w-[100%] mt-5 flex flex-col items-center gap-5"
            onSubmit={handeSubmit}
          >
            <textarea
              name="feedback"
              id=""
              className="w-[100%] rounded-md text-blackColor p-2"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
            ></textarea>
            <button className="cta__btn p-2 rounded-md w-[100%] sm:w-auto self-end">
              Send FeedBack
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {adminFeedbacks && adminFeedbacks.length > 0 ? (
            adminFeedbacks.map((feedback) => (
              <div className=" border w-[80vw] sm:w-[60vw] p-2 rounded-md flex flex-col">
                <h4 className="text-xl">{feedback.body}</h4>
                <p className=" self-end text-gray-300"> {feedback.author}</p>
              </div>
            ))
          ) : (
            <h2 className=" text-3xl mt-4">There is no feedback </h2>
          )}
        </div>
      )}
    </section>
  );
};

export default Feedback;
