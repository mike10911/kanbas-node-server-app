import * as dao from './dao.js';

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const findAllUsers = async (req, res) => {
    try {
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const status = await dao.updateUser(userId, req.body);
      const currentUser = await dao.findUserById(userId);
      res.json(status);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: 'Username already taken' });
      } else {
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const signout = (req, res) => {
    try {
      req.session.destroy();
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  const profile = async (req, res) => {
    try {
      const currentUser = req.session['currentUser'];
      if (!currentUser) {
        res.sendStatus(401);
      } else {
        res.json(currentUser);
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.put('/api/users/:userId', updateUser);
  app.delete('/api/users/:userId', deleteUser);
  app.post('/api/users/signup', signup);
  app.post('/api/users/signin', signin);
  app.post('/api/users/signout', signout);
  app.post('/api/users/profile', profile);
}
