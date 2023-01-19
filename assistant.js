[
  {
    id: 1,
    question: "bene, iniziamo.... l'intestario del veicolo è",
    options: [
      {
        value: 1,
        button: "Persona fisica",
        answer: [
          "Fotocopia fronte/retro carta d'identità in corso di validità",
          "Fotocopia fronte/retro codice fiscale",
          "Fotocopia fronte/retro permesso di soggiorno in corso di validità (per cittadini extra UE)",
        ],
        redirect: 2,
      },
      {
        value: 2,
        button: "Persona Giuridica",
        answer: [
          "Fotocopia fronte/retro carta d'identità in corso di validità di chi a ha i poteri di firma",
          "Fotocopia fronte/retro codice fiscale di chi a ha i poteri di firma",
          "Fotocopia fronte/retro permesso di soggiorno in corso di validità (per cittadini extra UE) di chi ha poteri di firma",
          "Dichiarazione sostitutiva di certificazione legale rappresentante",
        ],
        redirect: 2,
      },
      {
        value: 3,
        button: "Deceduto",
        answer: [
          "Copia del certificato di morte",
          "Dichiarazione sostitutiva dell'atto di notorietà eredi",
          "Fotocopia fronte/retro carta d'identità in corso di validità di chi a ha i poteri di firma",
          "Fotocopia fronte/retro codice fiscale di chi a ha i poteri di firma",
          "Dichiarazione sostitutiva di certificazione legale rappresentante",
        ],
        redirect: 2,
      },
    ],
  },
  {
    id: 2,
    question: "Sei in possesso della carta di circolazione?",
    options: [
      {
        value: 1,
        button: "SI",
        answer: ["Carta di circolazione"],
      },
      {
        value: 2,
        button: "NO",
        answer: ["Originale denuncia di smarrimento carta di circolazione"],
      },
    ],
  },
  {
    id: 3,
    question:
      "Sei in possesso del certificato di proprietà cartaceo o digitale?",
    options: [
      {
        value: 1,
        button: "SI",
        answer: ["Certificato di proprietà"],
      },
      {
        value: 2,
        button: "NO",
        answer: ["Carta di circolazione"],
      },
    ],
  },
  {
    id: 4,
    question: "Il veicolo è provvisto di entrambe le targhe?",
    options: [
      {
        value: 1,
        button: "SI",
        answer: [""],
        redirect: 5,
      },
      {
        value: 2,
        button: "NO",
        answer: ["Denuncia di smarrimento della targa/e in originale "],
        redirect: 5,
      },
    ],
  },
  {
    id: 5,
    question: "Si affida la pratica di demolizione a un delegato?",
    options: [
      {
        value: 1,
        button: "SI",
        answer: [
          "Delega firmata dall'intestatario",
          "Fotocopia fronte/retro carta d'identità in corso di validità del delegato",
          "Fotocopia fronte/retro codice fiscale del delegato",
          "Fotocopia fronte/retro permesso di soggiorno in corso di validità (per cittadini extra UE)",
        ],
        redirect: 0,
      },
      {
        value: 2,
        button: "NO",
        redirect: 0,
      },
    ],
  },
];
