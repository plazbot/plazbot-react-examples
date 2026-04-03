/**
 * Chat Widget
 *
 * <ChatWidget /> es un boton flotante que abre un chat embebido.
 * Ideal para integrarlo en cualquier sitio web sin modificar el layout.
 */

import { Plazbot } from 'plazbot'
import { PlazbotProvider, ChatWidget } from 'plazbot/react'

// ─── Inicializar SDK ─────────────────────────────────────────────────────────
const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

const AGENT_ID = 'YOUR_AGENT_ID'

// ─── Componente ──────────────────────────────────────────────────────────────
export default function ChatWidgetExample() {
  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Chat Widget</h2>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>
        El boton flotante aparece en la esquina inferior derecha.
        Haz click para abrir el chat.
      </p>

      <PlazbotProvider sdk={sdk} agentId={AGENT_ID}>
        <ChatWidget
          position="bottom-right"
          offset={24}
          width={400}
          height={600}
          defaultOpen={false}
          icon="robot"
          buttonColor="#2D84C7"
          placeholder="Escribe tu mensaje..."
          allowAttachments
          showPoweredBy
          suggestedQuestions={[
            'Que es Plazbot?',
            'Como empiezo?',
          ]}
          onMessage={(msg) => console.log('Widget mensaje:', msg)}
        />
      </PlazbotProvider>
    </div>
  )
}
