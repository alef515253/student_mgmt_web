import axiosInstance from '../api/axios';


// Function to get all students
export const getAllTerms = async () => {
    try {
        const response = await axiosInstance.get('/terms');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};