/**
 * Hooks: useChat, useAgent, useSession
 *
 * Los hooks permiten construir una UI de chat completamente custom.
 * useChat() controla mensajes, loading y errores.
 * useAgent() obtiene la informacion del agente.
 * useSession() genera y persiste el sessionId.
 */

import { Plazbot } from 'plazbot'
import {
  PlazbotProvider,
  useChat,
  useAgent,
  useSession,
  PoweredBy,
} from 'plazbot/react'
import { useState } from 'react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Chat custom con hooks ──────────────────────────────────────────────────
function CustomChat() {
  const { agent, isLoading: agentLoading } = useAgent()
  const sessionId = useSession()
  const { messages, isLoading, error, sendMessage, clearMessages, retry } = useChat()
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return
    const text = input
    setInput('')
    await sendMessage(text)
  }

  if (agentLoading) {
    return <p style={{ color: '#9ca3af', fontSize: 13, padding: 24 }}>Cargando agente...</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
        <strong>{agent?.person?.name ?? agent?.name ?? 'Agente'}</strong>
        <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 8 }}>
          Session: {sessionId.slice(0, 8)}...
        </span>
        <button
          onClick={clearMessages}
          style={{ float: 'right', fontSize: 12, color: '#2D84C7', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Limpiar
        </button>
      </div>

      {/* Mensajes */}
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {messages.length === 0 && (
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Envia un mensaje para empezar.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: 12,
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14,
                maxWidth: '80%',
                background: msg.role === 'user' ? '#2D84C7' : '#f3f4f6',
                color: msg.role === 'user' ? '#fff' : '#111',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <p style={{ color: '#9ca3af', fontSize: 13 }}>Escribiendo...</p>}
        {error && (
          <div style={{ color: '#dc2626', fontSize: 13 }}>
            Error: {error}{' '}
            <button onClick={retry} style={{ color: '#2D84C7', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              Reintentar
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #e5e7eb' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe aqui..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none' }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{ padding: '8px 16px', borderRadius: 6, background: '#2D84C7', color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer' }}
        >
          Enviar
        </button>
      </div>

      {/* Powered by custom */}
      <PoweredBy label="Powered by" brandName="Mi Empresa" href="https://miempresa.com" />
    </div>
  )
}

// ─── Wrapper con Provider ────────────────────────────────────────────────────
export default function ChatHooks() {
  return (
    <div style={{ maxWidth: 480, height: '80vh', margin: '40px auto', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
      <PlazbotProvider sdk={sdk} agentId={AGENT_ID}>
        <CustomChat />
      </PlazbotProvider>
    </div>
  )
}
