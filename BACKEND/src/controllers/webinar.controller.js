import { Webinar } from "../models/webinar.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Function to handle POST request to create a new webinar
const createWebinar = async (req, res) => {
  try {
    const { category, description, videoUrl , title} = req.body;

    
    if ( !category && !description && !videoUrl && !title) {
      return res.status(400).json({
          status: "failed",
          message: "Please provide all the required fields",
      });
  }
 // Create a new webinar document
    const newWebinar = new Webinar({
      title,
      category,
      description,
      videoUrl,
      isRegister: [] // Initialize with an empty array for registrations
    });

    // Save the new webinar document
    await newWebinar.save();

    // Respond with the newly created webinar document
    res.status(201).json({ message: "Webinar created successfully", webinar: newWebinar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const registerForWebinar = async (req, res) => {
  try {

    console.log(req.headers);
    console.log(req.cookies);
    const { id } = req.params;
    console.log(id);
    const token = req.cookies?.token || req.headers["Authorization"]?.replace("Bearer ", "");
    console.log(token);

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized: No token provided",
        });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded._id).exec();

    if (!user) {
        return res.status(404).json({
            status: "failed",
            message: "User not found",
        });
    }

    const webinar = await Webinar.findById(id).exec();

    if (!webinar) {
        return res.status(404).json({
            status: "failed",
            message: "webinar not found",
        });
    }
    console.log(webinar);

    webinar.isRegister.push(decoded._id);
    await webinar.save();

    return res.status(200).json({
        status: "success",
        message: "webinar registered",
    });
}
catch (error) {
    console.error("Error in registerwebinar:", error);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}
  };
  


  const getWebinarData = async(req,res)=>{

        try {
                const webinarID = req.params.id
          if (webinarID) {
            
            const webinar = await Webinar.findById(webinarID)
            
             // Check if the webinar with the provided ID exists
             if (!webinar) {
              return res.status(404).json({
                  status: "error",
                  message: "webinar not found",
              });
          }

          // Send the retrieved webinar as a JSON response
          return res.status(200).json({
              status: "success",
              data: webinar,
              message: "webinar retrieved successfully",
          });

          } else {
            const allWebinar = await Webinar.find();
    
            // Send the retrieved data as a JSON response
            return res.status(200).json({
                status: "success",
                data: allWebinar,
                message: "All blogs retrieved successfully",
            });
            
          }
          
        } catch (error) {
          
        }


    }  


    const deleteWebinar = async(req,res)=>{
      try {
        
        const webinarId = req.params.id
  
        const deleteWebimnar = await Webinar.deleteOne({_id:webinarId});
        
        if (deleteWebimnar.deletedCount === 0) {
            res.status(404).json({
              status : "failed",
              message:"Webinar not found"
            })
        }

        res.status(200).json({
          status :"success",
          data:deleteWebimnar,
          message:"webinar Successfully Deleted"
        })

      
      } catch (error) {
        console.error("Error deleting webinar:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
      }



    }


  
const updateWebinar = async (req, res) => {
  try {
      const webinarID = req.params.id;
      const { category, description, videoUrl , title} = req.body;

      // Check if any of the required fields are missing
      if (!category && !description && !videoUrl && !title) {
          return res.status(400).json({
              status: "failed",
              message: "Please provide at least one field to update",
          });
      }

      const updateFields = {};
      
      // Add fields to updateFields object only if they are provided in the request body
      if (title) updateFields.title = title;
      if (description) updateFields.description = description;
      if (category) updateFields.category = category;
      if (videoUrl) updateFields.videoUrl = videoUrl ;

      const updateResult = await Webinar.updateOne({ _id: webinarID }, { $set: updateFields });

        if (updateResult.n === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Webinar not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: updateResult,
            message: "Webinar Updated",
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                status: "failed",
                message: "Invalid Webinar ID",
            });
        }
        console.error("Error updating Webinar:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
  }    



export { createWebinar, registerForWebinar ,getWebinarData , deleteWebinar , updateWebinar};
