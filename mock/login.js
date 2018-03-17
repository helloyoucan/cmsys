/**
 * Created by can on 2017/12/15.
 */
export function login(req, res) {
  console.log(req.query)
  const {username} = req.query;
  let data = {
    "assId": 1,
    "insertTime": 1513064417000,
    "insertMan": "admin",
    "lastupdMan": "admin",
    "lastupdTime": 1516461323000,
    "categoryValue": "超级管理员",
    "id": 1,
    "categoryId": "chaojiguanliyuan",
    "username": username,
    "status": 1
  };
  switch (username) {
    case 'admin':

      data.categoryId = 'chaojiguanliyuan';
      break;
    case 'tuanwei01':
      data.categoryId = 'tuanweiguanliyuan';
      break;
    case 'shelian01':
      data.categoryId = 'shelianguanliyuan';
      break;
    case 'shetuan1':
      data.categoryId = 'shetuanguanliyuan';
      break;
    default :
      res.send({
        ret: "false",
        msg: "用户名或密码错误",
        data: null
      });
      return;
  }
  res.send(
    {
      "ret": true,
      "msg": "登录成功",
      "data": data
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
