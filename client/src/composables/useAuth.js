// composables/useAuth.js
import { ref } from 'vue';

const userId = ref(null);

export function useAuth() {
  const setUserId = (id) => {
    userId.value = id;
  };

  const getUserId = () => {
    return userId.value;
  };

  return {
    setUserId,
    getUserId,
  };
}
