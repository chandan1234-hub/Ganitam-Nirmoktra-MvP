import Subscription from '../../components/Uicomponents/SubscriptionPlans/Subscription.jsx'
import './Subscription.style.css'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { MdCancel } from 'react-icons/md'
import { HiArrowLongDown } from 'react-icons/hi2'

const comparisonRows = [
    ['AI chats per month', '5', '25', '50'],
    ['Speech to text', '2', '20', '40'],
    ['Multi-answer solver', '2', '20', '40'],
]

const accessRows = [
    ['Export answer to PDF', true, true, true],
    ['Access to AI features', true, true, true],
    ['Priority support', false, true, true],
]

const AccessIcon = ({ enabled }) => enabled
    ? <RiCheckboxCircleFill className="access-icon access-icon-yes" aria-label="Included" />
    : <MdCancel className="access-icon access-icon-no" aria-label="Not included" />

const SubscriptionPage = () => {
    return (
        <main className="plans-page">
            <section className="plans-hero" aria-labelledby="plans-title">
                <span className="plans-shape plans-shape-square" aria-hidden="true" />
                <span className="plans-shape plans-shape-dot" aria-hidden="true" />
                <div className="plans-kicker"><span /> choose your pace</div>
                <h1 id="plans-title">Find the plan that matches your learning goals.</h1>
                <p>Simple paths for curious minds. Start small, grow steadily, and keep asking better questions.</p>
                <a className="plans-scroll-link" href="#plans-table">
                    compare the paths
                    <HiArrowLongDown />
                </a>
            </section>

            <section id="plans-table" className="plans-pricing-section" aria-labelledby="pricing-title">
                <div className="plans-section-heading">
                    <span className="plans-kicker">choose what fits today</span>
                    <h2 id="pricing-title">Your next step, clearly priced.</h2>
                </div>
                <div className="plans-pricing-table">
                    <Subscription />
                </div>
                <p className="plans-disclaimer">Prices shown do not include applicable tax. Plans and prices may change at Ganitam Nirmoktra&apos;s discretion.</p>
            </section>

            <section className="comparison-section" aria-labelledby="comparison-title">
                <div className="comparison-heading">
                    <span className="plans-kicker">at a glance</span>
                    <h2 id="comparison-title">More room to think.</h2>
                    <p>Compare the everyday tools that help turn a stuck moment into a useful one.</p>
                </div>
                <div className="comparison-table-wrap">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th scope="col">Features</th>
                                <th scope="col">Free</th>
                                <th scope="col" className="comparison-featured">Pro</th>
                                <th scope="col">Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map(([label, free, pro, max]) => (
                                <tr key={label}>
                                    <th scope="row">{label}</th>
                                    <td>{free}</td><td className="comparison-featured">{pro}</td><td>{max}</td>
                                </tr>
                            ))}
                            {accessRows.map(([label, free, pro, max]) => (
                                <tr key={label}>
                                    <th scope="row">{label}</th>
                                    <td><AccessIcon enabled={free} /></td><td className="comparison-featured"><AccessIcon enabled={pro} /></td><td><AccessIcon enabled={max} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="plans-note" aria-label="Plans support">
                <span className="plans-note-mark">still deciding?</span>
                <p>Start with the plan that feels comfortable. Your curiosity can grow from there.</p>
            </section>
        </main>
    )
}

export default SubscriptionPage