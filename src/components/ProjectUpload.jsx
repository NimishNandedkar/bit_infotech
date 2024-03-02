import React from 'react'
import "./ProjectUpload.css";
import DropdownButton from './Dropdown';
import InputField from './InputField.jsx';

function ProjectUpload(params) {

    return(
	<>

		{/* <video autoplay muted loop id="myVideo">
		<source src="../assets/booksBackground.mp4" type="video/mp4"/>
		</video> */}

		<div className="bg-white-100 h-screen flex items-center justify-center ">
	
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
				<form>
					
					<div className="mb-6">
						<label for="postContent" className="block text-gray-700 text-xl font-bold mb-2">Upload Your Project:</label>

						<InputField placeholder={" Title Of Project"} name = {"projectName"}/>
						<InputField placeholder={"Subject Name "} name = {"subjectName"}/>

						

                        

						<textarea id="postContent" name="postContent" rows="4" className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="Description of Project "></textarea>
					</div>
					
{/* Below code for drop down */}

			 <DropdownButton/>

{/* Above code for drop down */}




                                    

					<div className="mb-6">
						<label for="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 ">Attach File:</label>
						<div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
							<input type="file" id="fileAttachment" name="fileAttachment" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
							<div className="flex items-center">
								<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
								</svg>
								<span className="ml-2 text-sm text-gray-600">Choose a file</span>
							</div>
							<span className="text-sm text-gray-500">Max file size: 5MB</span>
						</div>
					</div>
					
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