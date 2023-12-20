import axios from 'axios'
const fetchCurrentUser = async (token) => {
    try {
      if(token===null){
          return null;
      }
      const response = await axios.post('/api/current',{token});
      const currentUser = await response.data;
      return currentUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
export default fetchCurrentUser;
