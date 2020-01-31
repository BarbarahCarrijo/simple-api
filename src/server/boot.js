const { port } = require('../environment/vars');
const conn = require('../database/connection');

module.exports = app => {
    conn()
        .then(async () => {
            console.log(`\nConnected to MongoDB`);

            app.listen(port, () => {
                console.log(`Server is listenning on port ${ port }`)
            })
        })
        .catch(error => {
            console.log(error)
        })
};