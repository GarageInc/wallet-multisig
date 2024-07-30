const bcu = require('bigint-crypto-utils');

const paillierBigint = require('paillier-bigint');

function L(a, n) {
  return (a - 1n) / n
}

function getGenerator (n, n2) { // n2 = n*n
  const alpha = bcu.randBetween(n);
  const beta = bcu.randBetween(n);
  return ((alpha * n + 1n) * bcu.modPow(beta, n, n2)) % n2;
}

// Implementaion is extracted from here
// https://github.com/juanelas/paillier-bigint/blob/63a69bb22ce78076789f6ef594dc8d91fc21234a/src/ts/generateRandomKeys.ts
// We only generate p, q & n at this point
export async function generateRandomTriple(bitlength=2048, simpleVariant=false) {
  let p, q, n, g;
  // if p and q are bitLength/2 long ->  2**(bitLength - 2) <= n < 2**(bitLength)
  do {
    p = await bcu.prime(Math.floor(bitlength / 2) + 1);
    q = await bcu.prime(Math.floor(bitlength / 2));
    n = p * q;
  } while (q === p || bcu.bitLength(n) !== bitlength);

  if (simpleVariant) {
    // If using p,q of equivalent length, a simpler variant of the key
    // generation steps would be to set
    // g=n+1, lambda=(p-1)(q-1), mu=lambda.invertm(n)
    g = n + 1n;
  } else {
    const n2 = n ** 2n;
    g = n+1;
  }

  return { p, q, g };
}

export function tripleToKeys(p, q) {
  let g = arguments.length > 2 ? arguments[2] : undefined;
  let n, lambda, mu;

  // Here we assume that p & q were validated on generation
  n = p * q;

  if ( g == undefined ) g = n + 1n;
  const simpleVariant = g == n + 1n;

  if (simpleVariant) {
    // If using p,q of equivalent length, a simpler variant of the key
    // generation steps would be to set
    // g=n+1, lambda=(p-1)(q-1), mu=lambda.invertm(n)
    lambda = (p - 1n) * (q - 1n)
    mu = bcu.modInv(lambda, n)
  } else {
    const n2 = n ** 2n;
    lambda = bcu.lcm(p - 1n, q - 1n)
    mu = bcu.modInv(L(bcu.modPow(g, lambda, n2), n), n)
  }

  const publicKey = new paillierBigint.PublicKey(n, g);
  const privateKey = new paillierBigint.PrivateKey(lambda, mu, publicKey, p, q);
  return { publicKey, privateKey }
}
