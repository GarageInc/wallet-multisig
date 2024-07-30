import { Vault, Signature } from '../database';

// We assume that protocol takes 10 sec, hence if user joins in less that 10 sec from expiration moment
// Likely, there will no time to finish the protocol
const approxProtocolDuration = 10000;

const signatureDataProjection = {
  '_id': 1,
  blockchain: 1,
  assetId: 1,
  assetType: 1,
  addressFrom: 1,
  destination: 1,
  destinationSignature: 1,
  destinationSignedByPubKey: 1,
  rawData: 1,
  dealHash: 1,
  hashOrder: 1,
  nonce: 1,
  status: 1,
  minimumSigAmount: 1,
  partiesAmount: 1,
  transactionHex: 1,
  transactionId: 1,
  protocolVersion: 1,
  initiatorPubKey: 1,
  initiatedAt: 1,
  expiresIn: 1,
  'partiesState.accountPubKey': 1,
  'partiesState.partyPubKeySignature': 1,
  'partiesState.partyPubKey': 1,
  'partiesState.sequence': 1,
  'partiesState.status': 1,
  'partiesState.joinedAt': 1,
  'state.round': 1,
  'state.subsessionId': 1,
  'state.fromParty': 1,
  'state.toParty': 1,
  'state.message': 1,
  'state.partyPubKey': 1,
  'state.providedAt': 1,
}

const signatureMetaProjection = {
  '_id': 1,
  protocolVersion: 1,
  initiatorPubKey: 1,
  initiatedAt: 1,
  'partiesState.accountPubKey': 1,
  'partiesState.partyPubKeySignature': 1,
  'partiesState.partyPubKey': 1,
  'partiesState.joinedAt': 1,
  'state.partyPubKey': 1,
  'state.providedAt': 1,
}

