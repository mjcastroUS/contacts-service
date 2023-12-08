var express = require('express');
var router = express.Router();

//integramos el servicio externo, pasandole la ruta completa de nuestra llamada al servicio externo
var fakesocial = require('../services/fakeservice');

var contacts = [
  {"name": "peter" , "phone": 1234},
  {"name": "john" , "phone": 9874}

]

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.send(contacts);
});


/* POST contact */
router.post('/', function(req, res, next){
  var contact = req.body;
  contact.push(contact);
  res.sendStatus(201);
});

//tenemos que hacer asincrona la funcion get
//router.get('/:name',  function (req, res, next){
router.get('/:name', async function (req, res, next){
  var name = req.params.name;
  var result = contacts.find( c => {
    return c.name === name;
  });
  var social = await fakesocial.getSocial(name);

  if (result){
    //res.send(result);
    //añadimos al resultado lo que nos devuelve la llamada al servicio externo

    res.send({
      ...result,
      "social": social
    })



  }else{
    res.send(404);
  }
  

})

module.exports = router;
