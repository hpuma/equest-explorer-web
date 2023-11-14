const { REACT_APP_EQUEST_API_KEY } = process.env;

const localConfig = {
  equestApiKey: REACT_APP_EQUEST_API_KEY,
  baseURL: "http://localhost:3001/"
};

export default localConfig;
