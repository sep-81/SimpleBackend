const exp = require('express');
const Joi = require('joi');
const app = exp();
app.use(exp.json());
//console.log(process.env,"\n\n");
//console.log(process.env.PORT,"\n\n");
//console.log(process.env.var,"\n\n");
app.get('/foo',(req,res) => {
    console.log('foo');
    return;
});
app.get('/', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }
    const name = req.body.name;
    if(!name) res.send('there is no name!');
    res.send();
});
app.listen(3000,() => { console.log("hello listenong on port 3000"); });
console.log(process.env.NODE_PATH,"\n\n");