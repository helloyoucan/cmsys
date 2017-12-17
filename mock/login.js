/**
 * Created by can on 2017/12/15.
 */
export function login(req, res) {
  const {password, userName} = req.body;
  res.send({
      "ret": true,
      "msg": "登录成功",
      "data": {
        "id": 1,
        "username": userName,
        "status": 1,
        "value": "超级管理员",
        "insert_time": 1513064417000,
        "category_id": "chaojiguanliyuan",
        "insert_man": "admin"
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
