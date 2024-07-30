import { ec } from 'elliptic';
import { sha256 } from 'js-sha256';

const extractBodyDetailsNew = (req) => {
  const partyPubKey = req.headers['x-partypubkey'] || "";
  const bodySignature = req.headers['x-bodysignature'] || "";
  const timestamp = req.headers['x-timestamp'] || "";
  const apiVersion = parseInt(req.headers['x-api-version'] || "");

  const hash = sha256.create();

  if (apiVersion >= 2) {
    const bodyPresent = req.rawBody ? !!req.rawBody.byteLength : false;

    if (bodyPresent) {
      hash.update(req.rawBody.toString());
    } else {
      // console.log("apiVersion", apiVersion);
      // console.log("bodyPresent", bodyPresent);
      // console.log("req.originalUrl", req.originalUrl);

      var regexVaultJoin = new RegExp("/join$", "i");
      var regexVaultAndSigConfirm = new RegExp("/confirm$", "i");
      var regexVaultAndSigReject = new RegExp("/reject$", "i");

      if (
        regexVaultJoin.test(req.originalUrl) ||
        regexVaultAndSigConfirm.test(req.originalUrl) ||
        regexVaultAndSigReject.test(req.originalUrl)
      ) {
        // Bug in join requests. this is fixed in updated version of the wallet.
        hash.update("");
      } else {
        hash.update(req.originalUrl);
      }
    }
    hash.update(timestamp);
  } else {
    // console.log("apiVersion", 1);
    hash.update(req.rawBody.toString());
    hash.update(timestamp);
  }

  return {
    bodyHash: hash.toString(),
    bodySignature,
    partyPubKey,
    timestamp
  };
}

const extractAccountDetails = (req) => {
  const accountPubKey = req.headers['x-accountpubkey'] || "";
  const partyPubKeySignature = req.headers['x-partypubkeysignature'] || "";
  const partyPubKey = req.headers['x-partypubkey'] || "";
  const timestamp = req.headers['x-timestamp'] || "";

  const hash = sha256.create();
  hash.update(partyPubKey);
  hash.update(timestamp);

  return {
    partyPubKeyHash: hash.toString(),
    partyPubKeySignature,
    accountPubKey
  };
}

const verifySignature = (hash, signature, pubKey) => {
  const curve = new ec('secp256k1')
  const pk = curve.keyFromPublic(pubKey, 'hex');
  return pk.verify(Buffer.from(hash, "hex"), signature);
}

export const postRequestSignatureVerifier = (req, res, next) => {
  if ( req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE' ) {
    const { bodyHash, bodySignature, partyPubKey, timestamp } = extractBodyDetailsNew(req);
    const { partyPubKeyHash, partyPubKeySignature, accountPubKey } = extractAccountDetails(req);
    if ( verifySignature(bodyHash, bodySignature, partyPubKey) && verifySignature(partyPubKeyHash, partyPubKeySignature, accountPubKey) ) {
      req.auth = {
        partyPubKey,
        accountPubKey,
        bodySignature,
        partyPubKeySignature,
        timestamp,
      }
      next();
    } else {
      res.status(401).json({ error: "Unauthorized request" });
    }
  } else {
    next();
  }
}
