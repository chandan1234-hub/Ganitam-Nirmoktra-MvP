import './Home.style.css'
import { HiArrowLongDown, HiArrowLongRight } from 'react-icons/hi2'
import { NavLink } from 'react-router'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Subscription from '../../components/Uicomponents/SubscriptionPlans/Subscription.jsx'
import questionOverview from '../../assets/images/questions overview bar.svg'

gsap.registerPlugin(ScrollTrigger)

const featureItems = [
    {
        number: '01',
        title: 'See the idea',
        text: 'Build intuition first with explanations that make the shape of a problem easier to notice.',
        accent: 'yellow',
    },
    {
        number: '02',
        title: 'Solve your way',
        text: 'Try a method, test a pattern, and get unstuck without losing the thread of your thinking.',
        accent: 'pink',
    },
    {
        number: '03',
        title: 'Keep the spark',
        text: 'Turn each solution into a starting point for the next question, challenge, or discovery.',
        accent: 'white',
    },
]

const topicItems = [
    { title: 'Algebra', mark: 'x + ?' },
    { title: 'Geometry', mark: '△' },
    { title: 'Calculus', mark: '∫' },
    { title: 'Probability', mark: '%?' },
]

const reassuranceItems = [
    { question: 'Do I need to be advanced?', answer: 'No. Start with the question in front of you and build from there.' },
    { question: 'Can I learn at my own pace?', answer: 'Yes. Take a short path or stay with an idea until it clicks.' },
    { question: 'What if I get stuck?', answer: 'That is part of the process. Use the next hint to find a way forward.' },
]

const GeometryField = () => (
    <div className="geometry-field" aria-hidden="true">
        <span className="geometry-ring geometry-ring-one" />
        <span className="geometry-ring geometry-ring-two" />
        <span className="geometry-square" />
        <span className="geometry-triangle" />
        <span className="geometry-dot geometry-dot-one" />
        <span className="geometry-dot geometry-dot-two" />
        <span className="geometry-orbit geometry-orbit-one" />
        <span className="geometry-orbit geometry-orbit-two" />
        <div className="equation-card">
            <span className="equation-label">today's thought</span>
            <strong>pattern + curiosity</strong>
            <span className="equation-mark">=</span>
            <span className="equation-answer">a new way forward</span>
        </div>
    </div>
)

