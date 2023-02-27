const express = require('express')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })

router.patch('/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        // todo: userId === corrent user id
        if (userId) {
           const updatedUser  = await User.findByIdAndUpdate(userId, req.body, {new: true})  // с помощью findByIdAndUpdate() обновляем самого пользователя
                                                                            // {new: true} важный момент эту константу updatedUser получим когда обнов БД
           res.send(updatedUser)
        } else {
            return res.status(401).json({message: 'Unauthorized'})
        }                                                                   

    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибкаю Попробуйте позже'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const list = await User.find()
        // res.status(200).send(list)
        res.send(list)                 // если статус 200 то можно и не указывать
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибкаю Попробуйте позже'
        })
    }
})

module.exports = router