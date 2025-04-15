function createCustomError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }
  
  export default createCustomError;