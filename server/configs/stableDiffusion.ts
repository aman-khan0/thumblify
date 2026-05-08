// import axios from "axios";

//  const generateImage = async (prompt: string) => {
//   try {
//     const response = await axios.post(
//       "https://router.huggingface.co/fal-ai/fal-ai/flux/dev",
//       {
//         inputs: prompt,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//           Accept: "image/png"
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     return Buffer.from(response.data);

//   } catch (error) {
//     console.error("Stable Diffusion Error:", error);
//     throw error;
//   }
// };

// export default generateImage;
import axios from "axios";

const generateImage = async (prompt: string) => {
  try {

    // Step 1: Generate image
    const response = await axios.post(
      "https://router.huggingface.co/fal-ai/fal-ai/flux/dev",
      {
        prompt: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    // Step 2: Get image URL from response
    const imageUrl = response.data.images[0].url;

    // Step 3: Download actual image
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Step 4: Return image buffer
    return Buffer.from(imageResponse.data);

  } catch (error: any) {

    console.log("STATUS:", error.response?.status);

    console.log(
      "ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export default generateImage;