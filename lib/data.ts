/* // lib/data.ts
import { Planificacion, Materia } from './types';

export const planificaciones: Planificacion[] = [

  // ============ INGLÉS ============
  {
    slug: 'identificacion-personal',
    materia: 'Ingles',
    tema: 'Información Personal',
    competencia: 'Comunicación oral y escrita en lengua extranjera',
    indicadorLogro: 'Se presenta a sí mismo y da información personal básica en inglés, utilizando saludos formales e informales adecuadamente.',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: 'Saludo inicial en inglés. Se proyecta una imagen de dos personas presentándose y se pregunta a los estudiantes qué observan. Se introduce el tema del día: "Introducing yourself".',
        contenidoEstudiante: 'Today we will learn how to introduce ourselves in English. Look at the image and think: what are these people doing?',
        actividades: [
          {
            titulo: 'Escucha activa: Saludos en inglés',
            descripcion: 'Los estudiantes escuchan un audio con diferentes saludos (Hello, Hi, Good morning) y los repiten. Se discute la diferencia entre formal e informal.',
            contenidoEstudiante: 'Listen to the greetings in English and repeat them. Do you notice any difference between them?',
            audioTexto: 'Hello, my name is Marie. Hi, I\'m Peter. Good evening, how are you?',
            audioTraduccion: 'Hola, mi nombre es Marie. Hola, yo soy Peter. Buenas noches, ¿cómo estás?',
            duracion: '8 min'
          },
          {
            titulo: 'Lluvia de ideas guiada',
            descripcion: 'El docente pregunta: ¿Qué palabras en inglés conocen para presentarse? Se anotan en la pizarra las respuestas y se agregan las faltantes.',
            contenidoEstudiante: 'What English words do you know to introduce yourself? Share them!',
            duracion: '5 min'
          }
        ]
      },
      {
        tipo: 'desarrollo',
        descripcion: 'Se presentan las estructuras clave para presentarse: My name is..., I am... years old, I live in..., I am a... Se modela con ejemplos y práctica guiada.',
        contenidoEstudiante: 'Learn the key phrases to introduce yourself in English. Practice each one aloud.',
        actividades: [
          {
            titulo: 'Práctica de pronunciación: Frases clave',
            descripcion: 'Los estudiantes practican la pronunciación de frases para presentarse. La herramienta TTS reproduce cada frase y los estudiantes la repiten.',
            contenidoEstudiante: 'Listen and repeat these phrases to introduce yourself. Use the audio button as a guide.',
            audioTexto: 'My name is Sophie. I am twenty years old. I live in London. I am a student. Nice to meet you.',
            audioTraduccion: 'Mi nombre es Sophie. Tengo veinte años. Vivo en Londres. Soy estudiante. Mucho gusto.',
            duracion: '12 min'
          },
          {
            titulo: 'Entrevista en parejas',
            descripcion: 'En parejas, los estudiantes se entrevistan mutuamente usando las estructuras aprendidas.',
            contenidoEstudiante: 'With a partner, practice these questions and answers:\n- What\'s your name? (¿Cómo te llamas?)\n- How old are you? (¿Cuántos años tienes?)\n- Where do you live? (¿Dónde vives?)',
            duracion: '15 min'
          },
          {
            titulo: 'Presentación al grupo',
            descripcion: 'Cada estudiante presenta a su compañero frente al grupo usando la tercera persona: "His/Her name is..., He/She is... years old".',
            contenidoEstudiante: 'Introduce your partner to the group using:\nHis/Her name is... (Su nombre es...)\nHe/She is... years old (Él/Ella tiene... años)\nHe/She lives in... (Él/Ella vive en...)',
            audioTexto: 'Her name is Marie. She is twenty-two years old. She lives in New York. She is a teacher.',
            audioTraduccion: 'Su nombre es Marie. Ella tiene veintidós años. Ella vive en Nueva York. Ella es profesora.',
            duracion: '10 min'
          }
        ]
      },
      {
        tipo: 'cierre',
        descripcion: 'Se realiza una ronda rápida donde cada estudiante comparte una frase nueva que aprendió. Se resuelven dudas y se asigna una breve práctica para casa.',
        contenidoEstudiante: 'Share a new phrase you learned today!',
        actividades: [
          {
            titulo: 'Ticket de salida: "I can introduce myself"',
            descripcion: 'Cada estudiante debe escribir en una tarjeta su presentación personal completa en inglés (al menos 4 frases) y leerla en voz alta al salir.',
            contenidoEstudiante: 'Write your personal introduction in English (at least 4 sentences) and read it aloud.',
            audioTexto: 'I can introduce myself. Hello, my name is... I am... years old. I live in... I am a... Thank you and goodbye.',
            audioTraduccion: 'Puedo presentarme. Hola, mi nombre es... Tengo... años. Vivo en... Soy... Gracias y adiós.',
            duracion: '10 min'
          },
          {
            titulo: 'Práctica para casa',
            descripcion: 'Grabar un audio corto presentándose en inglés usando las estructuras aprendidas.',
            contenidoEstudiante: 'Homework: Record yourself introducing yourself in English. Use the reference audio if needed.',
            duracion: '2 min'
          }
        ]
      }
    ]
  },
  {
    slug: 'alimentacion',
    materia: 'Ingles',
    tema: 'Alimentación',
    competencia: 'Comunicación oral y escrita en lengua extranjera en contextos cotidianos',
    indicadorLogro: 'Nombra alimentos básicos en inglés y expresa sus gustos y preferencias alimenticias utilizando estructuras gramaticales simples.',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: 'Se muestra una imagen de un supermercado y se activa vocabulario previo. Pregunta generadora: "What do you like to eat?"',
        contenidoEstudiante: 'Look at the image of the supermarket. What foods do you recognize? Which ones do you like?',
        actividades: [
          {
            titulo: 'Identificación visual: Alimentos',
            descripcion: 'Los estudiantes observan imágenes de alimentos comunes y tratan de nombrarlos en inglés.',
            contenidoEstudiante: 'Look at the images and try to name these foods in English aloud.',
            audioTexto: 'Bread, cheese, chicken, fish, vegetables, fruits, rice, pasta, milk, eggs.',
            audioTraduccion: 'Pan, queso, pollo, pescado, verduras, frutas, arroz, pasta, leche, huevos.',
            duracion: '7 min'
          },
          {
            titulo: 'Categorización rápida',
            descripcion: 'En grupos, clasifican los alimentos en: breakfast, lunch, dinner.',
            contenidoEstudiante: 'Classify the foods by meal:\nBreakfast (desayuno)\nLunch (almuerzo)\nDinner (cena)',
            duracion: '5 min'
          }
        ]
      },
      {
        tipo: 'desarrollo',
        descripcion: 'Se introduce vocabulario ampliado de alimentos, bebidas y expresiones de gusto: I like, I don\'t like, I love, I hate.',
        contenidoEstudiante: 'Learn more foods and drinks in English. Discover how to express what you like and don\'t like.',
        actividades: [
          {
            titulo: 'Vocabulario guiado: Alimentos y bebidas',
            descripcion: 'Presentación de nuevo vocabulario con apoyo visual y auditivo.',
            contenidoEstudiante: 'Listen and repeat the names of these foods and drinks. Use the audio as a pronunciation guide.',
            audioTexto: 'Apple, banana, orange, salad, soup, sandwich, water, juice, milk, coffee. I like fruits. I don\'t like vegetables. I love ice cream. I hate coffee.',
            audioTraduccion: 'Manzana, banana, naranja, ensalada, sopa, sándwich, agua, jugo, leche, café. Me gustan las frutas. No me gustan las verduras. Me encanta el helado. Detesto el café.',
            duracion: '15 min'
          },
          {
            titulo: 'Encuesta en clase: "Class taste survey"',
            descripcion: 'Cada estudiante pregunta a 5 compañeros: "Do you like...?" y registra respuestas.',
            contenidoEstudiante: 'Ask 5 classmates:\nDo you like...? (¿Te gusta...?)\nRecord their answers:\n✅ Yes, I do. (Sí)\n❌ No, I don\'t. (No)',
            audioTexto: 'Do you like pizza? Yes, I do. Do you like broccoli? No, I don\'t. Do you like sushi? I love sushi!',
            audioTraduccion: '¿Te gusta la pizza? Sí. ¿Te gusta el brócoli? No. ¿Te gusta el sushi? ¡Me encanta el sushi!',
            duracion: '15 min'
          },
          {
            titulo: 'Juego de roles: En el restaurante',
            descripcion: 'Simulación de un restaurante. Un estudiante es el mesero y otro el cliente.',
            contenidoEstudiante: 'Role-play a restaurant!\nCustomer: I would like... (Quisiera...)\nWaiter: What would you like to drink? (¿Qué le gustaría beber?)\nCustomer: The check, please. (La cuenta, por favor.)',
            audioTexto: 'Hello, I would like the chicken with vegetables, please. And to drink, an orange juice. The check, please.',
            audioTraduccion: 'Hola, quisiera el pollo con verduras, por favor. Y de beber, un jugo de naranja. La cuenta, por favor.',
            duracion: '10 min'
          }
        ]
      },
      {
        tipo: 'cierre',
        descripcion: 'Reflexión sobre lo aprendido. Cada estudiante comparte su comida favorita en inglés.',
        contenidoEstudiante: 'What was your favorite food from today? Share it with the class!',
        actividades: [
          {
            titulo: 'Mi menú ideal',
            descripcion: 'Cada estudiante diseña su menú ideal en inglés y lo presenta al grupo.',
            contenidoEstudiante: 'Design your ideal menu:\nAppetizer: ...\nMain course: ...\nDessert: ...\nDrink: ...',
            audioTexto: 'My ideal menu: for appetizer, a salad. For main course, chicken with rice. For dessert, ice cream. And to drink, water.',
            audioTraduccion: 'Mi menú ideal: de entrada, una ensalada. De plato fuerte, pollo con arroz. De postre, helado. Y de bebida, agua.',
            duracion: '8 min'
          }
        ]
      }
    ]
  },

  // ============ FRANCÉS ============


  {
    slug: 'informacion-personal',
    materia: 'Frances',
    tema: 'Información Personal',
    competencia: 'Comunicación oral y escrita en lengua extranjera',
    indicadorLogro: 'Se presenta a sí mismo y da información personal básica en francés, utilizando saludos formales e informales adecuadamente.',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: 'Saludo inicial en francés. Se proyecta una imagen de dos personas presentándose y se pregunta a los estudiantes qué observan. Se introduce el tema del día: "Se présenter".',
        contenidoEstudiante: 'Hoy aprenderemos a presentarnos en francés. Observa la imagen y piensa: ¿qué están haciendo estas personas?',
        actividades: [
          {
            titulo: 'Escucha activa: Saludos en francés',
            descripcion: 'Los estudiantes escuchan un audio con diferentes saludos (Bonjour, Salut, Bonsoir) y los repiten. Se discute la diferencia entre formal e informal.',
            contenidoEstudiante: 'Escucha los saludos en francés y repítelos. ¿Notas alguna diferencia entre ellos?',
            audioTexto: 'Bonjour, je m\'appelle Marie. Salut, moi c\'est Pierre. Bonsoir, comment allez-vous?',
            audioTraduccion: 'Buenos días, me llamo Marie. Hola, yo soy Pierre. Buenas noches, ¿cómo están ustedes?',
            duracion: '8 min'
          },
          {
            titulo: 'Lluvia de ideas guiada',
            descripcion: 'El docente pregunta: ¿Qué palabras en francés conocen para presentarse? Se anotan en la pizarra las respuestas y se agregan las faltantes.',
            contenidoEstudiante: '¿Qué palabras en francés conoces para presentarte? ¡Compártelas!',
            duracion: '5 min'
          }
        ]
      },
      {
        tipo: 'desarrollo',
        descripcion: 'Se presentan las estructuras clave para presentarse: Je m\'appelle..., J\'ai... ans, J\'habite à..., Je suis... Se modela con ejemplos y práctica guiada.',
        contenidoEstudiante: 'Aprende las frases clave para presentarte en francés. Practica cada una en voz alta.',
        actividades: [
          {
            titulo: 'Práctica de pronunciación: Frases clave',
            descripcion: 'Los estudiantes practican la pronunciación de frases para presentarse. La herramienta TTS reproduce cada frase y los estudiantes la repiten.',
            contenidoEstudiante: 'Escucha y repite estas frases para presentarte. Usa el botón de audio como guía.',
            audioTexto: 'Je m\'appelle Sophie. J\'ai vingt ans. J\'habite à Paris. Je suis étudiante. Enchanté de faire votre connaissance.',
            audioTraduccion: 'Me llamo Sophie. Tengo veinte años. Vivo en París. Soy estudiante. Encantado/a de conocerlos.',
            duracion: '12 min'
          },
          {
            titulo: 'Entrevista en parejas',
            descripcion: 'En parejas, los estudiantes se entrevistan mutuamente usando las estructuras aprendidas. Deben tomar nota de las respuestas de su compañero.',
            contenidoEstudiante: 'Con un compañero, practiquen estas preguntas y respuestas:\n- Comment tu t\'appelles? (¿Cómo te llamas?)\n- Quel âge as-tu? (¿Cuántos años tienes?)\n- Où habites-tu? (¿Dónde vives?)',
            duracion: '15 min'
          },
          {
            titulo: 'Presentación al grupo',
            descripcion: 'Cada estudiante presenta a su compañero frente al grupo usando la tercera persona: "Il/Elle s\'appelle..., Il/Elle a... ans".',
            contenidoEstudiante: 'Presenta a tu compañero al grupo usando:\nIl/Elle s\'appelle... (Él/Ella se llama...)\nIl/Elle a... ans (Él/Ella tiene... años)\nIl/Elle habite à... (Él/Ella vive en...)',
            audioTexto: 'Elle s\'appelle Marie. Elle a vingt-deux ans. Elle habite à Lyon. Elle est professeur.',
            audioTraduccion: 'Ella se llama Marie. Ella tiene veintidós años. Ella vive en Lyon. Ella es profesora.',
            duracion: '10 min'
          }
        ]
      },
      {
        tipo: 'cierre',
        descripcion: 'Se realiza una ronda rápida donde cada estudiante comparte una frase nueva que aprendió. Se resuelven dudas y se asigna una breve práctica para casa.',
        contenidoEstudiante: '¡Comparte una frase nueva que hayas aprendido hoy!',
        actividades: [
          {
            titulo: 'Ticket de salida: "Je peux me présenter"',
            descripcion: 'Cada estudiante debe escribir en una tarjeta su presentación personal completa en francés (al menos 4 frases) y leerla en voz alta al salir.',
            contenidoEstudiante: 'Escribe tu presentación personal en francés (mínimo 4 frases) y léela en voz alta.',
            audioTexto: 'Je peux me présenter. Bonjour, je m\'appelle... J\'ai... ans. J\'habite à... Je suis... Merci et au revoir.',
            audioTraduccion: 'Puedo presentarme. Buenos días, me llamo... Tengo... años. Vivo en... Soy... Gracias y adiós.',
            duracion: '10 min'
          },
          {
            titulo: 'Práctica para casa',
            descripcion: 'Grabar un audio corto presentándose en francés usando las estructuras aprendidas. Se sugiere usar la herramienta TTS como referencia.',
            contenidoEstudiante: 'Tarea: Grábate presentándote en francés. Usa el audio de referencia si lo necesitas.',
            duracion: '2 min'
          }
        ]
      }
    ]
  },
  {
    slug: 'alimentacion',
    materia: 'Frances',
    tema: 'Alimentación',
    competencia: 'Comunicación oral y escrita en lengua extranjera en contextos cotidianos',
    indicadorLogro: 'Nombra alimentos básicos en francés y expresa sus gustos y preferencias alimenticias utilizando estructuras gramaticales simples.',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: 'Se muestra una imagen de un mercado francés y se activa vocabulario previo. Pregunta generadora: "Qu\'est-ce que vous aimez manger?"',
        contenidoEstudiante: 'Observa la imagen del mercado francés. ¿Qué alimentos reconoces? ¿Cuáles te gustan?',
        actividades: [
          {
            titulo: 'Identificación visual: Alimentos',
            descripcion: 'Los estudiantes observan imágenes de alimentos típicos franceses y tratan de nombrarlos. Se introducen los que no conocen.',
            contenidoEstudiante: 'Mira las imágenes e intenta nombrar estos alimentos franceses en voz alta.',
            audioTexto: 'La baguette, le fromage, le croissant, la quiche, les crêpes, le pain au chocolat.',
            audioTraduccion: 'La baguette (baguete), el queso, el croissant (cruasán), la quiche, las crepas, el pan de chocolate.',
            duracion: '7 min'
          },
          {
            titulo: 'Categorización rápida',
            descripcion: 'En grupos, clasifican los alimentos en: petit-déjeuner, déjeuner, dîner. Se comparte en plenaria.',
            contenidoEstudiante: 'Clasifica los alimentos según la comida del día:\nPetit-déjeuner (desayuno)\nDéjeuner (almuerzo)\nDîner (cena)',
            duracion: '5 min'
          }
        ]
      },
      {
        tipo: 'desarrollo',
        descripcion: 'Se introduce vocabulario ampliado de alimentos, bebidas y expresiones de gusto: J\'aime, Je n\'aime pas, J\'adore, Je déteste. Práctica controlada y producción oral.',
        contenidoEstudiante: 'Aprende más alimentos y bebidas en francés. Descubre cómo expresar lo que te gusta y lo que no.',
        actividades: [
          {
            titulo: 'Vocabulario guiado: Alimentos y bebidas',
            descripcion: 'Presentación de nuevo vocabulario con apoyo visual y auditivo. Los estudiantes repiten cada palabra después del audio de referencia.',
            contenidoEstudiante: 'Escucha y repite el nombre de estos alimentos y bebidas. Usa el audio como guía de pronunciación.',
            audioTexto: 'Le poulet, le poisson, les légumes, les fruits, le riz, les pâtes, le lait, l\'eau, le jus d\'orange, le café, le thé. J\'aime les fruits. Je n\'aime pas les légumes. J\'adore le chocolat. Je déteste le café.',
            audioTraduccion: 'El pollo, el pescado, las verduras, las frutas, el arroz, la pasta, la leche, el agua, el jugo de naranja, el café, el té. Me gustan las frutas. No me gustan las verduras. Me encanta el chocolate. Detesto el café.',
            duracion: '15 min'
          },
          {
            titulo: 'Encuesta en clase: "Les goûts de la classe"',
            descripcion: 'Cada estudiante pregunta a 5 compañeros si les gustan ciertos alimentos ("Tu aimes...?"). Registran respuestas en una tabla de Me gusta / No me gusta.',
            contenidoEstudiante: 'Pregunta a 5 compañeros:\nTu aimes...? (¿Te gusta...?)\nRegistra sus respuestas:\n✅ Oui, j\'aime... (Sí, me gusta...)\n❌ Non, je n\'aime pas... (No, no me gusta...)',
            audioTexto: 'Tu aimes le fromage? Oui, j\'aime le fromage. Non, je n\'aime pas le fromage. Tu aimes les escargots? Je déteste les escargots!',
            audioTraduccion: '¿Te gusta el queso? Sí, me gusta el queso. No, no me gusta el queso. ¿Te gustan los caracoles? ¡Detesto los caracoles!',
            duracion: '15 min'
          },
          {
            titulo: 'Juego de roles: En el restaurante',
            descripcion: 'Simulación de un restaurante francés. Un estudiante es el mesero y otro el cliente. Deben pedir comida del menú usando el vocabulario aprendido.',
            contenidoEstudiante: '¡Simulen estar en un restaurante francés!\nCliente: Je voudrais... (Quisiera...)\nMesero: Et comme boisson? (¿Y de bebida?)\nCliente: L\'addition, s\'il vous plaît. (La cuenta, por favor.)',
            audioTexto: 'Bonjour, je voudrais le poulet avec des légumes, s\'il vous plaît. Et comme boisson, un jus d\'orange. L\'addition, s\'il vous plaît.',
            audioTraduccion: 'Buenos días, quisiera el pollo con verduras, por favor. Y de bebida, un jugo de naranja. La cuenta, por favor.',
            duracion: '10 min'
          }
        ]
      },
      {
        tipo: 'cierre',
        descripcion: 'Reflexión sobre lo aprendido. Cada estudiante comparte su plato francés favorito entre los vistos. Repaso rápido del vocabulario clave.',
        contenidoEstudiante: '¿Cuál fue tu alimento francés favorito de hoy? ¡Compártelo con la clase!',
        actividades: [
          {
            titulo: 'Mi menú francés ideal',
            descripcion: 'Cada estudiante diseña su menú francés ideal (entrada, plato principal, postre, bebida) usando el vocabulario aprendido y lo presenta al grupo.',
            contenidoEstudiante: 'Diseña tu menú francés ideal:\nEntrée (entrada): ...\nPlat principal (plato fuerte): ...\nDessert (postre): ...\nBoisson (bebida): ...',
            audioTexto: 'Mon menu idéal: en entrée, une quiche. En plat principal, du poulet avec des pâtes. En dessert, un croissant. Et comme boisson, de l\'eau.',
            audioTraduccion: 'Mi menú ideal: de entrada, una quiche. De plato fuerte, pollo con pasta. De postre, un croissant. Y de bebida, agua.',
            duracion: '8 min'
          }
        ]
      }
    ]
  },
  {
    slug: 'ciencia',
    materia: 'Frances',
    tema: 'Ciencia y Tecnología',
    competencia: 'Comunicación oral y escrita en lengua extranjera en contextos cotidianos',
    indicadorLogro: 'Nombra alimentos básicos en francés y expresa sus gustos y preferencias alimenticias utilizando estructuras gramaticales simples.',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: 'Se muestra una imagen de un mercado francés y se activa vocabulario previo. Pregunta generadora: "Qu\'est-ce que vous aimez manger?"',
        contenidoEstudiante: 'Observa la imagen del mercado francés. ¿Qué alimentos reconoces? ¿Cuáles te gustan?',
        actividades: [
          {
            titulo: 'Identificación visual: Alimentos',
            descripcion: 'Los estudiantes observan imágenes de alimentos típicos franceses y tratan de nombrarlos. Se introducen los que no conocen.',
            contenidoEstudiante: 'Mira las imágenes e intenta nombrar estos alimentos franceses en voz alta.',
            audioTexto: 'La baguette, le fromage, le croissant, la quiche, les crêpes, le pain au chocolat.',
            audioTraduccion: 'La baguette (baguete), el queso, el croissant (cruasán), la quiche, las crepas, el pan de chocolate.',
            duracion: '7 min'
          },
          {
            titulo: 'Categorización rápida',
            descripcion: 'En grupos, clasifican los alimentos en: petit-déjeuner, déjeuner, dîner. Se comparte en plenaria.',
            contenidoEstudiante: 'Clasifica los alimentos según la comida del día:\nPetit-déjeuner (desayuno)\nDéjeuner (almuerzo)\nDîner (cena)',
            duracion: '5 min'
          }
        ]
      },
      {
        tipo: 'desarrollo',
        descripcion: 'Se introduce vocabulario ampliado de alimentos, bebidas y expresiones de gusto: J\'aime, Je n\'aime pas, J\'adore, Je déteste. Práctica controlada y producción oral.',
        contenidoEstudiante: 'Aprende más alimentos y bebidas en francés. Descubre cómo expresar lo que te gusta y lo que no.',
        actividades: [
          {
            titulo: 'Vocabulario guiado: Alimentos y bebidas',
            descripcion: 'Presentación de nuevo vocabulario con apoyo visual y auditivo. Los estudiantes repiten cada palabra después del audio de referencia.',
            contenidoEstudiante: 'Escucha y repite el nombre de estos alimentos y bebidas. Usa el audio como guía de pronunciación.',
            audioTexto: 'Le poulet, le poisson, les légumes, les fruits, le riz, les pâtes, le lait, l\'eau, le jus d\'orange, le café, le thé. J\'aime les fruits. Je n\'aime pas les légumes. J\'adore le chocolat. Je déteste le café.',
            audioTraduccion: 'El pollo, el pescado, las verduras, las frutas, el arroz, la pasta, la leche, el agua, el jugo de naranja, el café, el té. Me gustan las frutas. No me gustan las verduras. Me encanta el chocolate. Detesto el café.',
            duracion: '15 min'
          },
          {
            titulo: 'Encuesta en clase: "Les goûts de la classe"',
            descripcion: 'Cada estudiante pregunta a 5 compañeros si les gustan ciertos alimentos ("Tu aimes...?"). Registran respuestas en una tabla de Me gusta / No me gusta.',
            contenidoEstudiante: 'Pregunta a 5 compañeros:\nTu aimes...? (¿Te gusta...?)\nRegistra sus respuestas:\n✅ Oui, j\'aime... (Sí, me gusta...)\n❌ Non, je n\'aime pas... (No, no me gusta...)',
            audioTexto: 'Tu aimes le fromage? Oui, j\'aime le fromage. Non, je n\'aime pas le fromage. Tu aimes les escargots? Je déteste les escargots!',
            audioTraduccion: '¿Te gusta el queso? Sí, me gusta el queso. No, no me gusta el queso. ¿Te gustan los caracoles? ¡Detesto los caracoles!',
            duracion: '15 min'
          },
          {
            titulo: 'Juego de roles: En el restaurante',
            descripcion: 'Simulación de un restaurante francés. Un estudiante es el mesero y otro el cliente. Deben pedir comida del menú usando el vocabulario aprendido.',
            contenidoEstudiante: '¡Simulen estar en un restaurante francés!\nCliente: Je voudrais... (Quisiera...)\nMesero: Et comme boisson? (¿Y de bebida?)\nCliente: L\'addition, s\'il vous plaît. (La cuenta, por favor.)',
            audioTexto: 'Bonjour, je voudrais le poulet avec des légumes, s\'il vous plaît. Et comme boisson, un jus d\'orange. L\'addition, s\'il vous plaît.',
            audioTraduccion: 'Buenos días, quisiera el pollo con verduras, por favor. Y de bebida, un jugo de naranja. La cuenta, por favor.',
            duracion: '10 min'
          }
        ]
      },
      {
        tipo: 'cierre',
        descripcion: 'Reflexión sobre lo aprendido. Cada estudiante comparte su plato francés favorito entre los vistos. Repaso rápido del vocabulario clave.',
        contenidoEstudiante: '¿Cuál fue tu alimento francés favorito de hoy? ¡Compártelo con la clase!',
        actividades: [
          {
            titulo: 'Mi menú francés ideal',
            descripcion: 'Cada estudiante diseña su menú francés ideal (entrada, plato principal, postre, bebida) usando el vocabulario aprendido y lo presenta al grupo.',
            contenidoEstudiante: 'Diseña tu menú francés ideal:\nEntrée (entrada): ...\nPlat principal (plato fuerte): ...\nDessert (postre): ...\nBoisson (bebida): ...',
            audioTexto: 'Mon menu idéal: en entrée, une quiche. En plat principal, du poulet avec des pâtes. En dessert, un croissant. Et comme boisson, de l\'eau.',
            audioTraduccion: 'Mi menú ideal: de entrada, una quiche. De plato fuerte, pollo con pasta. De postre, un croissant. Y de bebida, agua.',
            duracion: '8 min'
          }
        ]
      }
    ]
  },

];

// lib/data.ts - Reemplazar el array materias existente

export const materias: Materia[] = [
  
  {
    nombre: 'Ingles',
    slug: 'ingles',
    temas: [
      { slug: 'informacion-personal', tema: 'Información Personal' },
      { slug: 'alimentacion', tema: 'Alimentación' }
    ]
  },
  {
    nombre: 'Frances',
    slug: 'frances',
    temas: [
      { slug: 'informacion-personal', tema: 'Información Personal' },
      { slug: 'alimentacion', tema: 'Alimentación' }
    ]
  },
]; */