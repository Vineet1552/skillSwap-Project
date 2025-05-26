require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    // extract jwt from the header
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        res.status(401).json({
            error: "Unauthorized"
        })
    }

    try{
        // verify jwt token
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();

    } catch(error) {
        res.status(401).json({
            error: "invalid token"
        })
    }
}

module.exports = verifyJwt;