/**
 * Theming
 *
 * El SDK soporta tema 'light', 'dark' o un objeto PlazbotTheme
 * parcial para personalizar colores, tipografia, bordes y sombras.
 */

import { Plazbot } from 'plazbot'
import { PlazbotProvider, Chat } from 'plazbot/react'
import type { PlazbotTheme } from 'plazbot/react'
import { useState } from 'react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Temas ───────────────────────────────────────────────────────────────────

// Tema custom: colores de marca
const brandTheme: Partial<PlazbotTheme> = {
  primaryColor: '#7c3aed',
  backgroundColor: '#faf5ff',
  surfaceColor: '#f3e8ff',
  textColor: '#1e1b4b',
  textSecondary: '#6b21a8',
  borderColor: '#ddd6fe',
  bubbleUserBg: '#7c3aed',
  bubbleUserText: '#ffffff',
  bubbleAgentBg: '#ede9fe',
  bubbleAgentText: '#1e1b4b',
  borderRadius: '8px',
  fontFamily: '"Inter", sans-serif',
}

// Tema custom: oscuro personalizado
const darkCustomTheme: Partial<PlazbotTheme> = {
  primaryColor: '#38bdf8',
  backgroundColor: '#0f172a',
  surfaceColor: '#1e293b',
  textColor: '#f1f5f9',
  textSecondary: '#94a3b8',
  borderColor: '#334155',
  bubbleUserBg: '#0ea5e9',
  bubbleUserText: '#ffffff',
  bubbleAgentBg: '#1e293b',
  bubbleAgentText: '#f1f5f9',
  cardBg: '#1e293b',
  cardBorder: '#334155',
}

type ThemeOption = 'light' | 'dark' | 'brand' | 'dark-custom'

const themes: Record<ThemeOption, 'light' | 'dark' | Partial<PlazbotTheme>> = {
  light: 'light',
  dark: 'dark',
  brand: brandTheme,
  'dark-custom': darkCustomTheme,
}

// ─── Componente ──────────────────────────────────────────────────────────────
export default function ChatTheming() {
  const [active, setActive] = useState<ThemeOption>('light')

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: '0 16px' }}>
      {/* Selector de tema */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(Object.keys(themes) as ThemeOption[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: active === key ? '1px solid #2D84C7' : '1px solid #e5e7eb',
              background: active === key ? '#eff6ff' : '#fff',
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: active === key ? 600 : 400,
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Chat con tema seleccionado */}
      <div style={{ height: '70vh' }}>
        <PlazbotProvider sdk={sdk} agentId={AGENT_ID} theme={themes[active]}>
          <Chat
            showHeader
            showPoweredBy
            style={{ height: '100%', borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
        </PlazbotProvider>
      </div>
    </div>
  )
}
