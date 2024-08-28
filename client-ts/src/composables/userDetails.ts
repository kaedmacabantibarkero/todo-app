import { ref } from 'vue';
import axios from 'axios';

export function useUserDetails() {
  const userDetails = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchUserDetails = async () => {
    loading.value = true;
    error.value = null;
    const token = localStorage.getItem('accessToken');  
    console.log(token)
    try {
      const response = await axios.get('http://localhost:3000/api/get/userDetails', {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      });
      userDetails.value = response.data
    } catch (error:any) {
      error.value = error.response?.data?.msg || 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  return {
    userDetails,
    error,
    loading,
    fetchUserDetails
  };
}
