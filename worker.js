
const MODELS = [
    { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 (8B)' },
    { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 (8B)' },
    { id: '@cf/meta/llama-2-7b-chat-int8', name: 'Llama 2 (7B)' },
    { id: '@cf/mistral/mistral-7b-instruct-v0.1', name: 'Mistral 7B v0.1' },
    { id: '@cf/google/gemma-7b-it', name: 'Gemma 7B' },
    { id: '@cf/google/gemma-2b-it', name: 'Gemma 2B' },
    { id: '@cf/qwen/qwen1.5-7b-chat-awq', name: 'Qwen 1.5 (7B)' },
    { id: '@cf/qwen/qwen1.5-14b-chat-awq', name: 'Qwen 1.5 (14B)' },
    { id: '@cf/microsoft/phi-2', name: 'Phi-2' },
    { id: '@cf/openchat/openchat-3.5-0106', name: 'OpenChat 3.5' },
    { id: '@cf/tinyllama/tinyllama-1.1b-chat-v1.0', name: 'TinyLlama 1.1B' }
];

const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloudflare AI Chat</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f172a;
            --sidebar-bg: #1e293b;
            --text-color: #e2e8f0;
            --accent-color: #3b82f6;
            --accent-hover: #2563eb;
            --user-msg-bg: #3b82f6;
            --ai-msg-bg: #334155;
            --input-bg: #1e293b;
            --border-color: #334155;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* Sidebar */
        .sidebar {
            width: 280px;
            background-color: var(--sidebar-bg);
            padding: 20px;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--border-color);
            transition: transform 0.3s ease;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 30px;
            color: var(--accent-color);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .model-selector {
            margin-bottom: 20px;
        }

        .model-selector label {
            display: block;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: #94a3b8;
        }

        select {
            width: 100%;
            padding: 10px;
            background-color: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 0.95rem;
            cursor: pointer;
            outline: none;
        }

        select:focus {
            border-color: var(--accent-color);
        }

        /* Chat Area */
        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .messages {
            flex: 1;
            padding: 20px 15%;
            overflow-y: auto;
            scroll-behavior: smooth;
        }

        .message {
            margin-bottom: 20px;
            display: flex;
            align-items: flex-start;
            gap: 15px;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        .user-avatar {
            background-color: #64748b;
        }

        .ai-avatar {
            background-color: var(--accent-color);
        }

        .bubble {
            padding: 12px 18px;
            border-radius: 12px;
            max-width: 80%;
            line-height: 1.6;
            font-size: 1rem;
            position: relative;
        }

        .user-msg {
            flex-direction: row-reverse;
        }

        .user-msg .bubble {
            background-color: var(--user-msg-bg);
            color: white;
            border-bottom-right-radius: 2px;
        }

        .ai-msg .bubble {
            background-color: var(--ai-msg-bg);
            border-bottom-left-radius: 2px;
        }

        /* Input Area */
        .input-area {
            padding: 20px 15%;
            background-color: var(--bg-color);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 15px;
            align-items: flex-end;
        }

        textarea {
            flex: 1;
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--text-color);
            padding: 14px;
            font-size: 1rem;
            font-family: inherit;
            resize: none;
            max-height: 150px;
            outline: none;
            transition: box-shadow 0.2s;
        }

        textarea:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
            border-color: var(--accent-color);
        }

        button {
            background-color: var(--accent-color);
            color: white;
            border: none;
            padding: 14px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
            height: 52px;
        }

        button:hover {
            background-color: var(--accent-hover);
        }

        button:disabled {
            background-color: #475569;
            cursor: not-allowed;
        }

        /* Markdown Styles */
        .bubble pre {
            background-color: #1e293b;
            padding: 10px;
            border-radius: 8px;
            overflow-x: auto;
        }
        
        .bubble code {
            font-family: 'Consolas', monospace;
            background-color: rgba(0,0,0,0.2);
            padding: 2px 4px;
            border-radius: 4px;
        }
        
        .bubble pre code {
            background-color: transparent;
            padding: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                display: none;
            }
            .messages, .input-area {
                padding: 20px;
            }
        }
        
        .loading span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #fff;
            border-radius: 50%;
            margin: 0 2px;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .loading span:nth-child(1) { animation-delay: -0.32s; }
        .loading span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
