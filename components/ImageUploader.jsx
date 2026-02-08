"use client";

import { useState } from "react";

export default function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return alert("Select a file first");

    setLoading(true);

    const base64 = await convertToBase64(file);

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    const data = await res.json();

    onUpload({
      url: data.secure_url,
      public_id: data.public_id,
    });

    setLoading(false);
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
