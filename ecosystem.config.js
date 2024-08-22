module.exports = {
    apps : [{
        name: "wabot-frontend",
        script: "npm",
        args: "start",
        cwd: "/home/ubuntu/wabot/frontend",
        watch: true,
        env: {
            NODE_ENV: "production",
        }
    }]
};