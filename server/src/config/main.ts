let config: {
    secret: string,
    database: string,
    port: number,
    serverHost: string,
    clientURL: string
}

export default config = {
    secret: '',
    database: process.env.DATABASE_URL || 'mongodb://user:1234@ds161121.mlab.com:61121/wordy',
    port: process.env.PORT || 9001,
    serverHost: process.env.HOST || 'http://localhost',
    clientURL: process.env.CLIENT_URL || 'http://localhost:9000'
}