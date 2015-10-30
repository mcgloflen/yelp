$(document).ready(function () {

	// $("#main").hide();

	// $(document).on("click", "body", function(event) {
 //    	$("#main").show();
 //    	$("#origin").hide();
	// });

	// --------------------------------------------

	// nav pills
	$("#tab2").hide();
	$("#tab3").hide();

	$(document).on("click", "#nabs a", function(event) {
		event.preventDefault();
		$('*[id^="tab"]').hide();
		$(this.hash).show();
	});


	// $(document).on("click", "button", function(event) {
	// 	function test(
	// });

	// geo/yelp buttons functionality
	var geoData;
	var address;
	var thing;

	$(document).on("click", "#innout", function(event) {

		thing = "innout";
		get_geolocation();

	});

	$(document).on("click", "#italian", function(event) {

		thing = "italian";
		get_geolocation();

	});


	$(document).on("click", "#chinese", function(event) {

		thing = "chinese";
		get_geolocation();

	});

	$(document).on("click", "#gas", function(event) {

		thing = "gas";
		get_geolocation();

	});

	$(document).on("click", "#7-eleven", function(event) {

		thing = "7eleven";
		get_geolocation();

	});

	$(document).on("click", "#mexican", function(event) {

		thing = "mexican";
		get_geolocation();

	});

	$(document).on("click", "#pizza", function(event) {

		thing = "pizza";
		get_geolocation();

	});

	$(document).on("click", "#japanese", function(event) {

		thing = "japanese";
		get_geolocation();

	});

	$(document).on("click", "#sushi", function(event) {

		thing = "sushi";
		get_geolocation();

	});

	$(document).on("click", "#coffee", function(event) {

		thing = "coffee";
		get_geolocation();

	});

	// get geolocation
	function get_geolocation() {
		var geo = navigator.geolocation

		if (geo) {
			geo.getCurrentPosition(function(position) {

				lat = position.coords.latitude;
				lon = position.coords.longitude;

				geoData = lat + "," + lon;

				yelp_request();
			});
		} else {
			alert("Sorry, cannot find you.");
		}
	}

	// get yelp stuff
	function yelp_request() {
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
			term: thing,
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

				get_directions();
			} 
		});
	}

	// go to directions
	function get_directions() {
        window.location = "http://maps.apple.com/?dirflg=d&daddr=" + address + "&saddr=" + geoData;

    }

});