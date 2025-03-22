
export const setConfig = (weixin, signature, timestamp) => {
  weixin.config({
    debug: true,
    appId: "wxacd36442f62ad2b9",
    timestamp: timestamp,
    nonceStr: "zxy123456com",
    signature: signature,
    jsApiList: ["updateTimelineShareData", 'onMenuShareAppMessage', 'updateAppMessageShareData',"scanQRCode"]
  });
  weixin.ready(() => {
    weixin.checkJsApi({
      jsApiList: ['updateTimelineShareData', 'onMenuShareAppMessage', 'updateAppMessageShareData',"scanQRCode"], // 需要检测的 JS 接口列表，所有 JS 接口列表见附录2,
      success: function () {
        // 以键值对的形式返回，可用的 api 值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        weixin.updateAppMessageShareData({
          title: '恭喜面试通过', // 分享标题
          desc: '腾讯公司欢迎您加入', // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
          imgUrl: 'https://ts1.cn.mm.bing.net/th/id/R-C.5e5afaaedde7ae8150ebeba4d0ad75a5?rik=VkV6BvnSDQMC8A&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f40015%2f1193.jpg_wh1200.jpg&ehk=SmC65R9xzBJSvzKqgnv9dsTowvxa13Bz8wuOb1pFJbQ%3d&risl=&pid=ImgRaw&r=0', // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功');
          }
        })
      }
    });

  })


}
