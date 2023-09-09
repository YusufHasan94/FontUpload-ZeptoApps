import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Title from "../Title/Title";
import FileUpload from "../FileUpload/FileUpload";
import Swal from "sweetalert2";


const Upload = () => {
    const [dragging, setDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    // const allowedFileTypes = ['font/ttf'];

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
        const files = e.dataTransfer.files[0];
        setSelectedFiles(files);
        console.log(files, selectedFiles);
    };

    const handleFileSelect = async (e) => {
        const files = e.target.files[0];
        setSelectedFiles(files);
        console.log(files);
    };

    const handleSubmit = async () => {
        if(selectedFiles){
            const formData = new FormData();
            formData.append('file', selectedFiles);
    
            try {
                const response = await fetch("http://localhost/fontUploadServer/upload.php", {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    console.log(selectedFiles);
                    console.log(selectedFiles, "Upload success");
                    setSelectedFiles('');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Font has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else {
                    console.log("Failed to upload");
                }
            }
            catch (err) {
                console.error("Error file", err);
            }
        }else{
            console.log("no files Selected");
        }


    }

    return (
        <div className="flex justify-center items-center">
            <div>
                <Title title="Upload Your Fonts" />
                <div
                    className={`file-uploader border-2 border-dashed py-20 px-40 text-center rounded-lg ${dragging ? 'bg-gray-300' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex justify-center items-center">
                        <FaCloudUploadAlt className="text-6xl" />
                    </div>
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        className="opacity-0"
                    />
                    <div className="flex gap-1">
                        <label htmlFor="fileInput" className="text-xl mb-2 cursor-pointer block text-gray-800 font-semibold">
                            Click to upload
                        </label>
                        <label htmlFor="fileInput" className="text-xl mb-2 cursor-pointer block text-gray-800">or drag and drop</label>
                    </div>
                    <span className="text-gray-600">only TTF File Allowed</span>
                        <div className="selected-files mt-5">
                            <h3>Selected Files:</h3>
                            <ul className="list-none p-0">
                                {selectedFiles.name}
                            </ul>
                        </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-full my-5 bg-gray-500 px-5 py-2 rounded-full font-semibold text-white" onClick={handleSubmit} >Upload Font</button>
                </div>
            </div>
        </div>

    );
};

export default Upload;