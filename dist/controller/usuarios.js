"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.login = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findAll({ where: { estado: true } });
    res.json({
        ruta: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, clave } = req.body;
    const usuario = yield Usuario_1.default.findOne({ where: { Email: email, clave: clave } });
    res.json({
        msg: usuario !== null ? 'login' : 'credenciales incorrectas',
        email,
        usuario,
        access: usuario !== null
    });
});
exports.login = login;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario_1.default.findByPk(id);
    res.json({
        msg: usuario !== null ? 'getUsuario' : 'El usuario no existe',
        id,
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    try {
        const existeEmail = yield Usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({ msg: 'Error, Ya existe un usuario con el correo ' + body.email });
        }
        const usuario = Usuario_1.default.build(body);
        yield usuario.save();
    }
    catch (error) {
        console.log(error);
        res.status(500);
        body = null;
    }
    res.json({
        msg: body == null ? 'Error, No se ha podido insertar el usuario' : 'Usuario insertado con exito',
        body
    });
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'No existe un usuario con el id: ' + id });
        }
        usuario.update(body);
    }
    catch (error) {
        console.log('Error', error);
        res.status(400).json({ msg: 'No se ha podido actualizar el usuario' });
    }
    res.json({
        msg: 'Usuario actualizado',
        id,
        body
    });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ estado: false });
    res.json({
        msg: 'Usuario Eliminado',
        id
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map