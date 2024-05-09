import React from "react";

const hero = () => {
  return (
    // <section className="bg-white dark:bg-gray-900">
    //   <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    //     <div className="mr-auto place-self-center lg:col-span-7">
    //       <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
    //         Learning that gets you
    //       </h1>
    //       <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
    //         Skills for your present (and your future). Get started with us.
    //       </p>
    //     </div>
    //     <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
    //       <img
    //         src="	https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
    //         alt="mockup"
    //         height={400}
    //         width={1340}
    //       />
    //     </div>
    //   </div>
    // </section>
    <section className="relative bg-[url(https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg)] bg-cover bg-center bg-no-repeat h-4/5">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 mb-20">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right mb-[200px]">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Learning that gets you{" "}
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Skills for your present (and your future). Get started with us.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default hero;
