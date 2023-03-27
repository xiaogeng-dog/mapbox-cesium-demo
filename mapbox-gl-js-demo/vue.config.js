const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const cesiumSource = "./node_modules/cesium/Source";

const cesiumWorkers = "../Build/Cesium/Workers";

function resolve(dir) {
  return path.join(__dirname, dir);
}

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  // 打包后运行环境目录
  publicPath: process.env.NODE_ENV === "production" ? "/projectName/" : "/",

  transpileDependencies: true,
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  filenameHashing: true, // 文件hash
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  devServer: {
    // port: 3306,
    // open: true,
    // proxy: {
    //   "/api": {
    //     // target: "http://xxx.xxx.xx.xxx:xxxx/", // 开发地址及端口号
    //     // target: "http://xxx.xxx.xx.xxx:xxxx/", // 测试地址
    //     target: "http://xxx.xxx.xx.xxx:xxxx/", // 正式服务器地址
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {},
    //   },
    //   "/LocalDemoApi": {
    //     target: "http://localhost:8080", // 路径指向本地主机地址及端口号
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/LocalDemoApi": "/DemoData", // 路径转发代理
    //     },
    //   },
    // },
  },
  /*
    配置vue-cli3项目，可以说是all in vue.config.js的。
    当然，封装、就一定会留个口给用户，去对底层进行自定义操作。
    vue.config.js的配置项中，有两个口，configureWebpack和chainWebpack。
    configureWebpack:
        是调整webpack配置最简单的一种方式，可以新增也可以覆盖cli中的配置。
    可以是一个对象：被 webpack-merge 合并到webpack 的设置中去
    也可以是一个函数：如果你需要基于环境有条件地配置行为，就可以进行一些逻辑处理，可以直接修改或
    新增配置，(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。
    在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
    chainWebpack:
        这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则
    和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件
  */
  configureWebpack: {
    output: {
      sourcePrefix: " ", // 1 让webpack 正确处理多行字符串配置 amd参数
    },
    amd: {
      // 2
      toUrlUndefined: true, // webpack在cesium中能友好的使用require
    },
    resolve: {
      extensions: [".js", ".vue", ".json", "less"],
      alias: {
        cesium: path.resolve(__dirname, cesiumSource), // 3 定义别名cesium后，cesium代表了cesiumSource的文件路径
      },

      fallback: {
        // path: false,
        // fs: false,
        // net: false,
        // tls: false,
      },
    },
    plugins: [
      // // 4
      // new CopyWebpackPlugin([
      //   { from: path.join(cesiumSource, "Workers"), to: "Workers" },
      // ]),
      // new CopyWebpackPlugin([
      //   { from: path.join(cesiumSource, "Assets"), to: "Assets" },
      // ]),
      // new CopyWebpackPlugin([
      //   { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      // ]),
      // new CopyWebpackPlugin([
      //   {
      //     from: path.join(cesiumSource, "ThirdParty/Workers"),
      //     to: "ThirdParty/Workers",
      //   },
      // ]),
      // new webpack.DefinePlugin({
      //   // 5
      //   CESIUM_BASE_URL: JSON.stringify("./"),
      // }),
      new NodePolyfillPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, cesiumWorkers),
            // to: path.join(config.output.path, cesiumSource, "Workers"),
            to: "Workers",
          },
          {
            from: path.join(cesiumSource, "Assets"),
            // to: path.join(config.output.path, cesiumSource, "Assets"),
            to: "Assets",
          },
          {
            from: path.join(cesiumSource, "ThirdParty/Workers"),
            // to: path.join(config.output.path, cesiumSource, "ThirdParty"),
            to: "ThirdParty/Workers",
          },
          {
            from: path.join(cesiumSource, "Widgets"),
            // to: path.join(config.output.path, cesiumSource, "Widgets"),
            to: "Widgets",
          },
        ],
      }),
      new webpack.DefinePlugin({
        // 5
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"], // 移除console
            },
          },
        }),
      ],
    },
    module: {
      //   unknownContextRegExp: /^.\/.*$/,
      //   unknownContextCritical: false // 6 不让webpack打印载入特定库时候的警告
      //在打包的时候如果碰到了css后缀的文件就用css-loader组件加载(可以查看组件的详细介绍,比如压缩css选项)
      //在打包的时候如果碰到less后准的文件就用less-loader组件加载
      rules: [
        {
          test: /\.geojson$/,
          loader: "json-loader",
        },
      ],
    },
  },
  chainWebpack: (config) => {
    // 配置import 和 require 等路径别名,webpack中是通过 resolve.alias 来实现此功能的,通过set方法添加修改想要的alias 配置
    config.resolve.alias
      .set("@", resolve("src"))
      .set("spatial", resolve("public/SpatialData"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },

  // 修改浏览中的标签logo
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },

  // 多页面方式
  // pages: {
  //   index: {
  //     entry: './src/main',
  //     template: './public/index.html',
  //     fileName: 'index.html',
  //   },
  //   weui: {
  //     entry: './src/wmain',
  //     template: './public/windex.html',
  //   }
  // },
  css: {
    loaderOptions: {
      sass: {
        // implementation: require('sass'), // This line must in sass option
        // prependData: `@import "@/assets/scss/mixin.scss";` //引入全局变量
      },
    },
  },
});
