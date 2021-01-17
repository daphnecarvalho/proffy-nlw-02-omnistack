import express from 'express';
import cors from 'cors';
import routes from  './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//localhost:3333
app.listen(3333);

//---------------------//

// GET: buscar ou listar uma informação
// POST: criar alguma nova informação
// PUT: atualizar uma informação existente
// DELETE: deletar uma informação existente

// Corpo (Request body): dados para a criação ou atualização de um registro
// Route Params: identificar qual recurso dentro da nossa rota quero atualizar ou deletar
// Query Params: paginação, filtros, ordenação

//---------------------//

/*
app.get('/users', (request, response) => {
    console.log(request.query);
    
    const users = [
        { name:"Diego", age: 25 },
        { name:"Daphne", age: 26 },
    ];
    
    return response.json(users);
});

app.post('/users', (request, response) => {
    console.log(request.body);
    
    const users = [
        { name:"Diego", age: 25 },
        { name:"Daphne", age: 26 },
    ];
    
    return response.json(users);
});

app.delete('/users/:id', (request, response) => {
    console.log(request.params);
    
    const users = [
        { name:"Diego", age: 25 },
        { name:"Daphne", age: 26 },
    ];
    
    return response.json(users);
});
*/