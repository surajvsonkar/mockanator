<?php
/*-----------------------------------------------
	# Variables
	---------------------------------------------*/

$fname   = isset( $_POST['fname'] ) && ! empty( $_POST['fname'] ) ? $_POST['fname'] : '';
$lname   = isset( $_POST['lname'] ) && ! empty( $_POST['lname'] ) ? $_POST['lname'] : '';
$email   = isset( $_POST['email'] ) && ! empty( $_POST['email'] ) ? $_POST['email'] : '';
$subject = isset( $_POST['subject'] ) && ! empty( $_POST['subject'] ) ? $_POST['subject'] : 'New message from your site contact form';
$content = isset( $_POST['content'] ) && ! empty( $_POST['content'] ) ? $_POST['content'] : '';
$toMail  = 'Mominul Islam <mominulfed@gmail.com>'; // Your name & mail address here example 'Your Name <contact@domain.com>'.

/*-----------------------------------------------
	# Error Reporting need first
	---------------------------------------------*/
$error = false;
$msg   = '';
$body  = '';

// Check Name
if ( empty( $fname ) ) {
	$error = true;
	$msg   .= '<strong>Required:</strong> Please enter your first name.';
	$msg   .= '<br>';
} else {
	$body .= '<strong>Name:</strong> ' . $fname;
	$body .= '<br><br>';
}

// Check Email
if ( empty( $email ) ) {
	$error = true;
	$msg   .= '<strong>Required:</strong> Please enter your valid email address.';
	$msg   .= '<br>';
} else {
	$body .= '<strong>Email:</strong> ' . $email;
	$body .= '<br><br>';
}

// Check Content
if ( empty( $content ) ) {
	$error = true;
	$msg   .= '<strong>Required: </strong> Please write something. Can\'t here you from our home';
	$msg   .= '<br>';
} else {
	// Subject
	$body .= '<strong>Subject:</strong> ' . $subject;
	$body .= '<br><br>';

	// Body Content
	$body .= '<strong>Message:</strong> ' . $content;
	$body .= '<br><br>';
}

/*-----------------------------------------------
	# Prepare send mail
	---------------------------------------------*/
if ( $error == true ) {
	$msg .= '<strong>Error:</strong> Please fill form with above info requirement.';
} else {
	$body  .= $_SERVER['HTTP_REFERER'] ? '<br><br><br>This form was submitted from: ' . $_SERVER['HTTP_REFERER'] : '';
	$error = false;
	$msg   .= '<strong>Success:</strong> Your message has been send.';

	// Mail Headers
	$headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/html; charset=iso-8859-1";
	$headers[] = "From: {$fname} <{$email}>";
	$headers[] = "Reply-To: {$fname} <{$email}>";
	$headers[] = "Subject: {$subject}";
	$headers[] = "X-Mailer: PHP/" . phpversion();

	mail( $toMail, $subject, $body, implode( "\r\n", $headers ) );
}
// Make as json obj
$dataReturn = array(
	'error'   => $error,
	'message' => $msg,
	'data'    => array(
		'name'    => $fname,
		'lname'   => $lname,
		'email'   => $email,
		'subject' => $subject,
		'content' => $content
	)
);
header( 'Content-type: application/json' );
echo json_encode( $dataReturn );
