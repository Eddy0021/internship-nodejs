const parseRequestBody = require('../utils/parseRequestBody');
const usersController = require('../controllers/usersController');

// Handle GET /api/users request
function handleGetUsers(req, res) {
    return usersController.getAllUsers(req, res);
}

// Handle POST /api/users request
async function handlePostUsers(req, res) {
    let count = 0;
    try {
        count++;
        const body = await parseRequestBody(req);
        count = body;
        return usersController.createUser(req, res, body);
    } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
}

// Handle DELETE /api/users/:userId request
function handleDeleteUser(req, res) {
    try {
        const userId = req.url.split('/')[3]; // Extract userId from URL
        return usersController.deleteUser(req, res, userId);
    } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
}

// Handle GET /api/users/:userId/hobbies request
function handleGetUserHobbies(req, res) {
    try {
        const userId = req.url.split('/')[3]; // Extract userId from URL
        return usersController.getUserHobbies(req, res, userId);
    } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
}

// Handle PATCH /api/users/:userId/hobbies request
async function handlePatchUserHobbies(req, res) {
    try {
        const userId = req.url.split('/')[3]; // Extract userId from URL
        const body = await parseRequestBody(req);
        return usersController.updateUserHobbies(req, res, userId, body);
    } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
}

module.exports = (req, res) => {
    const { method, url } = req;

    if (url === '/api/test') {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'test' }));
        return;
    }

    switch (method) {
        case 'GET':
            if (url === '/api/users') {
                return handleGetUsers(req, res);
            } else if (url.startsWith('/api/users/') && url.endsWith('/hobbies')) {
                return handleGetUserHobbies(req, res);
            }
            break;
        case 'POST':
            if (url === '/api/users') {
                return handlePostUsers(req, res);
            }
            break;
        case 'DELETE':
            if (url.startsWith('/api/users/')) {
                return handleDeleteUser(req, res);
            }
            break;
        case 'PATCH':
            if (url.startsWith('/api/users/') && url.endsWith('/hobbies')) {
                return handlePatchUserHobbies(req, res);
            }
            break;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
};
