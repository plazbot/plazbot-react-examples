<p align="center">
  <img src="https://storage-files-plz-latam.s3.sa-east-1.amazonaws.com/master/logo-plazbot.png" alt="Plazbot" width="200" />
</p>

<h1 align="center">Plazbot React Examples</h1>

<p align="center">
  <strong>AI Agents for React.</strong><br/>
  Chat, Widget, Hooks, Theming, Custom Cards and more.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/plazbot"><img src="https://img.shields.io/npm/v/plazbot?style=flat-square&color=blue" alt="npm" /></a>
  <a href="https://docs.plazbot.com"><img src="https://img.shields.io/badge/docs-plazbot.com-blue?style=flat-square" alt="docs" /></a>
  <a href="https://discord.gg/SgyAtrwzp7"><img src="https://img.shields.io/badge/Discord-Join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="discord" /></a>
  <a href="https://twitter.com/plazbotia"><img src="https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=flat-square&logo=twitter&logoColor=white" alt="twitter" /></a>
</p>

---

## What is this?

Working examples for every feature in [`plazbot/react`](https://www.npmjs.com/package/plazbot) — the React SDK for building AI chat interfaces powered by [Plazbot](https://plazbot.com).

Each example is a standalone component you can run locally and use as a starting point for your own integration.

---

## Installation

```bash
npm install plazbot
```

---

## Quick Start

```tsx
import { Plazbot } from 'plazbot'
import { PlazbotProvider, Chat } from 'plazbot/react'

const sdk = new Plazbot({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY',
  zone: 'LA',
})

export default function App() {
  return (
    <PlazbotProvider sdk={sdk} agentId="YOUR_AGENT_ID">
      <Chat showHeader showPoweredBy />
    </PlazbotProvider>
  )
}
```

---

## Credentials

Get your **API Key** and **Workspace ID** from the [Plazbot Dashboard](https://www.plazbot.com):

1. Log in to your account
2. Go to **Settings** > **API KEY**
3. Copy your `API Key` and `Workspace ID`

Guides:
- [Create an Account](https://docs.plazbot.com/guides/primeros-pasos/creacion-cuenta)
- [Developer Documentation](https://docs.plazbot.com/sdk/introduccion)

---

## Examples

### Project Structure

```
plazbot-react-examples/
  src/
    main.tsx                           # Entry point
    App.tsx                            # Router with all examples
    examples/
      chat-basic.tsx                   # <Chat /> with basic props
      chat-widget.tsx                  # <ChatWidget /> floating button
      chat-hooks.tsx                   # useChat + useAgent + useSession
      chat-custom-cards.tsx            # customCardRenderers
      chat-theming.tsx                 # Light, dark and custom themes
      chat-icon-modes.tsx              # SVG, emoji, none, custom icons
```

### Running the Examples

```bash
git clone https://github.com/plazbot/plazbot-react-examples.git
cd plazbot-react-examples
npm install
```

Edit the example files and replace `YOUR_WORKSPACE_ID`, `YOUR_API_KEY` and `YOUR_AGENT_ID` with your credentials. Then:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and navigate to each example.

---

## Chat

The `<Chat />` component renders a complete chat interface: header, messages, input and suggested questions.

```tsx
<PlazbotProvider sdk={sdk} agentId="ag_xxxx">
  <Chat
    showHeader
    showPoweredBy
    placeholder="Escribe tu mensaje..."
    allowAttachments
    suggestedQuestions={['Que servicios ofrecen?', 'Como empiezo?']}
    onMessage={(msg) => console.log(msg)}
    onError={(err) => console.error(err)}
  />
</PlazbotProvider>
```

### Chat Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `true` | Show agent header with name and status |
| `showPoweredBy` | `boolean \| PoweredByProps` | `false` | Show attribution footer |
| `placeholder` | `string` | `"Escribe un mensaje..."` | Input placeholder text |
| `allowAttachments` | `boolean` | `false` | Enable file attachments |
| `suggestedQuestions` | `string[]` | `[]` | Quick-reply buttons in empty state |
| `customCardRenderers` | `Record<string, ComponentType>` | `{}` | Custom card renderers by intent |
| `onMessage` | `(msg: ChatMessage) => void` | — | Callback on new message |
| `onActionExecuted` | `(action: ActionExecuted) => void` | — | Callback on action executed |
| `onError` | `(error: string) => void` | — | Callback on error |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |

---

## Chat Widget

`<ChatWidget />` renders a floating button that opens an embedded chat. Drop it into any page without modifying your layout.

```tsx
<PlazbotProvider sdk={sdk} agentId="ag_xxxx">
  <ChatWidget
    position="bottom-right"
    offset={24}
    width={400}
    height={600}
    defaultOpen={false}
    icon="robot"
    buttonColor="#2D84C7"
    showPoweredBy
  />
</PlazbotProvider>
```

### ChatWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Screen position |
| `offset` | `number` | `24` | Distance from edge (px) |
| `width` | `number` | `400` | Chat panel width (px) |
| `height` | `number` | `600` | Chat panel height (px) |
| `defaultOpen` | `boolean` | `false` | Open on mount |
| `icon` | `WidgetIcon` | `'robot'` | Button icon |
| `buttonColor` | `string` | `'#2D84C7'` | Button background color |
| `placeholder` | `string` | — | Input placeholder |
| `allowAttachments` | `boolean` | `false` | Enable file attachments |
| `suggestedQuestions` | `string[]` | `[]` | Quick-reply suggestions |
| `showPoweredBy` | `boolean \| PoweredByProps` | `false` | Attribution footer |
| `customCardRenderers` | `Record<string, ComponentType>` | `{}` | Custom card renderers |
| `onMessage` | `(msg: ChatMessage) => void` | — | Callback on new message |
| `onActionExecuted` | `(action: ActionExecuted) => void` | — | Callback on action |

**Widget icons:** `robot`, `message`, `support`, `qa`, `chat`, `smile`, `voice`, `uservoice`

---

## Hooks

Build a fully custom chat UI with hooks.

### useChat

```tsx
const { messages, isLoading, error, sendMessage, clearMessages, retry } = useChat({
  onResponse: (msg) => console.log(msg),
  onError: (err) => console.error(err),
})

await sendMessage('Hello!')
```

| Return | Type | Description |
|--------|------|-------------|
| `messages` | `ChatMessage[]` | All messages in the conversation |
| `isLoading` | `boolean` | Agent is processing |
| `error` | `string \| null` | Last error message |
| `sendMessage` | `(content: string, file?: string) => Promise<void>` | Send a message |
| `clearMessages` | `() => void` | Clear all messages |
| `retry` | `() => Promise<void>` | Retry last failed message |

### useAgent

```tsx
const { agent, isLoading, error, refetch } = useAgent()

console.log(agent?.name, agent?.person?.name)
```

| Return | Type | Description |
|--------|------|-------------|
| `agent` | `AgentData \| null` | Agent configuration and metadata |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message |
| `refetch` | `() => void` | Refetch agent data |

### useSession

```tsx
const sessionId = useSession('my-custom-key')
// Returns a UUID persisted in localStorage
```

---

## Custom Card Renderers

When the agent executes an action (service or internal action), the SDK renders a card with the result. You can replace or add your own renderers:

```tsx
const ProductCard = ({ action }) => {
  const data = action.result as { name: string; price: number }
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 12 }}>
      <strong>{data.name}</strong> — ${data.price}
    </div>
  )
}

<Chat
  customCardRenderers={{
    buscar_producto: ProductCard,    // intent name from agent config
    agendar_cita: AppointmentCard,
  }}
/>
```

The key in `customCardRenderers` must match the `intent` field from the agent's services or actions configuration.

---

## Theming

Pass `theme` to `<PlazbotProvider>`:

```tsx
// Built-in themes
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" theme="light">
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" theme="dark">

// Custom theme (partial override)
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" theme={{
  primaryColor: '#7c3aed',
  backgroundColor: '#faf5ff',
  bubbleUserBg: '#7c3aed',
  bubbleUserText: '#ffffff',
  borderRadius: '8px',
}}>
```

### Theme Properties

| Property | Type | Description |
|----------|------|-------------|
| `primaryColor` | `string` | Primary accent color |
| `backgroundColor` | `string` | Chat background |
| `surfaceColor` | `string` | Surface/card backgrounds |
| `textColor` | `string` | Primary text color |
| `textSecondary` | `string` | Secondary text color |
| `borderColor` | `string` | Border color |
| `bubbleUserBg` | `string` | User message background |
| `bubbleUserText` | `string` | User message text color |
| `bubbleAgentBg` | `string` | Agent message background |
| `bubbleAgentText` | `string` | Agent message text color |
| `inputBg` | `string` | Input background |
| `inputBorder` | `string` | Input border color |
| `cardBg` | `string` | Card background |
| `cardBorder` | `string` | Card border color |
| `successColor` | `string` | Success state color |
| `errorColor` | `string` | Error state color |
| `warningColor` | `string` | Warning state color |
| `borderRadius` | `string` | Default border radius |
| `borderRadiusLg` | `string` | Large border radius |
| `borderRadiusSm` | `string` | Small border radius |
| `fontFamily` | `string` | Font family |
| `fontSize` | `string` | Base font size |
| `fontSizeSm` | `string` | Small font size |
| `fontSizeLg` | `string` | Large font size |
| `spacing` | `string` | Base spacing |
| `spacingSm` | `string` | Small spacing |
| `spacingLg` | `string` | Large spacing |
| `shadowSm` | `string` | Small shadow |
| `shadowMd` | `string` | Medium shadow |
| `shadowLg` | `string` | Large shadow |

---

## Icon Modes

Control how the SDK renders icons for actions and cards:

```tsx
// SVG icons (default)
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" iconMode="svg">

// Emoji fallback
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" iconMode="emoji">

// No icons
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" iconMode="none">

// Custom icons (partial map)
<PlazbotProvider sdk={sdk} agentId="ag_xxxx" iconMode={{
  contact: <MyContactIcon />,
  calendar: <MyCalendarIcon />,
}}>
```

**Available icon keys:** `contact`, `mail`, `phone`, `calendar`, `clock`, `availability`, `tag`, `assign`, `stage`, `segmentation`, `solved`, `transfer`, `globe`, `gear`, `file`, `source`, `check`, `attach`, `send`

---

## PoweredBy

Customize the attribution footer:

```tsx
import { PoweredBy } from 'plazbot/react'

// Default
<Chat showPoweredBy />

// Custom branding
<Chat showPoweredBy={{
  label: 'Powered by',
  brandName: 'Mi Empresa',
  href: 'https://miempresa.com',
}} />

// Standalone component (inside PlazbotProvider)
<PoweredBy label="Built with" brandName="Plazbot" href="https://plazbot.com" />
```

---

## TypeScript Support

The SDK exports all types for full IntelliSense support:

```ts
import type {
  PlazbotTheme,
  IconMode,
  IconKey,
  ChatMessage,
  ChatFile,
  AgentData,
  AgentConfig,
  AgentPerson,
  AgentInstructions,
  AgentExample,
  AgentSource,
  AgentResponse,
  ActionExecuted,
  WidgetIcon,
  AgentColor,
  PoweredByProps,
  ChatProps,
  ChatWidgetProps,
} from 'plazbot/react'
```

---

## Links

- [NPM Package](https://www.npmjs.com/package/plazbot)
- [SDK Examples (Node.js)](https://github.com/plazbot/plazbot-sdk-examples)
- [Developer Documentation](https://docs.plazbot.com)
- [API Reference](https://docs.plazbot.com/api-reference/introduction)
- [React Playground](https://plazbot.com/developers/react)
- [Changelog](https://docs.plazbot.com/changelog/sdk)

---

## Community

Join us to get updates, early access, and support:

[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/SgyAtrwzp7)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/plazbotia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/plazbotcrm)

**Support:** [support@plazbot.com](mailto:support@plazbot.com)
**Sales & Partnerships:** [sales@plazbot.com](mailto:sales@plazbot.com)

---

## License

MIT
