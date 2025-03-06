import React, { useState, useRef, ChangeEvent, DragEvent, JSX } from 'react';

// Define interfaces for our file object
interface FileObject {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  uploaded: boolean;
  file: File;
}

const File: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    // Create file objects with additional properties
    const newFiles: FileObject[] = selectedFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      uploaded: false,
      file: file
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress for each file
    newFiles.forEach(fileObj => {
      simulateFileUpload(fileObj.id);
    });
  };

  const simulateFileUpload = (fileId: string): void => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => 
          prev.map(f => f.id === fileId ? {...f, progress, uploaded: true} : f)
        );
      } else {
        setFiles(prev => 
          prev.map(f => f.id === fileId ? {...f, progress} : f)
        );
      }
    }, 500);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    
    if (!e.dataTransfer.files) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    const newFiles: FileObject[] = droppedFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      uploaded: false,
      file: file
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    newFiles.forEach(fileObj => {
      simulateFileUpload(fileObj.id);
    });
  };

  const removeFile = (id: string): void => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileType: string): JSX.Element => {
    if (fileType.includes('image')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.includes('pdf')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Upload Files</h2>
        <p className="text-sm text-gray-500 mt-1">Upload files in JPEG, PNG, PDF or DOCX format (max 10MB)</p>
      </div>
      
      {/* Drag and drop area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
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
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mt-2 text-sm font-medium text-gray-600">Drag and drop files here or</p>
        <span className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Browse Files</span>
      </div>
      
      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Selected files</h3>
          
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
              <div className="flex items-center flex-grow mr-3">
                {getFileIcon(file.type)}
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.progress === 100 ? 'Complete' : `${file.progress}%`}</p>
                  </div>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${file.uploaded ? 'bg-green-600' : 'bg-blue-600'}`} 
                      style={{width: `${file.progress}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="mt-6 flex justify-end">
        <button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
        >
          Cancel
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            files.length === 0 || files.some(f => f.progress < 100) 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={files.length === 0 || files.some(f => f.progress < 100)}
        >
          Upload Files
        </button>
      </div>
    </div>
  );
};

export default File;