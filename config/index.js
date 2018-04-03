module.exports = {
    port: 3000,
    db: {
      name: 'dbname',
      user: 'dbuser',
      password: 'pass1234'
    },
    role: {
      admin: 2,
      normal: 1
    },
    token: {
      secret: 'pass1234',
      expired: '1d'
    },
    errCode: {
      1000: 'USER_NOT_EXISTED',
      1001: 'WRONG_PASSWORD',
      1002: 'PERMISSION_DENIED'
    }
}