import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "../custom-filepond.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiCheck } from "react-icons/fi";

registerPlugin(FilePondPluginFileValidateType);

const TabTwo = () => {
  const navigate = useNavigate();
  const [schemaFile, setSchemaFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = (fileItems) => {
    if (fileItems.length > 0) {
      setSchemaFile(fileItems[0].file);
    } else {
      setSchemaFile(null);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    //handle loading page
    setIsUploading(!isUploading);

    //request to handle route
    axios
      .post("http://localhost:8000/api/v1/file/handle", {
        fileName: fileName,
        filePath: filePath,
      })
      .then((data) => {
        setIsUploading(!isUploading);
        setIsUploaded(!isUploaded);

        return setTimeout(() => {
          navigate(`/question`, {
            state: {
              schema: data.data.schema,
            },
          });
        }, 2000);
      })
      .catch((err) => {
        setIsUploading(!isUploading);
        alert(err);
      });
  };

  const maxFileSize = "20MB";

  return (
    <>
      {/* <LoadingScreen /> */}
      <div className="">
        <form onSubmit={handleUpload}>
          <FilePond
            name="file"
            acceptedFileTypes={["application/sql", ".ddl", ".sql"]}
            allowMultiple={false}
            maxFileSize={maxFileSize}
            data-max-files={1}
            server="http://localhost:8000/api/v1/file/upload"
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
                // console.log(jsonObject)
                setFileName(jsonObject.file);
                setFilePath(jsonObject.filePath);
              }
            }}
          />
          <button
            className="inline-flex items-center rounded bg-purple-400 py-2 px-6 font-bold text-white hover:bg-purple-500"
            type="submit"
            onClick={handleUpload}
            disabled={isUploading || isUploaded}
          >
            {isUploading ? (
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16zM3.27 20a10 10 0 0017.46-6H18a6 6 0 01-6 6H9a6 6 0 01-5.99-5.775L3.27 20z"
                ></path>
              </svg>
            ) : (
              <>
                <FiUpload className="mr-2 h-5 w-5" />{" "}
              </>
            )}
            {isUploaded ? (
              <FiCheck className="mr-2 h-5 w-5" />
            ) : (
              <span>Upload</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default TabTwo;
