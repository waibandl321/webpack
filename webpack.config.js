const PATH = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// StylelintWebpackPluginをrequire
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: "source-map",
  entry: './assets/main.js',
  output: {
    path: PATH.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        // 対象ファイルを指定 => scss
        test: /\.scss$/i,
        // 使用するローダーを指定 : ローダーは定義した下から順番に読み込んでいくイメージ
        use: [
          {
            // 別ファイルにCSSとして出力
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // CSSを解析
            loader: 'css-loader',
          },
          {
            // PostCSSのプラグインであるAutoprefixerを、postcss-loaderを通して適応させる
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: [
                  // ベンダープレフィックスの設定はjsonファイルに記述
                  require("autoprefixer")({
                    grid: true,
                  }),
                  //メディアクエリを一つにまとめる
                  require("postcss-sort-media-queries") ({
                    sort: 'desktop-first',
                  })
                ]
              }
              
            }
          },
          {
            // Sassを解析
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ]
      },
    ]
  },
  plugins: [
    // CSSを別ファイルに出力するためのプラグイン【MiniCssExtractPlugin】
    new MiniCssExtractPlugin({
      //出力先のdist直下を指定
      filename: 'css/style.css',
      ignoreOrder: true,
    }),
    // スタイルを自動で修正するプラアグイン => .stylelintrcファイルにオプションを記述
    new StylelintWebpackPlugin({
      fix: true,
    }),
  ]
};