export const createSession = async (req, res) => {
  try {
    const signature = new Signature({
      blockchain: req.body.blockchain,
      rawData: req.body.rawData,
      assetId: req.body.assetId,
      assetType: req.body.assetType,
      addressFrom: req.body.addressFrom,
      destination: req.body.destination,
      destinationSignature: req.body.destinationSignature,
      destinationSignedByPubKey: req.body.destinationSignedByPubKey,
      dealHash: req.body.dealHash,
      hashOrder: req.body.hashOrder,
      nonce: req.body.nonce,
      minimumSigAmount: req.body.minimumSigAmount,
      partiesAmount: req.body.partiesAmount,
      transactionHex: req.body.transactionHex,
      protocolVersion: req.body.protocolVersion,
      initiatorPubKey: req.auth.partyPubKey,
      expiresIn: req.body.expiresIn,
      partiesState: [
        {
          accountPubKey: req.auth.accountPubKey,
          partyPubKey: req.auth.partyPubKey,
          partyPubKeySignature: req.auth.partyPubKeySignature,
          timestamp: req.auth.timestamp,
          sequence: req.body.partyId,
        }
      ]
    });

    try {
      await signature.save();
      res.status(201).json({
        sessionId: signature._id.toString(),
        expiresIn: signature.expiresIn,
        initiatedAt: signature.initiatedAt,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSessionId = async (req, res) => {
  try {
    let signature = await Signature.findOne({ _id: req.params.id }).select(signatureDataProjection);

    if (
      signature.status == 'pending' &&
      Date.parse(signature.initiatedAt) + signature.expiresIn < Date.now()
    ) {
      signature.status = 'expired';
    }

    res.status(200).json(signature);
  } catch (err) {
    res.status(404).json({ error: "Not found" });
  }
}

// export const getMetaBySessionId = async (req, res) => {
//   try {
//     const signature = await Signature.findOne({ _id: req.params.id }).select(signatureMetaProjection);
//
//     // TODO session state should be stored in the database and can take follwoing values 'pending', 'ready', 'expired'
//     signature['status'] = signature.state.length === signature.partiesAmount ? 'ready' : 'pending';
//
//     res.status(200).json(signature);
//   } catch (err) {
//     res.status(404).json({ error: "Not found" });
//   }
// }

export const searchSessions = async (req, res) => {
  try {
    let mongoQuery;
    const notOlderThanTimestamp = (Date.now() - 12*60*1000); // 12 minutes from now
    if ( req.body.vaults ) {
      const addresses = req.body.vaults.map((vaultData) => vaultData[1]);
      mongoQuery = {
        addressFrom: { $in: addresses },
        // status: { $in: ['pending'] },
        initiatedAt: { $gt: notOlderThanTimestamp }
      };
    } else if ( req.body.dealHash ) {
      mongoQuery = {
        dealHash: req.body.dealHash,
        // status: { $in: ['pending'] },
        initiatedAt: { $gt: notOlderThanTimestamp }
      };
    } else {
      throw "Supported keys: vaults, dealHash";
    }
    const signatures = await Signature.find(mongoQuery).select(signatureDataProjection);

    for(const i in signatures) {
      if (
        signatures[i].status == 'pending' &&
        Date.parse(signatures[i].initiatedAt) + signatures[i].expiresIn < Date.now()
      ) {
        signatures[i].status = 'expired';
      }
    }

    res.status(200).json({ requests: signatures });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const joinSession = async (req, res) => {
  try {
    const signature = await Signature.findOne({ _id: req.params.id }).select(signatureDataProjection);
    const forbidToJoinAt = Date.parse(signature.initiatedAt) + signature.expiresIn - approxProtocolDuration;

    if ( forbidToJoinAt > Date.now() ) {
      const signaturePartyState = signature.partiesState.find(state => state.partyPubKey===req.auth.partyPubKey);

      if ( !signaturePartyState ) {
        const pendingCount = signature.partiesState.filter(state => state. status === 'pending').length;

        if ( !signature.minimumSigAmount || pendingCount < signature.minimumSigAmount ) {
          const partyState = {
            accountPubKey: req.auth.accountPubKey,
            partyPubKey: req.auth.partyPubKey,
            partyPubKeySignature: req.auth.partyPubKeySignature,
            timestamp: req.auth.timestamp,
            sequence: req.body.partyId,
          };

          await Signature
            .findOneAndUpdate(
              { _id: req.params.id },
              { "$push": { "partiesState": partyState } },
              { new: true },
            );

          res.status(201).json({ partyState: partyState });
        } else {
          res.status(400).json({ error: "Session is filled" });
        }
      } else {
        if ( signaturePartyState.status == 'pending' ) {
          res.status(400).json({ error: "Party already joined" });
        } else {
           res.status(401).json({ error: "Unauthorized update" });
        }
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const updateSessionState = async (req, res) => {
  try {
    let   signature = await Signature.findOne({ _id: req.params.id }).select(signatureDataProjection);
    const forbidToUpdateAt = Date.parse(signature.initiatedAt) + signature.expiresIn + approxProtocolDuration;

    if ( forbidToUpdateAt > Date.now() ) {
      const signaturePartyState = signature.partiesState.find(state => state.partyPubKey===req.auth.partyPubKey);

      if ( signaturePartyState && signaturePartyState.status == 'pending' ) {

        const roundName = req.body.state[0].round;
        const fromParty = signaturePartyState.sequence;
        let sessionState = signature.state.find(state => state.roundName == roundName && state.fromParty == fromParty);

        if (!sessionState) {
          // TODO make sure we are not allowing multiple joins of the same user
          for( var i = 0; i < req.body.state.length; i++ ) {
            sessionState = {
              round: roundName,
              subsessionId: req.body.state[i].subsessionId || 0,
              message: req.body.state[i].message,
              fromParty,
              partyPubKey: req.auth.partyPubKey,
              bodySignature: req.auth.bodySignature,
              timestamp: req.auth.timestamp,
            };

            if (parseInt(req.body.state[i].toParty) > 0) sessionState.toParty = parseInt(req.body.state[i].toParty);

            // TODO make sure model validatations are taking place here
            signature = await Signature
              .findOneAndUpdate(
                { _id: req.params.id },
                { "$push": { "state": sessionState } },
                { new: true },
              ).select(signatureDataProjection);
          }

          res.status(201).json(signature);
        } else {
          res.status(400).json({ error: "State already exists" });
        }
      } else {
        res.status(400).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const confirmSession = async (req, res) => {
  try {
    let   signature = await Signature.findOne({ _id: req.params.id }).select(signatureDataProjection);
    const forbidToUpdateAt = Date.parse(signature.initiatedAt) + signature.expiresIn + approxProtocolDuration;

    if ( forbidToUpdateAt > Date.now() ) {
      const signaturePartyState = signature.partiesState.find(state => state.partyPubKey===req.auth.partyPubKey);
      const partyStateIndex = signature.partiesState.findIndex(state => state.partyPubKey==req.auth.partyPubKey);

      if ( signaturePartyState && signaturePartyState.status == 'pending' ) {

        let updateSet = {};
        updateSet[`partiesState.${partyStateIndex}.status`] = 'ready';
        const readyCount = 1 + signature.partiesState.reduce((i, partyState) => {
          return partyState.status == 'ready' ? i+1 : i; }
        , 0);
        if ( readyCount >= signature.minimumSigAmount ) updateSet['status'] = 'ready';
        if ( !signature.transactionId ) {
          updateSet['transactionId'] = req.body.transactionId;
        } else {
          if (signature.transactionId !== req.body.transactionId) {
            // What shall we do in this case?
            // updateSet['status'] = 'rejected';
          }
        }

        signature = await Signature
          .findOneAndUpdate(
            { _id: req.params.id },
            { '$set' : updateSet },
          ).select(signatureDataProjection);

        res.status(201).json(signature);

      } else {
        res.status(401).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const rejectSession = async (req, res) => {
  try {
    let   signature = await Signature.findOne({ _id: req.params.id }).select(signatureDataProjection);
    const forbidToUpdateAt = Date.parse(signature.initiatedAt) + signature.expiresIn + approxProtocolDuration;

    if ( forbidToUpdateAt > Date.now() ) {
      const signaturePartyState = signature.partiesState.find(state => state.partyPubKey===req.auth.partyPubKey);
      const partyStateIndex = signature.partiesState.findIndex(state => state.partyPubKey==req.auth.partyPubKey);

      if ( signaturePartyState && signaturePartyState.status == 'pending' ) {

        let updateSet = {};
        updateSet[`partiesState.${partyStateIndex}.status`] = 'rejected';

        let rejectSession = false;

        const rejectedCount = 1 + signature.partiesState.reduce((i, partyState) => {
          return partyState.status == 'rejected' ? i+1 : i; }
        , 0);

        rejectSession = rejectSession || rejectedCount > (signature.partiesAmount - signature.minimumSigAmount);
        rejectSession = rejectSession || signature.state.length > 0;

        if (rejectSession) updateSet['status'] = 'rejected';

        signature = await Signature
          .findOneAndUpdate(
            { _id: req.params.id },
            { '$set' : updateSet },
          ).select(signatureDataProjection);

        if ( signature.dealHash && updateSet.status === 'rejected') {
          const mongoQuery = {
            _id: { $ne: req.params.id },
            dealHash: req.body.dealHash,
            status: 'pending',
          };

          await Signature.updateOne(mongoQuery, { '$set' : { status: 'rejected' } });
        }

        res.status(201).json(signature);
      } else {
        res.status(401).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
