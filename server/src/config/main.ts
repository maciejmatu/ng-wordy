export = {
    secret: '',
    database: process.env.DATABASE_URL || 'mongodb://user:1234@ds161121.mlab.com:61121/wordy',
    port: process.env.PORT || 3000,
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000'
}