module.exports.absolute = function (number) {
  if (number >= 0) {
    return number;
  }
  return -number;
};

module.exports.greet = function (name) {
  return `welcome ${name}`;
};

module.exports.getCurrencies = function () {
  return ['USD', 'AUD', 'EUR'];
};

module.exports.getProduct = function (prodId) {
  return { id: prodId, price: 10 };
};

module.exports.registerUser = function (username) {
  if (!username) throw new Error('Username is required');
  return { id: Date.now(), username };
};

function num(email) {
  console.log(`Sending email to ${email}`);
  return `hello ${email}`;
}

module.exports.sendEmail = num;

module.exports.notifyCustomer = function (customer) {
  // return num(customer.email);
  // console.log('\n\n look at this \n', module, exports);
  return module.exports.sendEmail(customer.email);
  // return require('./lib').sendEmail(customer.email);
};
