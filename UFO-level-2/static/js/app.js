// from data.js
var result = data;

// Function to add populate the html table with data data.js file
function appendRow(rowEntry) {
    var tbody = d3.select("tbody");
    var row = tbody.append("tr");
    Object.entries(rowEntry).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        // console.log(cell);
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
// var form = d3.select("form");
var inputs = d3.selectAll('input');

// Create event handlers for clicking the button or entering data into a filter
button.on("click", refreshPage);
// form.on("submit", runEnter);
inputs.on("change", runEnter);

// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Get the key & value property of the input element
    // Convert inputgit c elements to lower case (to match the table data)
    var key = d3.select(this).property('id');
    var value = d3.select(this).property('value').toLowerCase();

    result = result.filter(obj => obj[key] == value);
    
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
    result.forEach(appendRow);

};
