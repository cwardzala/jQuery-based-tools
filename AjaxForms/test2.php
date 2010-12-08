<?php
	require_once 'config.php';
	array_push($ar,$_POST);
	if (isAjax()) {
		echo json_encode($ar);
	} else {
		echo "This is non ajax results";
	}