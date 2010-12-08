<?php
	require_once 'config.php';
	if (isAjax()) {
		echo json_encode($_POST);
	} else {echo "Name: ".$_POST['Name'];}
	