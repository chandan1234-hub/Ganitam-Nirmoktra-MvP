import React from "react";
const Subscription = () => {


  return (
    <div>
      <section className="flex flex-row gap-5 items-center justify-center mt-10 w-[60%] mx-auto">
        {/* <section> */}
        <div className="border border-black rounded-4xl w-[30%] h-[40%] bg-white">
          <article className="flex flex-col justify-start gap-3 w-[90%] h-[90%] mx-auto mt-5 mb-5">
            <h1>Basic Plan</h1>
            <h5>5 features</h5>
            <div className="price-range flex flex-col gap-2 items-start justify-start">
              <div className="flex flex-row gap-2 item">
                <h1 className="text-4xl">$0</h1>
                <h1 className="text-l lowercase">/month</h1>
              </div>
              <ul className="font-light text-sm flex-col leading-5">
                <li>5 chat /month</li>
                <li>upload screenshot for search</li>
                <li>export your answer</li>
                <li>access to ai search</li>
                <li></li>
              </ul>
            </div>
            <button className="border p-2 rounded-4xl text-sm font-bold bg-yellow-300">
              Buy Now
            </button>
          </article>
        </div>
        <div className="border border-black rounded-4xl w-[30%] h-[40%] bg-white">
          <article className="flex flex-col justify-start gap-3 w-[90%] h-[90%] mx-auto mt-5 mb-5">
            <h1>Pro Plan</h1>
            <h5>10 features</h5>
            <div className="price-range flex flex-row gap-2 items-center justify-start">
              <h1 className="text-4xl">$5</h1>
              <h1 className="text-l lowercase">/month</h1>
            </div>
            <ul className="font-light text-sm flex-col leading-5">
              <li>5 chat /month</li>
              <li>upload screenshot for search</li>
              <li>export your answer</li>
              <li>access to ai search</li>
              <li></li>
            </ul>
            <button className="border p-2 rounded-4xl text-sm font-bold bg-yellow-300">
              Buy Now
            </button>
          </article>
        </div>
        <div className="border border-black rounded-4xl w-[30%] h-[40%] bg-white">
          <article className="flex flex-col justify-start gap-3 w-[90%] h-[90%] mx-auto mt-5 mb-5">
            <h1>Max Plan</h1>
            <h5>15+ features</h5>
            <div className="price-range flex flex-row gap-2 items-center justify-start">
              <h1 className="text-4xl">$10</h1>
              <h1 className="text-l lowercase">/month</h1>
            </div>
            <ul className="font-light text-sm flex-col leading-5">
              <li>5 chat /month</li>
              <li>upload screenshot for search</li>
              <li>export your answer</li>
              <li>access to ai search</li>
              <li></li>
            </ul>
            <button className="border p-2 rounded-4xl text-sm font-bold bg-yellow-300">
              Buy Now
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
