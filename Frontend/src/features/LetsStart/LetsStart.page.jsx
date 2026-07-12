import { useState } from 'react'
import { FiArrowUp, FiHelpCircle, FiMenu, FiMessageSquare, FiPaperclip, FiPlus, FiX } from 'react-icons/fi'
import './LetsStart.style.css'

const LetsStartpage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [question, setQuestion] = useState('')

  const selectPrompt = (prompt) => {
    setQuestion(prompt)
  }

  return (
    <main className="lets-start-page">
      <aside className={`lets-start-sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} aria-label="Learning navigation">
        <button
          className="menu-toggle"
          type="button"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen((open) => !open)}
        >
          {isSidebarOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <nav className="sidebar-nav">
          <button className="sidebar-action primary-action" type="button">
            <FiPlus aria-hidden="true" />
            <span>New question</span>
          </button>
          <button className="sidebar-action" type="button">
            <FiMessageSquare aria-hidden="true" />
            <span>Recent questions</span>
          </button>
          <button className="sidebar-action" type="button">
            <FiHelpCircle aria-hidden="true" />
            <span>How it works</span>
          </button>
        </nav>
      </aside>
        

      <section className={`lets-start-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="welcome-area">
          <h1>Welcome, how can I help you?</h1>
          <p>Ask a question and we’ll work through it together.</p>
          <div className="prompt-list" aria-label="Suggested questions">
            {['Explain this math problem', 'Help me prepare for a test', 'Show me a worked example'].map((prompt) => (
              <button key={prompt} type="button" onClick={() => selectPrompt(prompt)}>{prompt}</button>
            ))}
          </div>
        </div>
      </section>

      <form className={`search-dock ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} onSubmit={(event) => event.preventDefault()}>
        <div className="search-box">
          <button className="attach-button" type="button" aria-label="Attach a file">
            <FiPaperclip aria-hidden="true" />
          </button>
          <label className="sr-only" htmlFor="question">Your question</label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Type your question here…"
            rows="1"
          />
          <button className="send-button" type="submit" aria-label="Send question" disabled={!question.trim()}>
            <FiArrowUp aria-hidden="true" />
          </button>
        </div>
        <p>Press Enter to send · Shift + Enter for a new line</p>
      </form>
    </main>
  )
}

export default LetsStartpage
