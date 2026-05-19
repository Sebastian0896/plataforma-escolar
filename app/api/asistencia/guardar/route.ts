// app/api/asistencia/guardar/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Asistencia from '@/lib/models/Asistencia'

export async function POST(req: NextRequest) {
  console.log('========================================')
  console.log('🔵 [1/6] Endpoint /api/asistencia/guardar llamado')
  console.log('========================================')
  
  // 1. Verificar sesión
  console.log('🔵 [2/6] Verificando sesión...')
  const session = await auth()
  
  if (!session) {
    console.log('❌ [ERROR] No hay sesión activa')
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }
  
  console.log('✅ Sesión encontrada. Usuario:', session.user?.email, 'Rol:', session.user?.role)
  
  if (session.user?.role !== 'docente') {
    console.log('❌ [ERROR] Rol incorrecto:', session.user?.role)
    return NextResponse.json({ error: 'No autorizado - Se requiere rol docente' }, { status: 401 })
  }
  
  // 2. Leer body
  console.log('🔵 [3/6] Leyendo body de la petición...')
  let body
  try {
    body = await req.json()
    console.log('✅ Body recibido:', JSON.stringify(body, null, 2))
  } catch (error) {
    console.log('❌ [ERROR] No se pudo leer el body:', error)
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }
  
  const { asistencias } = body
  
  if (!asistencias) {
    console.log('❌ [ERROR] No hay campo "asistencias" en el body')
    return NextResponse.json({ error: 'Falta campo asistencias' }, { status: 400 })
  }
  
  if (!Array.isArray(asistencias)) {
    console.log('❌ [ERROR] asistencias no es un array')
    return NextResponse.json({ error: 'asistencias debe ser un array' }, { status: 400 })
  }
  
  console.log(`✅ asistencias es un array de ${asistencias.length} elementos`)
  
  if (asistencias.length === 0) {
    console.log('⚠️ [WARN] El array de asistencias está vacío')
    return NextResponse.json({ error: 'No hay datos para guardar' }, { status: 400 })
  }
  
  // 3. Conectar a MongoDB
  console.log('🔵 [4/6] Conectando a MongoDB...')
  try {
    await connectDB()
    console.log('✅ Conexión a MongoDB exitosa')
  } catch (error) {
    console.log('❌ [ERROR] No se pudo conectar a MongoDB:', error)
    return NextResponse.json({ error: 'Error de conexión a base de datos' }, { status: 500 })
  }
  
  // 4. Procesar registros
  console.log('🔵 [5/6] Procesando registros...')
  let actualizados = 0
  let creados = 0
  let errores = 0
  
  for (let i = 0; i < asistencias.length; i++) {
    const registro = asistencias[i]
    console.log(`--- Procesando registro ${i + 1}/${asistencias.length} ---`)
    console.log('Registro:', JSON.stringify(registro, null, 2))
    
    const { estudianteId, grado, materia, periodo, fecha, presente, observacion } = registro
    
    if (!estudianteId) {
      console.log(`❌ Registro ${i + 1}: falta estudianteId`)
      errores++
      continue
    }
    
    try {
      // Buscar si ya existe
      const existe = await Asistencia.findOne({
        estudianteId,
        grado,
        materia,
        periodo,
        fecha: new Date(fecha),
      })
      
      if (existe) {
        // Actualizar
        console.log(`📝 Actualizando registro existente para estudiante ${estudianteId}`)
        existe.presente = presente
        existe.observacion = observacion || ''
        existe.updatedAt = new Date()
        await existe.save()
        actualizados++
        console.log(`✅ Actualizado: ${estudianteId}`)
      } else {
        // Crear
        console.log(`✨ Creando nuevo registro para estudiante ${estudianteId}`)
        await Asistencia.create({
          estudianteId,
          grado,
          materia,
          periodo,
          fecha: new Date(fecha),
          presente,
          observacion: observacion || '',
          docenteId: session.user.id,
          centroId: session.user.centroId,
        })
        creados++
        console.log(`✅ Creado: ${estudianteId}`)
      }
    } catch (error) {
      console.log(`❌ Error procesando estudiante ${estudianteId}:`, error)
      errores++
    }
  }
  
  // 5. Resultado final
  console.log('🔵 [6/6] Procesamiento completado')
  console.log('========================================')
  console.log('📊 RESUMEN:')
  console.log(`   - Creados: ${creados}`)
  console.log(`   - Actualizados: ${actualizados}`)
  console.log(`   - Errores: ${errores}`)
  console.log('========================================')
  
  return NextResponse.json({ 
    success: true, 
    actualizados, 
    creados,
    errores,
    message: `Asistencia guardada: ${creados} nuevos, ${actualizados} actualizados`
  })
}