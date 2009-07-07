function handle_menu_click(click_event){
	//run the css test
	var csstest = $('.hidden').css('position');
	if (csstest !== 'absolute') {return;}
	// We don't want the link to act normally
	click_event.preventDefault();
	// assign variable for href
    var href = $(this).attr('href').replace("#", "");
	// if already active or href equals #blank dont change tab, just return
   	if ($(this).parents('li').hasClass('active') || href === "#blank" || $(this).parents('li').hasClass('disabled')) {return;}
	$('.active').removeClass('active');
	$(this).parent('li').addClass('active');
	$('.open').addClass('hidden').removeClass('open');
	$('a[name='+href+']').parent('.target').removeClass('hidden').addClass('open');
}

$(document).ready(function(){
	// bind the click function
	$('.trigger').find('a').click(handle_menu_click);
	// hide all targets except the default open
	$('.target').each(function(){
		$('.topLink').addClass('hidden');
		if (!$(this).hasClass('open')) {
			$(this).addClass('hidden');
		}
	});
});