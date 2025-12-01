[language=JavaScript]
const express = require('express') ; const app = express();
app.use(express.json());

// Exemple route simple app.get(’/’, (req, res) => res.json( message : "API is running !" ) ; ) ;

app.listen(3000, () => console.log("Server started on port 3000"));