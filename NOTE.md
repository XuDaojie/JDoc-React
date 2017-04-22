
=====

- 利用create-react-app创建react项目<br>
(React：创建一个 React 项目的最小配置)[https://ninghao.net/blog/4507]
- React入门
http://www.ruanyifeng.com/blog/2015/03/react.html

- [Google HTML/CSS代码风格指南](http://iischajn.github.io/trans/htmlcss-guide/#Indentation)

- React 15.0.2 "Unknown props onTouchTap" warnings <br>
https://github.com/callemall/material-ui/issues/5208

- Material UI GridTile没有onTouchTap<br>
https://github.com/callemall/material-ui/issues/2413

- JWT<br>
http://blog.rainy.im/2015/06/10/react-jwt-pretty-good-practice/<br>
http://blog.leapoahead.com/2015/09/06/understanding-jwt/<br>
https://jwt.io/<br>
java https://github.com/jwtk/jjwt<br>
js https://github.com/kjur/jsrsasign/wiki<br>

// 校验
``` javascript
import jsrsasign from 'jsrsasign';

// 校验
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjE0MjAwNDUyNjEsImFkbWluIjp0cnVlfQ.Uyn5F42wOMwgkzU15h2BVdcBtkmHfHfp_IYr2k3OCIM";
const jws = jsrsasign.KJUR.jws;
// 只验证是否能解析
var isValid = jws.JWS.verifyJWT(token, "secret", {alg: ['HS256']});
// 验证 是否能解析、过期时间
isValid = jws.JWS.verifyJWT(token, "secret", {alg: ['HS256'], verifyAt: jws.IntDate.get('20160601000000Z')});
console.log(isValid);
// 获取数据
var headerObj = jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[0]));
var payloadObj = jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[1]));
console.log(headerObj);

// 生成
const oHeader = {alg: "HS256", typ: "JWT"};
const oPayload = {sub: "123456789", name: "John Doe", exp: 1420045261, admin: true};
const sHeader = JSON.stringify(oHeader);
const sPayload = JSON.stringify(oPayload);
const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "secret");
console.log(sJWT);
```

- react怎么动态渲染一个div内的html
https://segmentfault.com/q/1010000002961788

- React 组件之间交流 
https://segmentfault.com/a/1190000004044592

- Flex 布局教程：实例篇
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html