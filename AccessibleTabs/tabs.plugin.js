(function($){  
	$.fn.atabs = function(options) {
		var o = { defaultTab:1, mode:"tabs" }
		$.extend(o,options);
		var methods = {
			click: function ($me,$parent,e) {
				e.preventDefault();
				var href = $me.attr('href');
				if (($me.parents('.trigger').hasClass('active') || $me.parents('.trigger').hasClass('disabled')) && o.mode === "tabs") {return;}
				if ($me.parents('.trigger').hasClass('disabled') && o.mode === "accordion") {return;}
				$me.parents('.trigger').toggleClass("active");
				
				if (o.mode === "tabs") {
					$parent.find('.active').removeClass('active'); 
					$me.parents('.trigger').addClass("active"); 
					$parent.find('.open').addClass('hidden').removeClass('open'); 
					$(href).removeClass('hidden').addClass('open');
				}
				if (o.mode === "accordion") { $(href).toggleClass('hidden'); }
			}
		};

		return this.each(
			function () {
				var $this = $(this);
				o.defaultTab = o.defaultTab-1;
				$this.find('.trigger').find('a').unbind('click').bind('click', function (e) { methods.click($(this),$this,e) } );
				$this.find('.target').each(
					function (i) {
						$(this).find('.topLink').addClass('hidden');
						if (i !== o.defaultTab) { $(this).addClass('hidden'); }
						else if (i === o.defaultTab) {
							$(this).addClass('open');
							$this.find('.trigger').eq(o.defaultTab).addClass('active');
						}
					}
				);
			}
		);
	};
})(jQuery);