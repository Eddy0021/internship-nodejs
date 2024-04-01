// usersController.js
const { v4: uuidv4 } = require('uuid');

const users = [];
const hobbies = []

module.exports = {
    getAllUsers: (req, res) => {
        // Set headers
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });

        // Send the response body
        res.end(JSON.stringify({ data: users, error: null }));
    },
    createUser: (req, res, data) => {
        const ID = uuidv4();

        const newUser = {
            user: {
                id: ID,
                name: data.name,
                email: data.email
            },
            links: {
                self: `/api/users/${ID}`,
                hobbies: `/api/users/${ID}/hobbies`
            }
        };

        const newHobbies = {
            userId: ID,
            hobbies: [],
            links: {
                self: `/api/users/${ID}/hobbies`,
                user: `/api/users/${ID}`
            }
        }

        users.push(newUser);
        hobbies.push(newHobbies);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ data: newUser, error: null }));
    
        return res;
    },    
    deleteUser: (req, res, userId) => {
        const userIndex = users.findIndex(item => item.user.id === userId);
        const userhobbiesIndex = hobbies.findIndex(hobby => hobby.userId === userId);

        res.setHeader("Content-Type", "application/json");
    
        if (userIndex === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
        } else {
            users.splice(userIndex, 1);
            hobbies.splice(userhobbiesIndex, 1);

            res.statusCode = 200;  
            res.end(JSON.stringify({ data: {success: true}, error: null }));
        }

        return res;
    },    
    getUserHobbies: (req, res, userId) => {
        const userHobbiesIndex = hobbies.findIndex(hobby => hobby.userId === userId);

        // Set headers
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=3600'
        });
    
        if (userHobbiesIndex !== -1) {
            const userHobbies = hobbies[userHobbiesIndex].hobbies || [];
    
            const responseData = {
                hobbies: userHobbies,
                links: {
                    self: `/api/users/${userId}/hobbies`,
                    user: `/api/users/${userId}`
                }
            };

            res.statusCode = 200;            
            res.end(JSON.stringify({ data: responseData, error: null }));
        } else {
            res.statusCode = 404;  
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
        }

        return res;
    },       
    updateUserHobbies: (req, res, userId, body) => {
        const userIndex = users.findIndex(item => item.user.id === userId);
        const userHobbiesIndex = hobbies.findIndex(hobby => hobby.userId === userId);

        res.setHeader("Content-Type", "application/json");
    
        if (userIndex !== -1) {
            const user = users[userIndex].user;
            const existingHobbies = hobbies[userHobbiesIndex].hobbies || [];
            const newHobbies = body.hobbies || [];

            if(newHobbies.length === 0 && existingHobbies.length === 0){
                newHobbies.push("sport");
                newHobbies.push("dancing");
            }
    
            // Update hobbies list
            hobbies[userHobbiesIndex].hobbies = [... new Set([...existingHobbies, ...newHobbies])];
                
            res.statusCode = 200;           
            res.end(JSON.stringify({ data: newHobbies, error: null }));
        } else {
            res.statusCode = 404;           
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
        }
    }     
};