</head>
<body>

    <div class="sidebar">
        <div class="logo">
            <span>✨</span> Cloudflare AI
        </div>
        <div class="model-selector">
            <label for="model-select">Select Model</label>
            <select id="model-select">
                <!-- Options injected by JS -->
            </select>
        </div>
        <div style="margin-top: auto; font-size: 0.8rem; color: #64748b;">
            Powered by Cloudflare Workers AI
        </div>
    </div>

    <div class="chat-container">
        <div class="messages" id="messages">
            <div class="message ai-msg">
                <div class="avatar ai-avatar">🤖</div>
                <div class="bubble">Hello! I'm your AI assistant running on Cloudflare Workers. Pick a model and let's chat!</div>
            </div>
        </div>
        <div class="input-area">
            <textarea id="prompt-input" rows="1" placeholder="Type a message..."></textarea>
            <button id="send-btn">Send</button>
        </div>
    </div>

    <script>
        const models = ${JSON.stringify(MODELS)};
        const select = document.getElementById('model-select');
        const messagesDiv = document.getElementById('messages');
        const input = document.getElementById('prompt-input');
        const sendBtn = document.getElementById('send-btn');

        // Populate models
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            select.appendChild(opt);
        });

        // Auto-resize textarea
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if(this.value === '') this.style.height = 'auto';
        });

        // Send message
        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            // Add user message
            addMessage(text, 'user');
            input.value = '';
            input.style.height = 'auto';
            input.disabled = true;
            sendBtn.disabled = true;

            // Add loading
            const loadingId = addLoading();

            try {
                const model = select.value;
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: text, model: model })
                });

                const data = await response.json();
                
                // Remove loading
                removeMessage(loadingId);

                if (data.error) {
                    addMessage('Error: ' + data.error, 'ai');
                } else {
                    addMessage(data.response, 'ai');
                }

            } catch (err) {
                removeMessage(loadingId);
                addMessage('Network Error: ' + err.message, 'ai');
            } finally {
                input.disabled = false;
                sendBtn.disabled = false;
                input.focus();
            }
        }

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.className = \`message \${sender}-msg\`;
            
            const avatar = document.createElement('div');
            avatar.className = \`avatar \${sender}-avatar\`;
            avatar.textContent = sender === 'user' ? '👤' : '🤖';

            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            if (sender === 'ai') {
                bubble.innerHTML = marked.parse(text);
            } else {
                bubble.textContent = text;
            }

            if (sender === 'user') {
                div.appendChild(bubble);
                div.appendChild(avatar);
            } else {
                div.appendChild(avatar);
                div.appendChild(bubble);
            }

            messagesDiv.appendChild(div);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            return div.id = 'msg-' + Date.now();
        }

        function addLoading() {
            const div = document.createElement('div');
            div.className = 'message ai-msg id-loading';
            div.innerHTML = \`
                <div class="avatar ai-avatar">🤖</div>
                <div class="bubble loading">
                    <span></span><span></span><span></span>
                </div>
            \`;
            messagesDiv.appendChild(div);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            return div.id = 'loading-' + Date.now();
        }

        function removeMessage(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    </script>
</body>
</html>
`;

export default {
    async fetch(request, env) {
        if (request.method === 'GET') {
            return new Response(HTML, {
                headers: { 'content-type': 'text/html;charset=UTF-8' }
            });
        }

        if (request.method === 'POST') {
            try {
                const body = await request.json();
                const prompt = body.prompt || 'Hello';
                const model = body.model || '@cf/meta/llama-3-8b-instruct';

                // Keep a simple history for context (stateless for now, just 1-turn or simple system prompt)
                const messages = [
                    { role: 'system', content: 'You are a helpful, intelligent assistant.' },
                    { role: 'user', content: prompt }
                ];

                // Use env.AI.run directly (Native Binding)
                const response = await env.AI.run(model, { messages });

                return new Response(JSON.stringify(response), {
                    headers: { 'content-type': 'application/json' }
                });
            } catch (e) {
                // Fallback for when env.AI is not bound correctly
                const errorMsg = e.message || 'Unknown error';
                const helpMsg = errorMsg.includes('AI') ? ' Did you forget to bind AI in Wrangler settings?' : '';
                return new Response(JSON.stringify({ error: errorMsg + helpMsg }), {
                    status: 500,
                    headers: { 'content-type': 'application/json' }
                });
            }
        }

        return new Response('Method Not Allowed', { status: 405 });
    }
};
