import Subscription from "../../components/Uicomponents/SubscriptionPlans/Subscription.jsx";
import './Subscription.style.css';
import {RiCheckboxCircleFill} from "react-icons/ri";

const SubscriptionPage = () => {
    return (
        <div className="min-w-full min-h-screen mt-20">
            <section
                className={
                    "flex flex-col justify-center zoom-100 items-center mx-auto mt-10 w-[70%] gap-2"
                }
            >
                <h1 className={"text-5xl font-light font-bold tracking-wider lowercase text-center text-white"}>
                    Find the plan that matches your learning goals.
                </h1>
                <p className="text-lg text-amber-300  lowercase">
                    Design your future with learing and growing.
                </p>

            </section>
            <div className={"mt-20 mb-5"}>
                <Subscription/>
            </div>
            {/* </section> */}
            <p className={'text-md w-[80%] text-center mx-auto text-grey-50 flex flex-row justify-center items-center font-sans mb-20'}>Prices
                shown don't include applicable tax.Prices and plans are subject to change at Ganitam Nirmoktra
                discretion. </p>
            <div className={'border border-white w-[75%] mx-auto mb-10'}></div>
            <section className={"w-[80%] mx-auto mb-20 "}>
                <h1 className={"text-2xl mx-auto w-[85%] font-bold mb-3 "}>Top features</h1>
                <table className={'w-[90%] text-lg mx-auto text-center rounded-lg leading-10'}>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Free</th>
                        <th>Pro</th>
                        <th>Max</th>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td className={'w-[30%]'}>AI chats per month</td>
                        <td>5</td>
                        <td>25</td>
                        <td>50</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>Speech To text</td>
                        <td>2</td>
                        <td>20</td>
                        <td>40</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>Multi Answer Solver</td>
                        <td>2</td>
                        <td>20</td>
                        <td>40</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>Export Answer to Pdf</td>
                        <td className={''}>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                        <td>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                        <td>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>Access to AI features</td>
                        <td className={''}>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                        <td>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                        <td>
                            <div className={'items-center flex justify-center'}>
                                <RiCheckboxCircleFill/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default SubscriptionPage;
