import Subscription from "../../components/Uicomponents/SubscriptionPlans/Subscription.jsx";

const SubscriptionPage = () => {
  return (
    <div className="min-w-full min-h-screen capitalize">
      <section
        className={
          "flex flex-col justify-center zoom-100 items-center mx-auto mt-10 w-[70%]"
        }
      >
        <h1 className={"text-3xl font-light tracking-wider text-white"}>
          Choose Your Plan
        </h1>
        <p className="text-xl text-amber-300">
          Design your future with learing and growing
        </p>
        <h3 className="text-l text-stone-50">
          Plans according to your learing
        </h3>
      </section>
      <Subscription/>
      {/* </section> */}
    </div>
  );
};

export default SubscriptionPage;
