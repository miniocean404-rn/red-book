module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // babel-plugin-module-resolver 配置路径别名
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': ['./src'],
        },
      },
    ],
  ],
}
