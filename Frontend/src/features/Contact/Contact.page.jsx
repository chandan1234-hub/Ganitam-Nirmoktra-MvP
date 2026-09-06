import { useRef, useState } from 'react'
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { NavLink, useNavigate } from 'react-router'
import './Contact.style.css'

const contactDetails = [
    { icon: Mail, label: 'Email us', value: 'hello@ganitamnirmoktra.com' },
    { icon: MapPin, label: 'Find us', value: '100 Smith Street, Collingwood VIC 3066 AU' },
    { icon: Phone, label: 'Call us', value: '+1 (555) 000-0000' },
]

const Contactpage = () => {
    const form = useRef(null)
    const navigate = useNavigate()
    const [isSending, setIsSending] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const sendEmail = async (event) => {
        event.preventDefault()
        setIsSending(true)
        setErrorMessage('')

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_KEY,
                import.meta.env.VITE_EMAILJS_TEMPLATE_KEY,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            )
            navigate('/thankyou')
        } catch (error) {
            console.error('Sending contact form failed:', error)
            setErrorMessage('Something went wrong. Please try again or email us directly.')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <main className="contact-page">
            <section className="contact-hero" aria-labelledby="contact-title">
                <div className="contact-hero-copy">
                    <div className="contact-kicker"><span /> let&apos;s talk</div>
                    <h1 id="contact-title">Bring us your <em>big question.</em></h1>
                    <p>Whether you have feedback, a curious idea, or need a hand getting started, we would love to hear from you.</p>
                    <NavLink className="contact-back-link" to="/faq">browse common questions <ArrowRight /></NavLink>
                </div>
                <div className="contact-orbit" aria-hidden="true">
                    <span className="contact-orbit-ring contact-orbit-ring-one" />
                    <span className="contact-orbit-ring contact-orbit-ring-two" />
                    <span className="contact-orbit-square" />
                    <span className="contact-orbit-dot" />
                    <strong>?</strong>
                </div>
            </section>

            <section className="contact-body" aria-labelledby="message-title">
                <div className="contact-details">
                    <span className="contact-kicker">the practical bits</span>
                    <h2>We are listening.</h2>
                    <p>Send a note and our team will get back to you as soon as we can.</p>
                    <div className="contact-detail-list">
                        {contactDetails.map(({ icon: Icon, label, value }) => (
                            <div className="contact-detail" key={label}>
                                <span className="contact-detail-icon"><Icon /></span>
                                <div><strong>{label}</strong><span>{value}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-form-panel">
                    <div className="contact-form-heading">
                        <span className="contact-form-mark"><CheckCircle2 /></span>
                        <div><h2 id="message-title">Write to us</h2><p>We usually reply within one working day.</p></div>
                    </div>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="contact-form-row">
                            <label>Full name<input name="from_name" type="text" placeholder="Your name" required /></label>
                            <label>Email address<input name="reply_to" type="email" placeholder="you@example.com" required /></label>
                        </div>
                        <label>Message<textarea name="message" placeholder="What is on your mind?" rows="6" required /></label>
                        {errorMessage && <p className="contact-error" role="alert">{errorMessage}</p>}
                        <button className="contact-submit" type="submit" disabled={isSending}>
                            {isSending ? 'sending...' : 'send message'}
                            {!isSending && <ArrowRight />}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Contactpage