type Params = Promise<{ grado: string }>

export default async function EstudiantePage({ params }: { params: Params }) {
  const { grado } = await params

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-gray-900">
        Bienvenido estudiante
      </h1>
      <p className="text-gray-500 mt-2">
        Grado: {grado?.replace('-', ' ')}
      </p>
      <p className="text-gray-400 mt-1">
        Seleccioná un tema del menú para ver su contenido
      </p>
    </div>
  )
}