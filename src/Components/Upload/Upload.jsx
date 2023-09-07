import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Title from "../Title/Title";
import axios from "axios";


const Upload = () => {
    const [dragging, setDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const allowedFileTypes = ['font/ttf'];

    const saveFile = files => {
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
        // const validFiles = files.filter((file) => allowedFileTypes.includes(file.type));
        setSelectedFiles(files);
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        saveFile(files);
    };

    const handleSubmitForm = async (e)=>{
        e.preventDefault();
        if(!selectedFiles){
            console.log("no files selected");
        }
        // const res = await axios.post('http://localhost/fontUploadServer/index.php', selectedFiles);
        // if(res.statusText == 'OK'){
        //     console.log("response send", res.data);
        // }
        

    }

    return (
        <div className="flex justify-center items-center">
            <div>
                <Title title="Upload Your Fonts" />
                <form onSubmit={handleSubmitForm} action="http://localhost/fontUploadServer/index.php" method="POST" encType="multipart/form-data" >
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
                            id="fileInput"
                            name="fontFile"
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
                    <div className="flex justify-center">
                        <input type="submit" value="Add Font" name="submit" className="my-5 bg-gray-500 px-5 py-2 rounded-full font-semibold text-white" />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Upload;