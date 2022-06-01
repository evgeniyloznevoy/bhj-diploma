/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options) => {
    //console.log(options)
    let method = options.method;

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    try {
        if (method.toUpperCase() === "GET") {
            if (options.url === "/transaction") {
                xhr.open(method, "http://localhost:8000" + options.url + "/?account_id=" + options.data);
                console.log("GET request was send http://localhost:8000" + options.url + "/?account_id=" + options.data);
            }

            if (options.url === "/account" || Object.keys(options.data).length === 0) {
                xhr.open(method, "http://localhost:8000" + options.url);
                console.log("GET request was send http://localhost:8000" + options.url);
            }
            xhr.send();

        } else {
            let fd = new FormData;

            if (method.toUpperCase() === "PUT") {
                if (options.url == "/account") {
                    fd.append("name", options.data.name);
                    xhr.open(method, "http://localhost:8000" + options.url + "/?name=" + options.data.name);
                    console.log("PUT request was send http://localhost:8000" + options.url + "/?name=" + options.data.name);
                } else if (options.url == "/transaction") {
                    fd.append("type", options.data.type);
                    fd.append("name", options.data.name);
                    fd.append("sum", parseInt(options.data.sum, 10));
                    fd.append("account_id", options.data.account_id);

                    xhr.open(method, "http://localhost:8000" + options.url + "/?name=" + options.data.name);
                    console.log("PUT request was send http://localhost:8000" + options.url + "/?name=" + options.data.name)
                }

            } else if (method.toUpperCase() === "DELETE") {
                let id = "";
                if (options.data.accound_id != undefined) id = options.data.accound_id;
                else id = options.data;
                fd.append("id", id);
                xhr.open(method, "http://localhost:8000" + options.url + "/?id=" + id);
                console.log("DELETE request was send http://localhost:8000" + options.url + "/?id=" + id);
            } else if (method.toUpperCase() === "POST") {
                if (options.url === "/user/login") {
                    fd.append("email", options.data.email);
                    fd.append("password", options.data.password);
                    xhr.open(method, "http://localhost:8000" + options.url);
                    console.log("POST request was send http://localhost:8000" + options.url);
                } else if (options.url === "/user/logout") {
                    xhr.open(method, "http://localhost:8000" + options.url);
                    console.log("POST request was send http://localhost:8000" + options.url);
                } else if (options.url === "/user/register") {
                    fd.append("name", options.data.name)
                    fd.append("email", options.data.email);
                    fd.append("password", options.data.password);
                    xhr.open(method, "http://localhost:8000" + options.url);
                    console.log("POST request was send http://localhost:8000" + options.url);
                }
            }
            xhr.send(fd);
        }

        xhr.onload = function () {
            options.callback(null, xhr.response)
        }

    } catch (exception) {

    }
}