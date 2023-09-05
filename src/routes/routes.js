import { addStudent,authStudent } from "../controller/controllers.js";

const routes = (app) => {
    app.route('/register')
       .post(addStudent);

    app.route('/login')
       .post(authStudent);
}

export default routes;