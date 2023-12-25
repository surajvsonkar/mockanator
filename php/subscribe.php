<?php
/*-----------------------------------------------
  # Variables
  ---------------------------------------------*/
$MailchimpAPI 	= '1c69f6fc762847cba718da8240abb681-us16'; //<- Your Maichimp API Key
$MailchimpLID 	= 'b08d24d82a'; //<- Your Maichimp List IDkey

$email 			= $_POST['email'];
$fname 			= isset($_POST['fname']) && !empty($_POST['fname']) ? $_POST['fname'] : '';
$lname 			= isset($_POST['lname']) && !empty($_POST['lname']) ? $_POST['lname'] : '';

// Data for Mailchimp
$data = array(
	'email'		=> $email,
	'fname'		=> $fname,
	'lname'		=> $lname,
	'status'	=> 'subscribed'
);

/*-----------------------------------------------
  # The Handler
  ---------------------------------------------*/
// know more at http://stackoverflow.com/questions/30481979/adding-subscribers-to-a-list-using-mailchimps-api-v3
function syncMailchimp( $MailchimpAPI, $MailchimpLID, $data ) {
	$memberId = md5(strtolower($data['email']));
	$dataCenter = substr( $MailchimpAPI, strpos( $MailchimpAPI, '-' ) +1 );
	$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $MailchimpLID . '/members/' . $memberId;

	$json = json_encode(array(
		'email_address' => $data['email'],
		'status'		=> $data['status'], // "subscribed","unsubscribed","cleaned","pending"
		'merge_fields'	=> array(
			'FNAME'		=> $data['fname'],
			'LNAME'		=> $data['lname']
		)
	));

	$ch = curl_init( $url );

	curl_setopt( $ch, CURLOPT_USERPWD, 'user:' . $MailchimpAPI );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json' ) );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
	curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'PUT' );
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, $json );

	$result 	= curl_exec( $ch );
	$httpCode 	= curl_getinfo( $ch, CURLINFO_HTTP_CODE );
	curl_close( $ch );

	return $httpCode;
}

/*-----------------------------------------------
  # Check email and do subscribe
  ---------------------------------------------*/
$error 		= false;
$emailValid = true;
$msg 		= '';

if ( ! empty( $email ) ) {

	$clean_email = filter_var( $email, FILTER_SANITIZE_EMAIL );

	if ( $email == $clean_email && filter_var( $email, FILTER_VALIDATE_EMAIL ) ){
		$error      = false;

		// Do mailchimp task
		syncMailchimp( $MailchimpAPI, $MailchimpLID, $data );

		$msg 	.= '<strong>Success:</strong> You are successfully subscribed.';
		$msg 	.= '<br>';

	} else {

		$error 	 = true;
		$msg 	.= '<strong>Error:</strong> Invalid email address, Please check and retype.';
		$msg 	.= '<br>';

	}

} else {

	$error 	 = true;
	$msg 	.= '<strong>Error:</strong> Please enter your valid email address..';
	$msg 	.= '<br>';
}

// Make as json obj
$dataReturn = array(
	'error'		=> $error,
	'message'	=> $msg,
);
header( 'Content-type: application/json' );
echo json_encode( $dataReturn );
