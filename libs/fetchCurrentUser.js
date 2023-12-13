import axios from 'axios'
const fetchCurrentUser = async () => {
    try {
      if(localStorage.getItem('token')===null)
          return null;
      const token = localStorage.getItem("token").slice(1,-1)
      const response = await axios.post('/api/current',{token});
      const currentUser = await response.data;
      return currentUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
export default fetchCurrentUser;
