db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database',
        },
    ],
});

db.createCollection('phonebook');

db.phonebook.insert({ text: 'Write code', done: true });
db.phonebook.insert({ text: 'Learn about containers', done: false });

