const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = {
    mode: 'development',
    entry: {
        student_dashboard: './src/student_dashboard.js',
        student_create: './src/studentcreate.js',
        faculty_create: './src/faculty_create.js',
        leave_form: './src/leave_form.js',
        emergency_form: './src/emergency_form.js',
        firebase_config: './src/firebase-config.js',
        login: './src/login.js',
        faclogin: './src/faclogin.js',
        facsignup: './src/facsignup.js',
        signup: './src/signup.js',
        adminreqdash: './src/adminreqdash.js',
        facdashboard: './src/facdashboard.js',

    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: [".js"]
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
    
    watch: true
}