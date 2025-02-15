import axios from "axios";

export default async (zplBody: string) => {
  try {
    const res = axios.post(
      `${process.env.SERVER}/api/label`,
      { text: zplBody }, // Wrap it inside a JSON object with a key like `text`
      {
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
        },
      }
    );

    return {
      message: "Received text successfully",
    };
  } catch (err: any) {
    console.error("Error sending request:", err.message);
  }
};
