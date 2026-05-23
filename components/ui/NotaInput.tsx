// components/ui/NotaInput.tsx
'use client'

import { Input } from '@/components/ui/input'
import { forwardRef, useRef } from 'react'

interface NotaInputProps {
  value?: number | string
  onChange: (valor: number) => void
  onNext?: () => void
  onPrev?: () => void
  disabled?: boolean
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export const NotaInput = forwardRef<HTMLInputElement, NotaInputProps>(
  ({ value, onChange, onNext, onPrev, disabled, placeholder = '-', className = '', autoFocus = false }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let valor = e.target.value
      
      // Permitir vacío
      if (valor === '') {
        onChange(0)
        return
      }
      
      // Solo permitir números (eliminar cualquier no dígito)
      valor = valor.replace(/[^\d]/g, '')
      
      // Limitar a 2 dígitos
      if (valor.length > 2) {
        valor = valor.slice(0, 2)
      }
      
      const numero = parseInt(valor, 10)
      
      // Validar rango 0-100
      if (!isNaN(numero) && numero >= 0 && numero <= 100) {
        onChange(numero)
        
        // Si ya tiene 2 dígitos y hay onNext, pasar al siguiente
        if (valor.length === 2 && onNext) {
          setTimeout(() => onNext(), 10)
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Flecha izquierda: input anterior
      if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault()
        onPrev()
      }
      // Flecha derecha: input siguiente
      if (e.key === 'ArrowRight' && onNext) {
        e.preventDefault()
        onNext()
      }
      // Enter: input siguiente
      if (e.key === 'Enter' && onNext) {
        e.preventDefault()
        onNext()
      }
    }

    const displayValue = value !== undefined && value !== null && value !== '' && value !== 0 ? value : ''

    return (
      <Input
        ref={ref || inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`text-center font-bold ${className}`}
      />
    )
  }
)

NotaInput.displayName = 'NotaInput'