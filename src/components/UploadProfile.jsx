import React, { useState } from "react";
import {uploadFileToPinata} from "../utils/uploadToPinata"; // Adjust the import path as necessary

// Replace with your actual JWT

const PinUploader = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metadataCID, setMetadataCID] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !description) {
      alert("Please fill out all fields and choose a file.");
      return;
    }

    setLoading(true);
    try {
      // 1. Upload image
      const imageCID = await uploadFileToPinata(file);
      const imageURI = `ipfs://${imageCID}`;

      // 2. Build metadata
      const metadata = {
        name,
        description,
        image: imageURI,
        attributes: [
          { trait_type: "Platform", value: "PinNFT" }
        ]
      };

      // 3. Upload metadata
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
      const metadataFile = new File([metadataBlob], `metadata.json`);
      const metadataCID = await uploadFileToPinata(metadataFile);

      setMetadataCID(metadataCID);
      console.log("✅ Image IPFS URI:", imageURI);
      console.log("✅ Metadata IPFS URI:", `ipfs://${metadataCID}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Upload Pin NFT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="NFT Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Submit"}
        </button>
      </form>

      {metadataCID && (
        <div className="mt-4 text-green-600">
          ✅ Metadata uploaded to IPFS: <br />
          <a
            href={`https://gateway.pinata.cloud/ipfs/${metadataCID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            View Metadata
          </a>
        </div>
      )}
    </div>
  );
};

export default PinUploader;
