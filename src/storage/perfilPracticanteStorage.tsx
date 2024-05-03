

export const getPerfiles = async () => { 

  return Promise.resolve([
    {
      id: "redes",
      label: "Administración de redes de computadoras.",
      conocimientos: [
        {
          id: "1",
          nombre: 'Cisco',
          tecnologias: ["CCNA", "CCNP", "CCIE"]
        },
        {
          id: "2",
          nombre: 'Distribuciones de red',
          tecnologias: ["Redes LAN", "Redes WAN", ]
        }
      ]
    },
    {
      id: "capacitaciones",
      label: "Capacitaciones",
      conocimientos: [
        {
          id: "1",
          nombre: 'Fundamentos de programación',
          tecnologias: ["Java", "Python", "C++"]
        }
      ]
    },
    {
      id: "desarrollo",
      label: "Desarrollo de software (escritorio, móvil y web).",
      conocimientos: [
        {
          id: "1",
          nombre: 'Frontend',
          tecnologias: ["React", "Angular", "Vue"]
        },
        {
          id: "2",
          nombre: 'Backend',
          tecnologias: ["NodeJS", "Django", "Spring"]
        }
      ]
    },
    {
      id: "servidores-cloud",
      label: "Servidores y computación en la nube.",
      conocimientos: [
        {
          id: "1",
          nombre: 'AWS',
          tecnologias: ["EC2", "S3",]
        },
        {
          id: "2",
          nombre: 'Azure',
          tecnologias: ["Azure Functions", "Azure Storage",]
        }
      ]
    },
    {
      id: "proyectos",
      label: "Dirección y evaluación de proyectos.",
      conocimientos: [
        {
          id: "1",
          nombre: 'Metodologías ágiles',
          tecnologias: ["Scrum", "Kanban",]
        },
        {
          id: "2",
          nombre: 'Gestión de proyectos',
          tecnologias: ["PMI", "Prince2",]
        }
      ]
    },
    {
      id: "ia",
      label: "Inteligencia Artificial.",
      conocimientos: [
        {
          id: "1",
          nombre: 'Machine Learning',
          tecnologias: ["Tensorflow", "Keras",]
        },
        {
          id: "2",
          nombre: 'Procesamiento de lenguaje natural',
          tecnologias: ["NLTK", "Spacy",]
        }
      ]
    }
  ])
}

