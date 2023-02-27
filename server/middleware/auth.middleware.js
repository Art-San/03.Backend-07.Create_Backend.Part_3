const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.methhod === 'OPTIONS') {  // OPTIONS спец метод для запросов, проверяет доступность сервера
        return next()
    }

    try {
        // Bearer gfjhkholjkmnvgshhjhkhlgl
       const token = req.headers.authorization.split(' ')[1]
       if (!token) {
        return res.status(401).json({message: 'Unauthorized'})
       }

       const data = tokenService.validateAccess(token)
       
       if (!data) {
        return res.status(401).json({message: 'Unauthorized'})
      }

      req.user = data

      next()         // очень важно вызвать здесь этот метод что остальные Middleware выполняличь их цепочка не прекращалась
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}