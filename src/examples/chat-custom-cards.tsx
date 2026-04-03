/**
 * Custom Card Renderers
 *
 * Cuando el agente ejecuta una accion (service/action), el SDK
 * renderiza una tarjeta con el resultado. Puedes reemplazar o agregar
 * tus propios renderers con customCardRenderers.
 *
 * Cada renderer recibe { action } con los datos de la accion ejecutada.
 */

import { Plazbot } from 'plazbot'
import { PlazbotProvider, Chat } from 'plazbot/react'
import type { ComponentType } from 'react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Card custom para "buscar_producto" ──────────────────────────────────────
interface ActionProps {
  action: { name?: string; intent?: string; result?: unknown }
}

const ProductCard: ComponentType<ActionProps> = ({ action }) => {
  const data = action.result as {
    name?: string
    price?: number
    image?: string
    stock?: boolean
  } | undefined

  if (!data) return null

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        padding: 12,
        marginTop: 8,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      {data.image && (
        <img
          src={data.image}
          alt={data.name}
          style={{ width: 56, height: 56, borderRadius: 4, objectFit: 'cover' }}
        />
      )}
      <div>
        <p style={{ fontWeight: 600, fontSize: 14 }}>{data.name}</p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          ${data.price?.toFixed(2)} {data.stock ? '- En stock' : '- Agotado'}
        </p>
      </div>
    </div>
  )
}

// ─── Card custom para "agendar_cita" ─────────────────────────────────────────
const AppointmentCard: ComponentType<ActionProps> = ({ action }) => {
  const data = action.result as {
    date?: string
    time?: string
    doctor?: string
    confirmed?: boolean
  } | undefined

  if (!data) return null

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        padding: 12,
        marginTop: 8,
        background: data.confirmed ? '#f0fdf4' : '#fef2f2',
      }}
    >
      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
        {data.confirmed ? 'Cita confirmada' : 'Cita pendiente'}
      </p>
      <p style={{ fontSize: 13, color: '#374151' }}>
        {data.date} a las {data.time} con {data.doctor}
      </p>
    </div>
  )
}

// ─── Componente ──────────────────────────────────────────────────────────────
export default function ChatCustomCards() {
  return (
    <div style={{ maxWidth: 480, height: '80vh', margin: '40px auto' }}>
      <PlazbotProvider sdk={sdk} agentId={AGENT_ID}>
        <Chat
          showHeader
          showPoweredBy
          customCardRenderers={{
            buscar_producto: ProductCard,
            agendar_cita: AppointmentCard,
          }}
          onActionExecuted={(action) => console.log('Accion ejecutada:', action)}
          style={{ height: '100%', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      </PlazbotProvider>
    </div>
  )
}
