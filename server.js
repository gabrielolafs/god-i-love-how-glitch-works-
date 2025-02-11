const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = "mongodb+srv://ggolafsson:ap5qqlcvidW5s0uV@cluster0.g3ygk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            if (!user) {
                console.log('User not found');
            }
            else {
                console.log('TESTING ONLY: Incorrect password. Password is ${user.password}');
            }
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Routes
app.post('/sign-in', (req, res, next) => {
    console.log(`Received sign-in request for username: ${req.body.username}`);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info.message);
            console.log(user)
            return res.status(401).send(info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return next(err);
            }
            console.log('User authenticated successfully');
            return res.send('Authenticated');
        });
    })(req, res, next);
});

app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.send('User registered');
});

app.get('/tasks', ensureAuthenticated, async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

app.post('/submit', ensureAuthenticated, async (req, res) => {
    const newTask = new Task({ ...req.body, user: req.user._id });
    await newTask.save();
    res.status(201).send('Task added');
});

app.post('/update-task', ensureAuthenticated, async (req, res) => {
    const { task, complete } = req.body;
    await Task.updateOne({ task, user: req.user._id }, { complete });
    res.send('Task updated');
});

app.post('/delete-task', ensureAuthenticated, async (req, res) => {
    const { task } = req.body;
    await Task.deleteOne({ task, user: req.user._id });
    res.send('Task deleted');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Received sign-up request for username: ${username}`);
    const user = new User({ username, password });
    try {
        await user.save();
        console.log('User registered successfully');
        res.send('User registered');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
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