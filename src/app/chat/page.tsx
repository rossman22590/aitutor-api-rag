"use client";

import { useState, useEffect } from "react";
import Chat from "../components/Chat";

type FileItem = {
  file_id: string;
  file_name: string;
  type: string;
};

export default function ChatPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagination: { limit: 50, offset: 0 },
          order_dir: "desc",
        }),
      });
      const data = await res.json();
      if (data?.results) setFiles(data.results);
    } catch (error) {
      console.error("Error fetching files", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ask Questions</h1>
      {!selectedFile ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">Select a Document</h2>
          {loading ? (
            <p>Loading files...</p>
          ) : (
            <>
              {files.length === 0 ? (
                <p>No files uploaded. Please upload a document first.</p>
              ) : (
                <ul>
                  {files.map((file) => (
                    <li key={file.file_id} className="mb-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => setSelectedFile(file)}
                      >
                        {file.file_name} ({file.type})
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <button
            className="mb-4 p-2 bg-gray-300 rounded"
            onClick={() => setSelectedFile(null)}
          >
            Back to file list
          </button>
          <h2 className="text-lg font-semibold mb-2">
            Chat for: {selectedFile.file_name}
          </h2>
          {/* Pass only fileId to the Chat component */}
          <Chat fileId={selectedFile.file_id} />
        </div>
      )}
    </div>
  );
}
