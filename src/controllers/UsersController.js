
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class UsersController {
    async create(req, res) {
        const {name, email} = req.body;
        if (!name || !email) {
            throw new AppError("preencha todos os dados");
        }

        const userExist = await knex("users").where({ email }).first();
        if (!userExist) {
           await knex("users").insert({
            name,
            email
            });
            return res.send("usuário criado"); 
        } else {
            throw new AppError("Este e-mail já está em uso.");
        }

        
    }

    async show(req, res) {
        const { id } = req.params;
        const user = await knex("users").where({id}).first();
        if(!user) {
            throw new AppError(`o usuário de id: ${id}não existe`);
        }
        return res.json(user);
    }

    async index(req, res) {
        const users = await knex("users");
        res.json(users);
    }

    async delete(req, res) {
        const { id } = req.params;
        await knex("users").where({ id }).delete();
        return res.json();
    }

    async update(req, res) {
        const { id } = req.params;
        const { email } = req.body;

        await knex("users").where({ id }).update({email: email});
        return res.json();
    }
}

module.exports = UsersController;