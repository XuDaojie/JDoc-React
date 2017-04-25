/**
 * Created by xdj on 2017/4/25.
 */
import jsrsasign from 'jsrsasign';

const jws = jsrsasign.KJUR.jws;

export class TokenUtil {

  decode(token) {
    // 只验证是否能解析
    let isValid = jws.JWS.verifyJWT(token, "jdoc", {alg: ['HS256']});
    return isValid;
  }

  verify(token, withClaim) {
    // 验证 是否能解析、过期时间
    let isValid = jws.JWS.verifyJWT(token, "jdoc", {
      ...withClaim,
      alg: ['HS256'],
      // verifyAt: jws.IntDate.get('20160601000000Z')
    });
    return isValid;
  }

  readHeaderJSON(token) {
    return jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[0]));
  }

  readPayloadJSON(token) {
    let payloadObj = jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[1]));
  }

  create(oPayload) {
    // const oHeader = {alg: "HS256", typ: "JWT"};
    // const oPayload = {sub: "123456789", name: "John Doe", exp: 1420045261, admin: true};
    // const sHeader = JSON.stringify(oHeader);
    // const sPayload = JSON.stringify(oPayload);
    // const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "secret");
    // console.log(sJWT);

    const oHeader = {alg: "HS256", typ: "JWT"};
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "jdoc");
    return sJWT;
  }
}

export default TokenUtil;
