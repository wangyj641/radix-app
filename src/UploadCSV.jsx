import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fileInput', file);

    try {

      // This feature is not implemented in Deploy version server
      // const res = await axios.post('/api/sensor/csv', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} accept=".csv" />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>

      {message && <p>{message}</p>}
      {uploadedFile && (
        <div className="mt-4">
          <h3>{uploadedFile.fileName}</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
