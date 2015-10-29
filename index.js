var listOfCountriesAndPPP = {'Australia': 114,
								'Austria': 97,
								'Belgium': 99,
								'Canada': 100,
								'Chile': 61,
								'Czech Republic': 59,
								'Denmark': 124,
								'Estonia': 69,
								'Finland': 109,
								'France': 98,
								'Germany': 91,
								'Greece': 76,
								'Hungary': 50,
								'Iceland': 112,
								'Ireland': 107,
								'Israel': 111,
								'Italy': 92,
								'Japan': 92,
								'Korea': 78,
								'Luxembourg': 109,
								'Mexico': 59,
								'Netherlands': 100,
								'New Zealand': 102,
								'Norway': 123,
								'Poland': 49,
								'Portugal': 72,
								'Slovak Republic': 61,
								'Slovenia': 73,
								'Spain': 82,
								'Sweden': 105,
								'Switzerland': 153,
								'Turkey': 53,
								'United Kingdom': 122,
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
	$('.see-all').click(seeAll);
	$('.see-percentage').click(calculatePercentEntertainment)
}

function calculatePPP() {
	var country = $('.countries option:selected').text();
	var pppValue = listOfCountriesAndPPP[country];
	var usdAmount = parseFloat($('#USD').val());
	var finalAmount = Number((usdAmount * (pppValue/100.0)).toFixed(2));
	$('.result').empty()
	$('.result').append('An item that costs ' + '<b>$' + usdAmount + '</b> in the <b>United States</b> should cost ' + '<b>$' + finalAmount + '</b> in <b>' + country + '</b>.');
}

function seeAll() {
	$('.result').empty()
	var usdAmount = parseFloat($('#USD').val());
	var sumAmount = 0;
	$.each(Object.keys(listOfCountriesAndPPP), function(key, value) {
		var country = value;
		var countryPPP = listOfCountriesAndPPP[country];
		var finalAmount = Number((usdAmount * (countryPPP/100.0)).toFixed(2));
		sumAmount += finalAmount;
		$('.result').append('An item that costs ' + '<b>$' + usdAmount + '</b> in the <b>United States</b> should cost ' + '<b>$' + finalAmount + '</b> in <b>' + country + '</b>.<br>');
	});
	$('.result').append('The sum of all the costs is ' + '<b>$' + sumAmount + '</b> in ' + Object.keys(listOfCountriesAndPPP).length + ' countries.');
}

function calculatePercentEntertainment() {
	$('.result').empty()
	$.getJSON("revenueByCountry.json", function(revenue) {
    	$.getJSON("internetPopulation.json", function(population) {
    		$.getJSON("medianIncome.json", function(median) {
    			$('.percentage-entertainment').empty();
    			$.each(Object.keys(revenue), function(key, value) {
    				var percentage = (parseFloat(revenue[value])/population[value]/median[value] * 100).toFixed(2);
    				$('.result').append('The percent income spent on entertainment for <b>' + value + '</b> is <b>' + percentage + '%</b><br>');
    			});
			});
		});
	});
}