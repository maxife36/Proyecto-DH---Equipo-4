const { Comment , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryComment = seqQuery.newModel("Comment")

module.exports = class DbComment {
    static async getAllComments() {
        try {
            const comments = await Comment.findAll()

            if (!comments.length) throw new Error(msg.erroMsg.emptyTable + "Comentarios")

            return comments
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCommentById(commentId) {
        try {

            //validacion de ID
            validator.idValidator(commentId)

            const comment = await Comment.findByPk(commentId)

            if (!comment) throw new Error(msg.erroMsg.notExistId + commentId)

            return comment
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createComment(data) {
        try {
            const { userId, productId, commentBody, score } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "productId", "commentBody", "score"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newComment = {
                commentId: uuid(),
                userId,
                productId,
                commentBody,
                score
            }

            return await Comment.create(newComment)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateCommentData(commentId, data) {
        try {
            const { userId, productId, commentBody, score } = data

            //validacion de ID
            validator.idValidator(commentId)

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "productId", "commentBody", "score"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateComment = {
                userId,
                productId,
                commentBody,
                score
            }

            //query config
            const query = queryComment.newQuery()
            query.addWhere(commentId, "commentId")

            return await Comment.update(updateComment, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteComment(commentId) {
        try {

            //validacion de ID
            validator.idValidator(commentId)

            //query config
            const query = queryComment.newQuery()
            query.addWhere(commentId, "commentId")

            const result = await Comment.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}