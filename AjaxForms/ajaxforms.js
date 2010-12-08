/**
 * jQuery ajax forms plugin.
 * Converts traditional forms to ajax forms using the action and method attributes.
 */
(function($){
	$.fn.ajaxForm = function(options) {
		/** Options
		 * dataType: The data type you will be returning from the server. Default = json
		 * useTypeSuffix: Use your custom dataType as the .suffix for your action URL. Default = false
		 * callback: custom function to be called on success.
		 */
		var o = {
			dataType: "json",
			useTypeSuffix: false,
			callback: function () {}
		};
		$.extend(o,options);

		/**
		 * Methods
		 * validate: Custom validation function. Does not limit you to one library.
		 * error: Custom Error function, called when ajax returns an error.
		 * success: Function to be called on AJAX success.
		 */
		var methods = {
			validate : function () { return true; },
			error: function (data) {console.log(data);},
			success: function (data) {console.log(data);}
		};

		return this.each(function() {
			var $this = $(this);
			/**
			 * Values
			 * method: the method from this form converted to uppercase.
			 * action: the action attribute from this form, split at '.' to create array with suffix split off at index 1.
			 * actionURL: Final url to make ajax call to, default to action attribute.
			 */
			var values = {
				method: $this.attr('method').toUpperCase(),
				action: $this.attr('action').split('.'),
				actionURL: $this.attr('action')
			};

    		if (o.useTypeSuffix === true) {values.actionURL = values.action[0]+"."+o.dataType}
    		$this.submit(function (e) {
    			e.preventDefault();
    			if (methods.validate() === true) {
	    			$.ajax({
						type: values.method,
						url: values.actionURL,
						data: $this.serialize(),
						dataType: o.dataType,
						success: function (msg) { methods.success(msg); o.callback();},
						error: methods.error
					});
	    		}
    		});
		});
	};
})(jQuery);