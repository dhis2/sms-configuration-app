const config = {
    type: 'app',
    name: 'sms-configuration',
    title: 'SMS Configuration',
    description: 'Configure SMS gateways and manage SMS messages',
    coreApp: true,
    minDHIS2Version: '2.35',
    id: '441cad0c-395a-4e93-8f10-475602397371',

    entryPoints: {
        app: './src/index.js',
    },
}

module.exports = config
