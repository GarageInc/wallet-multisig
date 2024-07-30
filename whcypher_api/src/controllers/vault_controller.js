import { Vault, Transaction } from '../database';

// We assume that protocol takes 10 sec, hence if user joins in less that 10 sec from expiration moment
// Likely, there will no time to finish the protocol
const approxProtocolDuration = 10000;

const vaultDataProjection = {
  blockchain: 1,
  status: 1,
  sessionComment: 1,
  partiesAmount: 1,
  minimumSigAmount: 1,
  protocolVersion: 1,
  initiatorPubKey: 1,
  initiatedAt: 1,
  expiresIn: 1,
  'partiesState.accountPubKey': 1,
  'partiesState.partyPubKey': 1,
  'partiesState.sequence': 1,
  'partiesState.status': 1,
  'state.round': 1,
  'state.fromParty': 1,
  'state.toParty': 1,
  'state.message': 1,
}

// const vaultMetaProjection = {
//   protocolVersion: 1,
//   initiatorPubKey: 1,
//   initiatedAt: 1,
//   'partiesState.accountPubKey': 1,
//   'partiesState.partyPubKeySignature': 1,
//   'partiesState.partyPubKey': 1,
//   'partiesState.joinedAt': 1,
//   'state.partyPubKey': 1,
//   'state.providedAt': 1,
// }

