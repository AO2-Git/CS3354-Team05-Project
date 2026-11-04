const plannedFeatures = [
  'Browse upcoming UTD events',
  'Filter by category and organizer',
  'View event details',
  'Add events to your calendar',
]

function App() {
  return (
    <main className="shell">
      <header className="header">
        <p className="eyebrow">UT Dallas event finder</p>
        <h1>Whoosh Events</h1>
        <p className="intro">
          One place to discover clubs, academic, career, arts, and community
          events around campus.
        </p>
      </header>

      <section className="starter-card" aria-labelledby="starter-title">
        <span className="badge">React starter</span>
        <h2 id="starter-title">Your next event starts here.</h2>
        <p>
          The application shell is ready. Event data, filters, source
          scrapers, and calendar export will be added next.
        </p>
        <ul>
          {plannedFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
