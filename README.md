# Biblioteca
### Insert para o banco de dados:
```sql
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE notes (
	id integer PRIMARY KEY auto_increment, 
	titulo VARCHAR(255) NOT NULL,
	sinopse TEXT NOT NULL,
	autor VARCHAR(255) NOT NULL
);

INSERT INTO notes (titulo, sinopse, autor)
VALUES
('Dracula', ' Como um romance epistolar, a narrativa é relatada por meio de cartas, diários e artigos de jornal. Não tem um único protagonista, mas abre com o advogado Jonathan Harker fazendo uma viagem de negócios para ficar no castelo de um nobre da Transilvânia, Conde Drácula.', 'Bram Stoker'),
('As aventuras de Pinóquio', 'Esculpido a partir do tronco de uma árvore por um entalhador chamado Geppetto numa pequena aldeia italiana, Pinóquio nasceu como um boneco de madeira, mas que sonhava em ser um menino de verdade.', 'Carlo Collodi');
('Divina Comédia', 'A Divina Comédia propõe que a Terra está no meio de uma sucessão de círculos concêntricos que formam a Esfera armilar e o meridiano onde é Jerusalém hoje seria o lugar atingido por Lúcifer ao cair das esferas mais superiores e que fez da Terra Santa o Portal do Inferno. ', 'Dante Alighieri');
```
