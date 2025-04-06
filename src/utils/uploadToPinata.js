// utils/uploadToPinata.js
import axios from 'axios';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2Yjc3MzY4OS1hY2E4LTQ2MzAtYjA1NC00ZmM0OTQyMzdjNTUiLCJlbWFpbCI6ImFuaWthamFpbjE1MTEyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwZGI0ODZhZTVhMjg4MTYyODdlYSIsInNjb3BlZEtleVNlY3JldCI6ImEwNzFiNzE0MjE3OWI2NTI1OTY5YjhkODM0MWFjYTAwN2EyNjAwYWJmN2I3YmU4M2MwNDYzNzVlZDFiYmRiZTIiLCJleHAiOjE3NzU0NTkzMDl9.JLi_Od3arYc15bcLDBn_G7GMdWu46sgQsy48Ixga3FU'; // Replace with your JWT from Pinata

export const uploadFileToPinata = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });

  formData.append('pinataMetadata', metadata);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JWT}`,
      },
    });

    return res.data.IpfsHash; // This is the CID
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
};
