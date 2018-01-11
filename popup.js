
$( document ).ready(function() {
    var reading = {
        title: "",
        url: "",
        comment: ""
    };
    
    chrome.tabs.getSelected(null, function(tab) {
        reading.title = tab.title;
        reading.url = tab.url;
        $("#myReadings-pure-title").text(reading.title);
        $("#myReadings-pure-url").text(reading.url);
    });
    
    $("#myReadings-button-save").click(function() {
        reading.comment = $("#myReadings-comment").val();
        console.info(reading);
        $.post("ajax/test.html", reading, function(data) {
            $("#myReadings-status svg").css("fill", "#4CAF50");
            window.close();
        }).fail(function() {
            $("#myReadings-status svg").css("fill", "#f44336");
        });
    })
    
    $("#myReadings-button-cancel").click(function(event) {
        window.close();
        reading = {
            title: "",
            url: "",
            comment: ""
        };
        $("#myReadings-status svg").css("fill", "#ffffff");
    });
});
