!(function ($, window, document, undefined) {

  var Plugin = function (elem, options) {
    this.$elem = elem;
    this.$btn = $('#submit');
    this.$cont = $('.cont');
    this.$oMask = $('#mask_shadow');
    // this.$oTitle = this.$elem.find('.title');
    // this.$title_text = this.$oTitle.find('p');
    // this.$close = this.$oTitle.find('span');

    this.b_stop = true; // 防止重复点击
    this.page_w = $(window).width();
    this.page_h = $(window).height();

    this.opts = $.extend({}, options);
  };

  Plugin.prototype = {
    inital: function () { // 初始化
      var self = this;

      // this.$title_text.text(this.$title_text.attr('data-title'));
      this.$elem.css({left: (this.page_w - this.$elem.width()) / 2});
      this.$elem.css({height: $(window).height() / 1.5});
      this.$cont.css({height: $(window).height() / 1.75});

      this.$elem.on('click', function () {
        return false;
      });

      this.$btn.on('click', function () {
        self.popbox();

        self.b_stop = false;

        return false;
      });

      $(document.body).on('click', function () {
        self.closePopbox();
      });

    },

    popbox: function () { // 显示弹窗
      var self = this;
      
	  // 于屏幕居中
      body_width = parseInt($(window).width());
      body_height = parseInt($(window).height());
      block_width = parseInt(self.$elem.width());
      block_height = parseInt(self.$elem.height());

      left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
      if (body_width < block_width) {
            left_position = 0 + $(window).scrollLeft();
      };

      top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
      if (body_height < block_height) {
            top_position = 0 + $(window).scrollTop();
      };

      this.$oMask.show().animate({opacity: 1});;
      this.$elem.show().animate({opacity: 1, top: top_position}, function () {
        self.b_stop = true;
      });
    },

    closePopbox: function () { // 关闭弹窗
      var self = this;

      if (this.b_stop) {
        this.$oMask.animate({opacity: 0}, function () {
          $(this).hide();
        });;
        this.$elem.animate({opacity: 0, top: 150}, function () {
          $(this).hide();
        });
      }
    },

    constructor: Plugin
  };

  $.fn.popup = function (options) {
    var plugin = new Plugin(this, options);

    return plugin.inital();
  };
  

})(window.jQuery, window, document);

















