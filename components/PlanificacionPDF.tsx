import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { Planificacion } from '@/lib/types'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: 'Helvetica' },
  header: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 4, color: '#1e40af' },
  subtitle: { fontSize: 12, textAlign: 'center', marginBottom: 16, color: '#4b5563' },
  infoBox: { backgroundColor: '#f0f4ff', padding: 10, borderRadius: 6, marginBottom: 12, border: '1px solid #c7d2fe' },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  label: { fontWeight: 'bold', width: 100, fontSize: 10, color: '#374151' },
  value: { flex: 1, fontSize: 10, color: '#1f2937' },
  momentoTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6, padding: 6, borderRadius: 4 },
  inicio: { backgroundColor: '#dcfce7', color: '#166534' },
  desarrollo: { backgroundColor: '#dbeafe', color: '#1e40af' },
  cierre: { backgroundColor: '#f3e8ff', color: '#6b21a8' },
  descripcion: { fontSize: 10, marginBottom: 8, color: '#374151', lineHeight: 1.5 },
  actividadBox: { backgroundColor: '#f9fafb', padding: 8, borderRadius: 4, marginBottom: 6, border: '1px solid #e5e7eb' },
  actividadTitulo: { fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  actividadDesc: { fontSize: 10, color: '#4b5563', marginBottom: 2 },
  duracion: { fontSize: 9, color: '#9ca3af' },
})

interface Props {
  planificacion: Planificacion
}

export default function PlanificacionPDF({ planificacion }: Props) {
  const getMomentoStyle = (tipo: string) => {
    if (tipo === 'inicio') return styles.inicio
    if (tipo === 'desarrollo') return styles.desarrollo
    return styles.cierre
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Centro Educativo Salomé Ureña</Text>
        <Text style={styles.subtitle}>Planificación Docente</Text>

        {/* Datos generales */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tema:</Text>
            <Text style={styles.value}>{planificacion.tema}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Materia:</Text>
            <Text style={styles.value}>{planificacion.materia}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Grado:</Text>
            <Text style={styles.value}>{planificacion.grado?.replace('-', ' ')}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Maestro:</Text>
            <Text style={styles.value}>{planificacion.maestro}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Año:</Text>
            <Text style={styles.value}>{planificacion.anoEscolar}</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 6 }]}>
            <Text style={styles.label}>Competencia:</Text>
            <Text style={styles.value}>{planificacion.competencia}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Indicador:</Text>
            <Text style={styles.value}>{planificacion.indicadorLogro}</Text>
          </View>
        </View>

        {/* Momentos */}
        {planificacion.momentos?.map((momento, idx) => (
          <View key={idx}>
            <Text style={[styles.momentoTitle, getMomentoStyle(momento.tipo)]}>
              {momento.tipo === 'inicio' ? '🚀' : momento.tipo === 'desarrollo' ? '📝' : '🎯'} Momento {idx + 1}: {momento.tipo}
            </Text>
            <Text style={styles.descripcion}>{momento.descripcion}</Text>

            {momento.actividades?.map((act, aIdx) => (
              <View key={aIdx} style={styles.actividadBox}>
                <Text style={styles.actividadTitulo}>{aIdx + 1}. {act.titulo}</Text>
                <Text style={styles.actividadDesc}>{act.descripcion}</Text>
                {act.duracion && <Text style={styles.duracion}>⏱ {act.duracion}</Text>}
                {act.recursos?.some(r => r.tipo === 'audio' && r.texto) && (
                  <Text style={{ fontSize: 9, color: '#6366f1', marginTop: 2 }}>
                    🎵 Audio disponible en la plataforma
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  )
}