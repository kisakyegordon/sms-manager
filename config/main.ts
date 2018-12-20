const config = {

    // Port
    port: process.env.PORT || 3000,

    // database
    db: 'mongodb://localhost/sms',

    // test
    test_env: 'test',
    test_db: 'sms-test',
    test_port: '3001'
}

export default config;