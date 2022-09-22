const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

io.on('connection', (socket) => {
    console.log('User connected!');
    socket.on('playerEvent', (msj) =>{
        console.log(`message: ${msj}`);
    });

});

http.listen(PORT, () => console.log(`Server on port ${PORT}`))
