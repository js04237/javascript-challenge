// from data.js
var tableData = data;

function appendRow(rowEntry) {
    var tbody = d3.select("tbody");
    var row = tbody.append("tr");
    Object.entries(rowEntry).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
};
  
tableData.forEach(appendRow);

// Select the button
var button = d3.select("#filter-btn");

// Select the forms
var inputElement1 = d3.select("#datetime");
var inputElement2 = d3.select("#cityname");
var inputElement3 = d3.select("#statename");
var inputElement4 = d3.select("#countryname");
var inputElement5 = d3.select("#shapeform");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
inputElement1.on("submit", runEnter);


// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Get the value property of the input element
    // Convert string elements to lower case (to match the table data)
    var dateFilter = inputElement1.property("value");
    var cityFilter = inputElement2.property("value").toLowerCase();
    var stateFilter = inputElement3.property("value").toLowerCase();
    var countryFilter = inputElement4.property("value").toLowerCase();
    var shapeFilter = inputElement5.property("value").toLowerCase();
    

    // Apply the filter criteria to the data
    // var filteredData = tableData.filter(function(data) {     
    //     return data.datetime == dateFilter && data.state == stateFilter;
    // })
    // var filteredData = tableData.filter(rowFilter => rowFilter.datetime == dateFilter);
    var filteredData = tableData.filter(rowFilter => (rowFilter.datetime == dateFilter & 
                                                        rowFilter.city == cityFilter &
                                                        rowFilter.state == stateFilter &
                                                        rowFilter.country == countryFilter &
                                                        rowFilter.shape == shapeFilter
                                                    ));

    // If no results are found, exit the function
    if (filteredData.length == 0) {
        window.alert("No data was found for the selected filter criteria.");
        return;
    }
    
    // Remove all table rows
    // Create a function to delete all rows other than the first
    function deleteRows() {
        var rowCount = ufo_table.rows.length;
        for (var i = rowCount -1; i > 0; i--) {
            ufo_table.deleteRow(i);
        }
    };
    // Call the deleteRows function
    deleteRows()

    // Populate the rows with data that fit the filter criteria
    filteredData.forEach(appendRow);

  }