import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ChatBasic from './examples/chat-basic'
import ChatWidget from './examples/chat-widget'
import ChatHooks from './examples/chat-hooks'
import ChatCustomCards from './examples/chat-custom-cards'
import ChatTheming from './examples/chat-theming'
import ChatIconModes from './examples/chat-icon-modes'

const examples = [
  { path: '/chat-basic', label: 'Chat', component: ChatBasic },
  { path: '/chat-widget', label: 'Widget', component: ChatWidget },
  { path: '/chat-hooks', label: 'Hooks', component: ChatHooks },
  { path: '/chat-custom-cards', label: 'Custom Cards', component: ChatCustomCards },
  { path: '/chat-theming', label: 'Theming', component: ChatTheming },
  { path: '/chat-icon-modes', label: 'Icon Modes', component: ChatIconModes },
]

function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Plazbot React Examples</h1>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 14 }}>
        Working examples for every feature in <code>plazbot/react</code>.
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {examples.map((ex) => (
          <Link
            key={ex.path}
            to={ex.path}
            style={{
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              color: '#111',
              textDecoration: 'none',
            }}
          >
            {ex.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {!isHome && (
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', fontSize: 13, color: '#6b7280' }}>
          <Link to="/" style={{ color: '#2D84C7', textDecoration: 'none' }}>&larr; All examples</Link>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {examples.map((ex) => (
          <Route key={ex.path} path={ex.path} element={<ex.component />} />
        ))}
      </Routes>
    </>
  )
}
