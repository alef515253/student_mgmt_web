import axiosInstance from '../api/axios';


// Function to get all students
export const getAllStudents = async () => {
    try {
        const response = await axiosInstance.get('/students');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};