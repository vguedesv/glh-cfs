const functions      = require('firebase-functions');
const admin          = require('firebase-admin');
const serviceAccount = require('./global-legal-hack-firebase-adminsdk-zmp55-cd83c6899a.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://global-legal-hack.firebaseio.com"
});

exports.initSearch = async (req, res) => {

  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.set('Access-Control-Allow-Methods', "POST")

  const numProcesso = req.body.numProcesso
  const paisPossiveis =  await admin.firestore().collection('pais').where('numProcesso', '==', numProcesso).get()
  var paiSelecionado = {}
  paisPossiveis.forEach((doc) => {
    paiSelecionado    = doc.data()
    paiSelecionado.id = doc.id
  }) 
  await admin.firestore().collection('pais').doc(paiSelecionado.id).update({
    color: 'green',
    active: true
  })
  const filhosPossiveis = await admin.firestore().collection('filhos').get()
  
  filhosPossiveis.forEach(async (doc)=>{
    var childCompatibility = 0
    var tmpFilhoObject = {}
    tmpFilhoObject = doc.data()
    tmpFilhoObject.id  = doc.id
    
    await admin.firestore().collection('filhos').doc(tmpFilhoObject.id).update({
      active: true,
      color: 'orange'
    })

    console.log({msg: 'pai', paiSelecionado})



    if (paiSelecionado.cor_olho == tmpFilhoObject.cor_olho){
      childCompatibility += 3
      console.log('match olho, total:', childCompatibility)
    } 
    if (paiSelecionado.cor_cabelo == tmpFilhoObject.cor_cabelo) {
      childCompatibility += 5
      console.log('match cor cabelo, total:', childCompatibility)

    }
    if (paiSelecionado.tipo_cabelo == tmpFilhoObject.tipo_cabelo) {
      childCompatibility += 5
      console.log('match tipo cabelo, total:', childCompatibility)
    }
    if (paiSelecionado.cor_pele == tmpFilhoObject.cor_pele){
      childCompatibility += 10
      console.log('match cor pele, total:', childCompatibility)
    } 
    if (paiSelecionado.sexo == tmpFilhoObject.sexo) {
      console.log('match sexo, total:', childCompatibility)
      childCompatibility += 10
    }
    
    if (tmpFilhoObject.pcd){
      if (paiSelecionado.pcd){
        childCompatibility += 8
        console.log('match ambos pcd, total:', childCompatibility)
      }
    }else {
      childCompatibility += 8
    }

    if (tmpFilhoObject.hiv){
      if (paiSelecionado.hiv){
        childCompatibility += 8
        console.log('match ambos hiv, total:', childCompatibility)
      }
    }else {
      childCompatibility += 8
    }

    if (tmpFilhoObject.deficiencia_mental){
      if (paiSelecionado.deficiencia_mental){
        console.log('match ambos deficiencia, total:', childCompatibility)
        childCompatibility += 8
      }
    }else {
      childCompatibility += 8
    }

    if (tmpFilhoObject.doenca_tratavel){
      if (paiSelecionado.doenca_tratavel){
        console.log('match doenca tratavel, total:', childCompatibility)
        childCompatibility += 5
      }
    }else {
      childCompatibility += 5
    }

    if (tmpFilhoObject.doenca_intratavel){
      if (paiSelecionado.doenca_intratavel){
        console.log('match doenca intratavel, total:', childCompatibility)
        childCompatibility += 8
      }
    }else {
      childCompatibility += 8
    }

    if ( paiSelecionado.idade_min <= tmpFilhoObject.idade <= paiSelecionado.idade_max){
      childCompatibility += 30
      console.log('match idade perfeita, total:', childCompatibility)
    }else if (tmpFilhoObject.idade < paiSelecionado.idade_min) {
      var ans = 100 - ((paiSelecionado.idade_min - tmpFilhoObject.idade)*5)
      childCompatibility = childCompatibility + ans * 0,3
      console.log('match idade caso 1, total:', childCompatibility)
    }else {
      var ans = 100 - ((tmpFilhoObject.idade - paiSelecionado.idade_max)*5)
      childCompatibility = childCompatibility + ans * 0,3
      console.log('match idade caso 2, total:', childCompatibility)
    }

    const uniqueID = paiSelecionado.numProcesso + tmpFilhoObject.id
    await admin.firestore().collection('pai_filho').doc(uniqueID).set({
      percentual: childCompatibility,
      pai_numProcesso: paiSelecionado.numProcesso,
      filho_id: tmpFilhoObject.id
    })
    var tmpColor = 'red'
    if ( childCompatibility > 75) {
      tmpColor = 'green'
    }

    await admin.firestore().collection('filhos').doc(tmpFilhoObject.id).update({
      active: false,
      color: tmpColor

    })
    

    res.send(200)
  })

}