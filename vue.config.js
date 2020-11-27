module.exports = {
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "0.0.0.0",
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.168.105:9092/', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}