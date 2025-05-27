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
        console.log(request, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

        if(!request) {
            res.status(404).json({
                message: "request not found"
            });
        }

        // check if logedin user is same as receiver user
        if(request.receiver.toString() !== req.user.userId) {
            return res.status(401).json({
                message: "not authorized to update this request"
            })
        }

        request.status = status;
        await request.save();
        res.json(request);

    } catch(error) {
        res.status(500).json({
            message: "failed to update the request",
            error: error.message
        })
    }
}

// method for view request that you have reeceived
const getIncommingRequests = async(req, res) => {
    try{
        const requests = await SkillRequest.find({receiver: req.user.userId}).populate("requester", "name email"); 
        // const requests = await SkillRequest.find({receiver: req.user.userId});  
        res.json(requests);
    } catch(error) {
        res.status(500).json({
            message: "error while getting the requests",
            error: error.message
        })
    }
}

// method for view requests that you have sent
const getOutgoingRequests = async(req, res) => {
    try{
        const requests = await SkillRequest.find({requester: req.user.userId}).populate("receiver", "name email");
        res.json(requests);
    } catch(error) {
        res.status(500).json({
            message: "error while getting the outgoing requests",
            error: error.message
        })
    }
}


module.exports = {
    createRequest,
    updateRequestStatus,
    getIncommingRequests,
    getOutgoingRequests
}