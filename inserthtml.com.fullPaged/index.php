<!DOCTYPE HTML>
<html>
<head>

<title>Full Screen</title>

<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width" />


<?php include"/nfs/c10/h03/mnt/142304/domains/inserthtml.com/html/demos/layout/head.php"; ?>

<link rel="stylesheet" href="style.css" />

<script src="jquery.js"></script>
<script src="fullPaged.js"></script>

<script>

$(document).ready(function() {
	
	$('#container').fullPaged({
		'direction' : 'bottom'
	});
	
});
</script>

</head>
<body>

<div id="container">
	
	<div id="home-page">
		<div class="slide-content">
			<div class="content">
				<p>A little information about the product or whatever. Click Learn More and select 'Demos' for more demos.</p>
			</div>
			<div class="show-menu">
				Learn More
			</div>
		</div>
	</div>
	
	<div id="demo-page">
		<div class="slide-content">
			<div class="content">
				<h1>More Demos</h1>
				<p>A few other demos detailing what you can do with this plugin!</p>
				
				<div class="extra-demos">
					
					<a style="width: 10px;" class="current" href="index.php">1</a>
					<a style="width: 10px;" href="index2.php">2</a>
					<a style="width: 10px;" href="index3.php">3</a>
					<a style="width: 10px;" href="index4.php">4</a>
					
				</div>
				
			</div>
		</div>
	</div>
	
	<div id="world-page">
		<div class="slide-content">
			<div class="content">
				<h1>FILLER PAGE</h1>
				<p class="long">If you're interested in following us on twitter, go to <a href="http://www.twitter.com/inserthtml">@inserthtml</a>. Otherwise click on 'ARTICLE' to go back to the article, or 'PREV' to go to the previous demo.</p>
				<p class="short">If you're interested in following us on twitter, go to <a href="http://www.twitter.com/inserthtml">@inserthtml</a>.</p>
			</div>
		</div>
	</div>
	
	<div class="hidden-content">
			
		<div class="content">
			<ul class='menu'>
				<li>
					<a href="#home">
						<span>&#x2302;</span>
						<span>HOME</span>
					</a>
				</li>
				<li>
					<a href="#demo">
						<span>&#xE672;</span>
						<span>DEMOS</span>
					</a>
				</li>
				<li>
					<a href="#world">
						<span>&#x1F30E;</span>
						<span>WORLD</span>
					</a>
				</li>
				<li>
					<a href="http://www.inserthtml.com/demos/css/button-styles/">
						<span>&#x270E;</span>
						<span>PREV</span>
					</a>
				</li>
				<li>
					<a href="http://www.inserthtml.com/2013/09/single-page-website/">
						<span>&#x21A9;</span>
						<span>ARTICLE</span>
					</a>
				</li>
		</div>
			
	</div>
	
</div>

</body>
</html>