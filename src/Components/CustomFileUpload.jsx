import React, { useState, useEffect } from "react";
import { useField } from "informed";

const CustomFileUpload = ({ field, label, accept, required, validate }) => {
  const { fieldApi, fieldState } = useField({ field, validate });
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    fieldApi.setValue(file);
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setPreviewType("image");
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setPreviewType("pdf");
      } else {
        setPreview(file.name);
        setPreviewType("other");
      }
    } else {
      setPreview(null);
      setPreviewType(null);
    }
  };

  // Reset the preview when the field value is cleared (e.g., form reset)
  useEffect(() => {
    if (!fieldState.value) {
      setPreview(null);
      setPreviewType(null);
    }
  }, [fieldState.value]);

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">{label}</label>
      <input
        id={field}
        type="file"
        accept={accept}
        required={required}
        onChange={handleChange}
        className="form-control"
      />
      {preview && (
        <div className="mt-2">
          {previewType === "image" ? (
            <img src={preview} alt="preview" style={{ maxWidth: "200px" }} />
          ) : previewType === "pdf" ? (
            <iframe src={preview} width="100%" height="500px" title="PDF Preview" />
          ) : (
            <p>Selected file: {preview}</p>
          )}
        </div>
      )}
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomFileUpload;
