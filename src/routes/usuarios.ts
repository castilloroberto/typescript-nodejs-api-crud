import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, login, postUsuario, putUsuario } from "../controller/usuarios";


const router = Router()


router.get('/',getUsuarios)

router.get('/:id',getUsuario)

router.post('/login',login)

router.post('/',postUsuario)

router.put('/:id',putUsuario)

router.delete('/:id',deleteUsuario)



export default router