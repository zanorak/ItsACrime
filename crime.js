$( document ).ready(function() {

  // build list of states
  var stateDropDown = "<option selected>Choose State</option>\n";
  var currState = "";
  for ( let stateYear of crimeData ) {
    if ( stateYear["State"] != currState ) {
      currState = stateYear["State"]
      stateDropDown += '<option value="' + currState + '">' + currState + '</option>\n';
    }
  }
  $("#stateSelect").empty().append(stateDropDown);
  $("#stateSelect1").empty().append(stateDropDown);
  $("#stateSelect2").empty().append(stateDropDown);
  
  $("#rateGraph").click( function() {
    drawRateGraph() 
  });

  $("#compareGraph").click( function() {
    drawCompareGraph() 
  });

});

function drawRateGraph() {
  // get the state choice
  var thisState = $("#stateSelect").children("option:selected").val();
  var thisCrime = $("#crimeSelect").children("optgroup").children("option:selected").val();
  var pv = thisCrime.charAt(0);
  thisCrime = thisCrime.substring(1);

  // get the data from the json
  var labels = [];
  var data = [];

  for ( let stateYear of crimeData ) {
    if ( stateYear["State"] == thisState ) {
      labels.push( stateYear["Year"] );
      var rates = stateYear["Data"]["Rates"];
      if ( pv == 'p' ) {
        data.push( rates["Property"][thisCrime] );
      } else {
        data.push( rates["Violent"][thisCrime] );
      }
    }
  }

  let chartStatus = Chart.getChart("crimeRateChart");

  if ( chartStatus != undefined ) {
    chartStatus.destroy();
  }

  const ctx = document.getElementById('crimeRateChart');
  const rateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: thisState + ' ' + thisCrime + ' rate per 100,000',
            data: data,
            borderWidth: 1,
            borderColor: 'red',
            pointRadius: 3,
            pointBackgroundColor: 'red',
          }]
    },
    options: {
      responsive: true,
    },
  });
  rateChart.update();
};


function drawCompareGraph() {
  // get the state choice
  var thisState1 = $("#stateSelect1").children("option:selected").val();
  var thisState2 = $("#stateSelect2").children("option:selected").val();
  var thisCrime = $("#crimeSelect2").children("optgroup").children("option:selected").val();
  var pv = thisCrime.charAt(0);
  thisCrime = thisCrime.substring(1);

  // get the data from the json
  var labels = [];
  var data1 = [];
  var data2 = [];

  for ( let stateYear of crimeData ) {
    if ( stateYear["State"] == thisState1 ) {
      labels.push( stateYear["Year"] );
      var rates = stateYear["Data"]["Rates"];
      if ( pv == 'p' ) {
        data1.push( rates["Property"][thisCrime] );
      } else {
        data1.push( rates["Violent"][thisCrime] );
      }
    }
  }

  for ( let stateYear of crimeData ) {
    if ( stateYear["State"] == thisState2 ) {
      var rates = stateYear["Data"]["Rates"];
      if ( pv == 'p' ) {
        data2.push( rates["Property"][thisCrime] );
      } else {
        data2.push( rates["Violent"][thisCrime] );
      }
    }
  }

  let chartStatus = Chart.getChart("crimeCompareChart");

  if ( chartStatus != undefined ) {
    chartStatus.destroy();
  }

  const ctx = document.getElementById('crimeCompareChart');
  const rateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
          {
            label: thisState1 + ' ' + thisCrime + ' rate per 100,000',
            data: data1,
            borderWidth: 1,
            borderColor: 'red',
            pointRadius: 3,
            pointBackgroundColor: 'red',
          },
          {
            label: thisState2 + ' ' + thisCrime + ' rate per 100,000',
            data: data2,
            borderWidth: 1,
            borderColor: 'blue',
            pointRadius: 3,
            pointBackgroundColor: 'blue',
          },
        
        ]
    },
    options: {
      responsive: true,
    },
  });
  rateChart.update();
}