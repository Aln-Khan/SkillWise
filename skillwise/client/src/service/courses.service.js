import runtimeEnv from "@mars/heroku-js-runtime-env";
import axios from 'axios';

const env = runtimeEnv();

export default class CourseService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/courses`,
            withCredentials: true
        });
    }

    async getCourses() {
        try {
            const response = await this.apiHandler.get('/getAllCourses');
            return response.data;
        } catch (error) {
            console.error("Error fetching courses:", error);
            throw error;
        }
    }

    async getRandomCourses() {
        try {
            const response = await this.apiHandler.get('/sampleCourses');
            return response.data;
        } catch (error) {
            console.error("Error fetching random courses:", error);
            throw error;
        }
    }

    async getTeacherCourses(teacherId) {
        try {
            const response = await this.apiHandler.get(`/getTeacherCourses/${teacherId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching courses for teacher ${teacherId}:`, error);
            throw error;
        }
    }

    async getCourse(courseId) {
        try {
            const response = await this.apiHandler.get(`/getOneCourse/${courseId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching course ${courseId}:`, error);
            throw error;
        }
    }

    async saveCourse(courseInfo) {
        try {
            const response = await this.apiHandler.post(`/newCourse`, courseInfo);
            return response.data;
        } catch (error) {
            console.error("Error saving course:", error);
            throw error;
        }
    }

    async editCourse(courseId, courseInfo) {
        try {
            const response = await this.apiHandler.put(`/editCourse/${courseId}`, courseInfo);
            return response.data;
        } catch (error) {
            console.error(`Error editing course ${courseId}:`, error);
            throw error;
        }
    }

    async deleteCourse(courseId) {
        try {
            const response = await this.apiHandler.delete(`/deleteCourse/${courseId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting course ${courseId}:`, error);
            throw error;
        }
    }

    async deleteTeacherCourses(teacherId) {
        try {
            const response = await this.apiHandler.delete(`/deleteTeacherCourses/${teacherId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting courses for teacher ${teacherId}:`, error);
            throw error;
        }
    }
}
