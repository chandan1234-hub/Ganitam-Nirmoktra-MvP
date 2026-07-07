import './FAQ.style.css'
import {useState, useRef} from 'react';

const faqCategories = [
    {
        title: "Getting Started",
        id: "cat-getting-started",
        items: [
            {
                q: "How do I create a new workspace?",
                a: "To create a new workspace, click the \"+\" button in your dashboard sidebar or navigate to Settings Workspaces Create New. You can customize your workspace name, invite team members, and set permissions during the setup process."
            },
            {
                q: "Can I use the platform without a credit card?",
                a: "Yes! You can start with our free tier that doesn't require a credit card. The free plan includes basic features and limited storage. You'll only need to add payment information when upgrading to a paid plan."
            },
            {
                q: "Is onboarding available for teams?",
                a: "Absolutely! We offer comprehensive onboarding sessions for teams of 5 or more users. This includes personalized training, best practices workshops, and dedicated support during your first month."
            },
            {
                q: "Do I need to install anything?",
                a: "No, you don't need to install anything. Our platform is entirely web-based, so you can access it from any device with a modern browser. Just sign up for an account and you're ready to go!"
            },
            {
                q: "Can I invite collaborators to my project?",
                a: "Yes, you can invite collaborators to your project. Simply go to your project settings and select the \"Invite Collaborators\" option. You can then add team members by their email addresses and assign them specific roles and permissions."
            }
        ]
    },
    {
        title: "Billing & Subscriptions",
        id: "cat-billing-subscriptions",
        items: [
            {
                q: "How does the free trial work?",
                a: "Our free trial allows you to explore all premium features for a limited time without requiring a credit card. You can sign up for the trial directly from our website, and you'll receive a notification before the trial ends."
            },
            {
                q: "Where can I update my payment method?",
                a: "Yes! You can update your payment method at any time by going to your account settings and navigating to the \"Billing\" section."
            },
            {
                q: "Do you offer refunds?",
                a: "We offer refunds on a case-by-case basis. If you are unsatisfied with our service, please contact our support team within 30 days of your purchase."
            },
            {
                q: "What happens if I cancel my subscription?",
                a: "If you cancel your subscription, you will still have access to the platform until the end of your current billing period."
            }
        ]
    },
    {
        title: "Features & Usage",
        id: "cat-features-usage",
        items: [
            {
                q: "Can I connect third-party apps or tools?",
                a: "Absolutely! We integrate with over 50 popular tools including Slack, Google Workspace, Microsoft 365, Trello, Asana, and more."
            },
            {
                q: "How do I restore a deleted item?",
                a: "Yes! You can restore deleted items from the \"Trash\" or \"Deleted Items\" section in your account settings."
            },
            {
                q: "Is version history available?",
                a: "Yes, version history is available for all your files. You can access it by navigating to the \"Versions\" tab in the file details view."
            },
            {
                q: "How do notifications work?",
                a: "Notifications are sent to your email address and can be managed in your account settings. You can choose which types of notifications you want to receive."
            }
        ]
    }
];

const
    FAQpage = () => {
        const [openItems, setOpenItems] = useState(new Set());
        const contentRefs = useRef({});

        const toggleItem = (categoryId, itemIndex) => {
            const key = `${categoryId}-${itemIndex}`;
            const newOpenItems = new Set(openItems);
            if (newOpenItems.has(key)) {
                newOpenItems.delete(key);
            } else {
                newOpenItems.add(key);
            }
            setOpenItems(newOpenItems);
        };
        return (
            <div className="max-w-4xl mx-auto p-4 mt-10">
                <div className="max-w-3xl mb-12 md:mb-16  ">
                    <h2 className="text-slate-900 text-3xl font-bold md:text-4xl dark:text-slate-50 ">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-white mt-4 leading-relaxed">
                        Last updated July 2025
                    </p>
                </div>

                <div className="space-y-12">
                    {faqCategories.map((category, catIdx) => (
                        <section key={category.id} aria-labelledby={category.id}>
                            <h3 id={category.id}
                                className="text-xl font-semibold text-slate-900 mb-2 dark:text-slate-50">
                                {category.title}
                            </h3>

                            <div className="divide-y divide-slate-300 dark:divide-neutral-700">
                                {category.items.map((item, itemIdx) => {
                                    const itemKey = `${catIdx}-${itemIdx}`;
                                    const isOpen = openItems.has(itemKey);

                                    return (
                                        <div key={itemKey} className="faq-item">
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                id={`faq-button-${itemKey}`}
                                                aria-controls={`faq-panel-${itemKey}`}
                                                onClick={() => toggleItem(catIdx, itemIdx)}
                                                className="toggle-button py-6 cursor-pointer text-left w-full text-base outline-none font-semibold text-slate-900 flex items-center focus-visible:ring-2 focus-visible:ring-blue-500 rounded dark:text-slate-50"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="size-3.5 overflow-visible fill-current shrink-0"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z"/>
                                                    <path
                                                        className={`transition-all duration-300 transform origin-center ${isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                                                        }`}
                                                        d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z"
                                                    />
                                                </svg>
                                                <span className="ml-4">{item.q}</span>
                                            </button>
                                            <div
                                                ref={(el) => (contentRefs.current[itemKey] = el)}
                                                id={`faq-panel-${itemKey}`}
                                                aria-labelledby={`faq-button-${itemKey}`}
                                                aria-hidden={!isOpen}
                                                style={{
                                                    maxHeight: isOpen ? `${contentRefs.current[itemKey]?.scrollHeight}px` : "0px",
                                                }}
                                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                            >
                                                <p className="ml-8 pb-6 text-base text-slate-600 leading-relaxed dark:text-slate-400">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        )
    }

export default FAQpage
