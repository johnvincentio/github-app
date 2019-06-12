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

https://www.robinwieruch.de/react-fetching-data/

https://developer.github.com/v3/#authentication

# Github API

Information on the GitHub API is available here: [GitHub API](https://t.yesware.com/tt/f7d714dfe952964fb8a66c04148aec7ba5b2d297/0f25765a945028f6e44dee5595cea2ee/7b0004ac896f68f234bfc27eff266c95/developer.github.com/v3/)

# Github Token

* [Github](https://github.com/)
* Settings
* Developer Settings
* Personal Access Tokens
* Generate new token
* Provide your github password
* Note
	- Give it a meaningful name
* Leave All scopes <strong>unchecked</strong>
* Generate token
