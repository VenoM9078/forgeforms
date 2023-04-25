import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "../custom-filepond.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginFileValidateType);

const TabTwo = () => {

  const navigate = useNavigate();
  const [schemaFile, setSchemaFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState(null);

  const handleFileUpload = (fileItems) => {
    if (fileItems.length > 0) {
      setSchemaFile(fileItems[0].file);
    } else {
      setSchemaFile(null);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/v1/file/handle", { file: fileName, fileContent: fileContent})
      .then((data) => {
        return navigate(`/question`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <form onSubmit={handleUpload}>
        <FilePond
          name="file"
          acceptedFileTypes={["application/sql", ".ddl", ".sql"]}
          allowMultiple={false}
          data-max-files={1}
          server="http://127.0.0.1:8000/api/v1/file/upload"
          labelIdle='Drag & Drop your SQL schema file or <span class="filepond--label-action">Browse</span>'
          onupdatefiles={handleFileUpload}
          fileValidateTypeDetectType={(source, type) =>
            new Promise((resolve, reject) => {
              // Add custom file type detection for .sql files
              if (source.name && source.name.endsWith(".sql")) {
                resolve("application/sql");
              } else {
                resolve(type);
              }
            })
          }
          onprocessfile={(error, file) => {
                if (!error) {
                  const jsonObject = JSON.parse(file.serverId);
                  setFileName(jsonObject.file);
                  setFileContent(jsonObject.fileContent);
                }
              }}
        />
        <button
          className="inline-flex items-center rounded bg-purple-400 py-2 px-6 font-bold text-white hover:bg-purple-500"
          type="submit"
          onClick={handleUpload}
          disabled={!schemaFile}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default TabTwo;
