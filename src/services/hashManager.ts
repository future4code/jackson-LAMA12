import * as bcr from 'bcryptjs'

class HashManager{
    public hash = async (plainText:string):Promise<string> => {
        const cost = Number(process.env.BCRYPT_COST)
        const salt = await bcr.genSalt(cost)
        return bcr.hash(plainText, salt)
    }

    public compare = async (plainText:string, cypherText:string):Promise<boolean> => {
        return bcr.compare(plainText, cypherText)
    }
}

export default new HashManager()
