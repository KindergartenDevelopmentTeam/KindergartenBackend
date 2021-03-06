/**
 * Created by Manjesh on 14-05-2016.
 */

module.exports = {
  sql: {
    database: 'kindergarten',
    username: 'root',
    password: 'secretPassword',
    dialect: 'mysql', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    logging: true,
    timezone: '+05:30',
  },
  seedDB:false,
  seedMongoDB:false,
  seedDBForce:true,
  db:'sql' // mongo,sql if you want to use any SQL change dialect above in sql config
}