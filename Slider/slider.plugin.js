(function($){
	$.fn.Slider = function (o) {
		o = $.extend( { perpage:1, perSlide:null, multipage:false, rows:1, navigation:false, fancy:false }, o );
		var Values = function ($slider) {
			this.page = 0;
			this.itemcount	= $(".slider-item",$slider).length;
			this.pagecount	= Math.ceil(this.itemcount/o.perpage);
			this.itemwidth	= $(".slider-item",$slider).outerWidth();
			this.wrapwidth	= Math.ceil(this.itemwidth*this.itemcount);
			this.pagesize	= Math.ceil((o.perpage/o.rows)*this.itemwidth);
			this.slideSize	= this.pagesize;
			this.lastpage	= this.pagecount-1;
			this.$track		= $(".slider-track",$slider);
			this.$wrapper	= $('.slider-wrapper',$slider);
			this.$sliderNav = $(".slider-nav", $slider);
			this.$next		= $(".next",$slider);
			this.$prev		= $(".prev",$slider);
			this.$ul		= $('ul',this.$sliderNav);
			this.$li		= $("li",this.$ul);
			this.navwidth	= 0;
		};

		this.doit = function () {
			var val = new Values(this),
			methods = {
				next: function () {
					
					if (val.page === 0 || val.page !== val.lastpage) {
						val.page = val.page+1;
						methods.Slide(val.page);
						if (o.navigation === true) { Navigation.Update(val.page); }
					} else if (val.page === val.lastpage) {
						methods.Slide(0);
						if (o.navigation === true) { Navigation.Update(val.page); } 
					}
				},
				prev: function () {
					if (val.page !== 0 || val.page === val.lastpage) {
						val.page = val.page-1;
						methods.Slide(val.page);
						if (o.navigation === true) { Navigation.Update(val.page); }
					} else if (val.page === 0) {
						methods.Slide(val.lastpage);
						if (o.navigation === true) { Navigation.Update(val.page); }
					}
				},
				Slide: function(index){
					val.$track.animate({marginLeft:"-"+val.slideSize*index});
					val.page = index;
					Navigation.Update(index);
				},
				Click: function(index){ methods.Slide(index); }
			},
			Navigation = {
				Update: function(index){
					val.$sliderNav.find('li.active').removeClass('active');
					$('li',val.$sliderNav).eq(index).addClass("active");
				},
				Setup: function(){
					for (var si=0; si<val.pagecount; ++si){
						$("ul", val.$sliderNav).append("<li>"+(si+1)+"</li>");
					}
					Navigation.Update(val.page);
					val.$sliderNav.find('li').each(function (i) {
						var marginR = parseInt($(this).css("margin-right")),
							marginL = parseInt($(this).css("margin-left")),
							width = $(this).outerWidth();
						$(this).click(function (e) {e.preventDefault(); methods.Slide(i); });
						val.navwidth = val.navwidth + (marginR+marginL+width);
					});
					val.$sliderNav.width(val.navwidth);
				}
			};
			
			if (o.multipage === true) {
				val.wrapwidth = val.itemwidth*Math.ceil(val.itemcount/o.rows);
				val.pagesize = Math.ceil(o.perpage/o.rows)*val.itemwidth;
			}

			if (parseInt(o.perSlide,10)) {
				val.slideSize = Math.ceil(o.perSlide*val.itemwidth);
				val.pagecount = Math.ceil(o.perpage/o.rows)/o.perSlide;
				val.lastpage = val.pagecount+1;
			}
			
			if (o.navigation === true) { Navigation.Setup(); }
			
			val.$track.width(val.wrapwidth);
			val.$wrapper.width(val.pagesize);
			val.$next.click(methods.next);
			val.$prev.click(methods.prev);
			if (val.pagecount === 1) {
				val.$next.hide();
				val.$prev.hide();
			}
		};
		return this.each(this.doit);
	};
})(jQuery);