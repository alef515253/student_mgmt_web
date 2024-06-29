import axiosInstance from '../api/axios';


// Function to get all students
export const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get('/courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};