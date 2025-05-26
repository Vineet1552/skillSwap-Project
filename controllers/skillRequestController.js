const SkillRequest = require("../models/skillRequestModel");

// create a skill swap request
const createRequest = async(req, res) => {
    try{

        const {receiver, skillsOffered, skillsWanted} = req.body;

        if(receiver === req.user.userId) {
            return res.status(400).json({
                message: "you can not send the request to yourself"
            });
        }

        const newRequest = new SkillRequest({
            requester: req.user.userId,
            receiver,
            skillsOffered,
            skillsWanted
        });

        await newRequest.save();
        return res.status(201).json(newRequest);


    } catch(error) {
        res.status(500).json({
            message: "failed to create request",
            error: error.message
        });
    }
}

// accept or reject a request

const updateRequestStatus = async(req, res) => {
    try{

        const {status} = req.body;
        if(!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "invalid status"
            })
        }

        // find the skillRequest from id
        const request = await SkillRequest.findById(req.params.id);

        if(!request) {
            res.status(404).json({
                message: "request not found"
            });
        }


    } catch(error) {
        res.status().json({
            message: "failed to update the request",
            error: error.message
        })
    }
}