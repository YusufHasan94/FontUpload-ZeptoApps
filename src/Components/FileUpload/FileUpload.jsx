// FileUpload.js
import { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost/fontUploadServer/upload.php', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log(selectedFile);
          console.log('File uploaded successfully.');
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;

