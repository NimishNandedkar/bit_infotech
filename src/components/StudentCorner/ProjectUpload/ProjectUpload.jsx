import React, { useEffect, useState } from 'react';
import "./ProjectUpload.css";
import DropdownButton from './Dropdown';
import InputField from './InputField.jsx';
import FileDragandDrop from './FileDragandDrop.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alertjsx from '../../Alert/Alert.jsx';

function ProjectUpload() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.status);


    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);


    const [dropdownVisible, setDropdownVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const courses = ["Web Development", "Artificial Intelligence", "Tally Prime Gst", "Digital Marketing"]; // DropDown content
    const [formData, setFormData] = useState({
        title: "",
        subjectName: "",
        projectType: "",
        description: "",
        course: "",
        file: null

    });
    console.log(formData);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const errors = validateForm(formData);
            if (Object.keys(errors).length === 0) {
                console.log(formData);
                // Form is valid, proceed with submitting data


                // api call to upload project

                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('projectType', formData.projectType);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('file', formData.file[0]);
                // formDataToSend.append('subjectName', formData.subjectName);
                // formDataToSend.append('course', formData.course);

                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/student-corner`, formDataToSend, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Handle success, maybe redirect the user or show a success message
                if (response.status === 201) {

                    setOpen(true);
                    setSeverity('success');
                    setMessage('Project uploaded successfully');
                    setFormData({
                        title: "",
                        subjectName: "",
                        projectType: "",
                        description: "",
                        course: "",
                        file: null
                    });
                    navigate('/student-corner');
                }
                console.log(response.data);
            } else {
                setErrors(errors);
                setOpen(true);
                setSeverity('error');
                setMessage('form is invalid, please fill all the fields');
            }
        } catch (error) {
            setOpen(true);
            setSeverity('error');
            setMessage('An error occurred while uploading project');
        }
    };
    // ********************************************************************
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setFormData({ ...formData, course: option });
        setDropdownVisible(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // *********************************************************************

    const validateForm = (data) => {
        let errors = {};
        if (!data.title.trim()) {
            errors.title = "title is required";
        }
        if (!data.subjectName.trim()) {
            errors.subjectName = "Subject name is required";
        }
        if (!data.projectType.trim()) {
            errors.projectType = "Project type is required";
        }
        if (!data.description.trim()) {
            errors.description = "Description is required";
        }
        if (!data.course.trim()) {
            errors.course = "Course is required";
        }
        if (!data.file) {
            errors.file = "File is required";
        }
        return errors;
    };

    return (
        <>
            <Alertjsx open={open} handleClose={handleClose} severity={severity} message={message} />
            <div className="bg-white-100 mt-6 h-full flex items-center justify-center mb-6 ">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 text-xl font-bold ">Upload Your Project:</label>
                            <InputField placeholder={"Title Of Project"} name={"title"} value={formData.title} onChange={handleChange} />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                            <InputField placeholder={"Subject Name"} name={"subjectName"} value={formData.subjectName} onChange={handleChange} />
                            {errors.subjectName && <span className="text-red-500 text-sm">{errors.subjectName}</span>}
                            <InputField placeholder={"Project Type"} name={"projectType"} value={formData.projectType} onChange={handleChange} />
                            {errors.projectType && <span className="text-red-500 text-sm">{errors.projectType}</span>}
                            <textarea id="description" name="description" rows="4" className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm resize-none focus:outline-none focus:border-blue-500" placeholder="Description of Project" value={formData.description} onChange={handleChange}></textarea>
                            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            <span className="text-gray-500 text-sm">Max 280 characters</span>
                        </div>

                        <DropdownButton
                            dropDownContent={courses}
                            onSelect={handleOptionSelect}
                            dropDownInitialValue={selectedOption ? selectedOption : "Select Category"}
                            isFormSubmitted={false}
                            setIsFormSubmitted={() => {
                                setFormData({ ...formData, course: selectedOption });
                            }}
                        />


                        {errors.course && <span className="text-red-500 text-sm">{errors.course}</span>}

                        <FileDragandDrop onFilesChange={
                            (file) => {
                                setFormData({ ...formData, file: file })
                            }
                        } />
                        {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
                        <div className="flex items-center justify-between">
                            <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"> Upload
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProjectUpload;