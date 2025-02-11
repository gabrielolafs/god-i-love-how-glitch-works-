const http = require('node:http');
const fs = require('node:fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

const appdata = [
    { task: 'Reading: HTML 1 Review Topics', priority: 'Medium', dueDate: '2025-01-16', complete: "on"},
    { task: 'a1', priority: 'High', dueDate: '2025-01-23', complete: "on"},
    { task: 'a2 (grader: update by clicking the checkbox)', priority: 'High', dueDate: '2025-02-03', complete: ""},
];

const serverNoMongo = http.createServer((request, response) => {
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    }
});

const handleGet = (request, response) => {
    const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
    let pathname = `${dir}${parsedUrl.pathname}`;

    if (pathname === `${dir}/`) {
        pathname = `${dir}index.html`;
    }

    else if (pathname === `${dir}/tasks`) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(appdata));
        return;
    }

    fs.readFile(pathname, (err, data) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>');
        } else {
            const type = mime.getType(pathname);
            response.writeHead(200, { 'Content-Type': type });
            response.end(data);
        }
    });
};

const handlePost = (request, response) => {
    let dataString = '';

    request.on('data', (data) => {
        dataString += data;
    });

    request.on('end', () => {
        const parsedData = JSON.parse(dataString);

        if (request.url === '/submit') {
            appdata.push(parsedData);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(appdata));
        } else if (request.url === '/update-task') {
            const task = appdata.find(t => t.task === parsedData.task);
            if (task) {
                task.complete = parsedData.complete;
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(appdata));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Task not found' }));
            }
        } else if (request.url === '/delete-task') {
            const taskIndex = appdata.findIndex(t => t.task === parsedData.task);
            if (taskIndex !== -1) {
                appdata.splice(taskIndex, 1);
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(appdata));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Task not found' }));
            }
        }
    });
};

serverNoMongo.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// const sendFile = (response, filename) => {
//     const type = mime.getType(filename);
//
//     fs.readFile(filename, (err, content) => {
//         if (err === null) {
//             response.writeHead(200, { 'Content-Type': type });
//             response.end(content);
//         } else {
//             response.writeHead(404);
//             response.end('404 Error: File Not Found');
//         }
//     });
// };

// serverNoMongo.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });


/*
const http = require( "node:http" ),
    fs   = require( "node:fs" ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

// const appdata = [
//     { "model": "toyota", "year": 1999, "mpg": 23 },
//     { "model": "honda", "year": 2004, "mpg": 30 },
//     { "model": "ford", "year": 1987, "mpg": 14}
// ]

const appdata = [
    { task: 'Complete Assignment 1', priority: 'High', dueDate: '2021-09-15' },
    { task: 'Complete Assignment 2', priority: 'Medium', dueDate: '2021-09-20' },
    { task: 'Complete Assignment 3', priority: 'Low', dueDate: '2021-09-25' }
];

// let fullURL = ""
const serverNoMongo = http.createServer( function( request,response ) {
    if( request.method === "GET" ) {
        handleGet( request, response )
    }else if( request.method === "POST" ){
        handlePost( request, response )
    }

    // The following shows the requests being sent to the serverNoMongo
    // fullURL = `http://${request.headers.host}${request.url}`
    // console.log( fullURL );
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if( request.url === "/" ) {
        sendFile( response, "public/index.html" )
    }
    else if( request.url === "/appdata" ) {
        response.writeHead( 200, "OK", { "Content-Type": "text/plain" })
        response.end( JSON.stringify( appdata ) )
    }
    else{
        sendFile( response, filename )
    }
}

const handlePost = function( request, response ) {
    let dataString = ""

    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        console.log( JSON.parse( dataString ) )
        const parsedData = JSON.parse( dataString )
        appdata.push( parsedData );
        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end("Data Received")
    })
}

const sendFile = function( response, filename ) {
    const type = mime.getType( filename )

    fs.readFile( filename, function( err, content ) {
        // if the error = null, then we've loaded the file successfully
        if( err === null ) {
            response.writeHeader( 200, { "Content-Type": type })
            response.end( content )

        } else {
            response.writeHeader( 404 )
            response.end( "404 Error: File Not Found" )

        }
    })
}

// process.env.PORT references the port that Glitch uses
// the following line will either use the Glitch port or one that we provided
serverNoMongo.listen( process.env.PORT || port )

*/