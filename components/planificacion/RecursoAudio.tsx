'use client'

import TextToSpeech from '@/components/TextToSpeech'

interface Props {
  texto: string
  traduccion?: string
  lang: string
}

export default function RecursoAudio({ texto, traduccion, lang }: Props) {
  return (
    <div className="mt-2">
      <TextToSpeech text={texto} traduccion={traduccion} lang={lang} />
    </div>
  )
}