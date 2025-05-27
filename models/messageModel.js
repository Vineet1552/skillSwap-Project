const mongoose = require("mongoose");



/*
| Field          | Type                    | Why It’s Important                 |
| -------------- | ----------------------- | ---------------------------------- |
| `sender`       | ObjectId → User         | Tracks who sent the message        |
| `receiver`     | ObjectId → User         | Tracks who gets the message        |
| `content`      | String                  | The actual chat text               |
| `skillRequest` | ObjectId → SkillRequest | Links to a valid, accepted request |
| `timestamps`   | Auto fields             | For chat history / ordering        |

*/



const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    skillRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillRequest",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Message", messageSchema);

