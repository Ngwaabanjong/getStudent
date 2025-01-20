// Define the API endpoint and table name
var API_ENDPOINT = "https://t5e5v2v0bf.execute-api.us-east-1.amazonaws.com/Prod";

// Function to save student data
document.getElementById("savestudent").onclick = function () {
    var inputData = {
        "studentid": $('#studentid').val(),
        "name": $('#name').val(),
        "class": $('#class').val(),
        "age": $('#age').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("studentSaved").innerHTML = "Student Data Saved!";
        },
        error: function (xhr) {
            alert(`Error saving student data: ${xhr.responseText}`);
        }
    });
}

// Function to retrieve all students
document.getElementById("getstudents").onclick = function () {
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#studentTable tr').slice(1).remove();
            var data = JSON.parse(response); // Parse the response if it's a string
            jQuery.each(data, function (i, student) {
                $("#studentTable").append(`
                    <tr>
                        <td>${student['studentid']}</td>
                        <td>${student['name']}</td>
                        <td>${student['class']}</td>
                        <td>${student['age']}</td>
                    </tr>`);
            });
        },
        error: function (xhr) {
            alert(`Error retrieving student data: ${xhr.responseText}`);
        }
    });
}
