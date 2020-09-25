// from data.js
var result = data;
var tbody = d3.select("tbody");

// Function to populate the html table with data from the data.js file
function appendRow(rowEntry) {
    var row = tbody.append("tr");
    Object.entries(rowEntry).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
};

// Call the function to add data to the table
result.forEach(appendRow);

// Function to refresh the page
function refreshPage() {
    window.location.reload();
}

// Select the button, form, and inputs
var button = d3.select("#reset-btn");
var inputs = d3.selectAll('input');

// Create event handlers for clicking the button or entering data into a filter
button.on("click", refreshPage);
inputs.on("change", runEnter);

var filteredData;

// Create the function to run for both events
function runEnter() {

    filteredData = data;

    // Apply filters to the data
    inputs._groups[0].forEach(val => {
        if(val.value){
            filteredData = filteredData.filter(obj => obj[val.id] == val.value.toLowerCase());
        };
    });

    // Clear the table
    tbody.html('');

    // Populate the rows with data that fit the filter criteria
    filteredData.forEach(appendRow);

    if(filteredData.length == 0) {
        window.alert("No results match the selected filter criteria.")
        refreshPage();
    }

};
