import { isNumberEven } from "./math_func.js";

import http from 'http'
import fs from "fs/promises"
import url from "url"

import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname, __filename)

let filePath;


const server = http.createServer( async (req, res) => {

    try {
        if (req.method !== "GET") {
            throw new Error ("other methods than GET not allowed")
        }

        if (req.url === "/") {
            res.writeHead(200, {"Content-Type": "text/html"})
            filePath = path.join(__dirname, "public", "index.html")
            let data = await fs.readFile(filePath)
            res.end(data)
        }

        else if (req.url === "/about") {
            res.writeHead(200, {"Content-Type": "text/html"})
            filePath = path.join(__dirname, "public", "about.html")
            let data = await fs.readFile(filePath)
            res.end(data)
        }

        else {
            res.writeHead(404, {"Content-Type": "text/html"})
            res.end("<h1>File not found</h1>")
        }


    } catch (err) {
        res.end(`Something went wrong: ${err}`)
    }

    
})


const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("SERVER RUNNING")
})


