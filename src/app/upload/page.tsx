"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploadResult(data);
    } catch (error) {
      console.error("Upload error: ", error);
      setUploadResult({ success: false, error: error?.toString() });
    }
    setIsUploading(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload Document</h1>
      <input type="file" accept=".pdf, .txt" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {uploadResult && (
        <div className="mt-4">
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
