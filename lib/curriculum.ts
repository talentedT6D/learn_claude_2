export interface Lesson {
  title: string;
  description: string;
  content: string;
}

export interface Module {
  id: number;
  title: string;
  badge: string;
  duration: string;
  lessons: Lesson[];
  quiz: { question: string; options: string[]; correct: number };
  code: { lang: string; snippet: string };
}

export const modules: Module[] = [
  {
    id: 1,
    title: "Intro to Programming & Claude",
    badge: "Foundations",
    duration: "2 weeks",
    lessons: [
      {
        title: "What is Programming?",
        description:
          "Understand what code is and how computers execute instructions step by step.",
        content: `Programming is the process of writing instructions that a computer can understand and execute. Think of it like writing a very precise recipe — every step must be spelled out, in order, with no ambiguity.

**Why does this matter for you?**

As a marketer, designer, or creative professional, you don't need to become a full-time software engineer. But understanding the basics of programming unlocks an entirely new layer of capability. You can automate repetitive tasks, connect tools together, build prototypes, and — most importantly for this course — interact with AI models like Claude through code.

**How computers think**

Computers are extremely fast but extremely literal. They do exactly what you tell them, nothing more, nothing less. When you write code, you're creating a sequence of instructions like:

1. Take this piece of text
2. Send it to an AI model
3. Wait for the response
4. Display the result on screen

Each of those steps is written in a programming language. In this course, we'll use **TypeScript**, which is a version of JavaScript with added safety features. Don't worry — you'll learn it gradually.

**Key concepts to remember**

- **Variables** store data — like a label on a box. For example, \`const name = "Riyon"\` stores the text "Riyon" in a variable called \`name\`.
- **Functions** are reusable blocks of instructions. Think of them as mini-programs within your program that do a specific job.
- **Control flow** determines the order in which instructions run. Sometimes you need to repeat a step (\`for\` loops) or make a decision (\`if/else\` statements).
- **Input and output** — most programs take some input (text, a click, data from a file), process it, and produce output (a response, a file, something on screen).

**Your mental model**

The single most important thing to understand is that programming is about **breaking problems into small, precise steps**. If you can explain a process to a colleague in clear bullet points, you can learn to express it as code. The syntax is just formatting — the thinking is the hard part, and you're already good at that.

**What we'll build toward**

By the end of this module, you'll send a message to Claude's API, receive a response, and understand every piece of the code that makes it happen. That's real programming — not theory, but a working system you built.`,
      },
      {
        title: "Meet Claude — Your AI Pair Programmer",
        description:
          "Learn what Claude can do, how it thinks, and why it is different from a search engine.",
        content: `Claude is an AI assistant built by Anthropic. Unlike a search engine that retrieves existing web pages, Claude **generates** responses by understanding your question and composing an answer word by word. This distinction changes everything about how you should use it.

**Claude is not Google**

When you search Google, you get links to pages that already exist. The quality of your result depends on whether someone has already written about your exact question. Claude is different — it reasons about your input and creates a new response tailored to your specific context. This means:

- You can ask Claude to write in your brand's voice
- You can give it your specific data and ask for analysis
- You can have a multi-turn conversation where each reply builds on the last
- You can ask it to transform content from one format to another

**How Claude "thinks"**

Claude processes text using a large language model (LLM). It has been trained on a vast amount of text data and has learned patterns of language, reasoning, and knowledge. When you send it a message, it predicts the most helpful response based on everything it has learned.

Important things to understand:
- Claude doesn't have memory between separate conversations (unless you build that in)
- It doesn't browse the internet in real-time
- It can be confidently wrong — always verify critical facts
- It works best when you give it clear context and instructions

**What makes Claude special**

Compared to other AI models, Claude is designed to be:
- **Honest** — it will tell you when it's unsure rather than making things up
- **Harmless** — it avoids generating harmful or misleading content
- **Helpful** — it prioritises giving you genuinely useful, actionable answers

**Claude as a teammate, not a tool**

The best way to think about Claude is as a very fast, very knowledgeable colleague who never gets tired. Like any colleague, the quality of their work depends on the quality of your brief. If you say "write me something about marketing," you'll get something generic. If you say "write a 200-word LinkedIn post about how our SaaS product reduced churn by 15%, use a conversational tone, include a call-to-action to book a demo," you'll get something you can actually use.

This idea — that **the quality of your prompt determines the quality of the output** — is the single most important concept in this entire course.

**The API vs the chat interface**

You may have used Claude through the chat interface at claude.ai. That's great for one-off conversations, but it has limits. The API (Application Programming Interface) lets you:
- Integrate Claude directly into your own applications
- Automate AI tasks without manual copy-pasting
- Control exactly how Claude behaves using system prompts
- Process hundreds or thousands of requests programmatically
- Build products and tools powered by Claude

This course teaches you to use the API, because that's where the real power lies.`,
      },
      {
        title: "Your First API Call",
        description:
          "Send a message to Claude's API and receive a response using a simple script.",
        content: `In this lesson, you'll make your first real API call to Claude. By the end, you'll have written a small script that sends a question to Claude and prints the answer in your terminal. This is the foundation for everything else in the course.

**What is an API call?**

An API call is simply your code sending a message to another system and getting a response back. It's like sending a letter and receiving a reply — except it happens in milliseconds. When you "call" Claude's API, you are:

1. Sending an HTTP request to Anthropic's servers
2. Including your message and some settings (like which model to use)
3. Receiving a structured response with Claude's reply

**Setting up your environment**

Before writing code, you need three things:
- **Node.js** installed on your computer (this runs your TypeScript/JavaScript code)
- **An Anthropic API key** from console.anthropic.com (this proves you're authorised to use the API)
- **The Anthropic SDK** installed in your project (\`npm install @anthropic-ai/sdk\`)

Your API key is like a password — never share it publicly, never put it in client-side code, and never commit it to Git. Store it in an environment variable called \`ANTHROPIC_API_KEY\`.

**The anatomy of an API call**

Here's what a basic API call looks like:

\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 256,
  messages: [
    { role: "user", content: "What is an API?" }
  ],
});

console.log(message.content[0].text);
\`\`\`

Let's break down every part:

- **\`import Anthropic\`** — loads the official SDK library
- **\`new Anthropic()\`** — creates a client that knows how to talk to the API. It automatically reads your \`ANTHROPIC_API_KEY\` environment variable.
- **\`client.messages.create()\`** — sends a message to Claude and waits for a response
- **\`model\`** — which version of Claude to use. \`claude-sonnet-4-20250514\` is fast and capable. Opus is more powerful but slower and more expensive.
- **\`max_tokens\`** — the maximum length of Claude's reply, measured in tokens (roughly ¾ of a word each)
- **\`messages\`** — an array of messages in the conversation. Each has a \`role\` (either "user" or "assistant") and \`content\` (the text).
- **\`message.content[0].text\`** — extracts the text from Claude's response

**The messages array**

The messages array is how you structure a conversation. You can include multiple back-and-forth messages to give Claude context:

\`\`\`typescript
messages: [
  { role: "user", content: "I'm building a marketing dashboard." },
  { role: "assistant", content: "That sounds interesting! What data sources will it pull from?" },
  { role: "user", content: "Google Analytics and our CRM. What charts should I include?" }
]
\`\`\`

Claude reads the entire conversation history and responds to the latest message with full context. This is how you build chatbots and multi-turn interactions.

**Try it yourself**

Change the message content to something relevant to your work. Try asking Claude to:
- Summarise a concept you're learning
- Write a short piece of marketing copy
- Explain a technical term in simple language

Run the script each time and notice how the response changes based on your prompt. This is the feedback loop you'll use throughout the course: write a prompt, run it, evaluate the result, refine.`,
      },
      {
        title: "Reading API Responses",
        description:
          "Parse JSON, understand tokens, and extract the text you need from Claude's reply.",
        content: `When Claude responds to your API call, it doesn't just return plain text. It returns a structured data object called **JSON** (JavaScript Object Notation). Understanding this structure is essential for building anything useful with the API.

**What is JSON?**

JSON is a standard format for exchanging data between systems. It looks like this:

\`\`\`json
{
  "id": "msg_abc123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "An API is a way for two software systems to communicate."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 42
  }
}
\`\`\`

Think of JSON as a set of labelled boxes. Each label (called a "key") points to a value. Values can be text, numbers, lists, or even nested boxes. You access them using dot notation: \`response.usage.input_tokens\` gives you \`15\`.

**The response structure**

Every Claude API response contains these important fields:

- **\`id\`** — a unique identifier for this specific response, useful for logging and debugging
- **\`role\`** — always "assistant" for Claude's replies
- **\`content\`** — an array of content blocks. Usually there's one text block, but Claude can return multiple blocks (for example, when using tools)
- **\`model\`** — confirms which model generated the response
- **\`usage\`** — tells you how many tokens were consumed. This directly affects your bill.
- **\`stop_reason\`** — why Claude stopped generating. Common values: \`"end_turn"\` (finished naturally) or \`"max_tokens"\` (hit the limit you set)

**Understanding tokens**

Tokens are the currency of AI APIs. A token is roughly ¾ of an English word. The sentence "What is an API?" is about 6 tokens. You're charged for both:

- **Input tokens** — your prompt, system message, and conversation history
- **Output tokens** — Claude's response

This matters for two reasons:
1. **Cost** — more tokens = higher cost. Keep prompts focused.
2. **Limits** — each model has a maximum context window (how much total text it can process at once). Claude Sonnet supports up to 200K tokens of context.

**Extracting the text you need**

In most cases, you want Claude's text reply:

\`\`\`typescript
const reply = message.content[0].text;
\`\`\`

But in production code, you should be more careful:

\`\`\`typescript
const textBlock = message.content.find(block => block.type === "text");
const reply = textBlock ? textBlock.text : "No text in response";
\`\`\`

**Checking for errors**

API calls can fail for several reasons: invalid API key, rate limiting, network issues, or malformed requests. Always wrap your calls in try/catch:

\`\`\`typescript
try {
  const message = await client.messages.create({ ... });
  console.log(message.content[0].text);
} catch (error) {
  console.error("API call failed:", error.message);
}
\`\`\`

**Using the usage data**

The \`usage\` field is your window into costs and performance:

\`\`\`typescript
console.log(\`Input: \${message.usage.input_tokens} tokens\`);
console.log(\`Output: \${message.usage.output_tokens} tokens\`);
console.log(\`Total: \${message.usage.input_tokens + message.usage.output_tokens} tokens\`);
\`\`\`

Track this in your applications to monitor costs and catch unexpectedly long prompts or responses.

**Key takeaway**

The API response is not a black box — it's a well-structured object with metadata that tells you exactly what happened. Learning to read it fluently is what separates someone who can copy-paste API examples from someone who can build real systems.`,
      },
    ],
    quiz: {
      question: "What does an API allow two systems to do?",
      options: [
        "Share a database",
        "Communicate over a defined interface",
        "Run on the same server",
        "Use the same programming language",
      ],
      correct: 1,
    },
    code: {
      lang: "typescript",
      snippet: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 256,
  messages: [
    { role: "user", content: "Explain APIs in one sentence." }
  ],
});

console.log(message.content[0].text);`,
    },
  },
  {
    id: 2,
    title: "Tech Stacks & Next.js",
    badge: "Full-Stack",
    duration: "2 weeks",
    lessons: [
      {
        title: "What is a Tech Stack?",
        description:
          "Understand the frontend, backend, and database layers that power modern web apps.",
        content: `A tech stack is the combination of technologies used to build and run a web application. Understanding this concept is crucial because every decision you make about how to build an AI-powered tool depends on choosing the right technologies for each layer.

**The three layers**

Every web application has at least three layers:

**1. Frontend (what users see)**
This is the visual interface — buttons, text, images, forms. It runs in the user's web browser. Technologies include HTML (structure), CSS (styling), and JavaScript (interactivity). Modern frontends use frameworks like React, Vue, or Svelte to build complex, interactive interfaces efficiently.

**2. Backend (what users don't see)**
This is the server-side logic — processing form submissions, talking to databases, calling external APIs (like Claude), authenticating users, and enforcing business rules. The backend is where your secrets (API keys, database passwords) live safely out of reach of users. Technologies include Node.js, Python, Go, Ruby, and many others.

**3. Database (where data lives)**
This is persistent storage — user accounts, saved content, analytics data, session information. Databases come in two main flavours: relational (PostgreSQL, MySQL) which store data in structured tables, and document-based (MongoDB, Firebase) which store flexible JSON-like objects.

**Why does this matter for AI projects?**

When you build an AI-powered tool, your tech stack determines:
- **Where your API key lives** — it must be on the backend, never in frontend code
- **How fast your app responds** — server-side rendering can show content faster than client-side
- **How you scale** — can your backend handle 10 users? 10,000? 1,000,000?
- **How you deploy** — different stacks have different hosting requirements and costs

**Modern full-stack frameworks**

Traditionally, you'd need separate projects for your frontend and backend. Modern frameworks like **Next.js** combine both into a single project. Your React components (frontend) and API routes (backend) live side by side. This is a massive productivity gain, especially for small teams and solo builders.

**The stack for this course**

In this course, we use:
- **Next.js** — full-stack React framework (frontend + backend)
- **TypeScript** — JavaScript with type safety
- **Tailwind CSS** — utility-first CSS for fast styling
- **Claude API via fal.ai** — AI capabilities
- **Zustand** — lightweight state management
- **Vercel** — one-click deployment

Every piece was chosen for simplicity and free-tier availability. You won't need to manage servers, configure databases, or set up complex infrastructure.`,
      },
      {
        title: "Why Next.js?",
        description:
          "Learn how Next.js combines React with server-side rendering and API routes.",
        content: `Next.js is a React framework that gives you everything you need to build a production web application. It's maintained by Vercel and used by companies like Netflix, TikTok, and Notion. Here's why it's the perfect choice for AI-powered projects.

**React alone isn't enough**

React is a library for building user interfaces. It's excellent at what it does — creating interactive, component-based UIs. But React by itself doesn't handle:
- Routing (navigating between pages)
- Server-side rendering (generating HTML on the server for fast loading)
- API endpoints (backend logic)
- Image optimisation
- Code splitting (loading only the code each page needs)

Next.js adds all of these on top of React. Think of React as the engine and Next.js as the complete car.

**The App Router**

Next.js uses a file-based routing system called the **App Router**. Instead of configuring routes in a configuration file, you create folders and files:

\`\`\`
app/
  page.tsx          → yoursite.com/
  about/
    page.tsx        → yoursite.com/about
  learn/
    page.tsx        → yoursite.com/learn
    [module]/
      page.tsx      → yoursite.com/learn/1, /learn/2, etc.
  api/
    chat/
      route.ts      → yoursite.com/api/chat
\`\`\`

The folder structure IS your URL structure. Square brackets like \`[module]\` create dynamic routes that accept any value.

**Server-side rendering (SSR)**

When a user visits your site, Next.js can render the HTML on the server before sending it to the browser. This means:
- The page loads faster (the user sees content immediately)
- Search engines can index your content
- Sensitive logic stays on the server

**API routes — your built-in backend**

This is the killer feature for AI projects. Instead of building a separate backend, you create API routes right inside your Next.js project:

\`\`\`typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();
  // Call Claude API here — API key stays on the server!
  return Response.json({ reply: "..." });
}
\`\`\`

Your Anthropic API key lives in a server-side file. It never gets sent to the browser. This is the most important security property of our architecture.

**Deployment is trivial**

Because Vercel (the company behind Next.js) offers hosting optimised specifically for Next.js, deploying is literally one command: \`vercel --prod\`. They handle SSL certificates, CDN distribution, serverless functions, and automatic scaling. The free tier is more than sufficient for learning and small projects.

**The bottom line**

Next.js lets you build a full-stack AI application in a single project, with a single language (TypeScript), deployed with a single command. That's why it's our framework of choice.`,
      },
      {
        title: "Pages, Layouts & Routing",
        description:
          "Create pages with the App Router and share UI with nested layouts.",
        content: `The App Router is how Next.js organises your application into pages. Understanding it is essential because every screen in your app, every API endpoint, and every shared piece of UI is defined by where you put files.

**Pages**

A \`page.tsx\` file in a folder makes that folder a route. The component it exports becomes the content of that page:

\`\`\`typescript
// app/learn/page.tsx
export default function LearnPage() {
  return <h1>Welcome to the curriculum</h1>;
}
\`\`\`

This creates the page at \`/learn\`. Every \`page.tsx\` must export a default React component.

**Layouts**

A \`layout.tsx\` file wraps every page in its folder and all subfolders. It's perfect for shared UI like navigation bars, sidebars, and footers:

\`\`\`typescript
// app/layout.tsx — wraps EVERY page in the app
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>LearnClaude</nav>
        {children}  {/* ← The page content goes here */}
      </body>
    </html>
  );
}
\`\`\`

Layouts are powerful because they **don't re-render** when you navigate between pages. The navigation bar stays mounted while only the page content swaps. This makes navigation feel instant.

You can nest layouts. For example, \`app/learn/layout.tsx\` could add a sidebar that appears on all learn pages but not on the home page.

**Dynamic routes**

Square brackets create routes that accept a parameter:

\`\`\`
app/learn/[module]/page.tsx
\`\`\`

This matches \`/learn/1\`, \`/learn/2\`, \`/learn/anything\`. The parameter value is available in your component:

\`\`\`typescript
export default async function ModulePage({ params }) {
  const { module } = await params;  // "1", "2", etc.
  return <h1>Module {module}</h1>;
}
\`\`\`

Note: In Next.js 15+, \`params\` is a Promise and must be awaited. This is a breaking change from older versions.

**Loading and error states**

Next.js has built-in support for loading and error UI:
- \`loading.tsx\` — shown while the page is loading (automatically wrapped in Suspense)
- \`error.tsx\` — shown when the page throws an error
- \`not-found.tsx\` — shown when you call \`notFound()\` or a page doesn't exist

**Route groups**

Sometimes you want to organise files without affecting the URL. Wrap a folder name in parentheses:

\`\`\`
app/(marketing)/pricing/page.tsx  → /pricing (not /marketing/pricing)
app/(marketing)/about/page.tsx    → /about
app/(dashboard)/settings/page.tsx → /settings
\`\`\`

This is useful for applying different layouts to different sections of your site.

**Key takeaway**

The file system IS your router. There's no configuration file, no route mapping — just folders and files. If you can organise folders on your computer, you can build a Next.js app's navigation structure.`,
      },
      {
        title: "Server vs Client Components",
        description:
          "Understand when code runs on the server and when it runs in the browser.",
        content: `One of the most important concepts in modern Next.js is understanding where your code runs. Some components run on the server, some run in the browser, and choosing correctly has major implications for security, performance, and functionality.

**Server components (the default)**

In Next.js App Router, every component is a **server component by default**. This means:
- The code runs on the server, not in the user's browser
- The HTML is generated on the server and sent to the browser ready to display
- You can directly access databases, file systems, and environment variables
- You can use \`async/await\` at the top level of your component
- The JavaScript for these components is NOT sent to the browser (smaller bundle size)

\`\`\`typescript
// This runs on the server (default)
export default async function ServerPage() {
  const data = await fetch("https://api.example.com/data");
  return <div>{data.title}</div>;
}
\`\`\`

**Client components**

When you need interactivity — click handlers, form inputs, useState, useEffect — you need a client component. Mark it with \`"use client"\` at the top of the file:

\`\`\`typescript
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

Client components:
- Run in the browser (their JavaScript is sent to the user)
- Can use React hooks (\`useState\`, \`useEffect\`, etc.)
- Can respond to user events (clicks, typing, scrolling)
- Cannot directly access server-side resources (databases, API keys)

**The golden rule: API keys and server components**

This is critical for AI applications:

- **NEVER** put your API key in a client component. Client-side code is visible to anyone who opens browser dev tools.
- **ALWAYS** call external APIs from server components or API routes.
- Use client components for the UI (buttons, inputs, chat interfaces) and have them call your own API routes, which then securely call Claude.

The pattern is:
\`\`\`
User clicks "Send" (client component)
  → fetch("/api/chat", { message }) (client calls YOUR server)
    → Claude API call (server calls Anthropic — API key is safe)
      → Response flows back through the same chain
\`\`\`

**When to use which**

| Need | Use |
|------|-----|
| Display static content | Server component |
| Fetch data from a database or API | Server component |
| Handle clicks, forms, or animations | Client component |
| Use useState, useEffect, or other hooks | Client component |
| Access environment variables securely | Server component |
| Show a loading spinner while fetching | Client component |

**Mixing them together**

You can nest client components inside server components (and vice versa). The boundary is at the file level — once you add \`"use client"\`, everything in that file and its imports becomes client-side.

A common pattern is to keep the page as a server component (for data fetching) and make interactive pieces into separate client components:

\`\`\`typescript
// app/learn/page.tsx — server component
import ChatPanel from "@/components/ChatPanel"; // client component

export default function LearnPage() {
  return (
    <div>
      <h1>Learn Claude</h1>          {/* rendered on server */}
      <ChatPanel moduleTitle="..." /> {/* rendered on client */}
    </div>
  );
}
\`\`\`

This gives you the best of both worlds: fast server rendering for content, interactive client components where needed.`,
      },
      {
        title: "API Routes in Next.js",
        description:
          "Build backend endpoints inside your Next.js project to keep secrets safe.",
        content: `API routes let you build backend endpoints directly inside your Next.js project. This is what makes Next.js a true full-stack framework — you don't need a separate server. For AI applications, API routes are where you securely call Claude without exposing your API key.

**Creating an API route**

Create a file named \`route.ts\` inside an \`app/api/\` folder:

\`\`\`typescript
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from the server!" });
}
\`\`\`

This creates an endpoint at \`/api/hello\` that responds to GET requests. You can call it from your browser or from your frontend code.

**HTTP methods**

Each route file can export functions for different HTTP methods:

\`\`\`typescript
export async function GET(request: Request) { }   // Read data
export async function POST(request: Request) { }  // Create/send data
export async function PUT(request: Request) { }   // Update data
export async function DELETE(request: Request) { } // Delete data
\`\`\`

For our AI chat endpoint, we use POST because we're sending a message to be processed:

\`\`\`typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();  // Parse the request body

  // Call Claude API here (server-side, API key is safe)
  const reply = await getChatResponse(message);

  return NextResponse.json({ reply });
}
\`\`\`

**Reading the request**

The \`request\` parameter gives you access to everything the client sent:

- **Body** (for POST/PUT): \`await request.json()\` parses JSON data
- **URL parameters**: \`new URL(request.url).searchParams.get("q")\` reads query strings
- **Headers**: \`request.headers.get("Authorization")\` reads headers

For GET requests with query parameters:

\`\`\`typescript
// GET /api/youtube?q=claude+tutorial
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "default";
  // Use the query...
}
\`\`\`

**Environment variables**

API routes run on the server, so they can access environment variables that contain secrets:

\`\`\`typescript
const apiKey = process.env.ANTHROPIC_API_KEY;  // Safe — server only
\`\`\`

Never prefix secret keys with \`NEXT_PUBLIC_\`. That prefix makes variables available in the browser, which would expose your keys.

**Error handling**

Always handle errors in API routes. Return appropriate HTTP status codes:

\`\`\`typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }  // Bad request
      );
    }

    const result = await callAI(body.message);
    return NextResponse.json(result);  // 200 OK (default)

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
\`\`\`

**Calling your API from the frontend**

From a client component, use \`fetch\` to call your API route:

\`\`\`typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "What is an API?" }),
});
const data = await response.json();
console.log(data.reply);
\`\`\`

The beauty of this pattern is that your frontend never knows about Claude, API keys, or external services. It just talks to \`/api/chat\`, and your API route handles everything securely on the server.

**Key takeaway**

API routes are the secure bridge between your user-facing frontend and powerful backend services like Claude. They keep your secrets safe while giving your frontend a clean, simple interface to work with.`,
      },
    ],
    quiz: {
      question: "Why should API keys be kept on the server?",
      options: [
        "They make the site faster",
        "They are too long for the browser",
        "Client-side code is visible to users",
        "Browsers cannot make HTTP requests",
      ],
      correct: 2,
    },
    code: {
      lang: "typescript",
      snippet: `// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from the server!",
    timestamp: Date.now(),
  });
}`,
    },
  },
  {
    id: 3,
    title: "Design & AI Automation",
    badge: "Creative AI",
    duration: "2 weeks",
    lessons: [
      {
        title: "AI for Designers — Where to Start",
        description:
          "Discover how AI tools fit into creative workflows without replacing your taste.",
        content: `AI is transforming creative work, but not in the way most people think. It's not replacing designers — it's giving them superpowers. This lesson helps you understand where AI fits into your existing workflow and how to adopt it without losing what makes your work uniquely yours.

**AI amplifies taste, it doesn't replace it**

The most common fear among creatives is that AI will make them obsolete. The reality is the opposite. AI is exceptionally good at generating volume — dozens of headline variations, hundreds of colour combinations, thousands of layout possibilities. But it has no taste, no brand understanding, and no sense of what will resonate with your specific audience.

Your job evolves from "create everything from scratch" to "direct, curate, and refine AI output." This is actually a higher-leverage position. A designer who can guide AI effectively produces more work, of higher quality, in less time.

**Where AI fits in the creative workflow**

Think of your creative workflow as a pipeline with stages. AI is useful at different stages for different reasons:

**1. Research & Inspiration**
- Ask Claude to summarise industry trends, competitor positioning, or audience research
- Generate mood board descriptions based on brand guidelines
- Translate client briefs into creative direction documents

**2. Ideation & Drafting**
- Generate 20 headline variations in seconds, then pick the best 3
- Create first-draft copy for landing pages, emails, or social posts
- Produce alt text for images at scale
- Draft creative briefs for handoff to team members

**3. Production & Iteration**
- Resize and adapt copy for different platforms (tweet → LinkedIn → email)
- Generate A/B test variations of existing copy
- Create consistent product descriptions from a template

**4. Review & Quality**
- Use Claude to proofread and check for tone consistency
- Compare copy against brand guidelines
- Flag potential issues (legal claims, accessibility, cultural sensitivity)

**What AI is NOT good at**

Be honest about AI's limitations so you can use it effectively:
- It doesn't understand your brand's visual identity (yet)
- It can produce generic, "AI-sounding" copy if you're not specific
- It doesn't know your company's internal context unless you tell it
- It can hallucinate facts, statistics, and quotes
- It can't replace the human judgment of "does this feel right?"

**Starting small**

The best way to adopt AI is not to overhaul your entire workflow on day one. Instead:

1. Pick one repetitive task you do weekly (like writing social media captions)
2. Build a prompt that handles 80% of that task
3. Refine the prompt over a few weeks
4. Once it's reliable, move on to the next task

This incremental approach builds your AI skills while delivering immediate value. You'll develop intuition for what AI handles well and where it needs more guidance.

**The creative director mindset**

Ultimately, working with AI is like being a creative director. You set the brief, evaluate the output, and guide revisions. The AI is your fastest-ever junior designer — endlessly enthusiastic, never tired, but in need of clear direction and quality control.`,
      },
      {
        title: "Prompt Design for Visual Output",
        description:
          "Write prompts that generate consistent copy, alt text, and design briefs.",
        content: `Great prompts are not vague requests — they're detailed creative briefs. In this lesson, you'll learn to write prompts that produce consistent, usable output every time. The techniques here apply whether you're generating copy, alt text, design descriptions, or any structured creative content.

**The anatomy of a production prompt**

A production-quality prompt has five layers:

**1. Role and context**
Tell Claude who it is and what situation it's in:
\`\`\`
You are a senior copywriter at a SaaS company that sells project management tools to creative agencies. The brand voice is warm, professional, and slightly playful.
\`\`\`

**2. Task definition**
Be specific about what you want:
\`\`\`
Write 5 email subject lines for a product launch announcement. The new feature is AI-powered task prioritisation.
\`\`\`

**3. Constraints and requirements**
Set boundaries:
\`\`\`
Requirements:
- Each subject line must be under 50 characters
- Use title case
- At least 2 should include an emoji
- Avoid clickbait or ALL CAPS
- Do not use the word "revolutionary"
\`\`\`

**4. Format specification**
Tell Claude exactly how to structure the output:
\`\`\`
Return your output as a numbered list. After each subject line, add a brief note (one sentence) explaining why it works.
\`\`\`

**5. Examples (few-shot prompting)**
Show Claude what good looks like:
\`\`\`
Here are examples of subject lines that match our brand voice:
- "Your projects just got smarter"
- "Less chaos, more shipping"
- "We built the feature you asked for"
\`\`\`

**Writing effective alt text at scale**

Alt text is a perfect use case for AI. You need it for every image on your site, it needs to be consistent, and it's tedious to write manually:

\`\`\`
Write alt text for the following images on our marketing site.
Follow these rules:
- Start with the type of image (photo, illustration, screenshot, icon)
- Describe what's shown in 1-2 sentences
- Mention colours only when they're meaningful
- Don't start with "Image of" or "Picture of"
- Keep each description under 125 characters
- If the image is decorative, return "decorative"

Images:
1. Hero banner showing a team using laptops in a bright office
2. Product screenshot of the dashboard with three charts
3. Abstract gradient background behind the pricing section
\`\`\`

**Building design briefs with AI**

You can use Claude to transform rough client feedback into structured design briefs:

\`\`\`
The client said: "We want something modern and clean, maybe blue, that shows we're a tech company but approachable. Not too corporate. Like Apple meets Mailchimp."

Convert this into a structured design brief with:
- Colour palette (3 primary, 2 accent, hex codes)
- Typography recommendation (heading + body font pairing)
- Layout principles (3-4 bullet points)
- Visual references (describe 3 reference styles)
- Things to avoid (3-4 items)
\`\`\`

**Consistency through system prompts**

When you're generating the same type of content repeatedly (product descriptions, social posts, email copy), use a **system prompt** to lock in the style:

\`\`\`typescript
system: \`You are the content team at Acme Corp.
Brand voice: confident, concise, slightly witty.
Never use: "innovative", "cutting-edge", "game-changer", "leverage".
Always use: active voice, second person ("you"), short sentences.
Max paragraph length: 3 sentences.\`
\`\`\`

This system prompt persists across all messages in a conversation, ensuring every response follows your brand guidelines without repeating them in every request.

**The iteration loop**

Prompt design is never one-and-done. The process is:
1. Write your first prompt
2. Run it 3-5 times to see the range of outputs
3. Identify what's consistently wrong or weak
4. Add constraints to fix those issues
5. Repeat until the output is reliably good

Save your best prompts in a library. Over time, you'll build a collection of battle-tested prompts for every content type you need.`,
      },
      {
        title: "Building an Automation Pipeline",
        description:
          "Chain multiple AI calls together to process content in stages.",
        content: `A single AI call is useful. But the real power comes from chaining multiple calls together into a pipeline — where the output of one step becomes the input to the next. This lesson teaches you to think in stages and build multi-step AI workflows.

**Why chain calls?**

A single prompt trying to do too much often produces mediocre results. Compare:

**Bad (one giant prompt):**
"Take this blog post, summarise it, rewrite it for Twitter, create 5 hashtags, and generate an email version."

**Good (pipeline):**
1. Step 1: Summarise the blog post into key points
2. Step 2: Take the summary and write a Twitter thread
3. Step 3: Take the summary and generate an email newsletter version
4. Step 4: Generate hashtags based on the summary

Each step gets a focused, specific task. The AI performs better on each individual step, and you can inspect and adjust the output between steps.

**Building your first pipeline**

Here's a practical example — a content repurposing pipeline:

\`\`\`typescript
// Step 1: Extract key points from a blog post
const extraction = await callAI({
  system: "You are a content analyst. Extract the 5 most important points.",
  prompt: \`Extract key points from this blog post:\\n\\n\${blogPost}\`
});
const keyPoints = extraction.reply;

// Step 2: Generate a Twitter thread
const twitter = await callAI({
  system: "You are a social media copywriter. Write engaging tweets.",
  prompt: \`Turn these key points into a Twitter thread (5 tweets, each under 280 characters):\\n\\n\${keyPoints}\`
});

// Step 3: Generate an email version
const email = await callAI({
  system: "You are an email marketer. Write scannable, action-oriented emails.",
  prompt: \`Turn these key points into a newsletter email with a subject line, 3 paragraphs, and a CTA:\\n\\n\${keyPoints}\`
});

// Step 4: Generate hashtags
const hashtags = await callAI({
  system: "Return only a comma-separated list of hashtags. No other text.",
  prompt: \`Generate 8 relevant hashtags for content about:\\n\\n\${keyPoints}\`
});
\`\`\`

**Parallel vs sequential**

Some steps depend on previous steps (sequential). Others don't and can run at the same time (parallel):

\`\`\`typescript
// Step 1 must finish first
const keyPoints = await extractKeyPoints(blogPost);

// Steps 2, 3, and 4 can run in parallel — they all use keyPoints
const [twitter, email, hashtags] = await Promise.all([
  generateTwitterThread(keyPoints),
  generateEmail(keyPoints),
  generateHashtags(keyPoints),
]);
\`\`\`

\`Promise.all\` runs all three calls simultaneously, cutting total time by roughly two-thirds.

**Error handling in pipelines**

When you chain calls, a failure in any step can break the whole pipeline. Build in resilience:

\`\`\`typescript
async function safeAICall(prompt, fallback) {
  try {
    const result = await callAI(prompt);
    return result.reply;
  } catch (error) {
    console.error("AI call failed:", error.message);
    return fallback;  // Use a sensible default
  }
}
\`\`\`

**Validation between steps**

Don't blindly pass output from one step to the next. Validate:

\`\`\`typescript
const keyPoints = await extractKeyPoints(blogPost);

// Check the output makes sense before continuing
if (!keyPoints || keyPoints.length < 50) {
  throw new Error("Key point extraction produced insufficient output");
}

// Now use it in the next step
const twitter = await generateTwitterThread(keyPoints);
\`\`\`

**Real-world pipeline examples**

- **Content localisation**: Original → Summarise → Translate → Adapt cultural references → Review
- **Ad copy generation**: Brief → Headlines → Body copy → CTA variations → Compliance check
- **Customer support**: Incoming email → Classify intent → Draft response → Tone check → Send
- **Report generation**: Raw data → Extract insights → Write narrative → Format as PDF

**The pipeline mindset**

Think of every complex AI task as a series of simple transformations. Each step should:
1. Have a single, clear purpose
2. Take structured input
3. Produce structured output
4. Be independently testable

This modular approach makes your automation more reliable, easier to debug, and simpler to improve one step at a time.`,
      },
      {
        title: "Evaluating AI Output",
        description:
          "Learn to score, compare, and iterate on AI results systematically.",
        content: `Getting AI to produce output is easy. Getting it to produce consistently **good** output requires systematic evaluation. This lesson teaches you how to assess AI results objectively, identify patterns in failures, and improve your prompts based on evidence rather than guesswork.

**Why evaluation matters**

Without evaluation, you're flying blind. You might think your prompt is great because you saw one good output, but running it 10 times might reveal that 4 of those outputs are off-brand, 2 miss key information, and 1 contains a factual error. Evaluation turns "this seems fine" into "this works 92% of the time, and here's what to fix."

**Building a rubric**

Before evaluating, define what "good" looks like. Create a rubric with specific, measurable criteria:

| Criterion | Weight | Score (1-5) |
|-----------|--------|-------------|
| Factual accuracy | 30% | Does every claim check out? |
| Brand voice consistency | 25% | Does it sound like us? |
| Length and format compliance | 20% | Does it follow the spec? |
| Actionability | 15% | Can the reader do something with this? |
| Creativity/engagement | 10% | Is it interesting to read? |

Apply this rubric to every output. Over time, you'll see patterns: maybe accuracy is always high but brand voice drops off for technical topics.

**The N=10 rule**

Never evaluate a prompt based on a single run. AI outputs are non-deterministic — the same prompt can produce different results each time (especially at higher temperature settings). Run your prompt at least 10 times and evaluate the full range:

- What's the best output? (your ceiling)
- What's the worst output? (your floor)
- What's the average quality?
- How much variation is there?

A prompt that produces 8/10 great results and 2/10 terrible results may need more constraints. A prompt that produces 10/10 decent-but-boring results may need less constraint and more creative freedom.

**A/B testing prompts**

When you change a prompt, don't just run it once and declare victory. Compare systematically:

1. Run the old prompt 10 times → score all 10
2. Run the new prompt 10 times → score all 10
3. Compare average scores across each rubric criterion
4. Check if the improvement is consistent or just lucky

**Common failure patterns**

Learn to recognise these recurring issues:

- **Over-compliance**: The AI follows your format perfectly but the content is generic. Fix: add more context about the audience and purpose.
- **Style drift**: The first paragraph matches your brand voice but it gradually shifts to a generic AI tone. Fix: reinforce style guidelines in the system prompt and add examples.
- **Hallucination**: The AI invents statistics, quotes, or product features that don't exist. Fix: explicitly tell it not to invent facts, and tell it to say "I don't have this information" when uncertain.
- **Format breaking**: The AI sometimes returns markdown when you want plain text, or vice versa. Fix: be explicit about format and add a negative constraint ("Do NOT use markdown").
- **Length creep**: Outputs get longer over time in multi-turn conversations. Fix: add strict word/character limits.

**Using AI to evaluate AI**

You can use Claude itself as an evaluator. Create a separate prompt that scores output against your rubric:

\`\`\`typescript
const evaluation = await callAI({
  system: "You are a quality evaluator. Score the following content against the rubric provided. Return scores and brief justification for each criterion.",
  prompt: \`
Rubric:
- Accuracy (1-5): All facts must be verifiable
- Brand voice (1-5): Must match "warm, professional, slightly witty"
- Length (1-5): Must be 100-150 words

Content to evaluate:
\${generatedContent}
  \`
});
\`\`\`

This lets you automate quality checks at scale.

**Building a feedback log**

Keep a simple log of every evaluation session:
- Date
- Prompt version
- Average score per criterion
- Notable failures
- Changes made

This log becomes incredibly valuable over time. You can track how your prompts improve, identify which changes had the biggest impact, and avoid reverting to approaches you've already tried and rejected.

**Key takeaway**

Evaluation is not a one-time task — it's an ongoing discipline. The best AI practitioners don't just write great prompts; they systematically measure, compare, and improve them. Treat your prompts like code: version them, test them, and iterate based on data.`,
      },
    ],
    quiz: {
      question: "What is the best way to improve a weak AI output?",
      options: [
        "Switch to a different AI model",
        "Add more examples and constraints to the prompt",
        "Increase the temperature to maximum",
        "Send the same prompt again",
      ],
      correct: 1,
    },
    code: {
      lang: "typescript",
      snippet: `// Chain two Claude calls: summarise, then rewrite
const summary = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 200,
  messages: [
    { role: "user", content: \`Summarise: \${article}\` }
  ],
});

const rewrite = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 300,
  messages: [
    {
      role: "user",
      content: \`Rewrite for a marketing audience:\\n\${summary.content[0].text}\`,
    },
  ],
});`,
    },
  },
  {
    id: 4,
    title: "Marketing Tool Integrations",
    badge: "MarTech",
    duration: "2 weeks",
    lessons: [
      {
        title: "Connecting Claude to Your Stack",
        description:
          "Use API routes to pipe Claude's output into tools like email builders and CMS platforms.",
        content: `Claude becomes dramatically more useful when it's connected to the tools you already use. Instead of copying and pasting between Claude's chat interface and your email builder, CMS, or project management tool, you can build direct integrations that flow AI-generated content exactly where it needs to go.

**The integration pattern**

Every integration follows the same three-step pattern:

1. **Receive a trigger** — a user clicks a button, a webhook fires, a cron job runs
2. **Call Claude** — send a prompt with context, get a response
3. **Push the result** — send the AI output to the destination tool via its API

\`\`\`typescript
// Example: Generate and push a blog post to a CMS
export async function POST(request: Request) {
  const { topic, keywords } = await request.json();

  // Step 1: Generate content with Claude
  const draft = await generateBlogPost(topic, keywords);

  // Step 2: Push to CMS (e.g., Contentful, Sanity, WordPress)
  await fetch("https://api.contentful.com/entries", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${process.env.CMS_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        title: { "en-US": draft.title },
        body: { "en-US": draft.body },
        status: { "en-US": "draft" },  // Always draft, never auto-publish
      },
    }),
  });

  return NextResponse.json({ success: true, title: draft.title });
}
\`\`\`

**Common integration targets**

Here are the most valuable integrations for marketing teams:

**Email platforms (Mailchimp, SendGrid, Resend)**
- Generate subject line variations for A/B testing
- Create personalised email body content based on user segments
- Draft follow-up sequences from a single campaign brief

**CMS platforms (WordPress, Contentful, Sanity)**
- Generate blog post drafts from topic outlines
- Create meta descriptions and SEO titles
- Produce alt text for uploaded images

**Social media (Buffer, Hootsuite, or direct APIs)**
- Repurpose long-form content into platform-specific posts
- Generate caption variations for different audiences
- Create hashtag sets based on content analysis

**Project management (Linear, Jira, Notion)**
- Summarise meeting notes into action items
- Draft project briefs from requirements
- Generate status update summaries

**The security model**

When connecting to external services, every API key should be stored as an environment variable:

\`\`\`
# .env.local
FAL_KEY=your-fal-key
CMS_API_KEY=your-cms-key
EMAIL_API_KEY=your-email-key
\`\`\`

Access them only in server-side code (API routes, server components). Never expose them to the browser.

**Webhooks: event-driven integrations**

Instead of you calling external services, external services can call your API routes using webhooks. For example:

- A new support ticket is created → webhook hits your \`/api/classify\` route → Claude classifies the ticket priority → result is sent back to the support tool
- A new blog post is published → webhook triggers → Claude generates social media posts → posts are queued in your social scheduler

**Building robust integrations**

Production integrations need more than just "call AI, push result":

- **Retry logic**: If the CMS API is temporarily down, retry 3 times with exponential backoff
- **Validation**: Check the AI output before pushing it downstream (is the email subject line actually under 50 characters?)
- **Logging**: Record every integration run so you can debug failures
- **Rate limiting**: Respect both Claude's rate limits and your destination tool's limits
- **Human review**: For critical content (emails to customers, published blog posts), always include a human approval step before auto-publishing

**Key takeaway**

The goal is not to replace your existing tools — it's to make them smarter. Claude generates the content; your existing tools handle delivery, scheduling, and tracking. Together, they form a system that's greater than the sum of its parts.`,
      },
      {
        title: "Generating Campaign Copy",
        description:
          "Create subject lines, ad copy, and social posts with structured prompts.",
        content: `Writing marketing copy is one of the highest-ROI applications of AI. A well-crafted prompt can generate dozens of variations in seconds, letting you focus on selection and refinement rather than blank-page creation. This lesson shows you exactly how to prompt Claude for every major copy format.

**The campaign copy framework**

Every piece of campaign copy needs four things defined before you prompt:

1. **Audience**: Who is reading this? (demographic, psychographic, where they are in the funnel)
2. **Goal**: What should they do after reading? (click, buy, sign up, share)
3. **Tone**: How should it feel? (urgent, casual, professional, playful)
4. **Constraints**: What are the format rules? (character limits, required elements, forbidden words)

Build these into every prompt:

\`\`\`typescript
const systemPrompt = \`You are a direct-response copywriter specialising in SaaS marketing.

Audience: Marketing managers at companies with 50-200 employees
Goal: Drive free trial sign-ups
Tone: Confident and helpful, not pushy. Use "you" frequently.
Constraints:
- Never use the word "revolutionary" or "game-changing"
- Never make claims we can't prove
- Always include a clear CTA\`;
\`\`\`

**Email subject lines**

Subject lines are short, high-stakes, and perfect for AI generation:

\`\`\`
Generate 10 email subject lines for a product launch email.
Product: AI-powered analytics dashboard
Key benefit: Saves 5 hours per week on reporting

Requirements:
- Each under 50 characters
- Mix of approaches: curiosity, benefit, urgency, social proof
- At least 2 with personalisation tokens (e.g., {firstName})
- No spam trigger words (FREE, ACT NOW, LIMITED TIME)

Format: Numbered list with approach type in parentheses after each.
\`\`\`

**Social media posts**

Different platforms need different approaches:

\`\`\`
Create social media content for the launch of our new AI reporting feature.

Platform-specific versions:
1. LinkedIn (max 3000 chars): Professional, thought-leadership angle.
   Start with a hook question. Include 3 bullet points of benefits.
   End with a soft CTA. Add 3-5 relevant hashtags.

2. Twitter/X (max 280 chars): Punchy, conversational.
   Lead with the key benefit. Include a link placeholder [link].

3. Instagram caption (max 2200 chars): Story-driven.
   Start with a relatable pain point. Show the transformation.
   End with engagement question. Add 15-20 hashtags in a separate block.
\`\`\`

**Ad copy (Google, Meta, LinkedIn)**

Ad platforms have strict character limits. Build them into the prompt:

\`\`\`
Generate Google Search ad copy for our analytics product.
Target keyword: "marketing analytics tool"

Format for each ad:
- Headline 1 (max 30 chars): Include keyword
- Headline 2 (max 30 chars): Key benefit
- Headline 3 (max 30 chars): CTA
- Description 1 (max 90 chars): Expand on benefit, include proof point
- Description 2 (max 90 chars): Secondary benefit + CTA

Generate 5 complete ad variations. After each, note the angle used.
\`\`\`

**Landing page copy**

For longer-form copy, break it into sections:

\`\`\`
Write landing page copy for our AI analytics product.

Structure:
1. Hero headline (max 10 words) + subheadline (max 25 words)
2. Problem section (3 sentences): What pain does our audience feel?
3. Solution section (3 sentences): How do we solve it?
4. Three benefit blocks: Icon-title (3 words) + description (2 sentences) each
5. Social proof: 2 testimonial-style quotes (realistic, not over-the-top)
6. CTA section: Headline + button text + reassurance text

Important: Write as if speaking directly to a tired marketing manager
who has tried 3 other tools and is skeptical but hopeful.
\`\`\`

**Variation and A/B testing**

The biggest advantage of AI-generated copy is speed of variation. Ask for multiple angles:

\`\`\`
For each of the following angles, write one email subject line and one opening sentence:
1. Pain point (what they're struggling with)
2. Benefit (what they'll gain)
3. Curiosity (make them want to know more)
4. Social proof (what others are doing)
5. Urgency (why act now)
6. Personal (make it feel 1-to-1)
\`\`\`

Then test these angles against each other. Over time, you'll learn which angles work best for your specific audience.

**Key takeaway**

Never ask Claude to "write some copy." Always specify the audience, goal, tone, constraints, and format. The more specific your brief, the more usable the output. Think of it as writing a creative brief for the world's fastest copywriter — they'll follow your instructions exactly, so make them precise.`,
      },
      {
        title: "Structured Output with JSON",
        description:
          "Force Claude to return valid JSON for direct use in downstream systems.",
        content: `When you're building integrations and automation, you need Claude's output in a machine-readable format — not free-flowing text. JSON (JavaScript Object Notation) is the standard format for structured data on the web, and getting Claude to return valid JSON consistently is a crucial skill.

**Why JSON matters**

When Claude returns plain text, you have to parse and interpret it — which is fragile and error-prone. With JSON, you get structured data that your code can use directly:

\`\`\`typescript
// Plain text — hard to use programmatically
"Here are 3 subject lines: 1. Save time today 2. Your reports, automated 3. Try it free"

// JSON — directly usable in code
{
  "subject_lines": [
    { "text": "Save time today", "angle": "benefit" },
    { "text": "Your reports, automated", "angle": "feature" },
    { "text": "Try it free", "angle": "cta" }
  ]
}
\`\`\`

With JSON, you can access \`data.subject_lines[0].text\` directly. No string parsing, no regex, no guessing.

**The reliable JSON prompt pattern**

To consistently get valid JSON, use three techniques together:

**1. System prompt instruction:**
\`\`\`typescript
system: "Return only valid JSON. No markdown code fences. No explanatory text before or after the JSON. Start your response with { and end with }."
\`\`\`

**2. Schema specification in the user prompt:**
\`\`\`
Generate email campaign content. Return as JSON matching this exact schema:
{
  "subject": "string (max 50 chars)",
  "preview_text": "string (max 100 chars)",
  "body_html": "string (HTML formatted)",
  "cta_text": "string (max 20 chars)",
  "cta_url_path": "string",
  "tags": ["string"]
}
\`\`\`

**3. Parse and validate in your code:**
\`\`\`typescript
const response = await callAI(prompt);

let data;
try {
  data = JSON.parse(response.reply);
} catch {
  // If JSON parsing fails, try to extract JSON from the response
  const jsonMatch = response.reply.match(/\\{[\\s\\S]*\\}/);
  if (jsonMatch) {
    data = JSON.parse(jsonMatch[0]);
  } else {
    throw new Error("Failed to get valid JSON from AI");
  }
}

// Validate required fields exist
if (!data.subject || !data.body_html) {
  throw new Error("Missing required fields in AI response");
}
\`\`\`

**Handling arrays**

When you need multiple items, specify the array structure:

\`\`\`
Generate 5 social media posts. Return as a JSON array:
[
  {
    "platform": "twitter" | "linkedin" | "instagram",
    "content": "string",
    "hashtags": ["string"],
    "estimated_engagement": "low" | "medium" | "high"
  }
]
\`\`\`

**Nested structures**

For complex data, show the full nesting:

\`\`\`
Analyse this campaign brief and return a structured plan:
{
  "campaign": {
    "name": "string",
    "duration_weeks": number,
    "budget_tier": "low" | "medium" | "high"
  },
  "channels": [
    {
      "name": "string",
      "posts_per_week": number,
      "content_types": ["string"],
      "kpis": ["string"]
    }
  ],
  "timeline": [
    {
      "week": number,
      "milestones": ["string"]
    }
  ]
}
\`\`\`

**Common pitfalls**

1. **Markdown code fences**: Claude sometimes wraps JSON in \`\`\`json ... \`\`\`. Your system prompt should forbid this, and your parser should strip them as a fallback.

2. **Trailing commas**: Occasionally Claude adds a trailing comma after the last item in an array or object. This is invalid JSON. Strip trailing commas before parsing.

3. **Comments in JSON**: JSON doesn't support comments, but Claude sometimes adds them. Forbid this in your prompt.

4. **Inconsistent types**: If you say a field is a number, Claude might return it as a string. Validate and coerce types after parsing.

**Using TypeScript types for validation**

Define your expected shape as a TypeScript interface, then validate against it:

\`\`\`typescript
interface CampaignOutput {
  subject: string;
  preview_text: string;
  body_html: string;
  tags: string[];
}

function validateOutput(data: unknown): data is CampaignOutput {
  const d = data as Record<string, unknown>;
  return (
    typeof d.subject === "string" &&
    typeof d.preview_text === "string" &&
    typeof d.body_html === "string" &&
    Array.isArray(d.tags)
  );
}
\`\`\`

**Key takeaway**

JSON output transforms Claude from a text generator into a data source. It's the bridge between "AI generated some text" and "AI powers our content pipeline." Master this pattern and every integration becomes dramatically simpler.`,
      },
      {
        title: "Error Handling & Retry Logic",
        description:
          "Handle rate limits, timeouts, and bad responses gracefully in production.",
        content: `API calls fail. Networks drop. Rate limits trigger. Responses come back malformed. The difference between a demo and a production system is how gracefully it handles these inevitable failures. This lesson teaches you to build AI integrations that are robust enough for real-world use.

**Types of failures**

Understanding why failures happen helps you handle them correctly:

**1. Rate limiting (HTTP 429)**
Every API has limits on how many requests you can make per minute. When you exceed them, you get a 429 "Too Many Requests" response. This is the most common failure in production AI systems.

**2. Server errors (HTTP 500, 502, 503)**
The AI service itself is temporarily unavailable. This happens during deployments, high-traffic periods, or infrastructure issues. These are usually transient — retrying works.

**3. Timeout**
Your request took too long to process. This happens with complex prompts, long outputs, or when the service is under load.

**4. Invalid request (HTTP 400)**
Your request is malformed — maybe the messages array is empty, the model name is wrong, or a parameter is out of range. These won't succeed on retry; you need to fix the request.

**5. Authentication failure (HTTP 401, 403)**
Your API key is invalid, expired, or doesn't have permission for the requested operation. Fix your credentials.

**Exponential backoff**

The standard pattern for retrying failed requests is exponential backoff — wait longer between each retry:

\`\`\`typescript
async function callWithRetry(
  fn: () => Promise<Response>,
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      return result;  // Success — return immediately
    } catch (error) {
      const isRetryable =
        error.status === 429 ||
        error.status === 500 ||
        error.status === 502 ||
        error.status === 503;

      if (!isRetryable || attempt === maxRetries) {
        throw error;  // Don't retry non-transient errors or final attempt
      }

      // Wait: 1s, 2s, 4s (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
}
\`\`\`

**Rate limit awareness**

For rate-limited APIs, check the response headers:

\`\`\`typescript
const response = await fetch("/api/chat", { ... });

// Many APIs tell you when you can retry
const retryAfter = response.headers.get("Retry-After");
if (response.status === 429 && retryAfter) {
  await new Promise(r => setTimeout(r, parseInt(retryAfter) * 1000));
  // Then retry the request
}
\`\`\`

**Timeout handling**

Set timeouts to prevent your application from hanging:

\`\`\`typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

try {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
    signal: controller.signal,
  });
  clearTimeout(timeout);
  return await response.json();
} catch (error) {
  if (error.name === "AbortError") {
    return { error: "Request timed out. Please try again." };
  }
  throw error;
}
\`\`\`

**Graceful degradation**

When AI is unavailable, your app should still function — just with reduced capability:

\`\`\`typescript
async function getRecommendations(userInput: string) {
  try {
    // Try AI-powered recommendations
    return await getAIRecommendations(userInput);
  } catch {
    // Fall back to static/cached recommendations
    return getStaticRecommendations();
  }
}
\`\`\`

**User-facing error messages**

Never show raw error messages to users. Map technical errors to helpful messages:

\`\`\`typescript
function getUserMessage(error: Error): string {
  if (error.message.includes("429")) {
    return "Our AI tutor is busy right now. Please wait a moment and try again.";
  }
  if (error.message.includes("timeout")) {
    return "That took too long. Try asking a shorter question.";
  }
  if (error.message.includes("401")) {
    return "AI service is not configured. Please contact support.";
  }
  return "Something went wrong. Please try again.";
}
\`\`\`

**Logging and monitoring**

In production, log every failure with context:

\`\`\`typescript
console.error({
  event: "ai_call_failed",
  error: error.message,
  status: error.status,
  prompt_length: message.length,
  module: moduleTitle,
  attempt: attemptNumber,
  timestamp: new Date().toISOString(),
});
\`\`\`

This data helps you identify patterns: are failures happening at specific times? With specific prompts? For specific users?

**Key takeaway**

Error handling isn't glamorous, but it's what separates a prototype from a product. Users forgive occasional slowness or unavailability — they don't forgive crashed apps and cryptic error messages. Build your error handling from the start, not as an afterthought.`,
      },
    ],
    quiz: {
      question: "How do you ensure Claude returns valid JSON?",
      options: [
        "Set temperature to 0",
        "Ask politely in the prompt",
        "Use a system prompt with format instructions and parse the result",
        "JSON is always returned by default",
      ],
      correct: 2,
    },
    code: {
      lang: "typescript",
      snippet: `const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 512,
  system: "Return only valid JSON. No markdown.",
  messages: [
    {
      role: "user",
      content: \`Generate 3 email subject lines for a
spring sale. Return as { "subjects": string[] }\`,
    },
  ],
});

const data = JSON.parse(response.content[0].text);
console.log(data.subjects);`,
    },
  },
  {
    id: 5,
    title: "Real-Time Campaigns & Insights",
    badge: "Analytics",
    duration: "2 weeks",
    lessons: [
      {
        title: "Streaming Responses",
        description:
          "Use the Anthropic SDK stream mode to display Claude's reply as it is generated.",
        content: `When you make a standard API call to Claude, you wait for the entire response to be generated before seeing anything. For short responses this is fine, but for longer outputs the user stares at a loading spinner for seconds. Streaming solves this by sending the response to the user word by word, as Claude generates it.

**Why streaming matters**

The human perception of speed is largely about **time to first byte** — how quickly something starts happening. Compare:

- **Without streaming**: User sends message → waits 4 seconds → sees complete response appear all at once
- **With streaming**: User sends message → waits 0.3 seconds → sees first words appear → response builds over 4 seconds

Both take the same total time, but streaming feels dramatically faster because the user gets immediate feedback.

**How streaming works**

Instead of one big response, Claude sends a series of small "events" as it generates text:

\`\`\`
Event: message_start       → "I'm starting to respond"
Event: content_block_start → "Here comes a text block"
Event: content_block_delta → "The"
Event: content_block_delta → " key"
Event: content_block_delta → " benefit"
Event: content_block_delta → " of"
Event: content_block_delta → " streaming..."
Event: content_block_stop  → "Text block complete"
Event: message_stop        → "I'm done"
\`\`\`

Each \`content_block_delta\` event contains a small piece of text that you append to your UI in real time.

**Server-side streaming with the SDK**

Using the Anthropic SDK:

\`\`\`typescript
const stream = client.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Explain streaming APIs" }],
});

for await (const event of stream) {
  if (
    event.type === "content_block_delta" &&
    event.delta.type === "text_delta"
  ) {
    process.stdout.write(event.delta.text);
  }
}
\`\`\`

**Streaming through a Next.js API route**

To stream from your API route to the browser, use a ReadableStream:

\`\`\`typescript
// app/api/chat-stream/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }],
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(
            new TextEncoder().encode(event.delta.text)
          );
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
\`\`\`

**Consuming the stream on the client**

In your React component, read the stream and update state incrementally:

\`\`\`typescript
const response = await fetch("/api/chat-stream", {
  method: "POST",
  body: JSON.stringify({ message }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
let fullText = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  fullText += decoder.decode(value);
  setReply(fullText);  // Update the UI with each chunk
}
\`\`\`

**UX considerations**

- Show a subtle typing indicator while streaming (a blinking cursor or pulsing dots)
- Scroll the chat window as new text arrives so the latest content is always visible
- Disable the "Send" button while streaming to prevent duplicate requests
- Provide a "Stop" button that aborts the stream if the user doesn't want to wait

**When NOT to stream**

Streaming adds complexity. Don't use it when:
- The response is always short (under 100 tokens)
- You need to parse the complete response before displaying it (e.g., JSON)
- You're processing the response server-side before returning to the user

**Key takeaway**

Streaming is a UX improvement, not a functional one. The AI generates the same response either way. But for chat interfaces and long-form content generation, streaming makes the experience feel alive and responsive rather than sluggish.`,
      },
      {
        title: "Building a Live Dashboard",
        description:
          "Combine server-sent events with React state to create real-time UI updates.",
        content: `A live dashboard shows data that updates in real time without the user needing to refresh the page. When combined with AI, you can build dashboards that not only display data but also provide running commentary, detect anomalies, and generate insights as new data arrives.

**Server-Sent Events (SSE)**

SSE is a simple protocol for one-way real-time communication from server to client. Unlike WebSockets (which are bidirectional), SSE is perfect for dashboards where the server pushes updates and the client just listens.

\`\`\`typescript
// app/api/dashboard-stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send an update every 5 seconds
      const interval = setInterval(async () => {
        const data = await fetchLatestMetrics();

        controller.enqueue(
          encoder.encode(\`data: \${JSON.stringify(data)}\\n\\n\`)
        );
      }, 5000);

      // Clean up when client disconnects
      setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 300000); // 5 minute max
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
\`\`\`

**Consuming SSE in React**

Use the \`EventSource\` API to listen for updates:

\`\`\`typescript
"use client";
import { useEffect, useState } from "react";

interface Metrics {
  visitors: number;
  conversions: number;
  revenue: number;
}

export default function LiveDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const source = new EventSource("/api/dashboard-stream");

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    source.onerror = () => {
      source.close();
      // Optionally reconnect after a delay
    };

    return () => source.close();
  }, []);

  if (!metrics) return <div>Loading dashboard...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard label="Visitors" value={metrics.visitors} />
      <MetricCard label="Conversions" value={metrics.conversions} />
      <MetricCard label="Revenue" value={\`$\${metrics.revenue}\`} />
    </div>
  );
}
\`\`\`

**Adding AI insights**

The real power comes from feeding your dashboard data to Claude for analysis:

\`\`\`typescript
// Every time metrics update, ask Claude for insights
async function getInsight(currentMetrics, previousMetrics) {
  const response = await callAI({
    system: "You are a marketing analytics expert. Give one brief, actionable insight based on the metrics change. Max 2 sentences.",
    prompt: \`
Previous: \${JSON.stringify(previousMetrics)}
Current: \${JSON.stringify(currentMetrics)}

What's the most notable change and what should the team do about it?
    \`
  });
  return response.reply;
}
\`\`\`

This creates a dashboard that doesn't just show numbers — it tells you what the numbers mean and what to do about them.

**Building dashboard components**

A good dashboard has three types of components:

**1. Metric cards** — single numbers with trend indicators:
\`\`\`typescript
function MetricCard({ label, value, previousValue }) {
  const trend = value > previousValue ? "up" : "down";
  const change = ((value - previousValue) / previousValue * 100).toFixed(1);

  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-mid">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={\`text-xs \${trend === "up" ? "text-green-500" : "text-red-500"}\`}>
        {trend === "up" ? "↑" : "↓"} {change}%
      </p>
    </div>
  );
}
\`\`\`

**2. Charts** — visual trends over time. Libraries like Recharts or Chart.js work well with React.

**3. AI commentary** — the insight panel that explains what's happening in natural language.

**Refresh strategies**

Not every dashboard needs real-time streaming. Consider:
- **Polling**: Fetch new data every N seconds with \`setInterval\`. Simple but wastes bandwidth when nothing changes.
- **SSE**: Server pushes updates only when data changes. More efficient.
- **Manual refresh**: A "Refresh" button. Appropriate when data changes infrequently.
- **Hybrid**: Load initial data on page load, then SSE for updates.

Choose based on how frequently your data changes and how urgently users need to see updates.

**Key takeaway**

A live dashboard is really just three things: a data source, a rendering layer, and an update mechanism. Adding AI turns static metrics into narrated insights — the dashboard tells a story, not just numbers.`,
      },
      {
        title: "Extracting Insights from Data",
        description:
          "Feed CSV or JSON data to Claude and ask for trends, anomalies, and summaries.",
        content: `One of Claude's most powerful capabilities is making sense of raw data. You can paste a CSV, a JSON object, or a table of numbers into a prompt, and Claude will find patterns, explain trends, and generate human-readable summaries that would take an analyst hours to produce.

**Preparing data for Claude**

Claude works with text, so your data needs to be in a text-friendly format. The best options:

**CSV (best for tabular data):**
\`\`\`
Date,Channel,Spend,Clicks,Conversions,Revenue
2026-03-01,Google Ads,1200,3400,89,4250
2026-03-01,Facebook,800,2100,45,2100
2026-03-01,LinkedIn,600,890,23,1840
2026-03-02,Google Ads,1200,3100,76,3800
...
\`\`\`

**JSON (best for structured/nested data):**
\`\`\`json
{
  "campaign": "Spring Sale 2026",
  "channels": [
    { "name": "Google Ads", "spend": 12000, "conversions": 890, "cpa": 13.48 },
    { "name": "Facebook", "spend": 8000, "conversions": 450, "cpa": 17.78 }
  ]
}
\`\`\`

**Context window considerations**

Claude can handle very large context windows (up to 200K tokens), which means you can feed it substantial datasets. However:
- Larger inputs cost more (you pay per token)
- Very large datasets may dilute Claude's attention
- For huge datasets, summarise or sample first, then ask for deep dives on interesting segments

A practical approach: send summary statistics for the full dataset, plus raw data for the specific time period or segment you want to analyse.

**Effective analysis prompts**

**Trend analysis:**
\`\`\`
Analyse the following marketing data for the past 30 days.

[paste data here]

Identify:
1. The top 3 most significant trends (positive or negative)
2. Any anomalies or outliers that deviate from the pattern
3. Correlations between channels (e.g., does increasing spend on X affect Y?)

For each finding, explain:
- What the data shows
- Why it might be happening (hypotheses)
- What action to take

Use specific numbers from the data to support every claim.
\`\`\`

**Comparison analysis:**
\`\`\`
Compare performance between these two time periods:

Period A (March 1-15): [data]
Period B (March 16-31): [data]

For each metric, calculate:
- Absolute change
- Percentage change
- Whether the change is statistically meaningful or likely noise

Summarise in a table format, then provide 3 key takeaways.
\`\`\`

**Anomaly detection:**
\`\`\`
Review this daily revenue data and flag any anomalies:

[data]

An anomaly is any day where the value differs from the 7-day moving average by more than 2 standard deviations. For each anomaly:
- State the date and value
- What the expected range was
- Possible explanations (day of week effects, holidays, campaigns)
\`\`\`

**Building an analysis pipeline**

For regular reporting, build a pipeline that:

1. **Fetches data** from your analytics tool (Google Analytics API, database query)
2. **Formats it** as CSV or JSON
3. **Sends it to Claude** with your analysis prompt
4. **Parses the response** into structured insights
5. **Delivers it** via email, Slack, or dashboard

\`\`\`typescript
// Weekly insight generation
async function generateWeeklyInsights() {
  // Step 1: Fetch data
  const data = await fetchAnalyticsData("last_7_days");

  // Step 2: Format as CSV
  const csv = formatAsCSV(data);

  // Step 3: Analyse with Claude
  const analysis = await callAI({
    system: "You are a senior marketing analyst. Be specific, use numbers, and prioritise actionable insights.",
    prompt: \`Analyse this week's marketing performance data and write a brief executive summary (max 300 words) with the top 3 insights and recommended actions.\\n\\n\${csv}\`
  });

  // Step 4: Deliver
  await sendSlackMessage("#marketing", analysis.reply);
}
\`\`\`

**Asking good follow-up questions**

After the initial analysis, dig deeper:
- "The CPA spike on March 12 — can you cross-reference with the channel data to identify which channel caused it?"
- "If we increased Google Ads spend by 20% based on current performance, what would you project for conversions and CPA?"
- "Segment this data by day of week — are there patterns we should use for ad scheduling?"

**Limitations to remember**

- Claude analyses the data you give it — if the data is wrong, the insights will be wrong
- Claude doesn't have access to statistical software — for rigorous statistical tests, use proper tools
- Correlation is not causation — Claude may suggest causal relationships that are actually coincidental
- Always verify specific numbers Claude cites against the raw data

**Key takeaway**

Claude turns raw data into narrative insights. The combination of quantitative data and natural language explanation is incredibly powerful for making data-driven decisions accessible to non-technical stakeholders. Build analysis prompts that are specific, demand evidence, and focus on actionability.`,
      },
    ],
    quiz: {
      question: "What is the main benefit of streaming an AI response?",
      options: [
        "Lower API cost",
        "Users see partial results immediately",
        "Responses are more accurate",
        "It uses less bandwidth",
      ],
      correct: 1,
    },
    code: {
      lang: "typescript",
      snippet: `// Streaming a response from Claude
const stream = client.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 512,
  messages: [
    { role: "user", content: "Analyse this CSV data..." }
  ],
});

for await (const event of stream) {
  if (
    event.type === "content_block_delta" &&
    event.delta.type === "text_delta"
  ) {
    process.stdout.write(event.delta.text);
  }
}`,
    },
  },
  {
    id: 6,
    title: "Final Project — Build & Ship",
    badge: "Capstone",
    duration: "2 weeks",
    lessons: [
      {
        title: "Project Planning",
        description:
          "Define scope, pick your tools, and sketch your architecture before writing code.",
        content: `The final project is where everything comes together. Before writing a single line of code, you need a plan. Skipping this step is the number one reason projects fail — not because the technology doesn't work, but because the scope wasn't defined and the approach wasn't thought through.

**Defining your project**

Your final project should be a small but complete AI-powered tool. It should:
- Solve a real problem you or your team actually has
- Use Claude's API for at least one core feature
- Have a working user interface
- Be deployable (someone else can use it)

Good project ideas for marketing/creative professionals:
- **Content repurposing tool**: Paste a blog post, get Twitter threads, LinkedIn posts, and email newsletters
- **Campaign brief generator**: Fill in a form (audience, goal, budget, timeline), get a structured campaign brief
- **Competitor analysis tool**: Paste competitor URLs, get AI-generated positioning analysis
- **Client feedback translator**: Paste vague client feedback ("make it pop"), get actionable design direction
- **Meeting notes processor**: Paste raw meeting notes, get action items, decisions, and follow-ups

**Scoping — the art of saying "not now"**

The biggest risk for your project is scope creep. Define your MVP (Minimum Viable Product) by asking:

1. What is the ONE core action a user performs? (e.g., "paste text and get transformed output")
2. What does the user see when they arrive? (the input interface)
3. What do they get when they're done? (the output)

Everything else is a "nice to have." Write it down, put it in a "v2" list, and forget about it until v1 ships.

**Architecture sketch**

Before coding, sketch the data flow:

\`\`\`
User → Frontend (React) → API Route (Next.js) → Claude (via fal.ai) → API Route → Frontend → User
\`\`\`

Identify each piece:
- **What pages do you need?** (usually 1-2 for an MVP)
- **What API routes?** (usually 1-2 — one for the main AI call, maybe one for secondary features)
- **What state do you need to manage?** (form inputs, AI responses, loading states)
- **What environment variables?** (API keys)

**Choosing your tools**

For your final project, stick with what you know from this course:
- **Next.js** — framework
- **Tailwind CSS** — styling
- **Claude API via fal.ai** — AI
- **Vercel** — hosting

Don't introduce new technologies at this stage. The goal is to ship, not to learn a new database or UI library.

**Writing a project brief (for yourself)**

Before coding, write a one-page brief:

\`\`\`
Project: [Name]
Problem: [One sentence — what pain does this solve?]
User: [Who uses this?]
Core flow: [3-5 steps of what the user does]
Tech: Next.js + Tailwind + Claude API
Pages: [List them]
API routes: [List them]
MVP scope: [What's included]
NOT in scope: [What's explicitly excluded]
Timeline: [When will you ship v1?]
\`\`\`

This brief is your north star. When you're tempted to add a feature, check it against the brief. If it's not listed, it waits for v2.

**Key takeaway**

Planning isn't slowing you down — it's speeding you up. Every minute spent planning saves ten minutes of confused coding, refactoring, and debugging. Define the scope, sketch the architecture, and write the brief before you open your code editor.`,
      },
      {
        title: "Building Your MVP",
        description:
          "Put together everything you have learned into a working prototype.",
        content: `You have the plan. Now it's time to build. This lesson walks you through the process of turning your project brief into a working application, step by step. The key principle: build the skeleton first, then add muscle, then skin.

**Phase 1: Skeleton (30 minutes)**

Set up the project structure with empty files and placeholder content:

\`\`\`bash
npx create-next-app@latest my-project --typescript --tailwind --app
cd my-project
npm install @fal-ai/client
\`\`\`

Create your file structure:
\`\`\`
app/
  page.tsx           → main page with placeholder UI
  api/
    generate/
      route.ts       → AI endpoint with placeholder response
components/
  InputForm.tsx      → form component (empty shell)
  ResultView.tsx     → result display (empty shell)
\`\`\`

At this point, every file exists but does minimal work. The page renders, the form shows, clicking submit returns a fake response. This gives you a working foundation to iterate on.

**Phase 2: Muscle (2-3 hours)**

Now implement the actual functionality, one piece at a time:

**Step 1: Build the API route**
This is your backend — the most important piece. Get the AI call working first:

\`\`\`typescript
// app/api/generate/route.ts
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY! });

export async function POST(request: Request) {
  const { input } = await request.json();

  const result = await fal.subscribe(
    "openrouter/router/openai/v1/chat/completions",
    {
      input: {
        model: "anthropic/claude-sonnet-4.6",
        prompt: input,
        system_prompt: "Your system prompt here...",
        max_tokens: 1024,
      },
    }
  );

  const data = result.data as { choices: { text: string }[] };
  return Response.json({ result: data.choices[0].text });
}
\`\`\`

Test this with curl before building the frontend:
\`\`\`bash
curl -X POST http://localhost:3000/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{"input": "test prompt"}'
\`\`\`

**Step 2: Build the input form**
Create the UI for user input. Keep it simple — a textarea and a button:

\`\`\`typescript
"use client";
import { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    onSubmit(data.result);
    setLoading(false);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your content here..."
        className="w-full h-40 border rounded-lg p-3"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="mt-2 bg-accent text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
\`\`\`

**Step 3: Build the result display**
Show the AI output in a clean, readable format.

**Step 4: Wire them together**
Connect the form, API route, and result display on the main page.

**Phase 3: Skin (1-2 hours)**

Polish the UI:
- Add proper spacing, typography, and colours
- Add loading states and error messages
- Make it responsive (test on mobile)
- Add a header with your project name
- Add placeholder/empty states (what does the user see before they submit?)

**The build order matters**

Always build in this order:
1. **API route** → verify the AI call works
2. **Input UI** → verify the user can submit data
3. **Output UI** → verify results display correctly
4. **Polish** → make it look good

Never start with styling. A beautiful form that doesn't connect to anything is worthless. An ugly form that produces AI results is a working product.

**Testing as you go**

After each change:
1. Save the file
2. Check the browser (Next.js hot-reloads automatically)
3. Test the happy path (normal usage)
4. Test edge cases (empty input, very long input, special characters)
5. Check the terminal for errors

**Key takeaway**

Build the simplest possible version first, verify it works end-to-end, then improve it. The most dangerous trap is spending hours perfecting one component before knowing if the whole system works together. Get to "ugly but functional" as fast as possible, then iterate.`,
      },
      {
        title: "Deploying to Vercel",
        description:
          "Push to GitHub, connect to Vercel, set environment variables, and ship.",
        content: `Your project works locally. Now it's time to put it on the internet where anyone can use it. Vercel makes this remarkably simple — but there are a few important steps to get right, especially around security and environment variables.

**Pre-deployment checklist**

Before deploying, verify:

1. **\`.env.local\` is in \`.gitignore\`** — this is critical. Your API keys must never be committed to Git.
\`\`\`bash
# Check .gitignore includes these:
cat .gitignore | grep -E "env|.env"
# Should show: .env*.local
\`\`\`

2. **No hardcoded secrets** — search your codebase for API keys:
\`\`\`bash
grep -r "sk-ant" --include="*.ts" --include="*.tsx" .
grep -r "AIza" --include="*.ts" --include="*.tsx" .
\`\`\`
If either finds results, move those values to environment variables immediately.

3. **Build succeeds locally**:
\`\`\`bash
npm run build
\`\`\`
If the build fails locally, it will fail on Vercel too. Fix all errors first.

4. **Test in production mode locally**:
\`\`\`bash
npm run build && npm start
\`\`\`
This simulates how your app will run on Vercel. Test all features.

**Step 1: Push to GitHub**

If you haven't already, initialise Git and push:

\`\`\`bash
git init
git add .
git commit -m "Initial commit — ready to deploy"
git remote add origin https://github.com/yourusername/your-project.git
git push -u origin main
\`\`\`

Verify on GitHub that your repository does NOT contain \`.env.local\` or any files with API keys.

**Step 2: Connect to Vercel**

Option A — via the Vercel website:
1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js and configures the build settings
5. Before clicking "Deploy," add your environment variables (next step)

Option B — via the CLI:
\`\`\`bash
npm install -g vercel
vercel login
vercel
\`\`\`

**Step 3: Add environment variables**

This is the most important deployment step. Your app needs its API keys, but they must be set in Vercel's dashboard, not in your code:

Via the Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add each variable:
   - \`FAL_KEY\` → your fal.ai API key
   - \`YOUTUBE_API_KEY\` → your YouTube Data API key
   - \`NEXT_PUBLIC_SITE_URL\` → your Vercel URL (e.g., \`https://your-project.vercel.app\`)

Via the CLI:
\`\`\`bash
vercel env add FAL_KEY
vercel env add YOUTUBE_API_KEY
\`\`\`

**Step 4: Deploy**

If you connected via the dashboard, click "Deploy." If via CLI:
\`\`\`bash
vercel --prod
\`\`\`

Vercel will:
1. Pull your code from GitHub
2. Install dependencies (\`npm install\`)
3. Run the build (\`npm run build\`)
4. Deploy to their global CDN
5. Give you a URL (e.g., \`https://your-project.vercel.app\`)

**Step 5: Verify the deployment**

After deployment, test everything:
- Visit every page — do they load?
- Test the AI chat — does it respond?
- Test video search — do results appear?
- Check on mobile — does the layout work?
- Open browser dev tools → Network tab — are there any failed requests?

**Continuous deployment**

Once connected, every push to \`main\` triggers a new deployment automatically:
\`\`\`bash
# Make a change, push, and Vercel deploys automatically
git add .
git commit -m "Update homepage copy"
git push origin main
# → Vercel starts building within seconds
\`\`\`

Vercel also creates preview deployments for pull requests, so you can test changes before merging to main.

**Custom domains**

To use your own domain:
1. Go to project Settings → Domains
2. Add your domain (e.g., \`learn.yourdomain.com\`)
3. Update your DNS records as instructed
4. Vercel automatically provisions an SSL certificate

**Monitoring after launch**

Vercel provides built-in analytics and logging:
- **Analytics** — page views, load times, core web vitals
- **Logs** — API route execution logs (helpful for debugging AI calls)
- **Speed Insights** — performance metrics per page

**Key takeaway**

Deployment is not the end — it's the beginning. Once your project is live, you'll get real feedback from real users. That feedback drives the next iteration. Ship early, ship often, and improve based on what you learn. Congratulations — you've built and deployed an AI-powered application from scratch.`,
      },
    ],
    quiz: {
      question: "What should you do before writing any code?",
      options: [
        "Choose the fanciest framework",
        "Define the scope and sketch the architecture",
        "Deploy an empty project first",
        "Write all the tests",
      ],
      correct: 1,
    },
    code: {
      lang: "bash",
      snippet: `# Deploy to Vercel in three commands
git add . && git commit -m "ready to ship"
git push origin main
vercel --prod`,
    },
  },
];
