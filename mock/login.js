/**
 * Created by can on 2017/12/15.
 */
export function login(req, res) {
  const {password, userName} = req.body;
  res.send(
    {
      "ret": true,
      "msg": "登录成功",
      "data": {
        "id": 1,
        "username": userName,
        "categoryName": "测试--超级管理员",
        "lastupdTime": 1513752834000,
        "status": 1,
        "lastupdMan": "admin",
        "insertTime": 1513064417000,
        "categoryId": "chaojiguanliyuan",
        "insertMan": "admin"
      }
    }
  );
  //登陆失败
  /*res.send({
   ret: "false",
   msg: "用户名或密码错误",
   data: null
   })*/
}
export function logout(req, res) {
  res.send(
    {"ret": true, "msg": "注销成功", data: null}
  )
}


export default {
  login,
};
