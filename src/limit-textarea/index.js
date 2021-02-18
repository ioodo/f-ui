/**
 */
Component({
  options :{
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    limit: {
      type: Number,
      value: -1
    }
  },
  data : {
    _value: ''
  },
  observers : {
    'value': function (v) {
      this.setValue(v);
    }
  },
  lifetimes: {
    ready: function () {
    }
  },
  created () {
  },
  attached () {
  },
  methods: {
    onInput (e) {
      this.setValue(e.detail.value);
    },
    setValue (v) {
      const { limit } = this.data;
      var data = v;
      if (limit > 0 && data.length > limit) {
        data = data.substring(0, limit);
      }
      this.setData({
        _value: data
      });
    }
  }
})
