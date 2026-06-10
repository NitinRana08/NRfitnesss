export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "nrfitness_chat");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dkcbrzoze/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  return data.secure_url;
};