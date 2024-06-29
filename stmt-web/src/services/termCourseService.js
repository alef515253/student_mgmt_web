import axiosInstance from '../api/axios';


// Function to get all students
export const getNoTermCourses = async (id) => {
    try {
        const response = await axiosInstance.get(`/getNoTermCourses?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const getAllTermCourses = async (id) => {
    try {
        const response = await axiosInstance.get(`/getAllTermCourses?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const getTermCourseById = async (id) => {
    try {
        const response = await axiosInstance.get(`/getTermCourseById?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const addTermCourses = async (termcourse) => {
    try {
        const response = await axiosInstance.post(`/term_courses`,termcourse,{showToastOnResponse: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const updateTermCourses = async (termcourse) => {
    try {
        const response = await axiosInstance.put(`/termCourses`,termcourse,{showToastOnResponse: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

