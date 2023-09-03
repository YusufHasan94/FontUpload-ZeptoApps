import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Title from "../Title/Title";


const Upload = () => {
    const [dragging, setDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const allowedFileTypes = ['font/ttf'];

    const saveFile = files =>{
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter((file) => allowedFileTypes.includes(file.type));
        setSelectedFiles(validFiles);
        saveFile(validFiles);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        saveFile(files);
    };
    return (
        <div className="flex justify-center items-center">
            <div>
                <Title title="Upload Your Fonts"/>
                <div
                    className={`file-uploader border-2 border-dashed py-20 px-40 text-center rounded-lg ${dragging ? 'bg-gray-300' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex justify-center items-center">
                        <FaCloudUploadAlt className="text-6xl"/>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        multiple
                        accept={allowedFileTypes.join(',')}
                        onChange={handleFileSelect}
                        onClick={(e) => e.target.value = null}
                        className="opacity-0"
                    />
                    <div className="flex gap-1">
                        <label htmlFor="fileInput" className="text-xl mb-2 cursor-pointer block text-gray-800 font-semibold">
                            Click to upload
                        </label>
                        <label htmlFor="fileInput" className="text-xl mb-2 cursor-pointer block text-gray-800">or drag and drop</label>
                    </div>
                    <span className="text-gray-600">only TTF File Allowed</span>
                    {selectedFiles.length > 0 && (
                        <div className="selected-files mt-5">
                            <h3>Selected Files:</h3>
                            <ul className="list-none p-0">
                                {selectedFiles.map((file) => (
                                    <li key={file.name} className="mx-2">{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    );
};

export default Upload;