#!/bin/bash
# ============================================
# EPSTEIN FILES FEED — Deploy Completo Vercel
# ============================================
# Rode este script na pasta do projeto:
#   chmod +x deploy.sh && ./deploy.sh
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   EPSTEIN FILES FEED — Deploy Vercel     ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# 1. Verifica Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# 2. Instala dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi
echo "✅ Dependências OK"

# 3. Instala Vercel CLI se necessário
if ! npx vercel --version &> /dev/null 2>&1; then
    echo "📦 Instalando Vercel CLI..."
    npm i -g vercel
fi
echo "✅ Vercel CLI OK"

# 4. Login no Vercel (abre o browser)
echo ""
echo "🔐 Fazendo login no Vercel..."
echo "   (Vai abrir o navegador para autenticar)"
echo ""
npx vercel login

# 5. Configura variáveis de ambiente
echo ""
echo "⚙️  Configurando projeto e variáveis de ambiente..."
echo ""

# Link/create project
npx vercel link --yes 2>/dev/null || npx vercel

# Set env vars
echo "https://eyqbjqmajflfjyoqsfud.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development --force 2>/dev/null || true
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cWJqcW1hamZsZmp5b3FzZnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDY3OTUsImV4cCI6MjA4NzIyMjc5NX0.IMBssS3EMv17VqS2V67On9L0r1iZziP6mFz144ZsBos" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development --force 2>/dev/null || true

echo "✅ Variáveis de ambiente configuradas"

# 6. Build e Deploy
echo ""
echo "🚀 Fazendo deploy para produção..."
echo ""
npx vercel deploy --prod

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ✅ DEPLOY COMPLETO!                    ║"
echo "║   Sua URL está acima ☝️                   ║"
echo "╚══════════════════════════════════════════╝"
echo ""
