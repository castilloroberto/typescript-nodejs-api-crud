import { Sequelize } from "sequelize";


const db = new Sequelize('facebookdb','root','admin',{
    host:'localhost',
    dialect:'mariadb',
    // logging:false
})

export default db