export const createSession = async (req, res) => {
  const vault = new Vault({
    blockchain: req.body.blockchain,
    sessionComment: req.body.sessionComment,
    partiesAmount: req.body.partiesAmount,
    minimumSigAmount: req.body.minimumSigAmount,
    protocolVersion: req.body.protocolVersion,
    initiatorPubKey: req.auth.partyPubKey,
    expiresIn: req.body.expiresIn,
    partiesState: [
      {
        accountPubKey: req.auth.accountPubKey,
        partyPubKey: req.auth.partyPubKey,
        partyPubKeySignature: req.auth.partyPubKeySignature,
        timestamp: req.auth.timestamp,
        sequence: 1,
      }
    ]
  });

  try {
    await vault.save();
    res.status(201).json({
      sessionId: vault._id.toString(),
      expiresIn: vault.expiresIn,
      initiatedAt: vault.initiatedAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSessionId = async (req, res) => {
  try {
    let vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);

    if (
      vault.status == 'penidng' &&
      Date.parse(vault.initiatedAt) + vault.expiresIn < Date.now()
    ) {
      vault.status = 'expired';
    }

    res.status(200).json(vault);
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
}

// export const getMetaBySessionId = async (req, res) => {
//   try {
//     const vault = await Vault.findOne({ _id: req.params.id }).select(vaultMetaProjection);
//
//     // TODO session state should be stored in the database and can take following values 'pending', 'ready', 'expired'
//     vault['status'] = vault.state.length === vault.partiesAmount ? 'ready' : 'pending';
//
//     res.status(200).json(vault);
//   } catch (err) {
//     res.status(404).json({ error: "Not found" });
//   }
// }

export const joinSession = async (req, res) => {
  try {
    const vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);
    const forbidToJoinAt = Date.parse(vault.initiatedAt) + vault.expiresIn - approxProtocolDuration;

    if (forbidToJoinAt > Date.now()) {
      const partyState = vault.partiesState.find(state => state.accountPubKey === req.auth.accountPubKey);

      if ( !partyState ) {
        const joinedPartiesSequences = vault.partiesState.map(partyState => partyState.sequence).sort();

        // This way we always make sure that parties are always taking sequantial order
        // Regardles if any part has left and someone else has joined then.
        // Final party group will always have a sequential sequence numbers
        const newPartySequence = joinedPartiesSequences.reduce((vacantSequence, joinedPartySequence) => {
          return joinedPartySequence - vacantSequence >= 1 ? vacantSequence : vacantSequence+1;
        }, 1);

        const newPartyState = {
          accountPubKey: req.auth.accountPubKey,
          partyPubKey: req.auth.partyPubKey,
          partyPubKeySignature: req.auth.partyPubKeySignature,
          timestamp: req.auth.timestamp,
          sequence: newPartySequence,
        };

        await Vault
          .updateOne(
            { _id: req.params.id },
            { "$push": { "partiesState": newPartyState } },
            { new: true },
          );

        res.status(201).json({ partyState: newPartyState });
      } else {
        res.status(400).json({ error: "Already joined" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const updateSessionState = async (req, res) => {
  try {
    let vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);
    const forbidToUpdateAt = Date.parse(vault.initiatedAt) + vault.expiresIn + approxProtocolDuration;

    if (forbidToUpdateAt > Date.now()) {
      const partyState = vault.partiesState.find(state => state.partyPubKey===req.auth.partyPubKey);

      if ( partyState && vault.status == 'pending' && partyState.status == 'pending' ) {

        const roundName = req.body.state[0].round;
        const fromParty = partyState.sequence;
        let vaultState = vault.state.find(state => state.roundName == roundName && state.fromParty == fromParty);

        if ( !vaultState ) {
          // TODO make sure we are not allowing multiple joins of the same user
          vaultState = {
            round: req.body.state[0].round,
            message: req.body.state[0].message,
            fromParty,
            partyPubKey: req.auth.partyPubKey,
            bodySignature: req.auth.bodySignature,
            timestamp: req.auth.timestamp,
          };

          if (parseInt(req.body.state[0].toParty) > 0) vaultState.toParty = parseInt(req.body.state[0].toParty);

          // TODO make sure model validations are taking place here
          vault = await Vault
            .findOneAndUpdate(
              { _id: req.params.id },
              { "$push": { "state": vaultState } },
              { new: true },
            ).select(vaultDataProjection);

          res.status(201).json(vault);
        } else {
          res.status(200).json(vault);
        }
      } else {
        res.status(401).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const confirmSession = async (req, res) => {
  try {
    let   vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);
    const forbidToUpdateAt = Date.parse(vault.initiatedAt) + vault.expiresIn + approxProtocolDuration;

    if (forbidToUpdateAt > Date.now()) {
      const partyState = vault.partiesState.find(state => state.partyPubKey==req.auth.partyPubKey);
      const partyStateIndex = vault.partiesState.findIndex(state => state.partyPubKey==req.auth.partyPubKey);

      if ( partyState && vault.status == 'pending' && partyState.status == 'pending' ) {
        let updateSet = {};
        updateSet[`partiesState.${partyStateIndex}.status`] = 'ready';
        const readyCount = vault.partiesState.filter(state => state.status == 'ready').length + 1;
        if ( readyCount == vault.partiesAmount ) updateSet['status'] = 'ready';

        vault = await Vault
          .findOneAndUpdate(
            { _id: req.params.id },
            { '$set': updateSet },
          ).select(vaultDataProjection);

        res.status(200).json(vault);

      } else {
        res.status(401).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const rejectSession = async (req, res) => {
  try {
    let   vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);
    const forbidToUpdateAt = Date.parse(vault.initiatedAt) + vault.expiresIn + approxProtocolDuration;

    if (forbidToUpdateAt > Date.now()) {
      const partyState = vault.partiesState.find(state => state.partyPubKey==req.auth.partyPubKey);
      const deletePartyState = vault.status == 'pending' && vault.state.length == 0;

      if ( partyState && partyState.status == 'pending' ) {
        if (deletePartyState) {
          let updateSet = {
            partiesState: { partyPubKey: req.auth.partyPubKey }
          };

          await Vault.updateOne({ _id: req.params.id }, { '$pull': updateSet })
          vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);

          res.status(200).json(vault);
        } else {
          let updateSet = {};
          if ( vault.status == 'pending' ) updateSet['status'] = 'rejected';

          const partyStateIndex = vault.partiesState.findIndex(state => state.partyPubKey == req.auth.partyPubKey);
          updateSet[`partiesState.${partyStateIndex}.status`] = 'rejected';

          vault = await Vault.updateOne({ _id: req.params.id }, { '$set': updateSet });
          vault = await Vault.findOne({ _id: req.params.id }).select(vaultDataProjection);

          res.status(200).json(vault);
        }
      } else {
        res.status(401).json({ error: "Unauthorized update" });
      }
    } else {
      res.status(400).json({ error: "Session expired" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
