var listOfCountriesAndPPP = {'Australia': 123,
								'Austria': 99,
								'Belgium': 101,
								'Canada': 105,
								'Chile': 67,
								'Czech Republic': 59,
								'Denmark': 128,
								'Estonia': 71,
								'Finland': 113,
								'France': 100,
								'Germany': 94,
								'Greece': 78,
								'Hungary': 52,
								'Iceland': 111,
								'Ireland': 109,
								'Israel': 109,
								'Italy': 94,
								'Japan': 96,
								'Korea': 84,
								'Luxembourg': 112,
								'Mexico': 66,
								'Netherlands': 102,
								'New Zealand': 118,
								'Norway': 134,
								'Poland': 51,
								'Portugal': 73,
								'Slovak Republic': 63,
								'Slovenia': 75,
								'Spain': 84,
								'Sweden': 109,
								'Switzerland': 162,
								'Turkey': 61,
								'United Kingdom': 121,
								'United States': 100 };


$(document).ready(loadPage);

function loadPage() {
	var countries = $('.countries');
	$.each(Object.keys(listOfCountriesAndPPP), function(key, value) {
		countries
		.append($("<option></option>")
         .attr("value",value)
         .text(value)); 
	});
	$('.calculate').click(calculatePPP);
}

function calculatePPP() {
	var country = $('.countries option:selected').text();
	var pppValue = listOfCountriesAndPPP[country];
	var usdAmount = parseFloat($('#USD').val());
	var finalAmount = Number((usdAmount * (pppValue/100.0)).toFixed(2));
	$('.country-price').empty();
	$('.country-price').append('An item that costs ' + '<b>$' + usdAmount + '</b> in the <b>United States</b> should cost ' + '<b>$' + finalAmount + '</b> in <b>' + country + '</b>.');
}