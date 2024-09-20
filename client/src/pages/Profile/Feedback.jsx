import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import formatDate from "../../utils/dateFormatting";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [adminFeedbacks, setAdminFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { auth } = useAuth();

  //  Function to hanlde submit
  const handeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!feedback) {
      setError("You can't send an empty feedback!");
      return;
    }
    try {
      const response = await axiosPrivate.post("/api/user/feedback", {
        feedback,
      });

      setFeedback("");
      if (response.status === 201) {
        setSuccess(
          "Successfully sent your feedback, thank you for your contribution!"
        );
        console.log(success);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to delete a feedback
  const deleteFeedback = async (feedId) => {
    setError("");
    setSuccess("");
    try {
      if (auth?.role !== "admin") {
        setError("Only admin can perform this action!");
        return;
      }
      const response = await axiosPrivate.post("/api/admin/deletefeedback", {
        id: feedId,
      });
      if (response.status === 200) {
        setSuccess("Successfully deleted the feedback!");
        setAdminFeedbacks((feedbacks) => {
          return feedbacks.filter((feedb) => feedb.id !== feedId);
        });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    setError("");
  }, [feedback]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get("/api/admin/feedbacks");
      const { feedbacks } = response?.data;
      setAdminFeedbacks(feedbacks);
    };
    if (auth?.role === "admin") {
      fetchData();
    }
  }, []);
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mb-20">
      {error && <div className=" font-bold text-red-700">{error}</div>}

      {success && <div className=" font-bold text-lime-500">{success}</div>}
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
            adminFeedbacks.map((feedback, i) => (
              <div
                className=" border w-[80vw] sm:w-[60vw] p-2 rounded-md flex flex-col"
                key={i}
              >
                <h4 className="text-xl">{feedback.content}</h4>
                <p className=" self-end text-gray-300"> {feedback.author}</p>
                <p className=" self-end italic">
                  {formatDate(feedback.created_at)}
                </p>
                <button
                  className=" text-red-500 border-2 rounded-md border-red-500 hover:opacity-50"
                  onClick={() => deleteFeedback(feedback.id)}
                >
                  Delete
                </button>
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