const Homepage = () => {
    const mainRef = useRef(null)

    useGSAP(() => {
        const entrance = gsap.timeline({ delay: 0.15 })

        entrance
            .fromTo('.hero-kicker', { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' })
            .fromTo('.hero-title-line', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }, '-=0.18')
            .fromTo('.hero-copy, .hero-actions', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25')
            .fromTo('.geometry-field', { opacity: 0, scale: 0.86, rotate: -4 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.45')

        gsap.fromTo('.journey-heading',
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.journey-section', start: 'top 82%', toggleActions: 'play none none reverse' },
            },
        )

        gsap.fromTo('.feature-item, .practice-content, .practice-visual, .topic-item, .process-step, .reassurance-item, .final-cta',
            { opacity: 0, y: 26 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.feature-section', start: 'top 78%', toggleActions: 'play none none reverse' },
            },
        )
    }, { scope: mainRef })

    return (
        <main ref={mainRef} className="home-page">
            <section className="hero-section" aria-labelledby="hero-title">
                <div className="hero-content">
                    <div className="hero-kicker">
                        <span className="kicker-rule" />
                        <span>mathematics, reimagined</span>
                    </div>
                    <h1 id="hero-title" className="hero-title">
                        <span className="hero-title-line">learn to see</span>
                        <span className="hero-title-line hero-title-accent">the pattern</span>
                        <span className="hero-title-line">inside every problem.</span>
                    </h1>
                    <p className="hero-copy">
                        Ganitam Nirmoktra turns mathematics into a space for curiosity. Explore ideas,
                        solve with confidence, and let each answer open a better question.
                    </p>
                    <div className="hero-actions">
                        <NavLink className="hero-primary-button" to="/lets-start">
                            start your journey
                            <span className="button-icon"><HiArrowLongRight /></span>
                        </NavLink>
                        <a className="hero-scroll-link" href="#journey">
                            <span>scroll to explore</span>
                            <HiArrowLongDown />
                        </a>
                    </div>
                </div>
                <GeometryField />
            </section>

            <div className="subscription-section-wrapper">
                <Subscription />
            </div>

            <section className="feature-section" aria-labelledby="feature-title">
                <div className="section-intro">
                    <span className="section-kicker">a better way to begin</span>
                    <h2 id="feature-title">Make room for the <em>aha</em> moment.</h2>
                    <p>Whether you are brushing up, going deeper, or meeting a topic for the first time, your next step should feel possible.</p>
                </div>
                <div className="feature-grid">
                    {featureItems.map((feature) => (
                        <article className={`feature-item feature-item-${feature.accent}`} key={feature.number}>
                            <span className="feature-number">{feature.number}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="practice-section" aria-labelledby="practice-title">
                <div className="practice-content">
                    <span className="section-kicker">your practice room</span>
                    <h2 id="practice-title">Questions are better when they lead somewhere.</h2>
                    <p>Collect the problems that catch your attention, then return to them when you are ready to see a new angle.</p>
                    <NavLink className="outline-button" to="/lets-start">
                        explore the practice room
                        <HiArrowLongRight />
                    </NavLink>
                </div>
                <figure className="practice-visual">
                    <img src={questionOverview} alt="A visual overview of mathematics questions and learning paths" />
                    <figcaption>Every question is a small map.</figcaption>
                </figure>
            </section>

            <section className="topic-section" aria-labelledby="topic-title">
                <div className="section-intro topic-intro">
                    <span className="section-kicker">follow your curiosity</span>
                    <h2 id="topic-title">Where should we wander next?</h2>
                </div>
                <div className="topic-grid">
                    {topicItems.map((topic) => (
                        <NavLink className="topic-item" to="/lets-start" key={topic.title}>
                            <span className="topic-mark">{topic.mark}</span>
                            <span className="topic-title">{topic.title}</span>
                            <HiArrowLongRight />
                        </NavLink>
                    ))}
                </div>
            </section>

            <section className="process-section" aria-labelledby="process-title">
                <div className="section-intro process-intro">
                    <span className="section-kicker">start small, go far</span>
                    <h2 id="process-title">A rhythm that keeps you moving.</h2>
                </div>
                <div className="process-list">
                    <article className="process-step">
                        <span className="process-icon">1</span>
                        <div><h3>Pick a question</h3><p>Start with the idea that is asking for your attention.</p></div>
                    </article>
                    <article className="process-step">
                        <span className="process-icon">2</span>
                        <div><h3>Work the pattern</h3><p>Follow the clues and make the next useful move.</p></div>
                    </article>
                    <article className="process-step">
                        <span className="process-icon">3</span>
                        <div><h3>Make it yours</h3><p>Reflect on the solution so the learning stays with you.</p></div>
                    </article>
                </div>
            </section>

            <section className="reassurance-section" aria-labelledby="reassurance-title">
                <div className="reassurance-heading">
                    <span className="section-kicker">a little reassurance</span>
                    <h2 id="reassurance-title">You do not have to know everything before you begin.</h2>
                </div>
                <div className="reassurance-list">
                    {reassuranceItems.map((item) => (
                        <article className="reassurance-item" key={item.question}>
                            <h3>{item.question}</h3>
                            <p>{item.answer}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="journey" className="journey-section" aria-labelledby="journey-title">
                <span className="journey-shape journey-shape-square" aria-hidden="true" />
                <span className="journey-shape journey-shape-triangle" aria-hidden="true" />
                <span className="journey-mark">keep going</span>
                <h2 id="journey-title" className="journey-heading">
                    Start your learning journey in a few simple steps.
                </h2>
                <div className="final-cta">
                    <p>Bring one question. We will take it from there.</p>
                    <NavLink className="hero-primary-button" to="/lets-start">
                        let&apos;s start
                        <span className="button-icon"><HiArrowLongRight /></span>
                    </NavLink>
                </div>
                <div className="journey-trail" aria-label="What happens next">
                    <span><b>01</b> choose a question</span>
                    <i aria-hidden="true" />
                    <span><b>02</b> find a pattern</span>
                    <i aria-hidden="true" />
                    <span><b>03</b> make it yours</span>
                </div>
            </section>
        </main>
    )
}

export default Homepage