import { Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';

const FileUpload = ({
  onFilesSelected,
  accept = 'image/*,application/pdf',
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  label = 'Upload Files',
}) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon size={20} className="text-blue-500" />;
    }
    return <File size={20} className="text-purple-500" />;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {label}
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer
          ${dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-blue-400'
          }
        `}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-700 dark:text-gray-300 font-semibold">
            Drag and drop files here
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            or click to select
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Max file size: {maxSize / 1024 / 1024}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Selected Files ({files.length})
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
