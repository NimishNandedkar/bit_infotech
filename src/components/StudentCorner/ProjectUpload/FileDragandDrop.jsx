import React, { useState } from "react";

function FileDragandDrop({ onFilesChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (files) => {
    setFiles(files);
    onFilesChange(files); // Pass selected files back to parent component
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`bg-white-100 flex items-center justify-center p-3 ${isDragging ? 'border-blue-500 border-2' : ''}`}>
      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">File Drop and Upload</h1>
        <div
          className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span className="text-gray-600">Drag and drop your files here</span>
            <span className="text-gray-500 text-sm">(or click to select)</span>
            <span className="text-gray-500 text-sm">supported files pdf, png, jpg.</span>
          </label>
          <input type="file" id="fileInput" className="hidden" multiple onChange={handleFileInputChange} />
        </div>
        <div className="mt-6 text-center text-wrap" id="fileList">
          {files.map((file, index) => (
            <div key={index}>{`${file.name} (${formatBytes(file.size)})`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileDragandDrop;
