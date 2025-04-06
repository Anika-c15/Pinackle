import React, { useState } from 'react';
import { uploadFileToPinata } from '../utils/uploadToPinata'; // adjust path
import './profile.css';

function Profile() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    const promises = [];

    for (let file of files) {
      promises.push(uploadFileToPinata(file));
    }

    try {
      const hashes = await Promise.all(promises);
      setUploadedImages(hashes);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
    <div className="MainDiv">
      {/* ... existing profile UI ... */}

      <div>
        <h2>Upload NFT Images</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
        />
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          {uploadedImages.map((hash, i) => (
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${hash}`}
              alt={`NFT-${i}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
