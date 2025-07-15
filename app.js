const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001; // Порт для Express (отлично от порта бота)

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройки подключения к базе данных
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',   // Замените, если нужен пароль
    database: 'chatbottests',
    waitForConnections: true,
    connectionLimit: 10
};

// Создаем пул подключений к базе данных
const pool = mysql.createPool(dbConfig);

// Функция для получения случайного элемента
async function getRandomItem() {
    try {
        const [rows] = await pool.promise().query('SELECT id, name, `desc` FROM items ORDER BY RAND() LIMIT 1');
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error('Ошибка при получении случайного элемента:', err);
        return null;
    }
}

// Функция для удаления элемента по ID
async function deleteItemById(itemId) {
    try {
        const [result] = await pool.promise().query('DELETE FROM Items WHERE id = ?', [itemId]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Ошибка при удалении элемента:', err);
        return false;
    }
}

// Функция для получения элемента по ID
async function getItemById(itemId) {
    try {
        const [rows] = await pool.promise().query('SELECT id, name, `desc` FROM Items WHERE id = ?', [itemId]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error('Ошибка при получении элемента по ID:', err);
        return null;
    }
}

// API Endpoint для получения случайного элемента (для веб-интерфейса)
app.get('/api/randomItem', async (req, res) => {
    const item = await getRandomItem();
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'No items found' });
    }
});

// API Endpoint для удаления элемента по ID (для веб-интерфейса)
app.delete('/api/deleteItem/:id', async (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const success = await deleteItemById(itemId);
    if (success) {
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// API Endpoint для получения элемента по ID (для веб-интерфейса)
app.get('/api/getItem/:id', async (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const item = await getItemById(itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Запуск Express сервера
app.listen(port, () => {
    console.log("Express server listening on port" );
});

module.exports = {
    getRandomItem,
    deleteItemById,
    getItemById,
    pool // Экспортируем пул подключений
};
