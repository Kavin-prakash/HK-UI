import React, { useState, useRef } from 'react';
import '../Style/FileUpload.css'

const FileUpload = () => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview({
                    src: event.target.result,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    };

    return (
        <section>
            <form method="POST" encType="multipart/form-data">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label">Upload File</label>

                                {preview && (
                                    <div className="preview-zone">
                                        <div className="box box-solid">
                                            <div className="box-header with-border">
                                                <div><b>Preview</b></div>
                                                <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-danger btn-xs" onClick={handleReset}>
                                                        <i className="fa fa-times"></i> Reset This Form
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <img width="200" src={preview.src} alt="Preview" />
                                                <p>{preview.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="dropzone-wrapper"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <div className="dropzone-desc">
                                        <i className="glyphicon glyphicon-download-alt"></i>
                                        <p>Choose an image file or drag it here.</p>
                                    </div>
                                    <input
                                        type="file"
                                        name="img_logo"
                                        className="dropzone"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary pull-right">Upload</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default FileUpload;
