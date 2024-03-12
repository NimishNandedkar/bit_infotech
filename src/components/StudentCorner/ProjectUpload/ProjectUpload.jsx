import React from 'react'
import "./ProjectUpload.css";
import DropdownButton from './Dropdown';
import InputField from './InputField.jsx';
import FileDragandDrop from './FileDragandDrop.jsx';

function ProjectUpload(params) {
	
	return (
		<>
		{/* <h3 className="text-3xl font-bold text-center mt-10">Upload Your Project</h3> */}

			

			<div className="bg-white-100 mt-6 h-full flex items-center justify-center mb-6 ">

				<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl">
					<form>

						<div className="mb-6">
							<label htmlFor="postContent" className="block text-gray-700 text-xl font-bold ">Upload Your Project:</label>

							<InputField placeholder={" Title Of Project"} name={"projectName"} />
							<InputField placeholder={"Subject Name "} name={"subjectName"} />
							<InputField placeholder={"Project Type"} name={"projectType"} />
							<textarea id="postContent" name="postContent" rows="4" className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
         					 sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="Description of Project "></textarea>
						</div>

						{/* Below code for drop down */}

						<DropdownButton />
						<FileDragandDrop/>

				

						<div className="flex items-center justify-between">
							<button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"> Upload <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
								<path fill="none" d="M0 0h24v24H0V0z"></path>
								<path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
							</svg>
							</button>
							<span className="text-gray-500 text-sm">Max 280 characters</span>
						</div>
					</form>
				</div>
			</div>
		</>
	)

}

export default ProjectUpload