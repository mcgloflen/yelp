$(document).ready(function () {

	var lat;
	var lon;
	var geoData;
	var locationValue;

	var address;


	$(document).on("click", "#get-location", function(event) {

		// get location
		var geo = navigator.geolocation
	
		if (geo) {
			geo.getCurrentPosition(function(position) {

				lat = position.coords.latitude;
				lon = position.coords.longitude;

				geoData = lat + "," + lon;
				
				yelp_request_geo();
			});
		} else {
			alert("Sorry, cannot find you.");
		}

	});

	// get location from form
	$(document).on("submit", "form", function(event) {
		event.preventDefault();

		locationValue = $("input[name='location']").val();

		yelp_request_form();
	});

	// get yelp stuff
	function yelp_request_form() {
		var auth = {
			consumerKey : "a9CE7NcYGv_cNYPiVNYGmg",
			consumerSecret : "JgbtCV4ztDIS5w47pnV8QrWqnH4",
			accessToken : "ePiKwaMH7GKZd4R7AP1kRq63toU7cb5b",
			accessTokenSecret : "AISY29-YY_yEQy3WxggaIkGvoWU",
			signatureMethod : "HMAC-SHA1"
		};

		var accessor = {
			consumerSecret : auth.consumerSecret,
			tokenSecret : auth.accessTokenSecret
		};

		var parameters = {
			callback: "cb",
			limit: 1,
			location: locationValue,
			oauth_consumer_key: auth.consumerKey,
			oauth_consumer_secret: auth.consumerSecret,
			oauth_token: auth.accessToken,
			sort: 1,
			term: "pizza"
		}

		var message = {
			action : 'http://api.yelp.com/v2/search',
			method : 'GET',
			parameters : parameters
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);

		$.ajax({
			url : message.action,
			data : parameters,
			cache : true,
			dataType : 'jsonp',
			jsonpCallback : 'cb',
			success : function(data) {
				console.log(data.businesses[0].location.address);
				address = data.businesses[0].location.address;
			} 
		});
	}

	// get yelp stuff
	function yelp_request_geo() {
		var auth = {
			consumerKey : "a9CE7NcYGv_cNYPiVNYGmg",
			consumerSecret : "JgbtCV4ztDIS5w47pnV8QrWqnH4",
			accessToken : "ePiKwaMH7GKZd4R7AP1kRq63toU7cb5b",
			accessTokenSecret : "AISY29-YY_yEQy3WxggaIkGvoWU",
			signatureMethod : "HMAC-SHA1"
		};

		var accessor = {
			consumerSecret : auth.consumerSecret,
			tokenSecret : auth.accessTokenSecret
		};

		var parameters = {
			callback: "cb",
			limit: 1,
			ll: geoData,
			oauth_consumer_key: auth.consumerKey,
			oauth_consumer_secret: auth.consumerSecret,
			oauth_token: auth.accessToken,
			sort: 1,
			term: "pizza"
		}

		var message = {
			action : 'http://api.yelp.com/v2/search',
			method : 'GET',
			parameters : parameters
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);

		$.ajax({
			url : message.action,
			data : parameters,
			cache : true,
			dataType : 'jsonp',
			jsonpCallback : 'cb',
			success : function(data) {
				console.log(data.businesses[0].location.address);
				address = data.businesses[0].location.address;
			} 
		});
	}

	$(document).on("click", "#directions-url", function(event) {

        $("a[href='#']").attr('href', "http://maps.apple.com/?dirflg=d&daddr=" + address + "&saddr=" + geoData);

	});



});