const admin          = require('firebase-admin');
const serviceAccount = require('./global-legal-hack-firebase-adminsdk-zmp55-cd83c6899a.json')
var faker = require('faker/locale/pt_BR');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://global-legal-hack.firebaseio.com"
});




const createPai = async () => {
  var radom_cabelo = faker.random.boolean() % 3

  var cor_cabelo = ''
  

                numProcesso: this.ID,
                qtd_crianca: this.qtdCrianca,
                cor_olho: this.corOlho,  
                cor_cabelo: this.tipo_cabelo,
                cor_pele: this.cor_pele,
                pcd:this.pcd,
                hiv:this.hiv,
                doenca_tratavel: this.doenca_tratavel,
                doenca_intratavel:this.doenca_intratavel,
                deficiencia_mental:this.deficiencia_mental,
                sexo:this.sexo,   
                color: 'transparent',
                active: 'false',
                idade_min: parseInt(this.de),
                idade_max: parseInt(this.ate)






  if (radom_cabelo == 0) {
    cor_cabelo = 'loiro'
  }else if (radom_cabelo == 1) {
    cor_cabelo = 'preto'
  }else {
    cor_cabelo = 'castanho'
  }

 

  await admin.firestore().collection('pais').add({
    active: faker.random.boolean(),
    creation_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    cor_cabelo: cor_cabelo,
    nome_adotante: faker.name.findName(),
    numProcesso: faker.random.number(),
    

  })
}