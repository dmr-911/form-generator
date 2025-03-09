import { getIn } from "formik";
import React, { useState, useRef, ChangeEvent, DragEvent, JSX } from "react";
import FormError from "../../FormError";

// Define interfaces for our file object
interface FileObject {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  file: File;
}

// Props interface with customization options
interface FileUploaderProps {
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[]; // array of MIME types
  maxFiles?: number; // maximum number of files allowed
  onFileUpload?: (file: FileObject) => void;
  onFileRemove?: (fileId: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxFileSize = 10485760, // Default 10MB
  allowedFileTypes = [], // Default - allow all
  maxFiles = 0, // Default - unlimited
  onFileUpload,
  onFileRemove,
  files: initialFiles,
  name,
  formik,
}) => {
  const [files, setFiles] = useState<FileObject[]>(initialFiles || []);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileObject | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (maxFileSize > 0 && file.size > maxFileSize) {
      return {
        valid: false,
        error: `File ${file.name} exceeds maximum size of ${formatFileSize(
          maxFileSize
        )}`,
      };
    }

    // Check file type
    if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File ${
          file.name
        } has unsupported format. Allowed types: ${allowedFileTypes.join(
          ", "
        )}`,
      };
    }

    return { valid: true };
  };

  const processFiles = (selectedFiles: File[]): void => {
    if (maxFiles > 0 && files.length + selectedFiles.length > maxFiles) {
      setError(`Cannot upload more than ${maxFiles} files`);
      return;
    }

    setError(null);

    const validFiles: FileObject[] = [];

    selectedFiles.forEach((file) => {
      const validation = validateFile(file);

      if (validation.valid) {
        const newFile: FileObject = {
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          uploaded: false,
          error: false,
          file: file,
        };

        validFiles.push(newFile);
      } else if (validation.error) {
        setError(validation.error);
      }
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      if (formik && name) {
        formik.setFieldValue(name, [...formik.values[name], ...validFiles]);
      }
      // Start uploading each file
      validFiles.forEach((fileObj) => {
        simulateFileUpload(fileObj.id);
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const simulateFileUpload = (fileId: string): void => {
    // In a real application, replace this with actual API calls
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) => {
          const updatedFiles = prev.map((f) =>
            f.id === fileId ? { ...f, progress, uploaded: true } : f
          );
          const uploadedFile = updatedFiles.find((f) => f.id === fileId);
          if (uploadedFile && onFileUpload) {
            onFileUpload(uploadedFile);
          }
          return updatedFiles;
        });
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 500);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (!dragActive) setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(false);

    if (!e.dataTransfer.files) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const removeFile = (id: string): void => {
    // If removing the previewed file, close the preview
    if (previewFile && previewFile.id === id) {
      setPreviewFile(null);
    }

    setFiles((prev) => prev.filter((f) => f.id !== id));

    if (formik && name) {
      formik.setFieldValue(
        name,
        formik.values[name].filter((f) => f.id !== id)
      );
    }

    if (onFileRemove) {
      onFileRemove(id);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
    else return (bytes / 1073741824).toFixed(1) + " GB";
  };

  const getFileIcon = (fileType: string): JSX.Element => {
    if (fileType.includes("image")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (fileType.includes("pdf")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else if (fileType.includes("excel") || fileType.includes("sheet")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    }
  };

  const getProgressColor = (file: FileObject): string => {
    if (file.error) return "bg-red-500";
    if (file.uploaded) return "bg-green-500";
    return "bg-blue-500";
  };

  const handlePreview = (file: FileObject) => {
    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const renderPreview = () => {
    if (!previewFile) return null;

    let previewContent;
    const isImage = previewFile.type.includes("image");
    const isPdf = previewFile.type.includes("pdf");

    if (isImage) {
      const imageUrl = URL.createObjectURL(previewFile.file);
      previewContent = (
        <div className="flex items-center justify-center h-full">
          <img
            src={imageUrl}
            alt={previewFile.name}
            className="max-w-full max-h-full object-contain"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </div>
      );
    } else if (isPdf) {
      previewContent = (
        <div className="flex flex-col items-center justify-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-center text-gray-700 mb-4">{previewFile.name}</p>
          <a
            href={URL.createObjectURL(previewFile.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Open PDF
          </a>
        </div>
      );
    } else {
      previewContent = (
        <div className="flex flex-col items-center justify-center h-full">
          {getFileIcon(previewFile.type)}
          <p className="mt-4 text-center text-gray-700">{previewFile.name}</p>
          <p className="mt-2 text-center text-gray-500">
            Preview not available for this file type
          </p>
          <p className="text-center text-gray-500">
            {formatFileSize(previewFile.size)}
          </p>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">File Preview</h3>
            <button
              onClick={closePreview}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-auto p-6">{previewContent}</div>
        </div>
      </div>
    );
  };

  let formikError = formik
    ? (getIn(formik.touched, name) && getIn(formik.errors, name)) || false
    : false;

  return (
    <div className="max-w-full mx-auto rounded-lg shadow-md">
      <div className="mb-5">
        <h2>Upload Files</h2>
        <p className="text-sm text-gray-500 mt-1">
          {allowedFileTypes.length > 0
            ? `Allowed formats: ${allowedFileTypes.join(", ")}`
            : "All file types are supported"}
          {maxFileSize > 0 ? ` (max ${formatFileSize(maxFileSize)})` : ""}
        </p>
      </div>

      {/* Drag and drop area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }
              
          
          ${
            formikError
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`mx-auto h-12 w-12 ${
            dragActive ? "text-blue-500" : "text-gray-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mt-2 text-sm font-medium text-gray-600">
          {dragActive ? "Drop files here" : "Drag and drop files here or"}
        </p>
        <span className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Browse Files
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        </div>
      )}
      <FormError formik={formik} name={name} helperText={``} />

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Selected files ({files.length}
              {maxFiles > 0 ? `/${maxFiles}` : ""})
            </h3>
            {files.length > 1 && (
              <button
                className="text-xs text-red-500 hover:text-red-700"
                onClick={() => {
                  files.forEach((file) => {
                    if (onFileRemove) onFileRemove(file.id);
                  });
                  setFiles([]);
                  setPreviewFile(null);
                }}
                type="button"
              >
                Remove all
              </button>
            )}
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center flex-grow mr-3">
                  {getFileIcon(file.type)}
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.error
                          ? "Failed"
                          : file.uploaded
                          ? "Complete"
                          : `${file.progress}%`}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${getProgressColor(
                          file
                        )}`}
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-gray-500 hover:text-blue-500 transition-colors mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(file);
                    }}
                    aria-label="Preview file"
                    disabled={!file.uploaded}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  <button
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    aria-label="Remove file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview modal */}
      {renderPreview()}
    </div>
  );
};

export default FileUploader;
