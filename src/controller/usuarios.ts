import { Request, Response } from "express";
import Usuario from "../models/Usuario";

export const getUsuarios = async (req: Request,res: Response) => {

    const usuarios = await Usuario.findAll({where:{estado:true}}) 
    res.json({
        ruta:'getUsuarios',
        usuarios
    })

}

export const login = async (req: Request,res: Response) => {
    
    const {email,clave} = req.body
    
    const usuario = await Usuario.findOne({where:{Email:email,clave:clave}}) 
    
    res.json({
        msg: usuario !== null ? 'login' : 'credenciales incorrectas',
        email,
        usuario,
        access: usuario !== null 
    })
    
}
export const getUsuario = async (req: Request,res: Response) => {
    
    const {id} = req.params
    const usuario = await Usuario.findByPk(id)  
    
    res.json({
        msg:usuario !== null ?'getUsuario':'El usuario no existe',
        id,
        usuario
    })
    
}

export const postUsuario = async (req: Request,res: Response) => {
    
    let {body} = req
    
    
    try {

        const existeEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        })

        if (existeEmail) {
            return res.status(400).json({msg:'Error, Ya existe un usuario con el correo ' + body.email})
        }

        const usuario = Usuario.build(body)
        await usuario.save()
        

    } catch (error) {
        console.log(error);

        res.status(500)
        
        body = null
    } 
    
    res.json({
        msg: body == null ?'Error, No se ha podido insertar el usuario':'Usuario insertado con exito',
        body
    })
    
}

export const putUsuario = async (req: Request,res: Response) => {
    
    const {id} = req.params
    const {body} = req

    try {

        
        const usuario = await Usuario.findByPk(id)
        
        if (!usuario){
            return res.status(404).json({msg:'No existe un usuario con el id: ' + id})
        }
        
        usuario.update(body)


    } catch (error) {
        console.log('Error',error);
        res.status(400).json({msg:'No se ha podido actualizar el usuario'})
    }
    
    res.json({
        msg:'Usuario actualizado',
        id,
        body
    })
    
}
export const deleteUsuario = async (req: Request,res: Response) => {
    
    const {id} = req.params

   
        

    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
        return res.status(404).json({
            msg:'No existe un usuario con el id ' + id
        })
    }

    await usuario.update({estado:false})

    
    res.json({
        msg:'Usuario Eliminado',
        id
    })
    
}