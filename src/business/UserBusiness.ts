import UserDatabase from "../data/UserDatabase";
import { CustomErrors } from "../errors/CustomErrors";
import { CreateUserInput, User, UserOutput, USER_ROLES } from "../model/User";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import idGenerator from "../services/idGenerator";

class UserBusiness {
    public async signup(
        input:CreateUserInput
    ):Promise<UserOutput> {
        try {
            if(!input.name || !input.email || !input.password){
                throw new CustomErrors(422, "Missing parameters")
            }

            const isExistingUser:User | null = await UserDatabase.getUserByEmail(input.email)
            if(isExistingUser){
                throw new CustomErrors(409, "Email already in use")
            }

            const id:string = idGenerator.generateId()
            const cypherPassword:string = await hashManager.hash(input.password)
            const newUser:User = new User(
                id,
                input.name,
                input.email,
                cypherPassword,
                input.role
            )

            await UserDatabase.signup(newUser)

            const output:UserOutput = {
                token: authenticator.generateToken({id})
            }

            return output

        } catch (error) {
            throw new CustomErrors(400, error.sqlMessage || error.message);
        }
    }
}

export default new UserBusiness()
