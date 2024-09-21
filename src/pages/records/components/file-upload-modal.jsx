import React from 'react';
import Modal from './Modal.jsx';
import { IconCloudUpload, IconProgress } from '@tabler/icons-react';

const FileUploadModal = ({
    isOpen,
    onClose,
    onFileChange,
    onFileUpload,
    uploading,
    uploadSuccess,
    filename,
}) => {
    return (
        <Modal
            title={"Upload Report"}
            isOpen={isOpen}
            onClose={onClose}
            onAction={onFileUpload}
            actionLabel={"Upload and Analyse"}
        >
            <div className="flex w-full flex-col items-center  justify-center gap-2 rounded-xl border border-dashed border-slate-700 text-slate-200 p-8">
                <IconCloudUpload size={40} />

                <div className="group flex flex-col ">
                    <div className='flex'>
                        {/* Label wraps the input to trigger file selection */}
                    <label
                        htmlFor="fileInputDragDrop"
                        className="cursor-pointer px-2 py-1 mr-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                        Browse
                        <input
                            type="file"
                            id="fileInputDragDrop"
                            className="sr-only"
                            aria-describedby="validFileFormats"
                            onChange={onFileChange}
                        />
                    </label>
                    <p className="text-slate-400 mt-2">or drag and drop here</p>
                    </div>
                    <small id="validFileFormats" className="text-slate-500 ml-16">
                        PNG, PDF, JPEG - MAX 5MB
                    </small>
                </div>
            </div>

            {/* Loading Spinner during Upload */}
            {uploading && (
                <IconProgress size={15} className="mr-3 h-7 w-7 animate-spin" />
            )}

            {/* Success Message */}
            {uploadSuccess && (
                <p className="mt-2 text-green-600">Upload Successful!</p>
            )}

            {/* Display Filename */}
            {filename && (
                <span className="text-md text-left text-white mt-2">
                    {filename}
                </span>
            )}
        </Modal>
    );
};

export default FileUploadModal;
