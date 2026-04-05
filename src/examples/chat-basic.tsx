/**
 * Chat Basico
 *
 * El componente <Chat /> renderiza un chat completo con header,
 * mensajes, input y sugerencias. Solo necesitas envolver con
 * <PlazbotProvider> y pasarle el SDK + agentId.
 */

import { Plazbot } from 'plazbot'
import { PlazbotProvider, Chat } from 'plazbot/react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Componente ──────────────────────────────────────────────────────────────
export default function ChatBasic() {
  return (
    <div style={{ maxWidth: 480, height: '80vh', margin: '40px auto' }}>
      <PlazbotProvider sdk={sdk} agentId={AGENT_ID}>
        <Chat
          showHeader
          showPoweredBy={false}
          placeholder="Escribe tu mensaje ahora..."
          allowAttachments
          suggestedQuestions={[
            'Que servicios ofrecen?',
            'Como puedo contactarlos?',
          ]}
          onMessage={(msg) => console.log('Mensaje:', msg)}
          onError={(err) => console.error('Error:', err)}
          style={{ height: '100%', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      </PlazbotProvider>
    </div>
  )
}
