


$(document).ready(function(){

    $('#getTwits').on('click', function(){
        $.ajax({
            method: "GET",
            url: 'http://localhost:2016/api/twitts',
            dataType: "xml/html/script/json",
            headers: {
                'Content-Type':'application/json'
            }
        }).always(function(data){
            console.log(data);
        });
    });

    $.ajax({
        method: "GET",
        url: "http://localhost:2016/stats/reduce"
    }).always(function(response){
        console.log(response);
        var data = percents(response);

        makeChart(response, data);
    });


});

function percents(response){
    var allFor = 0,
        allAgainst = 0;

    for(var i = 0; i < response.length; i+=2) {
        allAgainst += response[i].value;
    }
    for(var j = 1; j < response.length; j+=2) {
        allFor += response[j].value;
    }

    var allForPer = parseFloat((allFor / (allFor + allAgainst) * 100).toFixed(2));
    var allAgainstPer = parseFloat((allAgainst / (allFor + allAgainst) * 100).toFixed(2));


    return {
        allForPer: allForPer,
        allAgainstPer: allAgainstPer,
        allFor: allFor,
        allAgainst: allAgainst
    };
}

function makeChart(response, percentages) {

    var colors = Highcharts.getOptions().colors,
        categories = ['For' , 'Against'],
        data = [{
            y: percentages.allForPer,
            color: colors[8],
            drilldown: {
                name: 'Who is For',
                categories: ['People from England (For)', 'People from Ireland (For)', 'People from Other countries (For)', 'People from Scotland (For)', 'People from Wales (For)'],
                data: [
                    parseFloat(( response[1].value / (percentages.allFor) * 100).toFixed(2)),
                    parseFloat(( response[3].value / (percentages.allFor) * 100).toFixed(2)),
                    parseFloat(( response[5].value / (percentages.allFor) * 100).toFixed(2)),
                    parseFloat(( response[7].value / (percentages.allFor) * 100).toFixed(2)),
                    parseFloat(( response[9].value / (percentages.allFor) * 100).toFixed(2))
                ],
                color: colors[0]
            }
        }, {
            y: percentages.allAgainstPer,
            color: colors[1],
            drilldown: {
                name: 'Who is Against',
                categories: ['People from England (Against)', 'People from Ireland (Against)', 'People from Other countries (Against)', 'People from Scotland (Against)', 'People from Wales (Against)'],
                data: [
                    parseFloat(( response[0].value / (percentages.allAgainst) * 100).toFixed(2)),
                    parseFloat(( response[2].value / (percentages.allAgainst) * 100).toFixed(2)),
                    parseFloat(( response[4].value / (percentages.allAgainst) * 100).toFixed(2)),
                    parseFloat(( response[6].value / (percentages.allAgainst) * 100).toFixed(2)),
                    parseFloat(( response[8].value / (percentages.allAgainst) * 100).toFixed(2))
                ],
                color: colors[1]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'BrExit Statistics, 2016'
        },
        subtitle: {
            text: 'Source: <a href="http://twitter.com/" target="_blank">twitter.com</a>'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'People',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'People',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    });

}