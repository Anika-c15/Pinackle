import axios from 'axios';

const API_KEY = "0db486ae5a28816287ea";
const API_SECRET = "a071b7142179b6525969b8d8341aca007a2600abf7b7be83c046375ed1bbdbe2";

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: "Infinity",
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};
