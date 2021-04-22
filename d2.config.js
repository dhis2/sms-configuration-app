const config = {
    type: 'app',
    name: 'sms-configuration',
    title: 'SMS Configuration',
    description: 'Configure SMS gateways and manage SMS messages',
    coreApp: true,

    entryPoints: {
        app: './src/index.js',
    },
}

module.exports = config
