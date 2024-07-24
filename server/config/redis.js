const Redis = require('ioredis')

const redis = new Redis({
    port: 16632,
    host: 'redis-16632.c302.asia-northeast1-1.gce.redns.redis-cloud.com',
    password: 'NT8hTIbF2FW72eJ7tuOTNAarCDUldnsI'
})

module.exports = redis