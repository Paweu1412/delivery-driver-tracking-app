import Users from '../users.json' assert { type: "json" };

let deliveryDrivers = {};

const addDeliveryDriver = (id) => {
  const { name } = Users.find(user => user.id == id);

  deliveryDrivers[id] = { name: name, status: 0 };
}

const removeDeliveryDriver = id => {
  delete deliveryDrivers[id];
}

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
        name: user.name,
        lastStatus: user.last_status
      }
    });
  } else {
    res.json({ success: false });
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('identifier');
  res.clearCookie('password');

  res.json({ success: true });
};

export const getActiveUsers = (_req, res) => {
  res.json({ success: true, activeUsers: Object.keys(deliveryDrivers) });
};

export const getUserData = (req, res) => {
  const { identifier } = req.query;

  console.log(deliveryDrivers);

  if (deliveryDrivers[identifier]) {
    const user = deliveryDrivers[identifier];

    if (user) {
      res.json({
        success: true,
        userData: {
          name: user.name,
          status: user.status
        }
      });
    } else {
      res.json({ success: false });
    }
  }
};

export const setDuty = (req, res) => {
  const { identifier } = req.cookies;
  let { duty } = req.query;

  if (duty === 'true') {
    addDeliveryDriver(identifier);
  } else {
    removeDeliveryDriver(identifier);
  }

  res.json({ success: true });
}