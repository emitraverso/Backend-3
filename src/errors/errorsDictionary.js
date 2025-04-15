const errorDictionary = {
    USER_CREATION_ERROR: {
      code: 1001,
      message: "Error al crear el usuario."
    },
    PET_CREATION_ERROR: {
      code: 1002,
      message: "Error al crear la mascota."
    },
    DATABASE_CONNECTION_ERROR: {
      code: 1003,
      message: "Error al conectar con la base de datos."
    },
    UNKNOWN_ERROR: {
      code: 1999,
      message: "Ocurrió un error desconocido."
    }
  };
  
  export default errorDictionary;