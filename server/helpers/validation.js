import joi from 'joi';
const Validation = {
    meetupSchema:joi.object().keys({
        topic:joi.string().min(2).required(),
        location:joi.string().min(2).required(),
        happeningOn:joi.date().min('now').required(),
        tags:joi.array(joi.items.string())
    })
}