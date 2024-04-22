import { Project } from "../models/projectfile.model.js";



const getStudentProjectData = async(req,res)=>{
    try {
        // Check if an ID is provided in the request parameters
        const { id } = req.params;

        if (id) {
            // Find the projectData by ID
            const projectData = await Project.findById(id).populate('username');
            
            console.log(projectData);

            // Check if the projectData with the provided ID exists
            if (!projectData) {
                return res.status(404).json({
                    status: "error",
                    message: "project Data not found",
                });
            }

            // Send the retrieved projectData as a JSON response
            return res.status(200).json({
                status: "success",
                data: projectData,
                message: "projectData retrieved successfully",
            });
        } else {
            // Find all documents in the projectDataDetail collection
            const allprojectData = await Project.find().populate('username');

            // Send the retrieved data as a JSON response
            return res.status(200).json({
                status: "success",
                data: allprojectData,
                message: "All projectData retrieved successfully",
            });
        }
        
        
    } catch (e) {

             // Handle server error
        console.error("Error fetching Project:", e);

        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    
        
    }
}


const deleteStudentProjectData = async(req,res)=>{
    try {
            const project_id = req.params.id ;

            const deleteProjectData = await Project.deleteOne({ _id: project_id });

            if (deleteProjectData.deletedCount === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "Project not found",
                });
            }

            

            res.status(200).json({
                status: "success",
                data: deleteProjectData,
                message: "Project deleted",
            });
        
        
    } catch (error) {
        console.error("Error deleting Project:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}




export {getStudentProjectData , deleteStudentProjectData}