// https://github.com/youzan/vant-weapp/blob/dev/lib/dialog/dialog.js

'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });

// var queue = [];
var defaultOptions = {
  selector: '#f-dialog'
}
var currentOptions = __assign({}, defaultOptions);
function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

var Dialog = function (options) {
  options = __assign(__assign({}, currentOptions), options);
  return new Promise((resolve, reject) => {
    var context = options.context || getContext();
    var dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;

    if (!dialog) {
      reject(this)
      return;
    }
    dialog.setData(
      __assign(
        {
          callback: function (action, instance) {
            action === 'ok' ? resolve(instance) : reject(instance);
          },
        },
        options
      )
    );
    wx.nextTick(function () {
      dialog.setData({ show: true });
    });
    // queue.push(dialog)
  })
}
Dialog.alert = function (options) {
  return Dialog(options);
};
Dialog.confirm = function (options) {
  return Dialog(__assign({ showCancelButton: true }, options));
};
exports.default = Dialog;