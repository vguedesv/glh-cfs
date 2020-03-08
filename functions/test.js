const admin          = require('firebase-admin');
const serviceAccount = require('./global-legal-hack-firebase-adminsdk-zmp55-cd83c6899a.json')
var faker = require('faker/locale/pt_BR');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://global-legal-hack.firebaseio.com"
});

console.log('primeiro')


const createPai = async () => {
  var date = new Date().getTime()
  faker.seed(date);  
  var radom_cabelo = faker.random.boolean() % 3
  var cor_cabelo = ''
 
  if (radom_cabelo == 0) {
    cor_cabelo = 'loiro'
  }else if (radom_cabelo == 1) {
    cor_cabelo = 'preto'
  }else {
    cor_cabelo = 'castanho'
  }

  date = new Date().getTime()
  faker.seed(date)
  var numProcesso = faker.random.number()
  var random_cor_olho = numProcesso % 3
  

  if (random_cor_olho== 0) {
    cor_olho = 'azul'
  }else if (random_cor_olho== 1) {
    cor_olho = 'verde'
  }else {
    cor_olho = 'preto'
  }
  
  console.log('segundo')
  date = new Date().getTime()
  faker.seed(date)
  var randomPele = faker.random.number()
  var random_cor_pele = randomPele % 5
  var cor_pele = ''

  if (random_cor_pele == 0) {
    cor_pele = 'preta'
  }else if (random_cor_pele == 1) {
    cor_pele = 'branca'
  }else if (random_cor_pele == 2) {
    cor_pele = 'amarela'
  }else if(random_cor_pele == 3){
    cor_pele = 'parda'
  }else {
    cor_pele = 'indígena'
  }

  var pcd = faker.random.boolean()
  var hiv = faker.random.boolean()
  var doenca_tratavel = faker.random.boolean()
  var doenca_intratavel = faker.random.boolean()
  var deficiencia_mental = faker.random.boolean()

  date = new Date().getTime()
  faker.seed(date)
  var random_sexo = faker.random.number() % 2
  var sexo = ''
  if (random_sexo == 0) {

    sexo = 'masculino'

  }else {

    sexo = 'feminino'
  }

  var idade_min = faker.random.number({min: 0, max: 15})
  var idade_max = faker.random.number({min:idade_min, max: 15})

  console.log('antes do update')
  var response = await admin.firestore().collection('pais').add({
    active: false,
    creation_timestamp: admin.firestore.FieldValue.serverTimestamp(),
    cor_cabelo: cor_cabelo,
    nome_adotante: faker.name.findName(),
    numProcesso: numProcesso,
    color: 'transparent',
    active: 'false',
    qtd_crianca: 1,
    pcd: pcd,
    hiv: hiv,
    doenca_tratavel: doenca_tratavel,
    doenca_intratavel: doenca_intratavel,
    deficiencia_mental: deficiencia_mental,
    sexo: sexo,
    idade_min: idade_min,
    idade_max: idade_max

  })
  
  console.log('depois do update')
  console.log(response)
}

const createFilho = async () => {
  var idade = faker.random.number({min: 0, max: 15})
  var date = new Date().getTime()
  faker.seed(date);  
  var radom_cabelo = faker.random.boolean() % 3
  var cor_cabelo = ''
 
  if (radom_cabelo == 0) {
    cor_cabelo = 'loiro'
  }else if (radom_cabelo == 1) {
    cor_cabelo = 'preto'
  }else {
    cor_cabelo = 'castanho'
  }

  date = new Date().getTime()
  faker.seed(date)
  var numProcesso = faker.random.number()
  var random_cor_olho = numProcesso % 3
  

  if (random_cor_olho== 0) {
    cor_olho = 'azul'
  }else if (random_cor_olho== 1) {
    cor_olho = 'verde'
  }else {
    cor_olho = 'preto'
  }
  
  console.log('segundo')
  date = new Date().getTime()
  faker.seed(date)
  var randomPele = faker.random.number()
  var random_cor_pele = randomPele % 5
  var cor_pele = ''

  if (random_cor_pele == 0) {
    cor_pele = 'preta'
  }else if (random_cor_pele == 1) {
    cor_pele = 'branca'
  }else if (random_cor_pele == 2) {
    cor_pele = 'amarela'
  }else if(random_cor_pele == 3){
    cor_pele = 'parda'
  }else {
    cor_pele = 'indígena'
  }

  var pcd = faker.random.boolean()
  var hiv = faker.random.boolean()
  var doenca_tratavel = faker.random.boolean()
  var doenca_intratavel = faker.random.boolean()
  var deficiencia_mental = faker.random.boolean()

  date = new Date().getTime()
  faker.seed(date)
  var random_sexo = faker.random.number() % 2
  var sexo = ''
  if (random_sexo == 0) {

    sexo = 'masculino'

  }else {

    sexo = 'feminino'
  }

  var response = await admin.firestore().collection('filhos').add({
    creation_timestamp: admin.firestore.FieldValue.serverTimestamp(),
    nome_criança: faker.name.findName(),
    idade_criança: idade,
    cor_olho: cor_olho,
    cor_cabelo: cor_cabelo,
    cor_pele: cor_pele,
    pcd: pcd,
    hiv: hiv,
    doenca_tratavel: doenca_tratavel,
    doenca_intratavel: doenca_intratavel,
    deficiencia_mental: deficiencia_mental,
    sexo: sexo,   
    color: 'transparent',
    active: 'false'
  })
  console.log(response)
 
}
(async function main () {
  for (let i = 0;  i < 1000; i++){

    console.log(`criando filho ${i}`)
    await createFilho()
    console.log(`criando pai ${i}`)
    await createPai()
  }
})();