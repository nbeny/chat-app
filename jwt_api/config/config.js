require('dotenv').config();//instatiate environment variables


let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'development';
CONFIG.port         = process.env.PORT  || '4000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mongo';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '27017';
CONFIG.db_name      = process.env.DB_NAME       || 'Matchact';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'qwerqwer';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_encryption_test';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.email_superuser = process.env.EMAIL_SUPERUSER || 'alesio.dev@laposte.net';
CONFIG.password_superuser = process.env.PASSWORD_SUPERUSER || 'Azer1234567890';

module.exports = CONFIG;
