import { Request, Response } from 'express'
import UserBusiness from '../business/UserBusiness'
import { CreateUserInput, UserOutput } from '../model/User'

class UserController{
    public async signup(
        req:Request,
        res:Response
    ) {
        try {
            const input:CreateUserInput = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const token:UserOutput = await UserBusiness.signup(input)

            res
            .status(200)
            .send({
                message: 'user created',
                token
            })
        } catch (error) {
            res
            .status(error.statusCode)
            .send({
                message: error.message || error.sqlMessage
            })
        }
    }
}

export default new UserController()
