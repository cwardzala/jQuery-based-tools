(function($){  
	$.fn.navigation = function(options) {
		var o = { useIframe:false, timeout:100 };
		$.extend(o,options);
		var methods = {
			to: null,
			over: function () {
				var t = $(this);
				methods.to = setTimeout(function(){
					t.addClass('hover');
					if (t.find('.tier1') !== undefined && o.useIframe === true) { methods.IframeShim.destroy(t); }
				},o.timeout);
			},
			out: function () {
				var t = $(this);
				t.removeClass('hover');
				if (t.find('.tier1') !== undefined && o.useIframe === true) { methods.IframeShim.output(t); }
				clearTimeout(methods.to);
				methods.to = null;
			},
			IframeShim: {
			    output: function(elm) {
			        if (($.browser.msie && parseInt($.browser.version) === 6) && o.useIframe === true) {
			            var t = elm.find('.tier1'),
							html = '<iframe class="shim" frameborder="0" src="javascript:\'\';" style="display:block;position:absolute;top:'+t.css('top')+';bottom:'+t.css('bottom')+';left:'+t.css('left')+';right:'+t.css("right")+';width:'+t.outerWidth()+'px;height:'+t.outerHeight()+'px;z-index:-1;"></iframe>';
			            t.before(html);
			        }
			    },
			    destroy: function(elm) { $(elm).find("iframe.shim").remove(); }
			}
		};
		return this.find('li').each(function () { $(this).hover(methods.over,methods.out); });
	};
})(jQuery);