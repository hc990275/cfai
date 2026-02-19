
const MODEL_GROUPS = [
    {
        name: "🔥 热门推荐 (Featured)",
        models: [
            { id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', name: 'Llama 3.3 (70B)', desc: 'Meta 最强开源模型，70B 参数，FP8 加速，综合能力极强' },
            { id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 (Distill)', desc: '深度求索 R1 精馏版 (基于 Qwen 2.5)，推理和数学能力卓越' },
            { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 (8B)', desc: 'Llama 3 升级版，指令遵循最好，速度与智能的完美平衡' },
            { id: '@cf/qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder (32B)', desc: '通义千问代码从模型，编程能力极强' }
        ]
    },
    {
        name: "🤖 DeepSeek 系列",
        models: [
            { id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B', desc: '基于 Qwen 2.5 的 R1 精馏版，擅长复杂推理' },
            { id: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq', name: 'DeepSeek Coder 6.7B', desc: '深度求索代码模型，擅长编程任务' },
            { id: '@cf/deepseek-ai/deepseek-math-7b-instruct', name: 'DeepSeek Math 7B', desc: '擅长数学运算和逻辑推理' }
        ]
    },
    {
        name: "🦙 Llama 系列 (Meta)",
        models: [
            { id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', name: 'Llama 3.3 (70B)', desc: '目前最强 Llama 版本' },
            { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 (8B)', desc: '性价比最高的 8B 模型' },
            { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 (8B)', desc: '经典的 Llama 3 基础版' },
            { id: '@cf/meta/llama-3.1-70b-instruct', name: 'Llama 3.1 (70B)', desc: '70B 大参数版本，知识更广博' },
            { id: '@cf/meta/llama-2-7b-chat-int8', name: 'Llama 2 (7B)', desc: '经典的 Llama 2 模型' }
        ]
    },
    {
        name: "🇨🇳 Qwen (通义千问) 系列",
        models: [
            { id: '@cf/qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder (32B)', desc: '最新 2.5 代代码模型，开发利器' },
            { id: '@cf/qwen/qwen1.5-14b-chat-awq', name: 'Qwen 1.5 (14B)', desc: '14B 中等参数，中文理解优秀' },
            { id: '@cf/qwen/qwen1.5-7b-chat-awq', name: 'Qwen 1.5 (7B)', desc: '7B 轻量版，响应迅速' },
            { id: '@cf/qwen/qwen1.5-0.5b-chat', name: 'Qwen 1.5 (0.5B)', desc: '超微型模型，速度飞快，适合简单任务' }
        ]
    },
    {
        name: "💎 Google Gemma 系列",
        models: [
            { id: '@cf/google/gemma-7b-it', name: 'Gemma 7B', desc: 'Google 开源，擅长创意写作' },
            { id: '@cf/google/gemma-2b-it', name: 'Gemma 2B', desc: '轻量级 Gemma，适合移动端场景演示' }
        ]
    },
    {
        name: "🌪️ Mistral / 其他精选",
        models: [
            { id: '@cf/mistral/mistral-7b-instruct-v0.1', name: 'Mistral 7B v0.1', desc: '欧洲最强开源小模型之一' },
            { id: '@cf/openchat/openchat-3.5-0106', name: 'OpenChat 3.5', desc: '基于 Mistral 优化，对话体验自然' },
            { id: '@cf/microsoft/phi-2', name: 'Phi-2', desc: '微软 2.7B 小模型，常识推理惊人' },
            { id: '@cf/tinyllama/tinyllama-1.1b-chat-v1.0', name: 'TinyLlama 1.1B', desc: '超轻量，极致速度' }
        ]
    }
];

// Flatten models for easy lookup
const ALL_MODELS = MODEL_GROUPS.flatMap(g => g.models);

const HTML = `
<!DOCTYPE html>
<html lang="zh-CN" translate="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <meta http-equiv="Content-Language" content="zh-CN">
    <title>AI 助手</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f172a;
            --sidebar-bg: #1e293b;
            --text-color: #e2e8f0;
            --text-muted: #94a3b8;
            --accent-color: #3b82f6;
            --accent-hover: #2563eb;
            --user-msg-bg: #3b82f6;
            --ai-msg-bg: #334155;
            --input-bg: #1e293b;
            --border-color: #334155;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* Sidebar */
        .sidebar {
            width: 320px;
            background-color: var(--sidebar-bg);
            padding: 24px;
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
            gap: 12px;
        }

        .model-selector {
            margin-bottom: 20px;
        }

        .model-selector label {
            display: block;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: var(--text-muted);
            font-weight: 500;
        }

        select {
            width: 100%;
            padding: 12px;
            background-color: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 0.95rem;
            cursor: pointer;
            outline: none;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
        }

        select:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        
        optgroup {
            color: var(--text-muted);
            font-style: normal;
            font-weight: 600;
            background-color: var(--sidebar-bg);
        }

        .model-desc {
            margin-top: 12px;
            padding: 12px;
            background-color: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            font-size: 0.85rem;
            color: #bfdbfe;
            line-height: 1.5;
            transition: opacity 0.3s ease;
            min-height: 60px;
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
            padding: 24px 10%;
            overflow-y: auto;
            scroll-behavior: smooth;
        }

        .message {
            margin-bottom: 24px;
            display: flex;
            align-items: flex-start;
            gap: 16px;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            flex-shrink: 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
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
            padding: 24px 10%;
            background-color: var(--bg-color);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 16px;
            align-items: flex-end;
        }

        textarea {
            flex: 1;
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--text-color);
            padding: 16px;
            font-size: 1rem;
            font-family: inherit;
            resize: none;
            max-height: 150px;
            outline: none;
            transition: all 0.2s;
        }

        textarea:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
            border-color: var(--accent-color);
        }

        button {
            background-color: var(--accent-color);
            color: white;
            border: none;
            padding: 0 28px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
            height: 54px;
            font-size: 1rem;
        }

        button:hover {
            background-color: var(--accent-hover);
        }

        button:disabled {
            background-color: #475569;
            cursor: not-allowed;
            opacity: 0.7;
        }

        /* Markdown Styles & Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }

        .bubble pre {
            background-color: #1e293b;
            padding: 12px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 10px 0;
            border: 1px solid #334155;
        }
        
        .bubble code {
            font-family: 'Consolas', 'Monaco', monospace;
            background-color: rgba(255,255,255,0.1);
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        
        .bubble pre code {
            background-color: transparent;
            padding: 0;
            color: #e2e8f0;
        }
        
        .bubble p {
            margin: 0 0 10px 0;
        }
        .bubble p:last-child {
            margin-bottom: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                display: none;
            }
            .messages, .input-area {
                padding: 16px;
            }
            .bubble {
                max-width: 90%;
            }
        }
        
        .loading span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #e2e8f0;
            border-radius: 50%;
            margin: 0 3px;
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
            <span>✨</span> Cloudflare AI 助手
        </div>
        <div class="model-selector">
            <label for="model-select">选择模型</label>
            <select id="model-select">
                <!-- Options injected by JS -->
            </select>
            <div id="model-desc-display" class="model-desc">
                <!-- Description injected by JS -->
            </div>
        </div>
        <div style="margin-top: auto; font-size: 0.8rem; color: #64748b;">
            基于 Cloudflare Workers AI 构建
        </div>
    </div>

    <div class="chat-container">
        <div class="messages" id="messages">
            <div class="message ai-msg">
                <div class="avatar ai-avatar">🤖</div>
                <div class="bubble">你好！我是运行在 Cloudflare Workers 上的 AI 助手。请选择一个模型，我们开始聊天吧！</div>
            </div>
        </div>
        <div class="input-area">
            <textarea id="prompt-input" rows="1" placeholder="输入消息... (Shift+Enter 换行)"></textarea>
            <button id="send-btn">发送</button>
        </div>
    </div>

    <script>
        const modelGroups = ${JSON.stringify(MODEL_GROUPS)};
        const allModels = ${JSON.stringify(ALL_MODELS)};
        const select = document.getElementById('model-select');
        const descDisplay = document.getElementById('model-desc-display');
        const messagesDiv = document.getElementById('messages');
        const input = document.getElementById('prompt-input');
        const sendBtn = document.getElementById('send-btn');

        // Populate models with groups
        modelGroups.forEach(group => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.name;
            
            group.models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.id;
                opt.textContent = m.name;
                optgroup.appendChild(opt);
            });
            
            select.appendChild(optgroup);
        });

        // Init description
        if (allModels.length > 0) {
            descDisplay.textContent = allModels[0].desc;
        }

        // Update description on change
        select.addEventListener('change', (e) => {
            const selected = allModels.find(m => m.id === e.target.value);
            if (selected) {
                descDisplay.textContent = selected.desc;
                // Fade effect
                descDisplay.style.opacity = '0';
                setTimeout(() => descDisplay.style.opacity = '1', 200);
            }
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
            sendBtn.textContent = '思考中...';

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
                    addMessage('错误: ' + data.error, 'ai');
                } else {
                    addMessage(data.response, 'ai');
                }

            } catch (err) {
                removeMessage(loadingId);
                addMessage('网络错误: ' + err.message, 'ai');
            } finally {
                input.disabled = false;
                sendBtn.disabled = false;
                sendBtn.textContent = '发送';
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
            // Smooth scroll to bottom
            setTimeout(() => {
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 10);
            
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
                const prompt = body.prompt || '你好';
                const model = body.model || '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

                // Custom system prompt for better Chinese response
                const messages = [
                    { role: 'system', content: '你是一个乐于助人的 AI 助手。除非用户另有要求，否则请始终使用简体中文回答所有问题。' },
                    { role: 'user', content: prompt }
                ];

                // Use env.AI.run directly (Native Binding)
                // If the model fails or is in beta, we should handle it elegantly, but for now we let error propagate
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
