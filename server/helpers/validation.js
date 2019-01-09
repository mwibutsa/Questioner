import joi from 'joi';
const Validator = {
    userSchema:joi.object({
        firstname:joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        lastname:joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        othername:joi.string().regex(/^[a-zA-Z]/),
        email:joi.string().email().required(),
        username:joi.string().regex(/^[a-zA-Z0-9_-]/).min(5).required(),
        phoneNumber:joi.string().regex(/\d{10}/),
        password:joi.string().min(8).required(),
        cpassword:joi.string().min(8).required()
    }),
    questionSchema:joi.object({
        title:joi.string().required(),
        question:joi.string().required()
    }),
    meetupSchema:joi.object({
        topic:joi.string().required(),
        happeningOn:joi.date().min('now').required(),
        location:joi.string().required(),
        images:joi.array().items(joi.string().regex(/\.(jpg|png|jpeg|)$/i)),
        tags:joi.array().items(joi.string())

    }),
    commentSchema:joi.object({
        comment:joi.string().required().min(1)
    }),

}
export default Validator;