import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";

class UserDatabase extends BaseDatabase {
    private static tableName:string = 'users'
    
    public async signup(
        user:User
    ):Promise<void> {
        try {
            await BaseDatabase
            .connection(UserDatabase.tableName)
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })
        } catch (error) {
            throw new Error("Database error: " + error.sqlMessage)
        }
    }

    public async getUserByEmail(
        email:string
    ):Promise<User | null> {
        try {
            const result:any[] = await BaseDatabase
            .connection(UserDatabase.tableName)
            .select('*')
            .where({email})

            if(!result[0]){
                return null
            }

            return new User(
                result[0].id,
                result[0].name,
                result[0].email,
                result[0].password,
                result[0].role
            )
        } catch (error) {
            throw new Error("Database error: " + error.sqlMessage)
        }
    }
}

export default new UserDatabase()
