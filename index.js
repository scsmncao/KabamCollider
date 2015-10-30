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

var listOfCountriesAndBigMac = {'Australia': 4.81,
								'Austria': 4.56,
								'Belgium': 4.98,
								'Canada': 4.54,
								'Chile': 3.27,
								'Czech Republic': 2.83,
								'Denmark': 5.08,
								'Estonia': 3.34,
								'Finland': 5.27,
								'France': 5.25,
								'Germany': 4.94,
								'Greece': 3.70,
								'Hungary': 3.18,
								'Iceland': 5.29,
								'Ireland': 4.45,
								'Israel': 4.63,
								'Italy': 4.82,
								'Japan': 2.99,
								'Korea': 3.76,
								'Luxembourg': 4.89,
								'Mexico': 3.11,
								'Netherlands': 4.90,
								'New Zealand': 3.91,
								'Norway': 5.65,
								'Poland': 2.54,
								'Portugal': 4.04,
								'Slovak Republic': 3.34,
								'Slovenia': 2.56,
								'Spain': 4.54,
								'Sweden': 5.15,
								'Switzerland': 6.82,
								'Turkey': 3.87,
								'United Kingdom': 4.51,
								'United States': 4.79 };

result = false;
chart = false;


google.load('visualization', '1.1', {'packages': ['line']});

$(document).ready(loadPage);

function draw() {
	google.setOnLoadCallback(drawChart);

      function drawChart () {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'PPP');
        data.addColumn('number', 'Big Mac Index');

        var listOfData = []

        $.each(Object.keys(listOfCountriesAndPPP), function(key, value) {
        	var ratioPPP = (listOfCountriesAndPPP[value] * 1.0) / listOfCountriesAndPPP['United States'];
        	var ratioBigMac = (listOfCountriesAndBigMac[value] * 1.0) / listOfCountriesAndBigMac['United States'];
        	listOfData.push([value, ratioPPP, ratioBigMac]);
        });

        data.addRows(listOfData);

        var options = {
          chart: {
            title: 'PPP Compared to Big Mac Index'
          },
          width: 1400,
          height: 500,
          series: {
            0: {axis: 'PPP'},
            1: {axis: 'Big Mac Index'}
          },
          axes: {
            y: {
              'PPP': {label: 'PPP'},
              'Big Mac Index': {label: 'Big Mac Index'}
            }
          }
        };

        var chart = new google.charts.Line(document.getElementById('chart'));

        chart.draw(data, options);

      }
}

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
	$('.see-percentage').click(calculatePercentEntertainment);
	$('.see-chart').click(function() {
		if (chart) {
			$('.chart').css('opacity', 0);
			chart = false;
		}
		else {
			$('.chart').css('opacity', 1);
			chart = true;
		}
	});
	draw();
}

function calculatePPP() {
	if (result) {
		$('.result').empty();
		result = false;
		return;
	}
	result = true;
	var country = $('.countries option:selected').text();
	var pppValue = listOfCountriesAndPPP[country];
	var usdAmount = parseFloat($('#USD').val());
	var finalAmount = Number((usdAmount * (pppValue/100.0)).toFixed(2));
	$('.result').empty()
	$('.result').append('An item that costs ' + '<b>' + usdAmount + ' Units</b> in the <b>United States</b> should cost ' + '<b>' + finalAmount + ' Units</b> in <b>' + country + '</b>.');
}

function seeAll() {
	if (result) {
		$('.result').empty();
		result = false;
		return;
	}
	$('.result').empty()
	result = true;
	var usdAmount = parseFloat($('#USD').val());
	var sumAmount = 0;
	$.each(Object.keys(listOfCountriesAndPPP), function(key, value) {
		var country = value;
		var countryPPP = listOfCountriesAndPPP[country];
		var finalAmount = Number((usdAmount * (countryPPP/100.0)).toFixed(2));
		sumAmount += finalAmount;
		$('.result').append('An item that costs ' + '<b>' + usdAmount + ' Units</b> in the <b>United States</b> should cost ' + '<b>' + finalAmount + ' Units</b> in <b>' + country + '</b>.<br>');
	});
	$('.result').append('The sum of all the costs is ' + '<b>$' + sumAmount + '</b> in ' + Object.keys(listOfCountriesAndPPP).length + ' countries.');
}

function calculatePercentEntertainment() {
	if (result) {
		$('.result').empty();
		result = false;
		return;
	}
	result = true;
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