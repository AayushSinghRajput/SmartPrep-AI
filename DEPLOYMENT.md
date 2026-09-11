# 🚀 SmartPrep-AI Deployment Guide

This guide provides step-by-step instructions for deploying SmartPrep-AI:
- **Backend (FastAPI + Pinecone + MongoDB Atlas)** on **Render**
- **Frontend (Next.js)** on **Vercel**

---

## Part 1: Deploy Backend to Render

### Prerequisites
1. **MongoDB Atlas**: Ensure you have created a free M0 cluster and copied your MongoDB connection string (`mongodb+srv://...`).
2. **Pinecone**: Ensure you have copied your default API key from [pinecone.io](https://pinecone.io).
3. **GitHub Repository**: Push your latest code changes to your GitHub repository.

### Steps to Deploy on Render

1. Go to **[dashboard.render.com](https://dashboard.render.com)** and sign in.
2. Click **New +** $\rightarrow$ **Blueprint** (or **Web Service**).
3. Connect your GitHub repository (`SmartPrep-AI`).
4. Render will automatically detect `render.yaml` and configure the web service `smartprep-ai-server`.
5. Under **Environment Variables**, fill in your secret credentials:
   - `ENV`: `production`
   - `MONGO_ATLAS_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
   - `PINECONE_API_KEY`: Your Pinecone API Key
   - `PINECONE_INDEX_NAME`: `smartprep-ai`
   - `GOOGLE_API_KEY`: Your Gemini/Google API key
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ALLOWED_ORIGINS`: `https://your-app-name.vercel.app` (Add your frontend Vercel URL once deployed)
6. Click **Deploy Blueprint**.
7. Once deployed, Render will provide a service URL (e.g. `https://smartprep-ai-server.onrender.com`).

---

## Part 2: Deploy Frontend to Vercel

### Steps to Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in.
2. Click **Add New...** $\rightarrow$ **Project**.
3. Import your GitHub repository (`SmartPrep-AI`).
4. In the Project Configuration screen:
   - **Root Directory**: Select `client` (Edit root directory and click `client`).
   - **Framework Preset**: `Next.js`
5. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_API_URL`: `https://smartprep-ai-server.onrender.com/api` (Replace with your actual Render backend URL)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: `185382203123-m8smuke9b9qaeeu2pgmhdf9nvuckt95r.apps.googleusercontent.com`
6. Click **Deploy**.

---

## Part 3: Post-Deployment Check

1. Once Vercel finishes deploying, copy your production Vercel URL (e.g. `https://smartprep-ai.vercel.app`).
2. Go back to Render $\rightarrow$ `smartprep-ai-server` $\rightarrow$ **Environment**.
3. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```env
   ALLOWED_ORIGINS=https://smartprep-ai.vercel.app,http://localhost:3000
   ```
4. Save changes. Your frontend will now communicate seamlessly with your Render backend over HTTPS with Pinecone vector RAG enabled!
