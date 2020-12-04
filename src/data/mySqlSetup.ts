import BaseDatabase from './BaseDatabase'

class CreateTables extends BaseDatabase {
    
    public async createBandsTable():Promise<void> {
        try {
            await BaseDatabase.connection.schema
            .hasTable('bands')
            .then(function(exists:any){
                if(!exists){
                    return BaseDatabase.connection.schema
                    .createTable('bands', (table:any) => {
                        table.string('id').primary()
                        table.string('name').notNullable().unique()
                        table.string('music_genre').notNullable()
                        table.string('responsible').notNullable().unique()
                    })
                }
            })
        } catch (error) {
            throw new Error(error.sqlMessage);
            
        }
    }

    public async createShowsTable():Promise<void> {
        try {
            await BaseDatabase.connection.schema.hasTable('shows').then(function(exists:any){
                if(!exists){
                    return BaseDatabase.connection.schema.createTable('shows', (table:any) => {
                        table.string('id').primary()
                        table.string('week_day').notNullable()
                        table.integer('start_time').notNullable()
                        table.integer('end_time').notNullable()
                        table.string('band_id').notNullable()
                        table.foreign('band_id').references('bands')
                    })
                }
            })
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
    }

    public async createUsersTable():Promise<void> {
        try {
            await BaseDatabase.connection.schema.hasTable('users').then(function(exists:any){
                if(!exists){
                    return BaseDatabase.connection.schema.createTable('users', (table:any) => {
                        table.string('id').primary()
                        table.string('name').notNullable()
                        table.string('email').notNullable().unique()
                        table.string('password').notNullable()
                        table.string('role').notNullable().defaultTo('NORMAL')
                    })
                }
            })
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
    }

}

const createTables = new CreateTables()
const createTablesAtDB = async () => {
    try {
        await createTables.createBandsTable()
        console.log('Criando tabela de bandas...')
        createTables.createShowsTable()
        console.log('Criando tabela de shows...')
        createTables.createUsersTable()
        console.log('Criando tabela de usuários...')
        console.log('Concluído.')
    } catch (error) {
        console.log(error)
    }
}

createTablesAtDB()
