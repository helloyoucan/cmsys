export function login(req, res) {
  /* res.json({
   userName: 'admin',
   password: '123456',
   name: '小白',
   });*/
  const {password, userName, type} = req.body;
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
  )
}
export function logout(req, res) {
  /* res.json({
   userName: 'admin',
   password: '123456',
   name: '小白',
   });*/
  res.send(
    {"ret": true, "msg": "注销成功", data: null}
  )
}


export default {
  login,
};
