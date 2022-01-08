const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');

const TodoModel = require('./todo/todo.model.js');

const contentParent = {
    name: 'Todo App',
    icon: 'Dashboard',
}

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
    // databases: [mongoose],
    rootPath: '/admin',
    resources: [
        {
            resource: TodoModel,
            options: {
                parent: contentParent
            }
        },
    ],
    dashboard: {
        handler: async () => {
            console.log('dashboard')
        },
        // component: AdminBro.bundle('./my-dashboard-component')
    },
    branding: {
        companyName: 'CyberNerd',
        softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
    },
})

const ADMIN = {
    email: 'root',
    password: 'toor',
}

// const router = AdminBroExpress.buildRouter(adminBro)
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        if (ADMIN.password === password && ADMIN.email === email) {
            return ADMIN
        }
        return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somepassword',
})

module.exports = router;