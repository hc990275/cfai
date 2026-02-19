# Cloudflare AI Bot 使用指南

这是一个基于 Cloudflare Workers AI 的智能聊天机器人。它包含一个现代化的 Web 界面，支持切换多种 AI 模型（如 Llama 3, Gemma, Mistral 等）。

## 版本记录

- **v1.0.0**: 初始版本，支持 Web 聊天界面和多模型切换。移除第三方依赖，使用原生 Cloudflare AI 绑定。

## 部署方法

由于代码已优化，您可以选择以下两种方式之一进行部署：

### 方法一：直接使用 Wrangler 命令行（推荐）

如果您本地已安装 Node.js：

1. 打开终端（Terminal），进入 `bot` 目录。
2. 运行部署命令：
   ```bash
   npx wrangler deploy
   ```
   *(如果提示登录，请按提示完成 Cloudflare 登录)*

### 方法二：复制到 Cloudflare Dashboard（传统方式）

如果您习惯使用网页版编辑器：

1. **复制代码**：打开 `worker.js`，复制所有内容。
2. **粘贴代码**：在 Cloudflare Dashboard 创建一个新的 Worker，将代码粘贴进去。
3. **配置 AI 绑定**（非常重要）：
   - 在 Worker 的 **Settings (设置)** -> **Bindings (绑定)** 中。
   - 点击 **Add (添加)** -> **Workers AI**。
   - Variable name (变量名) 填写：`AI`
   - 点击 **Deploy (部署)**。

## 使用方法

部署完成后，访问 Worker 的 URL（例如 `https://your-worker.subdomain.workers.dev`），您将看到聊天界面。选择一个模型即可开始对话。
