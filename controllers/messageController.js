const Message = require("../models/messageModel");

// send the message to the user

const sendMessage = async(req, res) => {
    try{
        
    } catch(error) {
        res.status(500).json({
            message: "failed to send the message",
            error: error.message
        })
    }
}