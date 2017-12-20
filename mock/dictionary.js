export function queryCategory(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "获取字典数据成功",
      "data": [
        {
          "id": "chaojiguanliyuan",
          "type": "USER_CATEGORY",
          "value": "超级管理员",
          "insertDate": 1513061391000
        },
        {
          "id": "tuanweiguanliyuan",
          "type": "USER_CATEGORY",
          "value": "团委管理员",
          "insertDate": 1513061420000
        },
        {
          "id": "shelianguanliyuan",
          "type": "USER_CATEGORY",
          "value": "社联管理员",
          "insertDate": 1513061444000
        },
        {
          "id": "shetuanguanliyuan",
          "type": "USER_CATEGORY",
          "value": "社团管理员",
          "insertDate": 1513061465000
        }
      ]
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );
   //错误返回信息包括：用户权限不足，请重新登录、用户名已存在、待更新的用户不存在、创建社团管理员，需要关联社团等
   */
}
export default {
  queryCategory
};
