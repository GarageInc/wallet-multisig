import crypto from 'crypto'

import Avataaars from './avataaars'

const elements = {
  skin: ['tanned', 'yellow', 'pale', 'light', 'brown', 'darkBrown', 'black'],
  top: [
    'dreads01',
    'dreads02',
    'frizzle',
    'shaggyMullet',
    'shaggy',
    'shortCurly',
    'shortFlat',
    'shortRound',
    'sides',
    'shortWaved',
    'theCaesarAndSidePart',
    'theCaesar',
    'bigHair',
    'bob',
    'bun',
    'curly',
    'curvy',
    'dreads',
    'frida',
    'froAndBand',
    'fro',
    'longButNotTooLong',
    'miaWallace',
    'shavedSides',
    'straightAndStrand',
    'straight01',
    'straight02',
    'eyepatch',
    'turban',
    'hijab',
    'hat',
    'winterHat01',
    'winterHat02',
    'winterHat03',
    'winterHat04',
  ],
  hairColor: [
    'auburn',
    'black',
    'blonde',
    'blondeGolden',
    'brown',
    'brownDark',
    'pastelPink',
    'platinum',
    'red',
    'silverGray',
  ],
  hatColor: [
    'black',
    'blue01',
    'blue02',
    'blue03',
    'gray01',
    'gray02',
    'heather',
    'pastelBlue',
    'pastelGreen',
    'pastelOrange',
    'pastelRed',
    'pastelYellow',
    'pink',
    'red',
    'white',
  ],
  accessories: ['none', 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers'],
  accessoriesColor: [
    'black',
    'blue01',
    'blue02',
    'blue03',
    'gray01',
    'gray02',
    'heather',
    'pastelBlue',
    'pastelGreen',
    'pastelOrange',
    'pastelRed',
    'pastelYellow',
    'pink',
    'red',
    'white',
  ],
  facialHair: ['none', 'beardLight', 'beardMagestic', 'beardMedium', 'moustaceFancy', 'moustacheMagnum'],
  facialHairColor: [
    'auburn',
    'black',
    'blonde',
    'blondeGolden',
    'brown',
    'brownDark',
    'pastelPink',
    'platinum',
    'red',
    'silverGray',
  ],
  clothing: [
    'shirtCrewNeck',
    'blazerAndShirt',
    'blazerAndSweater',
    'collarAndSweater',
    'graphicShirt',
    'hoodie',
    'overall',
    'shirtCrewNeck',
    'shirtScoopNeck',
    'shirtVNeck',
  ],
  clothingGraphic: ['skrullOutline', 'skrull', 'resist', 'pizza', 'hola', 'diamond', 'deer', 'dumbia', 'bear', 'bat'],
  clothingColor: [
    'black',
    'blue01',
    'blue02',
    'blue03',
    'gray01',
    'gray02',
    'heather',
    'pastelBlue',
    'pastelGreen',
    'pastelOrange',
    'pastelRed',
    'pastelYellow',
    'pink',
    'red',
    'white',
  ],
  eyes: [
    'squint',
    'closed',
    'cry',
    'default',
    'eyeRoll',
    'happy',
    'hearts',
    'side',
    'surprised',
    'wink',
    'winkWacky',
    'xDizzy',
  ],
  eyebrows: [
    'angryNatural',
    'defaultNatural',
    'flatNatural',
    'frownNatural',
    'raisedExcitedNatural',
    'sadConcernedNatural',
    'unibrowNatural',
    'upDownNatural',
    'raisedExcited',
    'angry',
    'default',
    'sadConcerned',
    'upDown',
  ],
  mouth: [
    'concerned',
    'default',
    'disbelief',
    'eating',
    'grimace',
    'sad',
    'screamOpen',
    'serious',
    'smile',
    'tongue',
    'twinkle',
    'vomit',
  ],
}

const createConfig = (pubKey) => {
  const count = Object.keys(elements).length
  const hexdigest = crypto.createHash('sha512').update(pubKey).digest('hex')
  const hasharray = []

  for (let i = 0; i < count; i += 1) {
    const blocksize = Math.floor(hexdigest.length / count)
    const currentstart = i * blocksize
    const currentend = (i + 1) * blocksize
    hasharray.push(parseInt(hexdigest.substring(currentstart, currentend), 16))
  }
  if (pubKey) {
    let i = 0
    let elOpts
    let elI
    const svgConfig = Object.keys(elements)
      .sort()
      .reduce((obj, key) => {
        elOpts = elements[key]
        elI = hasharray[i] % elOpts.length
        obj[key] = elOpts[elI]
        i += 1
        return obj
      }, {})

    return svgConfig
  }

  return null
}

export const createAvatarSvg = (pubKey) => {
  const svgConfig = createConfig(pubKey)
  return Avataaars.create(svgConfig)
}
