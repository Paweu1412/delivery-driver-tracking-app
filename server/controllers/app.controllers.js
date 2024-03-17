import Users from '../users.json' assert { type: "json" };

export const loginUser = (req, res) => {
  const { identifier, password } = req.query;

  const user = Users.find(user => user.id == identifier && user.password == password);
  
  if (user) {
    res.cookie('identifier', identifier);
    res.cookie('password', password);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Nieprawidłowy identyfikator lub hasło' });
  }
};

export const isUserExists = (req, res) => {
  const { identifier, password } = req.cookies;

  const user = Users.find(user => user.id == identifier && user.password == password);

  if (user) {
    res.json({ 
      success: true, 
      userData: { 
        id: user.id, 
        name: user.name 
      }
    });
  } else {
    res.json({ success: false });
  }
}