function resolveData(data) {
    var arr = [];
    for (var key in data) {
        arr.push(key + '=' + data[key]);
    }
    return arr.join('&');
}

function ajax(options) {
    var xhr = new XMLHttpRequest();
    var qs = resolveData(options.data);
    if (options.type.toUpperCase() === 'GET') {
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') { 
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            options.success && options.success(result);
        }
    }
}