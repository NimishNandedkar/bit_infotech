// components/WebinarSeminar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Typography } from '@material-ui/core';
import CreateWebinar from './CreateWebinar';

const WebinarSeminarManage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [reqToUpdate, setReqtoUpdate] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [projects]);

  const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/get-webinar/`);
        setProjects(response.data.data);
        setLoading(false); // Set loading to false after data is fetched

        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false); // Set loading to false in case of error
      }
  };

const deleteProject = async (projectId) => {
try {
await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/webinars/delete-webinar/${projectId}`);
// Update projects state after deletion
setProjects(projects.filter(project => project._id !== projectId));

console.log(setProjects(projects.filter(project => project._id !== projectId)));

} catch (error) {
console.error('Error deleting project:', error);
}
};

const handleView = (project) => {
setSelectedProject(project);
setShowModal(true);
};

const closeModal = () => {
setSelectedProject(null);
setShowModal(false);
};

return (
<div>
{loading ? (
  <p>Loading...</p>
) : (
  <TableContainer component={Paper}>
      <Table aria-label="projects table">
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                  
                  <TableCell><Typography variant="subtitle1">Title</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1">Description</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {projects.map(project => (
                  <TableRow key={project._id}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.description}</TableCell>
                      <TableCell>
                          <Button variant="contained" color="primary" onClick={() => handleView(project)}>update</Button>
                          <Button variant="contained" color="error" style={{ marginLeft: '8px' }} onClick={() => deleteProject(project._id)}>Delete</Button>
                      </TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
  </TableContainer>
)}

<Modal open={showModal} onClose={closeModal}>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-white p-8 rounded-lg shadow-lg outline-none">
      <Typography variant="h4" className="mb-4 text-center text-xl font-bold">Webinar Details</Typography>
      
     
        <CreateWebinar selectedProject={selectedProject} reqToUpdate={reqToUpdate} />

      <div className="flex justify-center mt-6">
          <Button variant="contained" color="secondary" onClick={closeModal}>Close</Button>
      </div>
  </div>
</Modal>
</div>
);

 
};

export default WebinarSeminarManage;
