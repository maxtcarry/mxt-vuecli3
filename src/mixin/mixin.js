/**
 * @Date:   2019-08-27T10:21:03+08:00
 * @Last modified time: 2019-09-11T16:06:04+08:00 
 */
 // BrowserInfo = {
 //   isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
 //   isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
 //   isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
 //   isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
 //   isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
 //   isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
 // }


const mixin= {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
module.exports = mixin;
