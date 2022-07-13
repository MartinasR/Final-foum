const userDb = require('../models/userSchema')
const productDb = require('../models/productSchema')
const answersDb = require('../models/answerSchema')
const bcrypt = require('bcrypt')
const {cloudinary} = require('../helpers/imageUpload')

module.exports = {
    registration: async (req, res) => {
        const body = req.body
        const ifExists = await userDb.findOne({email: body.email})
        if (!ifExists) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(body.passwordOne, salt);
            const user = new userDb()
            user.email = body.email
            user.password = hashedPassword
            user.regTimestamp = Date.now()
            user.save()
            return await res.send({success: true, message: 'Vartotojas užregistruotas sėkmingai!'})
        } else {
            return await res.send({success: false, message: 'Toks vartotojas jau egzistuoja'})
        }
    },
    login: async (req, res) => {
        const body = req.body
        const user = await userDb.findOne({email: body.email})
        if (!user) {
            return res.send({success: false, message: 'vartotojas neegzistuoja'})
        }
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
            return res.send({success: true, user})
        } else {
            return res.send({success: false, message: 'prisijungimas negalimas'})
        }
    },
    uploadPicture: async (req, res) => {
        const {image, email} = req.body
        const uploadImage = await cloudinary.uploader.upload(image, {upload_preset: 'ml_default'}, async (err, response) => {
            if (!err) {
                const updatedUser = await userDb.findOneAndUpdate({email: email}, {profileImage: response.url})
                if (updatedUser) {
                    res.send({success: true, message: 'nuotrauka patalpinta', updatedUser})
                } else {
                    return res.send({success: false, message: 'kazkas ne taip'})
                }
            } else return res.send({success: false, message: 'nuotraukos ikelimas negalimas'})
        })
    },
    upload: async (req, res) => {
        const {theme} = req.body
        if (theme.email) {
            const prod = new productDb()
            prod.email = theme.email
            prod.title = theme.title
            prod.timestamp = Date.now()
            prod.save()
            const update = { themesCreated: theme.themesCreated+1 };
            const oldDocument = await userDb.findOneAndUpdate({email: theme.email}, update);
            return res.send({success: true, message: 'tema patalpinta sekmingai', oldDocument})
        } else return res.send({success: false, message: 'temos sukurimas nepavyko'})

    },
    getAllProducts: async (req, res) => {
        const allProducts = await productDb.find({}).sort({_id: -1})
        if (allProducts) {
            return res.send({success: true, allProducts})
        } else {
            return res.send({success: false, message: "nepavyksta pasiekti produktu"})
        }
    },
    getSingle: async (req, res) => {
        const {id} = req.params
        const {email} = req.body
        const singleTheme = await productDb.findOne({_id: id})
        if (singleTheme) {
            if (singleTheme.notification && singleTheme.email === email) {
                const singleTheme = await productDb.findOneAndUpdate({_id: id}, {notification: false})
            }
            return res.send({success: true, singleTheme})
        } else return res.send({success: false, message: 'nepavyksta ikelti temos'})
    },
    findUser: async (req, res) => {
        const {email} = req.body
        const user = await userDb.findOne({email})
        if (user) {
            return res.send({success: true, user})
        } else return res.send({success: false, message: 'nearanda'})
    },
    sendAnswer: async  (req, res) => {
        const {email, item, text, answers, itemAnswers} = req.body
        if (!email) {return res.send({success: false, message: 'neprisijunges'})}
        const answer = new answersDb()
        answer.sender = email
        answer.answer = text
        answer.item = item
        answer.timestamp = Date.now()
        answer.save().then( async (response, err) => {
            if (response) {
                const oldDocument = await userDb.findOneAndUpdate({email}, {answers: answers + 1});
                const updateAnswers = await productDb.findOneAndUpdate({_id: item}, {answers: itemAnswers+1, lastAnswer: email})
                if (updateAnswers.email !== email) {
                    const updateAnswers = await productDb.findOneAndUpdate({_id: item}, {notification: true})
                }
                return res.send({success: true, response, oldDocument, updateAnswers})
            }
        })
    },
    getAnswersById: async (req, res) => {
        const {id} = req.params
        const answers = await answersDb.find({item: id}).sort({_id: -1})
        if (answers) {
           return  res.send({success: true, answers})
        }
    },
    getUserThemes: async (req, res) => {
        const {email} = req.params
        const allThemes = await productDb.find({email: email}).sort({_id: -1})
        if (allThemes) {
            return res.send({success: true, allThemes})
        }
    },
    getUserAnswers: async (req, res) => {
        const {email} = req.params
        const allAnswers = await answersDb.find({sender: email}).sort({_id: -1})
        if (allAnswers) {
            return res.send({success: true, allAnswers})
        }
    },
    getFavorites: async (req, res) => {
        const {favorites} = req.body
        const favoritesAll = await productDb.find({_id: favorites})
        if (favoritesAll) {
            return res.send({success: true, favoritesAll})
        } else return res.send({success: false, message: 'nepavyksta ikelti temos'})
    },
    changeEmail: async (req, res) => {
        const {oldEmail, newEmail} = req.body
        const changeEmail = userDb.findOneAndUpdate({email: oldEmail}, {email: newEmail}).then(response => {
            if (response) {
                res.send({success: true, changeEmail})
            }
        })
    }
}


