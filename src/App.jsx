import { useState } from 'react'
import './App.css'
import Guidelines from './Guidelines'
import ContentChecker from './ContentChecker'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    'Dashboard',
    'Brand Guidelines',
    'Content Checker',
    'Review & Approval',
    'History'
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🛡 BrandGuard AI</h2>
        <p className="tagline">A little help keeping your brand consistent</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? 'active' : ''}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          Made for thoughtful, consistent content
        </div>
      </aside>

      <main className="main-content">
        <header>
          <div>
            <h1>{activePage}</h1>
            <p>A good place to pick up where you left off.</p>
          </div>
          <div className="profile">Admin</div>
        </header>

        {activePage === 'Dashboard' && (
          <>
            <section className="welcome">
              <p className="eyebrow">YOUR BRAND WORKSPACE</p>
              <h2>Good to have you here.</h2>
              <p>
                A quick check can help keep your content sounding and feeling
                like your brand. What would you like to work on?
              </p>
              <button onClick={() => setActivePage('Content Checker')}>
                Check some content →
              </button>
            </section>

            <section className="stats">
              <div className="stat-card">
                <h3>0</h3>
                <p>Pieces checked</p>
              </div>
              <div className="stat-card">
                <h3>0</h3>
                <p>Things to review</p>
              </div>
              <div className="stat-card">
                <h3>0</h3>
                <p>Ready to share</p>
              </div>
            </section>

            <section className="info-card">
              <p className="eyebrow">A GOOD PLACE TO START</p>
              <h2>Keep it simple</h2>
              <p>
                Add your brand guidelines first. Then, whenever you need a
                second pair of eyes, check a piece of content.
              </p>
            </section>
          </>
        )}

        {activePage === 'Brand Guidelines' && <Guidelines />}

        {activePage === 'Content Checker' && <ContentChecker />}

        {activePage === 'Review & Approval' && (
          <section className="info-card">
            <h2>Review & Approval</h2>
            <p>
              Anything that needs a closer look will have a home here.
            </p>
          </section>
        )}

        {activePage === 'History' && (
          <section className="info-card">
            <h2>Content History</h2>
            <p>
              Your past content checks will show up here when they’re ready.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App