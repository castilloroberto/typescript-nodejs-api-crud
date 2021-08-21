import express,{Application} from "express";
import userRoutes from "../routes/usuarios";
import cors from 'cors'
import db from "../db/connection";

class Server {

    private app: Application
    private port: string
    private apiPaths = {
        usuarios:'/api/usuarios'
    }

    constructor(){

        this.app = express()
        this.port = process.env.PORT || '8000'
        
        //conectar base de datos 
        this.conectarDB()
        
        //midlewares
        this.middlwares()

        //definir rutas
        this.routes()

    }

    //conectar base de datos 
    async conectarDB(){

        try {

            await db.authenticate();
            console.log('base de datos conectada');
            


        } catch (error) {
            throw new Error(`Error: ${error}`);
            
        }

    }


    middlwares(){
        //antes de las rutas
        
        // cors
        this.app.use(cors())

        //lectura del body 
        this.app.use( express.json() )

        //archivos publicos
        this.app.use( express.static('public') )

    }

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
    }
    
    listen(){
        this.app.listen( this.port, () => {

            console.log(`Server running on port ${this.port}...`)
        
        })
    }

}

export default Server