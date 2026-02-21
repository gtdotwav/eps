'use client'

import { useState, useEffect } from 'react'

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.sessionStorage?.getItem('age-verified') : null
    if (stored === 'true') setVerified(true)
    setChecking(false)
  }, [])

  const handleVerify = () => {
    try { sessionStorage.setItem('age-verified', 'true') } catch {}
    setVerified(true)
  }

  if (checking) return null

  if (!verified) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-700 border border-dark-500 rounded-2xl p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-600/30">
            E
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Epstein Files Feed</h1>
            <p className="text-zinc-400 mt-2 text-sm">Plataforma de visualização dos documentos desclassificados pelo DOJ</p>
          </div>
          <div className="bg-dark-600 border border-dark-400/50 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Este site contém documentos oficiais do Departamento de Justiça dos Estados Unidos
              relacionados ao caso Jeffrey Epstein. O conteúdo pode incluir material sensível
              de natureza legal e investigativa.
            </p>
            <p className="text-xs text-zinc-500">
              Fonte: <a href="https://www.justice.gov/epstein" target="_blank" className="text-red-500/70 hover:text-red-400">justice.gov/epstein</a>
            </p>
          </div>
          <button
            onClick={handleVerify}
            className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
          >
            Confirmo que tenho 18+ anos
          </button>
          <p className="text-[10px] text-zinc-600">
            Ao prosseguir, você confirma ter 18 anos ou mais e entende que o conteúdo
            é de natureza legal/investigativa.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
