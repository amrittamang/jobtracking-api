### INSTALL TYPESCRIPT GLOBALLY

```sh
npm install -g typescript
```

### CHECK VERSION OF TYPESCRIPT

```sh
tsc -v
```

### TEST TYPESCRIPT

```sh
tsc <file name>
```

### INSTALL ts-node

```sh
npm install -g ts-node
```

### Allows typescript compiled code into JavaScript

### INSTALL TYPES

```sh
npm i --save-dev @types/body-parser @types/express @types/node @types/mongoose
```

### CREATE TSCONFIG.JSON FILE

```js
{
    "compilerOptions": {
        "outDir": "./dist",
        "moduleResolution": "node",
        "module": "commonjs",
        "allowJs": true,
        "target": "es6"
    },
    "include": [
        "./src/**/*",
        "index.ts"
    ]
}
```

# Create dist directory in the root directory

## ++++++++++++++++++++++++++++++++++++++++++++++++

### AUTOMATE COMPILE AND RUN THE APPLICATION

#### package.json

```js
"scripts": {
    "build": "tsc --w",
    "start:" "tsc && ts-node ./dist/index.js"
}
```

## Start application

```sh
npm run build
```
