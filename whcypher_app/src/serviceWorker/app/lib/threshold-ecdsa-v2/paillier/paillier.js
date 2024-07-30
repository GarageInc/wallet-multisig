// NOTE: it uses this implementation https://github.com/juanelas/bigint-mod-arith/
// and it is vulnurable to side channel attack by it design. But I never saw POC for it
const bcu = require('bigint-crypto-utils')

const paillierBigint = require('paillier-bigint')

function L(a, n) {
  return (a - 1n) / n
}

function getGenerator(n, n2) {
  // n2 = n*n
  const alpha = bcu.randBetween(n)
  const beta = bcu.randBetween(n)
  return ((alpha * n + 1n) * bcu.modPow(beta, n, n2)) % n2
}

// Implementaion is extracted from here
// https://github.com/juanelas/paillier-bigint/blob/63a69bb22ce78076789f6ef594dc8d91fc21234a/src/ts/generateRandomKeys.ts
// We only generate p, q & n at this point
export async function generateRandomTriple(bitlength = 2048, simpleVariant = false) {
  let p, q, n, g
  // if p and q are bitLength/2 long ->  2**(bitLength - 2) <= n < 2**(bitLength)
  do {
    // TODO: p and q should be safe prime. This mean you should pick p0 which is prime,
    // and test that (p*2 + 1) is also prime.
    // TODO: used isProbablyPrime implemnts only Miller-Rabin test and uses 16 rounds by default
    // that makes a probability 4^-16; ANSI X9.80 states that you must use 50 iterations of MR,
    // or between 2 and 27 rounds of MR (for the case >1024 is 2 round) and one round of Lucas.
    // You haven't got lucas => 50 MR when.
    p = await bcu.prime(Math.floor(bitlength / 2) + 1)
    q = await bcu.prime(Math.floor(bitlength / 2))
    n = p * q
  } while (q === p || bcu.bitLength(n) !== bitlength)

  // TODO: keep only "simple" variant. Generialized pailler not needed here and simple makes things more complicated.
  if (simpleVariant) {
    // If using p,q of equivalent length, a simpler variant of the key
    // generation steps would be to set
    // g=n+1, lambda=(p-1)(q-1), mu=lambda.invertm(n)
    g = n + 1n
  } else {
    // TODO: you haven't use it, have you?
    const n2 = n ** 2n
    g = n + 1
  }

  return { p, q, g }
}

export function tripleToKeys(p, q) {
  let g = arguments.length > 2 ? arguments[2] : undefined
  let n, lambda, mu

  // Here we assume that p & q were validated on generation
  n = p * q

  if (g == undefined) g = n + 1n
  const simpleVariant = g == n + 1n

  if (simpleVariant) {
    // If using p,q of equivalent length, a simpler variant of the key
    // generation steps would be to set
    // g=n+1, lambda=(p-1)(q-1), mu=lambda.invertm(n)
    // TODO: lambda=(p-1)(q-1)/2; but the real value of euler totien is ((p-1) / ((p-1) gcd (q-1)) * (q-1)
    lambda = (p - 1n) * (q - 1n)
    mu = bcu.modInv(lambda, n)
  } else {
    const n2 = n ** 2n
    lambda = bcu.lcm(p - 1n, q - 1n)
    // TODO: you may avoid modPow here because `(n + 1)^x = x*n + 1 (mod n^2)`
    mu = bcu.modInv(L(bcu.modPow(g, lambda, n2), n), n)
  }

  const publicKey = new paillierBigint.PublicKey(n, g)
  const privateKey = new paillierBigint.PrivateKey(lambda, mu, publicKey, p, q)
  return { publicKey, privateKey }
}
