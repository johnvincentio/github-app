# Error

```
Uncaught ReferenceError: regeneratorRuntime is not defined
```

Problem is caused by use of async/await.

## Solution

[Babel](https://babeljs.io/docs/en/babel-plugin-transform-runtime/)

Need to make changes to babel.

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

`.babelrc`

```
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": [
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

## Usage

`../../apis/jsonPlaceHolder.js`

```
import axios from 'axios';

export default axios.create({
	baseURL: 'https://my-json-server.typicode.com/johnvincentio/democrud'
});
```

`redux.actions.js`

```
import jsondata from '../../apis/jsonPlaceHolder';

export const fetchWidget = id => async dispatch => {
	const response = await jsondata.get(`./widgets/${id}`);
	dispatch({ type: FETCH_WIDGET, payload: response.data });
};
```

https://github.com/axios/axios
