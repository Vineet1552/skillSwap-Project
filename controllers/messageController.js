const Message = require("../models/messageModel");
const SkillRequest = require("../models/skillRequestModel");

// send the message to the user
const sendMessage = async(req, res) => {
    try{
        /*
        receiver jisko request bhejenge,
        content me kuch bhi jo text krna chaho
        skillrequest me hum skillRequest ki id bhenege like receiver ke pass already padi hongi request skill ki woh 
        */
        
        const {receiver, content, skillRequest} = req.body;

        // checking if request is accepted or not
        const request = await SkillRequest.findById(skillRequest);
        if(!request || request.status !== "accepted") {
            return res.status(403).json({
                message: "you can send the message only when request is accepted"
            })
        }

        // check if the sender is part of the request
        /*
        “If the logged-in user is NOT the one who sent the request (requester) AND is also NOT the one who received the request (receiver), then they are not authorized to send a message for this request.”
        */
        
        if(request.requester.toString() !== req.user.userId && request.receiver.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "you are not the part of this skill request"
            })
        }

        const newMessage = new Message({
            sender: req.user.userId,
            receiver,
            content,
            skillRequest

        });

        await newMessage.save();
        return res.status(201).json(newMessage);        

    } catch(error) {
        res.status(500).json({
            message: "failed to send the message",
            error: error.message
        })
    }
}

// getting chat history of logged-in user and user you want 
// Get chat history
const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: userId },
        { sender: userId, receiver: req.user.userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};


module.exports = {
    sendMessage,
    getMessages
}