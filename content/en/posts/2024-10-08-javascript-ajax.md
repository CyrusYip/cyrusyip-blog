---
title: What Is Ajax and How to Use it
date: 2024-10-08T00:00:00+08:00
slug: javascript-ajax
tags:
  - javascript
  - web
lastmod: 2024-10-08T00:00:00+08:00
---

Ajax (**A**synchronous **Ja**vaScript and **X**ML) is a method for sending and receiving data from a web server. It allows parts of a web page to be updated without reloading the whole page. Ajax isn't a specific technology, but rather a concept that can be implemented using various methods: [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) or libraries like [Axios](https://axios-http.com/). Although Ajax originally used XML, it uses JSON more commonly nowadays.

## Set Up a Test Server

Before we dive into Ajax examples, let's create a simple server to handle our requests. Save the following code as `server.js`.

```js
// Usage: save this code as server.js and run "node server.js [port]"
import http from 'http';
import fs from 'fs';

// Get the port from command-line arguments
const port = process.argv[2] || 3000;

const requestListener = (request, response) => {
  console.log(request.url)
  if (request.url === '/' || request.url === '/index.html') {
    // Serve the index.html file
    const filePath =  'index.html';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Error loading index.html');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
      }
    });
  } else if (request.url === '/data1') {
    // Return text for URL '/data1'
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('This is the response for /data1');
  } else if (request.url === '/data2') {
    // Return text for URL '/data2'
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('This is the response for /data2');
  } else if (request.url === '/data3') {
    // Return text for URL '/data3'
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('This is the response for /data3');
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not Found');
  }
};

// Create and start the server
const server = http.createServer(requestListener);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## Interactive Demo of fetch(), XMLHttpRequest and Axios

The following demo showcases three methods for making Ajax requests. Save the code as `index.html` to the directory that contains `server.js`.

```html
<!-- Copy this code and save it as "index.html" -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ajax Demo</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>
  <h1>Ajax Demo</h1>
  <hr />
  <h2>Use fetch()</h2>
  <button onclick="LoadDataFetch('/data1')">Load data 1 (fetch)</button>
  <button onclick="LoadDataFetch('/data2')">Load data 2 (fetch)</button>
  <button onclick="LoadDataFetch('/data3')">Load data 3 (fetch)</button>
  <button onclick="LoadDataFetch('/data4')">Load data 4 (fetch, 404)</button>
  <h2>Use XMLHttpRequest</h2>
  <button onclick="LoadDataXHR('/data1')">Load data 1 (XHR)</button>
  <button onclick="LoadDataXHR('/data2')">Load data 2 (XHR)</button>
  <button onclick="LoadDataXHR('/data3')">Load data 3 (XHR)</button>
  <button onclick="LoadDataXHR('/data4')">Load data 4 (XHR, 404)</button>
  <h2>Use Axios</h2>
  <button onclick="LoadDataAxios('/data1')">Load data 1 (Axios)</button>
  <button onclick="LoadDataAxios('/data2')">Load data 2 (Axios)</button>
  <button onclick="LoadDataAxios('/data3')">Load data 3 (Axios)</button>
  <button onclick="LoadDataAxios('/data4')">Load data 4 (Axios, 404)</button>
  <h2>Data</h2>
  <p id="response">No data loaded</p>
  <script>
    const responseElement = document.querySelector("#response");
    // Fetches data using fetch()
    const LoadDataFetch = (url) => {
      fetch(url)
        .then((response) => {
          // Check if the response status is OK (200-299)
          if (!response.ok) {
            return `HTTP error: ${response.status}`;
          }
          return response.text(); // Return the response data as text
        })
        .then((data) => {
          // Display the data
          responseElement.textContent = data;
        })
        .catch((error) => {
          // Handle errors, e.g., network issues
          responseElement.textContent = "Request failed (fetch)";
        });
    };

    const LoadDataXHR = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onreadystatechange = () => {
        // Check if the response status is 200
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Display the data
          responseElement.textContent = xhr.responseText;
        } else {
          responseElement.textContent = `HTTP error: ${xhr.status}`;
        }
      };
      xhr.onerror = () => {
        // Handle errors, e.g., network issues
        responseElement.textContent = "Request failed (XHR)";
      };
      xhr.send();
    };
    const LoadDataAxios = (url) => {
      axios
        .get(url)
        .then((response) => {
          // Display the data
          responseElement.textContent = response.data;
        })
        .catch((error) => {
          // Handle errors, e.g., 404 and network issues
          responseElement.textContent = `Request failed (Axios): ${error.message}`; // Offline, 404
        });
    };
  </script>
</body>

</html>
```

Run `node server.js`, and visit <http://localhost:3000/>. The demo provides buttons to load data from different URLs using three methods: `fetch()`, `XMLHttpRequest` and `Axios`. Try clicking the buttons to see how each method handles requests, including error responses.

---

## Reference

- [Fetching data from the server - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)
- [Fetch - javascript.info](https://javascript.info/fetch)
- [XMLHttpRequest - javascript.info](https://javascript.info/xmlhttprequest)
- [Minimal Example | Axios Docs](https://axios-http.com/docs/example)