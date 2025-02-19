import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    messages : [{
        sender : String,
        text : String,
        timestamp : Date,
    }]
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;