import axios from "axios";

export default async (zplBody: string) => {
  try {
    const res = await axios.post(
      `${process.env.SERVER}/api/label`,
      { text: zplBody }, // Wrap it inside a JSON object with a key like `text`
      {
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
        },
      }
    );

    return res;
  } catch (err: any) {
    console.log("HERE ERROR!!!!");
    console.error("Error sending request:", err.message);
  }
};
