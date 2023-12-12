import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './auth.js';
const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

import { getLivro, getLivros, createLivro, deleteLivro } from './database.js';

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


app.use(express.json())

app.get("/livros", isLoggedIn, async (req, res) => {
    const livros = await getLivros()
    res.send(livros);
});

app.get("/livros/:id", isLoggedIn, async (req, res) => {
    const id = req.params.id
    const livros = await getLivro(id)
    res.send(livros);
});

app.delete("/livros/:id", isLoggedIn, async (req, res) => {
    const id = req.params.id
    const livros = await deleteLivro(id)
    res.send(livros);
});

app.post("/livros", isLoggedIn, async (req, res) => {
    const {titulo, sinopse, autor} = req.body
    const livro = await createLivro(titulo, sinopse, autor)
    res.send(livro)
})


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Autenticar com google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req, res) => {
    res.send('Erro no login');
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
