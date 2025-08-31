import { apiConnector } from "../apiConnnector.js";
import { jobEndPoints } from "../apis.js";
import toast from "react-hot-toast";

const {CREATE_JOB_API}= jobEndPoints;

export async function createJob(
    title,
    body,
    terminate_at,
    max_applications,
    min_10th,
    min_12th,
    token // Add token as parameter
) {
    try {
        const requestBody = {
            title,
            body,
            terminate_at,
            max_applications,
            min_10th,
            min_12th
        };

        const response = await apiConnector("POST", CREATE_JOB_API, requestBody, {
            Authorization: `Bearer ${token}`,
        });
        
        toast.success("Job posted successfully");
        return {
            success: true,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        console.error("Error creating job:", error);
        toast.error("Error in posting job");
        return {
            success: false,
            message: error.response?.data?.message || "Error creating job post",
            error: error.response?.data || error.message
        };
    }
}
