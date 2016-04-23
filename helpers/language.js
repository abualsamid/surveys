
export function trOne(code, language) {
  try {
    if (!languageText[code]) {
      return code;
    }
    if (Array.isArray(languageText[code][language])) {
      return languageText[code][language].join(languageText[code].sep || "")
    } else {
      return  languageText[code][language]
    }

  } catch(x) {
    console.log(x + " " + code + " " + language);
    return code;
  }
}

export function tr(code, language) {
  if (!code) {
    return "";
  }
  if(!language) {
    language=""
  }
  try {
    return language=="" ?
      languageText[code]["en"] + ( languageText[code].sep || " / " ) + languageText[code]["es"]
      :
      trOne(code, language)

  } catch(x) {
    console.log(x + " " + code + " " + language);
    return code;
  }
}


export const languageText = {
  "This is an anonymous survey. All questions are optional." : {
    "en": "This is an anonymous survey. All questions are optional.",
    "es": "Esta es una encuesta anónima . Todas las preguntas son opcionales ."
  },

  "Please enter the code assigned to you": {
    "en": "Please enter the code assigned to you",
    "es":"Por favor, introduzca el código asignado a usted"
  },
  "Please select your store": {
    "en":"Please select your store",
    "es":"Por favor seleccione su tienda"
  },
  "EMPLOYEE SUREY FOR LEYE EMPLOYEES": {
    "en": "EMPLOYEE SUREY FOR LEYE EMPLOYEES",
    "es":  "ENCUESTA PARA EMPLEADOS LEYE"
  },
  "3": {
    "en": "Please take a moment to fill this out. Your feedback is important to us. We welcome both positive feedback and areas where we can improve. Your response to this survey will be kept anonymous and confidential.",
    "es": "Por favor, tome un momento para liener este documento. Su opinion es importante para nosotros. Queremos saber donde estamon bien y done podemos mejorar. La participacion en esta encuesta es anonima y confidential.",
    "sep": "\n \n"
  },
  "4": {
    "en": "Continue",
    "es": "Continuar"
  },
  "5": {
    "en": "Excellent",
    "es": "Excelente"
  },
  "6": {
    "en": "Good",
    "es": "Bueno"
  },
  "7": {
    "en": "Fair",
    "es": "Mas o Menos"
  },
  "8": {
    "en": "Needs Improvement",
    "es": "Necesita Mejorar"
  },
  "9": {
    "en": "Needs Significant Improvement",
    "es": "Necesita Mejorar Mucho"
  },
  "Manager's Name": {
    "en": "Manager's Name",
    "es": "Nombre de Gerente"
  },
  "Please Select": {
    "en": "Please Select",
    "es": "Por favor seleccione"
  },
  "disclaimer": {
    "en": "Should you have specific concerns or feeling that you would like to discuss further, please call " +
          "Susie Southgate-Fox at 773-878-7698.  " +
          "Thank you for taking the time to complete this survey. We appreciate your commitment to our growth.",
    "es": "En caso de que tenga algun problema o asunto que quiera que sea discutido especificamente, por favor " +
    "llame a Susie Southgate-Fox a 773-878-7698.  " +
    "Gracias por su atencion en completar la encuesta. Agradecemos su compromiso con nuestro crecimiento."
  },
  "Friendly and easy to approach": {
    "en": "Friendly and easy to approach",
    "es": "Cordial y fácil de acercarse"
  },
  "Treats all employees equally and fairly" : {
    "en": "Treats all employees equally and fairly",
    "es": "Trata a todos los empleados de forma igual y justa"
  },
  "Listens to what we have to say" : {
    "en": "Listens to what we have to say",
    "es": "Escucha lo que tenemos que decir"
  },
  "Cares about us personally and professionally appreciates us" : {
    "en": "Cares about us personally and professionally appreciates us",
    "es": "Le improto como persona y empleado, nos aprecia"
  },
  "Backs and supports us" : {
    "en": "Backs and supports us",
    "es": "Nos apoya"
  },
  "Treats us with dignity and respect" : {
    "en": "Treats us with dignity and respect",
    "es": "Nos trata con dignidad y respeto"
  },
  "Is an effective teacher, coach and manager" : {
    "en": "Is an effective teacher, coach and manager",
    "es": "Es us buen instructor, motivador y gerente"
  },
  "Gives clear directions" : {
    "en": "Gives clear directions",
    "es": "Da instrucciones claras"
  },
  "Keeps us informed" : {
    "en": "Keeps us informed",
    "es": "Nos mantiene informados"
  },
  "Handles issues and people well" : {
    "en": "Handles issues and people well",
    "es": "Sabe enfrentar situaciones y trabajar bien con personas"
  },
  "Motivates us to go good job" : {
    "en": "Motivates us to go good job",
    "es": "Nos motiva a hacer un buen trabajo"
  },
  "Rewards good performance" : {
    "en": "Rewards good performance",
    "es": "Sabe reconocer un trabajo bien hecho"
  },
  "Follows through on promises" : {
    "en": "Follows through on promises",
    "es": "Cumple con sus promesas"
  },
  "In General" : {
    "en": "In General...",
    "es": "Por Lo General..."
  },
  "Our work environment is positive": {
    "en": "Our work environment is positive",
    "es": "Nuestro ambiente do trabajo es positivo"
  },
  "The communication is clear and effective": {
    "en": "The communication is clear and effective",
    "es": "La comunicacion es clara y efectiva"
  },
  "We have the tools/supplies we need to do our job": {
    "en": "We have the tools/supplies we need to do our job",
    "es": "Tenemos los materiales necesarios para hacer nuestro trabajo"
  },
  "My training was thorough and effective": {
    "en": "My training was thorough and effective",
    "es": "Mi entrenamiento fue suficiente para prepararme para trabajar en mi posición"
  },
  "I have opportunities to learn and grow at work": {
    "en": "I have opportunities to learn and grow at work",
    "es": "Trengo oportunidades de aprender y avanzer en mi trabajo"
  },
  "What do you like most about working for LEYE?": {
    "en": "What do you like most about working for LEYE?",
    "es": "¿Qué es lo que le gusta más de trabajar para Lettuce?"
  },
  "What do you like least about working for LEYE?": {
    "en": "What do you like least about working for LEYE?",
    "es": "¿Qué es lo que le gusta menos de trabajar para Lettuce?"
  },
  "If you need something, who is the person you are most comfortable going to?": {
    "en": "If you need something, who is the person you are most comfortable going to?",
    "es": "Si necesita algo, ¿con quién se siente más comodo en ir a hablar?"
  },
  "Have you noticed any improvements over the past 6 months to one year? Explain your answer.": {
    "en": "Have you noticed any improvements over the past 6 months to one year? Explain your answer.",
    "es": "¿Ha notado alguna mejora en los ultimos 6 meses un ano? Explique por que."
  },
  "Submit - I am done": {
    "en": "Submit - I am done",
    "es": "Enviar - he terminado"
  },
  "Submit Answers": {
    "en": "Submit Answers",
    "es": "Presentar respuestas"
  },
  "Skip - Go to Manager Review": {
    "en": "Skip - Go to Manager Review",
    "es": "Saltar - Ir a Review Manager"
  },

  "Submit - I want to review another manager": {
    "en": "Submit - I want to review another manager",
    "es": "Enviar - Quiero repasar otro gestor"
  },
  "Cancel": {
    "en": "Cancel",
    "es": "Cancelar"
  },
  "Submit - and review another manager": {
    "en": "Submit - and review another manager",
    "es": "Enviar - y revisar otro gestor"
  }

};
