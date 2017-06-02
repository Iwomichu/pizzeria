import * as nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: "DebugMail",
    auth: {
        user: "michal.juralowicz@gmail.com",
        pass: "cc6a4cf0-476f-11e7-b8ac-59cc35386e58"
    }
});

export {transporter};