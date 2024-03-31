var mongoose = require('mongoose')
const { modelName } = require('../models/compositor')
var Compositor = require("../models/compositor")

module.exports.list = () => {
    return Compositor 
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = id => {
    return Compositor 
        .findOne({_id: id})
        .exec()
}

module.exports.findByNome = nome => {
    return Compositor
        .find({nome:nome})
        .exec()
}

module.exports.findByPeriodo = periodo => {
    return Compositor 
        .find({periodo: periodo})
        .exec()
}

// insert 
module.exports.insert = (compositor) => {
    var newCompositor = new Compositor(compositor)
    return newCompositor.save()
}

// update 
module.exports.update = (id, compositor) => {
    return Compositor
        .findByIdAndUpdate(id, compositor, {new : true}) // new:true, devolve o aluno nova se nao tivesse devolvia o antigo
        .exec()
}

// remove 
module.exports.removeById = id => {
    return Compositor
        .findByIdAndDelete(id)
        .exec()

    /* Alternativa
    Compositor.
        find({_id:id})
        .deleteOne()
        .exec()
    */
}
