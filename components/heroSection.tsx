import React from "react";

const heroSection = () => {
  return (
    <section className="w-full flex justify-center px-10 mb-5">
      <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[70%] hover:bg-gray-400   bg-gray-300  p-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://www.udacity.com/videos/workspaces.webm"
          className="object-cover w-full rounded-t-lg h-[400px] md:h-[400px] md:w-full md:rounded-none md:rounded-s-lg"
          height="100px"
        ></video>
        <div className="flex flex-col justify-between p-4 leading-normal ml-2">
          <p className="font-semibold mt-76">
            Prove Mastery Through Hands-On Projects
          </p>
          <p className="mt-2">
            Our open-ended projects are modeled after real-world workplace
            scenarios, and require in-depth critical thinking and creative
            solutions.
          </p>
          <p className="font-semibold mt-6">
            Succeed with Personalized Feedback
          </p>
          <p className="mt-2">
            {
              "Every project receives personalized feedback from industry experts,and our mentors are available to answer questions whenever you're feeling stuck."
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default heroSection;
