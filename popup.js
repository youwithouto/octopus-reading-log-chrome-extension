
function Storage() {
    this.name = "myReadings";
}

Storage.prototype.set = function(key, value, callback) {
    var obj = {};
    obj[key] = JSON.stringify(value);
    chrome.storage.sync.set(obj, callback);
};

Storage.prototype.get = function(key, callback) {
    chrome.storage.sync.get(key, function(result) {
        if (key in result) {
            callback(JSON.parse(result[key]));
        } else {
            callback();
        }
    });
};

Storage.prototype.del = function(key, callback) {
    chrome.storage.sync.remove(key, callback);
}

Storage.prototype.clear = function(callback) {
    chrome.storage.sync.clear(callback);
}

$( document ).ready(function() {
    var storage = new Storage();
    var reading = {
        title: "",
        url: "",
        comment: ""
    };

    function refresh(key) {
        storage.get(key, function(rd) {
            if (rd !== undefined) {
                $("#myReadings-status svg").css("fill", "#4CAF50");
                reading.comment = rd.comment;
                $("#myReadings-comment").val(reading.comment);
            } else {
                $("#myReadings-status svg").css("fill", "#ffffff");
                $("#myReadings-comment").val("");
                reading.comment = "";
            }
        });
    }
    
    chrome.tabs.getSelected(null, function(tab) {
        reading.title = tab.title;
        reading.url = tab.url;
        $("#myReadings-pure-title").text(reading.title);
        $("#myReadings-pure-url").text(reading.url);
        refresh(reading.url);
    });
    
    $("#myReadings-button-save").click(function() {
        reading.comment = $("#myReadings-comment").val();    
        storage.set(reading.url, reading, function() {
            $("#myReadings-status svg").css("fill", "#4CAF50");
        });
    });
    
    $("#myReadings-button-cancel").click(function() {
        window.close();
        reading = {
            title: "",
            url: "",
            comment: ""
        };
        $("#myReadings-status svg").css("fill", "#ffffff");
    });

    $("#myReadings-status").click(function() {
        storage.del(reading.url, function() {
            refresh(reading.url);
        });
    });
});
