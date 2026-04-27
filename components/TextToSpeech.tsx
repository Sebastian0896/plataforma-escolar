// components/TextToSpeech.tsx
'use client';

import { useState, useCallback } from 'react';

interface TextToSpeechProps {
  text: string;
  traduccion?: string;
  lang?: string; // Ya existe, solo documentamos
}

export default function TextToSpeech({ text, traduccion, lang = 'fr-FR' }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTraduccion, setShowTraduccion] = useState(false);

  const speak = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, [text, lang]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={speak}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
        title={isPlaying ? 'Reproduciendo...' : 'Escuchar pronunciación'}
        disabled={isPlaying}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            Reproduciendo...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
            Escuchar
          </>
        )}
      </button>
      
      {traduccion && (
        <button
          onClick={() => setShowTraduccion(!showTraduccion)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
            showTraduccion
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
          }`}
          title="Ver traducción"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.04 48.04 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.61 15.85a.75.75 0 111.06-1.06c1.211 1.212 1.83 2.8 1.83 4.46a.75.75 0 11-1.5 0c0-1.286-.47-2.482-1.39-3.4z" clipRule="evenodd" />
          </svg>
          {showTraduccion ? 'Ocultar' : 'Traducción'}
        </button>
      )}
      
      {traduccion && showTraduccion && (
        <div className="w-full mt-1 p-2 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{traduccion}</p>
        </div>
      )}
    </div>
  );
}