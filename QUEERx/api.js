// api.js
export const fetchDoctors = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors?searchQuery=${searchQuery}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  };