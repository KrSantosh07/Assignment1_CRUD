// !Requiring HTTP request to create web server
const http = require('http');
// !Requiring PORT 
const PORT = 9988;
//Requiring fs module
const fs = require('fs');

//!Creating Server to handle request
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h2 class="display-2 text-center"> Handling CRUD operation </h2>');

        res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><div class="text-center my-5"><a class="btn btn-success" href="create" role="button">Create</a> <a class="btn btn-primary" href="read" role="button">Read</a> <a class="btn btn-warning" href="append" role="button">Append</a> <a class="btn btn-danger" href="/delete" role="button">Delete</a></div>');

        res.end();
    }
    else if (req.url == "/create") {
        if (fs.existsSync('details.txt')) {
            res.end("<h1>Already Exist!</h1>");
        }
        else {
            fs.writeFile('details.txt', 'Welcome to neosoft! ', (err) => {
                if (err) throw err
                else{
                    res.end('<h1>file Created!</h1>');
                } 
            })
        }
    }

    else if (req.url == "/read") {
        if (fs.existsSync('details.txt')) {
            let data = fs.readFileSync('details.txt');
            res.end(data.toString());
        } else {
            res.end("<h1>File not created yet!</h1>")
        }
    }

    else if (req.url == "/append") {
        if (fs.existsSync('details.txt')) {
            fs.appendFile('details.txt', 'Hey Your file is updated..', (err) => {
                if (err) throw err
                else res.end('<h1>Data Updated!</h1>')
            })
        } else {
            res.end("<h1>File not Created yet!</h1>");
        }
    }

    else if (req.url == "/delete") {
        if (fs.existsSync('details.txt')) {
            fs.unlinkSync('details.txt')
            res.end("<h1>File Deleted!</h1>");

        } else {
            console.log("<h1>File not Exist!</h1>")
        }
    }
})

//! Starting our sever
server.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`Server work on ${PORT}`);
})