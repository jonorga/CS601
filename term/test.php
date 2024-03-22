<?php
	header('Content-Type: application/text');
	if (isset($_POST['some'])) { echo "yes" . $_POST['some']; }
	echo " update2 " . var_dump($_POST);
?>