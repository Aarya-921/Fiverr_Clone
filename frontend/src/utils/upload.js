import axios from "axios";
const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/aarya21/image/upload",
      data
    );

    return res.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default upload;