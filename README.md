# v_app_sys

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### postcss-pxtorem是一款 postcss 插件，用于将单位转化为 rem
### ps：前提是ui设计的psd图尺寸大小是750*1334，这样我们在iphone6的模拟机上直接使用所标注的尺寸
###  如果ui尺寸是750，里面的内容宽高尺寸需要除以2；
### 例子：https://www.jianshu.com/p/8f9aab666c4a

```
npm i postcss-pxtorem --save-dev
```