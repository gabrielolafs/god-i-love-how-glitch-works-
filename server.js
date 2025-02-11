const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your MongoDB Atlas connection string
const mongoURI = "mongodb+srv://ggolafsson:ap5qqlcvidW5s0uV@cluster0.g3ygk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    task: String,
    priority: String,
    dueDate: Date,
    complete: { type: String, default: 'off' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Routes
app.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return next(err);
            }
            return res.send('Authenticated');
        });
    })(req, res, next);
});

app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.send('User registered');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});

app.get('/tasks', ensureAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Error fetching tasks');
    }
});

app.post('/submit', ensureAuthenticated, async (req, res) => {
    const newTask = new Task({ ...req.body, user: req.user._id });
    try {
        await newTask.save();
        res.status(201).send('Task added');
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).send('Error adding task');
    }
});

app.post('/update-task', ensureAuthenticated, async (req, res) => {
    const { task, complete } = req.body;
    try {
        await Task.updateOne({ task, user: req.user._id }, { complete });
        res.send('Task updated');
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Error updating task');
    }
});

app.post('/delete-task', ensureAuthenticated, async (req, res) => {
    const { task } = req.body;
    try {
        await Task.deleteOne({ task, user: req.user._id });
        res.send('Task deleted');
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Error deleting task');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/auth-check', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.get('/user-info', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ username: req.user.username });
    } else {
        res.sendStatus(401);
    }
});

app.post('/sign-out', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});