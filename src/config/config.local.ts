export const appConfig = {
  hadron: {
    version: 'local',
    port: 7002,
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '12345678',
      database: 'tmk',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
    tokenGRPC: {},
    jwtConfig: {
      secret: 'nHnsBrgeUoRiuE5UyK9yDYHED^!DW@RqUyK9yDYHED^!DW@Rq',
      signOptions: {
        expiresIn: '1800s',
      },
    },
    auth: {
      salt:
        'b2Tf3C70XuYcF15f1wY62N5f2Ta1Dpnoe7j6r8yrrYKEb5F14bn0bZ0AhQ66wPpuBE3OHV11RKKb388Dv5X6567ALr7kfwBvVMN2bczK9BSFbM06hbs7kPqa373JEfEM',
    },
    upload: {
      basePath: '/Users/charles/Desktop/images',
    },
    log4js: {
      appenders: {
        console: {
          type: 'console',
        },
        access: {
          type: 'dateFile',
          filename: '/Users/charles/Desktop/hadron-logs/access/access.log',
          alwaysIncludePattern: true,
          pattern: 'yyyyMMdd',
          daysToKeep: 60,
          numBackups: 3,
          category: 'http',
          keepFileExt: true,
        },
        app: {
          type: 'dateFile',
          filename: '/Users/charles/Desktop/hadron-logs/app-out/app.log',
          alwaysIncludePattern: true,
          pattern: 'yyyyMMdd',
          daysToKeep: 60,
          numBackups: 3,
          keepFileExt: true,
        },
        errorFile: {
          type: 'dateFile',
          filename: '/Users/charles/Desktop/hadron-logs/error/error.log',
          alwaysIncludePattern: true,
          pattern: 'yyyyMMdd',
          daysToKeep: 60,
          numBackups: 3,
          keepFileExt: true,
        },
        errors: {
          type: 'logLevelFilter',
          level: 'ERROR',
          appender: 'errorFile',
        },
      },
      categories: {
        default: {
          appenders: ['console', 'app', 'errors'],
          level: 'DEBUG',
        },
        info: {
          appenders: ['console', 'app', 'errors'],
          level: 'info',
        },
        access: {
          appenders: ['console', 'app', 'errors'],
          level: 'info',
        },
        http: {
          appenders: ['console', 'access'],
          level: 'info',
        },
      },
    },
  },
};
