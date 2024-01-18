module.exports = {
    apps : [
        {
          name: "hotdi-market-server",
          script: "./src/index.js",
          env: {
            "NODE_ENV": "production",
          }
        }
    ]
  }