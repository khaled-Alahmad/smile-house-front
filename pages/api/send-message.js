import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { Body, From, To } = req.body;

  console.log("Received request data:", { Body, From, To });

  if (!Body || !From || !To) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Strip out 'whatsapp:' prefix if necessary
  const formattedTo = To.replace("whatsapp:", "").trim();

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        Body: "Test Message", // Use a simple message to debug
        From,
        To: formattedTo,
      },
      {
        auth: {
          username: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
          password: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN,
        },
      }
    );

    console.log("Twilio response data:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Twilio API error:", error.response?.data || error.message);
    res.status(400).json({
      message: "Error sending message",
      error: error.response?.data || error.message,
    });
  }
}
