import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'biblioteca'
}).promise()

export async function getLivros(){
    const [rows] = await pool.query("SELECT * FROM livros")
    return rows
}

export async function getLivro(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM livros
    WHERE id = ?
    `, [id])
    return rows
}

export async function deleteLivro(id) {
    try {
        const [result] = await pool.query(`
            DELETE FROM livros
            WHERE id = ?
        `, [id]);
        if (result.affectedRows > 0) {
            return { success: true, message: 'Livro deletado com sucesso.' };
        } else {
            return { success: false, message: 'Livro não encontrado.' };
        }
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        return { success: false, message: 'Erro ao deletar livro.' };
    }
}

export async function createLivro(titulo, sinopse, autor) {
    const [result] = await pool.query(`
    INSERT INTO livros (titulo, sinopse, autor)
    VALUES (?, ?, ?)
    `,[titulo, sinopse, autor])
    return result
}

