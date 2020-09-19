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

// Select the form
var form = d3.select("form");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit", runEnter);

// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var dateFilter = inputElement.property("value");
    
    // Apply the filter criteria to the data
    var filteredData = tableData.filter(rowFilter => rowFilter.datetime == dateFilter);

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