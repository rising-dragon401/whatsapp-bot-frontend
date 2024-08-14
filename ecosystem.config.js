module.exports = {
    apps : [{
        name: "wabot-frontend",
        script: "npm",
        args: "start",
        cwd: "/home/ubuntu/wabot/whatsapp-bot-frontend",
        watch: true,
        env: {
            NODE_ENV: "production",
        }
    }]
};