const _jsSha = require('js-sha256');

// const bigInt = require('big-integer');
const { randBetween, modPow, modInv, gcd } = require('bigint-crypto-utils');
const _utils = require('../util/utils');

// Ported from https://github.com/ZenGo-X/zk-paillier/blob/master/src/zkproofs/correct_key_ni.rs

const SALT_STRING = 'Whale';
const M2 = 12;
const DIGEST_SIZE = 256;

// product of all primes < alpha: https://www.dcode.fr/primorial
const P = "1824183726245393467247644231302244136093537199057104213213550575243641782740360650490963459819244001947254814805714931325851267161710067435807383848463920901137710041673887113990643820798975386714299839914137592590654009952623014982962684955535111234311335565220917383311689115138496765310625882473439402233109450021984891450304679833752756159872219991089194187575068382762952239830901394850887215392132883640669486674102277756753260855640317510235617660944873631054630816035269100510337643250389997837634640249480037184290462924540150133678312185777228630834940021427688892876384196895677819059963882587092166301131529174343474451480089653483180602591751073139733370712300241581635049350925412683097729232092096276490229965785020041921736307394438075266234968515443716828633392848203945374591926800464450599823553052462708727219173990177119684565306222502415160037753326638045687574106534702341439991863742806351468290587722561435038912863815688133288619512790095919904026573249557024839383595481704184528960978957724597263323512030743875614290609368530643094080051166226135271385866188054556684837921935888945641944961066293159525602885452222458958772845494346799890196718717317906330936509091221354615991671869862034179206244894205681566781062633415772628848878715803040358836098609654889521393046492471227546079924219055408612815173193108753184477562256266860297096223934088509777393752624380757072082427603556077039945700711226680778392737267707541904355129695919972995501581794067880959822149963798096452613619855673307435602850208850402301583025111762622381953251883429317603005626232012725708694401272295509035367654620412640848204179955980722707996291909812529974361949926881288349518750747615837667549305083291804187179123453121466640918862622766511668478452223742058912575427337018022812631386313110243745000214354806312441270889672903307645611658893986526812130032112540367173736664288995222516688120866114984318582900331631896931709005163853429427759224323636152573453333607357348169167915027700846002932742550824939007414330697249569916339964247646402851281857942965519194576006169066153524163225631476643914033601957614124583206541834352791003930506139209204661104882701842617501635864883760885236797081996679496751254260706438583316885612406386543479255566185697792942478704336254208839180970748624881039948192415929866204318800220295457932550799088592217150597176505394120909914475575501881459804699385499576326684695531034075283165800622328491384987194944504461864105986907646706095956083156240472489616473946638879726524585936511018780747174387840018674670110430528051586069422163934697899931456041802624175449157279620104126331489491525955411465073551652840009163781923401029513048693746713122813578721687858104388238796796690";


const stringToHex = function stringToHex(string) {
  return string.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(2,"0"),"");
}

const computeDigest = function compute_digest(...args) {
  const hash = _jsSha.sha256.create();
  args.forEach(r => hash.update(r));
  return _utils.hexToInt(hash.toString());
}

const modSub = function modSub(a, b, modulus) {
  const a_m = a % modulus;
  const b_m = b % modulus;
  const sub_op = a_m - b_m + modulus;

  return sub_op % modulus;
}

const arraysEquals = function arraysEquals(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

const zkPillierCorrectKeyProof = function zkPillierCorrectKeyProof(dk) {
  const { n } = dk.publicKey;
  const keyLength = n.toString(2).length;
  const salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SALT_STRING;
  const salt_bn = _utils.hexToInt(stringToHex(salt));

  const rho_vec = [...Array(M2).keys()].map(i => {
      const seed_bn = computeDigest(bnToBuf(n), bnToBuf(salt_bn), bnToBuf(i));
      return maskGeneration(keyLength, seed_bn) % n;
  });

  const sigma_vec = rho_vec.map(i => extract_nroot(dk, i));
  return { sigma_vec };
};

const zkPillierCorrectKeyVerify = function zkPillierCorrectKeyVerify(ek, sigma_vec) {
  const keyLength = ek.n.toString(2).length;
  const salt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SALT_STRING;
  const salt_bn = _utils.hexToInt(stringToHex(salt));

  const rho_vec = [...Array(M2).keys()].map(i => {
      const seed_bn = computeDigest(bnToBuf(ek.n), bnToBuf(salt_bn), bnToBuf(i));
      return maskGeneration(keyLength, seed_bn) % ek.n;
  });

  const alpha_primorial = BigInt(P);
  const gcd_test = gcd(alpha_primorial,ek.n);

  const derived_rho_vec = [...Array(M2).keys()].map(i => modPow(BigInt(sigma_vec[i]), ek.n, ek.n));

  if ( arraysEquals(rho_vec, derived_rho_vec) && gcd_test == 1n ) {
      return true
  } else {
      return false
  }
};

function bnToBuf(bn) {
  var hex = BigInt(bn).toString(16);
  if (hex.length % 2) { hex = '0' + hex; }

  var len = hex.length / 2;
  var u8 = new Uint8Array(len);

  var i = 0;
  var j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j+2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}

function maskGeneration(keyKength, seed_bn) {
  const msklen = keyKength / DIGEST_SIZE + 1; // adding one sha256 is more efficient then rejection sampling (see A.4 (e) in the paper)
  const msklenHashes = [...Array(msklen).keys()].map(j => computeDigest(bnToBuf(seed_bn), bnToBuf(j)))
  const reducer = (acc,x,i) => acc + x << (BigInt(i) * BigInt(DIGEST_SIZE));
  return msklenHashes.reduce(reducer,0n);
}

function extract_nroot(dk, z) {
    const dk_n = dk._p * dk._q;

    const dk_pinv = modInv(dk._p, dk._q);
    const dk_qminusone = dk._q - 1n;
    const dk_pminusone = dk._p - 1n;

    const dk_phi = dk_pminusone * dk_qminusone;
    const dk_dn = modInv(dk_n, dk_phi);
    const dk_dp = dk_dn % dk_pminusone;
    const dk_dq = dk_dn % dk_qminusone;
    const zp = z % dk._p;
    const zq = z % dk._q;

    const rp = modPow(zp, dk_dp, dk._p);
    const rq = modPow(zq, dk_dq, dk._q);

    const diff = modSub(rq, rp, dk._q);
    const u = (diff * dk_pinv) % dk._q;
    return rp + (u * dk._p)
}

module.exports = {
  zkPillierCorrectKeyProof,
  zkPillierCorrectKeyVerify,
};
