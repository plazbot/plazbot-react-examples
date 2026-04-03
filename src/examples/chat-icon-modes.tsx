/**
 * Icon Modes
 *
 * El SDK usa iconos para representar acciones del agente (contacto,
 * calendario, transferencia, etc). Puedes elegir entre:
 *
 * - 'svg'   : Iconos vectoriales Lucide-style (default)
 * - 'emoji' : Emojis Unicode
 * - 'none'  : Sin iconos
 * - Custom  : Mapa parcial de { iconKey: ReactNode }
 */

import { Plazbot } from 'plazbot'
import { PlazbotProvider, Chat } from 'plazbot/react'
import type { IconMode } from 'plazbot/react'
import { useState } from 'react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Modo custom: iconos personalizados ──────────────────────────────────────
const customIcons: IconMode = {
  contact: <span style={{ fontSize: 14 }}>&#x1F464;</span>,
  calendar: <span style={{ fontSize: 14 }}>&#x1F5D3;</span>,
  mail: <span style={{ fontSize: 14 }}>&#x2709;</span>,
  phone: <span style={{ fontSize: 14 }}>&#x260E;</span>,
  check: <span style={{ fontSize: 14 }}>&#x2714;</span>,
}

type ModeOption = 'svg' | 'emoji' | 'none' | 'custom'

const modes: Record<ModeOption, IconMode> = {
  svg: 'svg',
  emoji: 'emoji',
  none: 'none',
  custom: customIcons,
}

// ─── Componente ──────────────────────────────────────────────────────────────
export default function ChatIconModes() {
  const [active, setActive] = useState<ModeOption>('svg')

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: '0 16px' }}>
      {/* Selector de modo */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(Object.keys(modes) as ModeOption[]).map((key) => (
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

      {/* Chat con iconMode seleccionado */}
      <div style={{ height: '70vh' }}>
        <PlazbotProvider sdk={sdk} agentId={AGENT_ID} iconMode={modes[active]}>
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
