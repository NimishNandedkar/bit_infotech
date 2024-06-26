import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Typography } from '@material-ui/core';

function StudentCornerManage() {
        const [projects, setProjects] = useState([]);
        const [selectedProject, setSelectedProject] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [loading, setLoading] = useState(true); // New state for loading indicator

        useEffect(() => {
          fetchProjects();
        }, []);

        const fetchProjects = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/project-details/`);
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
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/project-details/${projectId}`);
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
                        <TableCell><Typography variant="subtitle1">Student Name</Typography></TableCell>
                        <TableCell><Typography variant="subtitle1">Title</Typography></TableCell>
                        <TableCell><Typography variant="subtitle1">Description</Typography></TableCell>
                        <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(project => (
                        <TableRow key={project._id}>
                            <TableCell>{project.username.name}</TableCell>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleView(project)}>View</Button>
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
            <Typography variant="h4" className="mb-4 text-center text-xl font-bold">Project Details</Typography>
            <div className="mb-4">
                <Typography variant="h5" className="mb-2">Title:</Typography>
                <Typography variant="body1" className="pl-2">{selectedProject?.title}</Typography>
            </div>
            <div className="mb-4">
                <Typography variant="h5" className="mb-2">Description:</Typography>
                <Typography variant="body1" className="pl-2">{selectedProject?.description}</Typography>
            </div>
            <div className="mb-4">
                <Typography variant="h5" className="mb-2">Project Type:</Typography>
                <Typography variant="body1" className="pl-2">{selectedProject?.projectType}</Typography>
            </div>
            {selectedProject?.username && (
                <div className="mb-4">
                    <Typography variant="h5" className="mb-2">Uploaded by:</Typography>
                    <Typography variant="body1" className="pl-2">{selectedProject?.username?.name}</Typography>
                </div>
            )}
            <div className="flex items-center justify-center">
                
                <Button variant="contained" color="primary" onClick={() => window.open(selectedProject?.file, '_blank')}>Download Uploaded File</Button>
            </div>
            <div className="flex justify-center mt-6">
                <Button variant="contained" color="secondary" onClick={closeModal}>Close</Button>
            </div>
        </div>
    </Modal>
</div>
  );
}

export default StudentCornerManage;