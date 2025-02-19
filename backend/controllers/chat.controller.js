import Conversation from "../models/conversationSchema.js";
import axios from "axios";
import { WIT_AI_TOKEN } from "../config/config.js"; 
export const createConversation = async (req, res) => {
    const { message } = req.body;

    try {
        const witResponse = await axios.get(`https://api.wit.ai/message?v=20230201&q=${encodeURIComponent(message)}`, {
            headers: { Authorization: `Bearer ${WIT_AI_TOKEN}` }
        });

        console.log("Wit.ai Response:", JSON.stringify(witResponse.data, null, 2));

        const intent = witResponse.data.intents?.[0]?.name;  // Get the intent name
        const botReply = getBotReplyBasedOnIntent(intent);

        // Save conversation
        const conversation = await Conversation.findOne({ userId: req.user.id }) || new Conversation({ userId: req.user.id, messages: [] });
        conversation.messages.push({ sender: "user", text: message, timestamp: new Date() });
        conversation.messages.push({ sender: "bot", text: botReply, timestamp: new Date() });
        await conversation.save();

        res.json({ response: botReply });
    } catch (error) {
        console.error("Wit.ai error:", error);
        res.status(500).json({ message: "Error processing request" });
    }
};

// Function to map intents to replies
const getBotReplyBasedOnIntent = (intent) => {
    switch (intent) {
        case 'wit_get_emotional_state':
            return "It sounds like you're feeling anxious. Try deep breathing exercises or speaking to someone you trust.";
        // Add more intents as needed
        default:
            return "I'm here to help. Please share your thoughts.";
    }
};



export const history = async(req, res)=>{
    
    const conversation = await Conversation.findOne({ userId: req.user.id });
    res.json(conversation ? conversation.messages : []);
    
}