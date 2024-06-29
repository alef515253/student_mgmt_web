import axiosInstance from '../api/axios';


// Function to get all students
export const getAllInstructors = async () => {
    try {
        const response = await axiosInstance.get('/instructors');
        return response.data;
    } catch (error) {
        console.error('Error fetching instructors:', error);
        throw error;
    }
};


export const getInstructors = async () => {
    try {
        const response = await axiosInstance.get('/getInstructorByRole?role=Examiner&role=Teacher');
        return response.data;
    } catch (error) {
        console.error('Error fetching instructors:', error);
        throw error;
    }
};

export const getTAs = async () => {
    try {
        const response = await axiosInstance.get('/getInstructorByRole?role=TA');
        return response.data;
    } catch (error) {
        console.error('Error fetching instructors:', error);
        throw error;
    }
};