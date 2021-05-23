module.exports = {
	outputDir: __dirname + "/../server/admin/", //将文件输出到server/admin
	publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/", //当生产环境，就会使用/admin的publicPath

	devServer: {
		// host:0.0.0.0,
		port: 8080, // 端口号
		// https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器
		hotOnly: true, // 热更新
	},
};
