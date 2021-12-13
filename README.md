## Import
- Install the library
```
npm install floatkeydictionary --save
```
- Import
```javascript
const FloatKeyDictionary = require('floatkeydictionary');
```

## Create
- Create a empty dictionary
```javascript
const dic = FloatKeyDictionary.Create();
```
- Create with key-value object.Key must be Number.
```javascript
const dic = FloatKeyDictionary.CreateWithData({1: 'anyValue', 1.1: 'anyValue', 5.0: 'anyValue'...});
```

## Getter functions
- getCloseKeyUp(keyNumber)
- getCloseKeyDown(keyNumber)

### Example
```javascript

const dic = FloatKeyDictionary.CreateWithData({1: 'value1', 1.1: 'value1.1', 5.0: 'value5.0'});
const v1 = dic.getCloseKeyUp(1.1);
const v2 = dic.getCloseKeyDown(1.1);
const v3 = dic.getCloseKeyUp(1.2);
const v4 = dic.getCloseKeyDown(1.2);
const v5 = dic.getCloseKeyDown(1);
console.info({v1, v2, v3, v4, v5});
// result ->
// {
// 	v1: 'value1.1',
// 	v2: 'value1.1',
// 	v3: 'value5.0',
// 	v4: 'value1.1',
// 	v5: 'value1'
// }
```

