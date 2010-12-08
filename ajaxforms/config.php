<?php
	function isAjax ()
	{
		if (
			isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
			&& $_SERVER['HTTP_X_REQUESTED_WITH'] == "XMLHttpRequest") 
			return true;
		return false;
	}
	$ar = array(
		"msg"=>"This is the json result"
	);