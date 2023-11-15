<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

	$tx_bytes = $_REQUEST['raw'];

$url = 'http://localhost/rpc';
$data = array("jsonrpc" => "2.0","method" => "theta.BroadcastRawTransaction","params"=>[array("tx_bytes"=>"$tx_bytes")],"id"=>"1");
$postdata = json_encode($data);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_PORT, 16888);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$result = curl_exec($ch);
curl_close($ch);

print_r($result);

?>
