<?
	if (count($_POST)!=0)
		if (isset($_POST['name']) && isset($_POST['phone'])) {
			$msg = 'Имя: '.$_POST['name'];
			$msg .= '<br>Тел.: '.$_POST['phone'];
			$title = 'Заявка с сайта';
			if (!empty($_POST['msg'])) $msg .= '<br>'.$_POST['msg'];
                        $from = 'zakaz@colorevent.org';
			$header = 'MIME-Version: 1.0' . "\n" .
				'Content-type: text/html; charset=UTF-8'. "\n" .
				'From: ColorEvent <' . $from . ">\n";
      $to = 'zakaz@colorevent.org';
      if (mail($to, $title, $msg, $header))
      	die('1');
		}
	if (count($_POST)!=0) die('0');
?>
