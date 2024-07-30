// source: Tron.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.object.extend(proto, google_protobuf_any_pb);
var core_Discover_pb = require('./core/Discover_pb.js');
goog.object.extend(proto, core_Discover_pb);
var core_contract_common_pb = require('./core/contract/common_pb.js');
goog.object.extend(proto, core_contract_common_pb);
goog.exportSymbol('proto.protocol.Account', null, global);
goog.exportSymbol('proto.protocol.Account.AccountResource', null, global);
goog.exportSymbol('proto.protocol.Account.FreezeV2', null, global);
goog.exportSymbol('proto.protocol.Account.Frozen', null, global);
goog.exportSymbol('proto.protocol.Account.UnFreezeV2', null, global);
goog.exportSymbol('proto.protocol.AccountId', null, global);
goog.exportSymbol('proto.protocol.AccountType', null, global);
goog.exportSymbol('proto.protocol.Block', null, global);
goog.exportSymbol('proto.protocol.BlockHeader', null, global);
goog.exportSymbol('proto.protocol.BlockHeader.raw', null, global);
goog.exportSymbol('proto.protocol.BlockInventory', null, global);
goog.exportSymbol('proto.protocol.BlockInventory.BlockId', null, global);
goog.exportSymbol('proto.protocol.BlockInventory.Type', null, global);
goog.exportSymbol('proto.protocol.ChainInventory', null, global);
goog.exportSymbol('proto.protocol.ChainInventory.BlockId', null, global);
goog.exportSymbol('proto.protocol.ChainParameters', null, global);
goog.exportSymbol('proto.protocol.ChainParameters.ChainParameter', null, global);
goog.exportSymbol('proto.protocol.DelegatedResource', null, global);
goog.exportSymbol('proto.protocol.DelegatedResourceAccountIndex', null, global);
goog.exportSymbol('proto.protocol.DisconnectMessage', null, global);
goog.exportSymbol('proto.protocol.DynamicProperties', null, global);
goog.exportSymbol('proto.protocol.Exchange', null, global);
goog.exportSymbol('proto.protocol.HelloMessage', null, global);
goog.exportSymbol('proto.protocol.HelloMessage.BlockId', null, global);
goog.exportSymbol('proto.protocol.InternalTransaction', null, global);
goog.exportSymbol('proto.protocol.InternalTransaction.CallValueInfo', null, global);
goog.exportSymbol('proto.protocol.Inventory', null, global);
goog.exportSymbol('proto.protocol.Inventory.InventoryType', null, global);
goog.exportSymbol('proto.protocol.Items', null, global);
goog.exportSymbol('proto.protocol.Items.ItemType', null, global);
goog.exportSymbol('proto.protocol.Key', null, global);
goog.exportSymbol('proto.protocol.MarketAccountOrder', null, global);
goog.exportSymbol('proto.protocol.MarketOrder', null, global);
goog.exportSymbol('proto.protocol.MarketOrder.State', null, global);
goog.exportSymbol('proto.protocol.MarketOrderDetail', null, global);
goog.exportSymbol('proto.protocol.MarketOrderIdList', null, global);
goog.exportSymbol('proto.protocol.MarketOrderList', null, global);
goog.exportSymbol('proto.protocol.MarketOrderPair', null, global);
goog.exportSymbol('proto.protocol.MarketOrderPairList', null, global);
goog.exportSymbol('proto.protocol.MarketPrice', null, global);
goog.exportSymbol('proto.protocol.MarketPriceList', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.BlockChainInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.BlockChainInfo.DupWitness', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.BlockChainInfo.Witness', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo.ApiInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo.LatencyInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.NodeInfo', null, global);
goog.exportSymbol('proto.protocol.MetricsInfo.RateInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo.ConfigNodeInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo.MachineInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo', null, global);
goog.exportSymbol('proto.protocol.NodeInfo.PeerInfo', null, global);
goog.exportSymbol('proto.protocol.PBFTCommitResult', null, global);
goog.exportSymbol('proto.protocol.PBFTMessage', null, global);
goog.exportSymbol('proto.protocol.PBFTMessage.DataType', null, global);
goog.exportSymbol('proto.protocol.PBFTMessage.MsgType', null, global);
goog.exportSymbol('proto.protocol.PBFTMessage.Raw', null, global);
goog.exportSymbol('proto.protocol.Permission', null, global);
goog.exportSymbol('proto.protocol.Permission.PermissionType', null, global);
goog.exportSymbol('proto.protocol.Proposal', null, global);
goog.exportSymbol('proto.protocol.Proposal.State', null, global);
goog.exportSymbol('proto.protocol.ReasonCode', null, global);
goog.exportSymbol('proto.protocol.ResourceReceipt', null, global);
goog.exportSymbol('proto.protocol.SRL', null, global);
goog.exportSymbol('proto.protocol.TXInput', null, global);
goog.exportSymbol('proto.protocol.TXInput.raw', null, global);
goog.exportSymbol('proto.protocol.TXOutput', null, global);
goog.exportSymbol('proto.protocol.TXOutputs', null, global);
goog.exportSymbol('proto.protocol.Transaction', null, global);
goog.exportSymbol('proto.protocol.Transaction.Contract', null, global);
goog.exportSymbol('proto.protocol.Transaction.Contract.ContractType', null, global);
goog.exportSymbol('proto.protocol.Transaction.Result', null, global);
goog.exportSymbol('proto.protocol.Transaction.Result.code', null, global);
goog.exportSymbol('proto.protocol.Transaction.Result.contractResult', null, global);
goog.exportSymbol('proto.protocol.Transaction.raw', null, global);
goog.exportSymbol('proto.protocol.TransactionInfo', null, global);
goog.exportSymbol('proto.protocol.TransactionInfo.Log', null, global);
goog.exportSymbol('proto.protocol.TransactionInfo.code', null, global);
goog.exportSymbol('proto.protocol.TransactionRet', null, global);
goog.exportSymbol('proto.protocol.Transactions', null, global);
goog.exportSymbol('proto.protocol.Vote', null, global);
goog.exportSymbol('proto.protocol.Votes', null, global);
goog.exportSymbol('proto.protocol.Witness', null, global);
goog.exportSymbol('proto.protocol.authority', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.AccountId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.AccountId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.AccountId.displayName = 'proto.protocol.AccountId';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Vote = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Vote, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Vote.displayName = 'proto.protocol.Vote';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Proposal = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Proposal.repeatedFields_, null);
};
goog.inherits(proto.protocol.Proposal, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Proposal.displayName = 'proto.protocol.Proposal';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Exchange = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Exchange, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Exchange.displayName = 'proto.protocol.Exchange';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrder = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MarketOrder, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrder.displayName = 'proto.protocol.MarketOrder';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrderList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MarketOrderList.repeatedFields_, null);
};
goog.inherits(proto.protocol.MarketOrderList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrderList.displayName = 'proto.protocol.MarketOrderList';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrderPairList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MarketOrderPairList.repeatedFields_, null);
};
goog.inherits(proto.protocol.MarketOrderPairList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrderPairList.displayName = 'proto.protocol.MarketOrderPairList';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrderPair = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MarketOrderPair, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrderPair.displayName = 'proto.protocol.MarketOrderPair';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketAccountOrder = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MarketAccountOrder.repeatedFields_, null);
};
goog.inherits(proto.protocol.MarketAccountOrder, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketAccountOrder.displayName = 'proto.protocol.MarketAccountOrder';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketPrice = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MarketPrice, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketPrice.displayName = 'proto.protocol.MarketPrice';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketPriceList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MarketPriceList.repeatedFields_, null);
};
goog.inherits(proto.protocol.MarketPriceList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketPriceList.displayName = 'proto.protocol.MarketPriceList';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrderIdList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MarketOrderIdList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrderIdList.displayName = 'proto.protocol.MarketOrderIdList';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ChainParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.ChainParameters.repeatedFields_, null);
};
goog.inherits(proto.protocol.ChainParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.ChainParameters.displayName = 'proto.protocol.ChainParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ChainParameters.ChainParameter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.ChainParameters.ChainParameter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.ChainParameters.ChainParameter.displayName = 'proto.protocol.ChainParameters.ChainParameter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Account = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Account.repeatedFields_, null);
};
goog.inherits(proto.protocol.Account, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Account.displayName = 'proto.protocol.Account';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Account.Frozen = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Account.Frozen, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Account.Frozen.displayName = 'proto.protocol.Account.Frozen';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Account.AccountResource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Account.AccountResource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Account.AccountResource.displayName = 'proto.protocol.Account.AccountResource';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Account.FreezeV2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Account.FreezeV2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Account.FreezeV2.displayName = 'proto.protocol.Account.FreezeV2';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Account.UnFreezeV2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Account.UnFreezeV2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Account.UnFreezeV2.displayName = 'proto.protocol.Account.UnFreezeV2';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Key = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Key, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Key.displayName = 'proto.protocol.Key';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.DelegatedResource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.DelegatedResource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.DelegatedResource.displayName = 'proto.protocol.DelegatedResource';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.authority = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.authority, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.authority.displayName = 'proto.protocol.authority';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Permission = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Permission.repeatedFields_, null);
};
goog.inherits(proto.protocol.Permission, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Permission.displayName = 'proto.protocol.Permission';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Witness = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Witness, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Witness.displayName = 'proto.protocol.Witness';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Votes = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Votes.repeatedFields_, null);
};
goog.inherits(proto.protocol.Votes, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Votes.displayName = 'proto.protocol.Votes';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TXOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.TXOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TXOutput.displayName = 'proto.protocol.TXOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TXInput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.TXInput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TXInput.displayName = 'proto.protocol.TXInput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TXInput.raw = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.TXInput.raw, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TXInput.raw.displayName = 'proto.protocol.TXInput.raw';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TXOutputs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.TXOutputs.repeatedFields_, null);
};
goog.inherits(proto.protocol.TXOutputs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TXOutputs.displayName = 'proto.protocol.TXOutputs';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ResourceReceipt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.ResourceReceipt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.ResourceReceipt.displayName = 'proto.protocol.ResourceReceipt';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MarketOrderDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MarketOrderDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MarketOrderDetail.displayName = 'proto.protocol.MarketOrderDetail';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Transaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Transaction.repeatedFields_, null);
};
goog.inherits(proto.protocol.Transaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Transaction.displayName = 'proto.protocol.Transaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Transaction.Contract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.Transaction.Contract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Transaction.Contract.displayName = 'proto.protocol.Transaction.Contract';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Transaction.Result = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Transaction.Result.repeatedFields_, null);
};
goog.inherits(proto.protocol.Transaction.Result, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Transaction.Result.displayName = 'proto.protocol.Transaction.Result';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Transaction.raw = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Transaction.raw.repeatedFields_, null);
};
goog.inherits(proto.protocol.Transaction.raw, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Transaction.raw.displayName = 'proto.protocol.Transaction.raw';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TransactionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.TransactionInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.TransactionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TransactionInfo.displayName = 'proto.protocol.TransactionInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TransactionInfo.Log = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.TransactionInfo.Log.repeatedFields_, null);
};
goog.inherits(proto.protocol.TransactionInfo.Log, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TransactionInfo.Log.displayName = 'proto.protocol.TransactionInfo.Log';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.TransactionRet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.TransactionRet.repeatedFields_, null);
};
goog.inherits(proto.protocol.TransactionRet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.TransactionRet.displayName = 'proto.protocol.TransactionRet';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Transactions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Transactions.repeatedFields_, null);
};
goog.inherits(proto.protocol.Transactions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Transactions.displayName = 'proto.protocol.Transactions';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.BlockHeader = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.BlockHeader, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.BlockHeader.displayName = 'proto.protocol.BlockHeader';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.BlockHeader.raw = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.BlockHeader.raw, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.BlockHeader.raw.displayName = 'proto.protocol.BlockHeader.raw';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Block = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Block.repeatedFields_, null);
};
goog.inherits(proto.protocol.Block, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Block.displayName = 'proto.protocol.Block';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ChainInventory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.ChainInventory.repeatedFields_, null);
};
goog.inherits(proto.protocol.ChainInventory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.ChainInventory.displayName = 'proto.protocol.ChainInventory';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.ChainInventory.BlockId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.ChainInventory.BlockId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.ChainInventory.BlockId.displayName = 'proto.protocol.ChainInventory.BlockId';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.BlockInventory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.BlockInventory.repeatedFields_, null);
};
goog.inherits(proto.protocol.BlockInventory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.BlockInventory.displayName = 'proto.protocol.BlockInventory';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.BlockInventory.BlockId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.BlockInventory.BlockId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.BlockInventory.BlockId.displayName = 'proto.protocol.BlockInventory.BlockId';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Inventory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Inventory.repeatedFields_, null);
};
goog.inherits(proto.protocol.Inventory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Inventory.displayName = 'proto.protocol.Inventory';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.Items = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.Items.repeatedFields_, null);
};
goog.inherits(proto.protocol.Items, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.Items.displayName = 'proto.protocol.Items';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.DynamicProperties = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.DynamicProperties, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.DynamicProperties.displayName = 'proto.protocol.DynamicProperties';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.DisconnectMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.DisconnectMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.DisconnectMessage.displayName = 'proto.protocol.DisconnectMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.HelloMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.HelloMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.HelloMessage.displayName = 'proto.protocol.HelloMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.HelloMessage.BlockId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.HelloMessage.BlockId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.HelloMessage.BlockId.displayName = 'proto.protocol.HelloMessage.BlockId';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.InternalTransaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.InternalTransaction.repeatedFields_, null);
};
goog.inherits(proto.protocol.InternalTransaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.InternalTransaction.displayName = 'proto.protocol.InternalTransaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.InternalTransaction.CallValueInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.InternalTransaction.CallValueInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.InternalTransaction.CallValueInfo.displayName = 'proto.protocol.InternalTransaction.CallValueInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.DelegatedResourceAccountIndex = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.DelegatedResourceAccountIndex.repeatedFields_, null);
};
goog.inherits(proto.protocol.DelegatedResourceAccountIndex, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.DelegatedResourceAccountIndex.displayName = 'proto.protocol.DelegatedResourceAccountIndex';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.NodeInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.NodeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.displayName = 'proto.protocol.NodeInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo.PeerInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.NodeInfo.PeerInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.PeerInfo.displayName = 'proto.protocol.NodeInfo.PeerInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo.ConfigNodeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.NodeInfo.ConfigNodeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.ConfigNodeInfo.displayName = 'proto.protocol.NodeInfo.ConfigNodeInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo.MachineInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.NodeInfo.MachineInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.NodeInfo.MachineInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.MachineInfo.displayName = 'proto.protocol.NodeInfo.MachineInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.displayName = 'proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.displayName = 'proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.displayName = 'proto.protocol.MetricsInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NodeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.NodeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NodeInfo.displayName = 'proto.protocol.MetricsInfo.NodeInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.BlockChainInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MetricsInfo.BlockChainInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.MetricsInfo.BlockChainInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.BlockChainInfo.displayName = 'proto.protocol.MetricsInfo.BlockChainInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.BlockChainInfo.Witness, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.BlockChainInfo.Witness.displayName = 'proto.protocol.MetricsInfo.BlockChainInfo.Witness';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.BlockChainInfo.DupWitness, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.displayName = 'proto.protocol.MetricsInfo.BlockChainInfo.DupWitness';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.RateInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.RateInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.RateInfo.displayName = 'proto.protocol.MetricsInfo.RateInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MetricsInfo.NetInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MetricsInfo.NetInfo.ApiInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo.ApiInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.ApiInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo.ApiInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.MetricsInfo.NetInfo.LatencyInfo.repeatedFields_, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo.LatencyInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.LatencyInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo.LatencyInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.displayName = 'proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.PBFTMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.PBFTMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.PBFTMessage.displayName = 'proto.protocol.PBFTMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.PBFTMessage.Raw = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.protocol.PBFTMessage.Raw, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.PBFTMessage.Raw.displayName = 'proto.protocol.PBFTMessage.Raw';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.PBFTCommitResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.PBFTCommitResult.repeatedFields_, null);
};
goog.inherits(proto.protocol.PBFTCommitResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.PBFTCommitResult.displayName = 'proto.protocol.PBFTCommitResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.protocol.SRL = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.protocol.SRL.repeatedFields_, null);
};
goog.inherits(proto.protocol.SRL, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.protocol.SRL.displayName = 'proto.protocol.SRL';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.AccountId.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.AccountId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.AccountId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.AccountId.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName_asB64(),
    address: msg.getAddress_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.AccountId}
 */
proto.protocol.AccountId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.AccountId;
  return proto.protocol.AccountId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.AccountId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.AccountId}
 */
proto.protocol.AccountId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.AccountId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.AccountId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.AccountId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.AccountId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes name = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.AccountId.prototype.getName = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes name = 1;
 * This is a type-conversion wrapper around `getName()`
 * @return {string}
 */
proto.protocol.AccountId.prototype.getName_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getName()));
};


/**
 * optional bytes name = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getName()`
 * @return {!Uint8Array}
 */
proto.protocol.AccountId.prototype.getName_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getName()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.AccountId} returns this
 */
proto.protocol.AccountId.prototype.setName = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes address = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.AccountId.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes address = 2;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.AccountId.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.AccountId.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.AccountId} returns this
 */
proto.protocol.AccountId.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Vote.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Vote.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Vote} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Vote.toObject = function(includeInstance, msg) {
  var f, obj = {
    voteAddress: msg.getVoteAddress_asB64(),
    voteCount: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Vote}
 */
proto.protocol.Vote.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Vote;
  return proto.protocol.Vote.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Vote} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Vote}
 */
proto.protocol.Vote.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setVoteAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setVoteCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Vote.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Vote.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Vote} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Vote.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVoteAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVoteCount();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes vote_address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Vote.prototype.getVoteAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes vote_address = 1;
 * This is a type-conversion wrapper around `getVoteAddress()`
 * @return {string}
 */
proto.protocol.Vote.prototype.getVoteAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getVoteAddress()));
};


/**
 * optional bytes vote_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getVoteAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Vote.prototype.getVoteAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getVoteAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Vote} returns this
 */
proto.protocol.Vote.prototype.setVoteAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 vote_count = 2;
 * @return {number}
 */
proto.protocol.Vote.prototype.getVoteCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Vote} returns this
 */
proto.protocol.Vote.prototype.setVoteCount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Proposal.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Proposal.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Proposal.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Proposal} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Proposal.toObject = function(includeInstance, msg) {
  var f, obj = {
    proposalId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    proposerAddress: msg.getProposerAddress_asB64(),
    parametersMap: (f = msg.getParametersMap()) ? f.toObject(includeInstance, undefined) : [],
    expirationTime: jspb.Message.getFieldWithDefault(msg, 4, 0),
    createTime: jspb.Message.getFieldWithDefault(msg, 5, 0),
    approvalsList: msg.getApprovalsList_asB64(),
    state: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Proposal}
 */
proto.protocol.Proposal.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Proposal;
  return proto.protocol.Proposal.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Proposal} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Proposal}
 */
proto.protocol.Proposal.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setProposalId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setProposerAddress(value);
      break;
    case 3:
      var value = msg.getParametersMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readInt64, jspb.BinaryReader.prototype.readInt64, null, 0, 0);
         });
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpirationTime(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreateTime(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addApprovals(value);
      break;
    case 7:
      var value = /** @type {!proto.protocol.Proposal.State} */ (reader.readEnum());
      msg.setState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Proposal.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Proposal.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Proposal} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Proposal.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProposalId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getProposerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getParametersMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeInt64, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getExpirationTime();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getCreateTime();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getApprovalsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      6,
      f
    );
  }
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Proposal.State = {
  PENDING: 0,
  DISAPPROVED: 1,
  APPROVED: 2,
  CANCELED: 3
};

/**
 * optional int64 proposal_id = 1;
 * @return {number}
 */
proto.protocol.Proposal.prototype.getProposalId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setProposalId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes proposer_address = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Proposal.prototype.getProposerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes proposer_address = 2;
 * This is a type-conversion wrapper around `getProposerAddress()`
 * @return {string}
 */
proto.protocol.Proposal.prototype.getProposerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getProposerAddress()));
};


/**
 * optional bytes proposer_address = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getProposerAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Proposal.prototype.getProposerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getProposerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setProposerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * map<int64, int64> parameters = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<number,number>}
 */
proto.protocol.Proposal.prototype.getParametersMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<number,number>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.clearParametersMap = function() {
  this.getParametersMap().clear();
  return this;
};


/**
 * optional int64 expiration_time = 4;
 * @return {number}
 */
proto.protocol.Proposal.prototype.getExpirationTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setExpirationTime = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 create_time = 5;
 * @return {number}
 */
proto.protocol.Proposal.prototype.getCreateTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setCreateTime = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * repeated bytes approvals = 6;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.Proposal.prototype.getApprovalsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * repeated bytes approvals = 6;
 * This is a type-conversion wrapper around `getApprovalsList()`
 * @return {!Array<string>}
 */
proto.protocol.Proposal.prototype.getApprovalsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getApprovalsList()));
};


/**
 * repeated bytes approvals = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getApprovalsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.Proposal.prototype.getApprovalsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getApprovalsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setApprovalsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.addApprovals = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.clearApprovalsList = function() {
  return this.setApprovalsList([]);
};


/**
 * optional State state = 7;
 * @return {!proto.protocol.Proposal.State}
 */
proto.protocol.Proposal.prototype.getState = function() {
  return /** @type {!proto.protocol.Proposal.State} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.protocol.Proposal.State} value
 * @return {!proto.protocol.Proposal} returns this
 */
proto.protocol.Proposal.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Exchange.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Exchange.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Exchange} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Exchange.toObject = function(includeInstance, msg) {
  var f, obj = {
    exchangeId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    creatorAddress: msg.getCreatorAddress_asB64(),
    createTime: jspb.Message.getFieldWithDefault(msg, 3, 0),
    firstTokenId: msg.getFirstTokenId_asB64(),
    firstTokenBalance: jspb.Message.getFieldWithDefault(msg, 7, 0),
    secondTokenId: msg.getSecondTokenId_asB64(),
    secondTokenBalance: jspb.Message.getFieldWithDefault(msg, 9, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Exchange}
 */
proto.protocol.Exchange.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Exchange;
  return proto.protocol.Exchange.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Exchange} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Exchange}
 */
proto.protocol.Exchange.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCreatorAddress(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreateTime(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFirstTokenId(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFirstTokenBalance(value);
      break;
    case 8:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondTokenId(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSecondTokenBalance(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Exchange.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Exchange.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Exchange} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Exchange.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getCreatorAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getCreateTime();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getFirstTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getFirstTokenBalance();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getSecondTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      8,
      f
    );
  }
  f = message.getSecondTokenBalance();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
};


/**
 * optional int64 exchange_id = 1;
 * @return {number}
 */
proto.protocol.Exchange.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes creator_address = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Exchange.prototype.getCreatorAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes creator_address = 2;
 * This is a type-conversion wrapper around `getCreatorAddress()`
 * @return {string}
 */
proto.protocol.Exchange.prototype.getCreatorAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCreatorAddress()));
};


/**
 * optional bytes creator_address = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCreatorAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Exchange.prototype.getCreatorAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCreatorAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setCreatorAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 create_time = 3;
 * @return {number}
 */
proto.protocol.Exchange.prototype.getCreateTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setCreateTime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes first_token_id = 6;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Exchange.prototype.getFirstTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes first_token_id = 6;
 * This is a type-conversion wrapper around `getFirstTokenId()`
 * @return {string}
 */
proto.protocol.Exchange.prototype.getFirstTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFirstTokenId()));
};


/**
 * optional bytes first_token_id = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFirstTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.Exchange.prototype.getFirstTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFirstTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setFirstTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional int64 first_token_balance = 7;
 * @return {number}
 */
proto.protocol.Exchange.prototype.getFirstTokenBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setFirstTokenBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional bytes second_token_id = 8;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Exchange.prototype.getSecondTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes second_token_id = 8;
 * This is a type-conversion wrapper around `getSecondTokenId()`
 * @return {string}
 */
proto.protocol.Exchange.prototype.getSecondTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondTokenId()));
};


/**
 * optional bytes second_token_id = 8;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.Exchange.prototype.getSecondTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setSecondTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 8, value);
};


/**
 * optional int64 second_token_balance = 9;
 * @return {number}
 */
proto.protocol.Exchange.prototype.getSecondTokenBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Exchange} returns this
 */
proto.protocol.Exchange.prototype.setSecondTokenBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrder.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrder.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrder} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrder.toObject = function(includeInstance, msg) {
  var f, obj = {
    orderId: msg.getOrderId_asB64(),
    ownerAddress: msg.getOwnerAddress_asB64(),
    createTime: jspb.Message.getFieldWithDefault(msg, 3, 0),
    sellTokenId: msg.getSellTokenId_asB64(),
    sellTokenQuantity: jspb.Message.getFieldWithDefault(msg, 5, 0),
    buyTokenId: msg.getBuyTokenId_asB64(),
    buyTokenQuantity: jspb.Message.getFieldWithDefault(msg, 7, 0),
    sellTokenQuantityRemain: jspb.Message.getFieldWithDefault(msg, 9, 0),
    sellTokenQuantityReturn: jspb.Message.getFieldWithDefault(msg, 10, 0),
    state: jspb.Message.getFieldWithDefault(msg, 11, 0),
    prev: msg.getPrev_asB64(),
    next: msg.getNext_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrder}
 */
proto.protocol.MarketOrder.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrder;
  return proto.protocol.MarketOrder.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrder} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrder}
 */
proto.protocol.MarketOrder.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOrderId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreateTime(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSellTokenId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSellTokenQuantity(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBuyTokenId(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBuyTokenQuantity(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSellTokenQuantityRemain(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSellTokenQuantityReturn(value);
      break;
    case 11:
      var value = /** @type {!proto.protocol.MarketOrder.State} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 12:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrev(value);
      break;
    case 13:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setNext(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrder.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrder} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrder.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrderId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getCreateTime();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getSellTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getSellTokenQuantity();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getBuyTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getBuyTokenQuantity();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getSellTokenQuantityRemain();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getSellTokenQuantityReturn();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getPrev_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      12,
      f
    );
  }
  f = message.getNext_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      13,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.MarketOrder.State = {
  ACTIVE: 0,
  INACTIVE: 1,
  CANCELED: 2
};

/**
 * optional bytes order_id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getOrderId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes order_id = 1;
 * This is a type-conversion wrapper around `getOrderId()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getOrderId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOrderId()));
};


/**
 * optional bytes order_id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrderId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getOrderId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOrderId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setOrderId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes owner_address = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes owner_address = 2;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 create_time = 3;
 * @return {number}
 */
proto.protocol.MarketOrder.prototype.getCreateTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setCreateTime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes sell_token_id = 4;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getSellTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes sell_token_id = 4;
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getSellTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSellTokenId()));
};


/**
 * optional bytes sell_token_id = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getSellTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSellTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setSellTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional int64 sell_token_quantity = 5;
 * @return {number}
 */
proto.protocol.MarketOrder.prototype.getSellTokenQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setSellTokenQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bytes buy_token_id = 6;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getBuyTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes buy_token_id = 6;
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getBuyTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBuyTokenId()));
};


/**
 * optional bytes buy_token_id = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getBuyTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBuyTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setBuyTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional int64 buy_token_quantity = 7;
 * @return {number}
 */
proto.protocol.MarketOrder.prototype.getBuyTokenQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setBuyTokenQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 sell_token_quantity_remain = 9;
 * @return {number}
 */
proto.protocol.MarketOrder.prototype.getSellTokenQuantityRemain = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setSellTokenQuantityRemain = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 sell_token_quantity_return = 10;
 * @return {number}
 */
proto.protocol.MarketOrder.prototype.getSellTokenQuantityReturn = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setSellTokenQuantityReturn = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional State state = 11;
 * @return {!proto.protocol.MarketOrder.State}
 */
proto.protocol.MarketOrder.prototype.getState = function() {
  return /** @type {!proto.protocol.MarketOrder.State} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.protocol.MarketOrder.State} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional bytes prev = 12;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getPrev = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * optional bytes prev = 12;
 * This is a type-conversion wrapper around `getPrev()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getPrev_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrev()));
};


/**
 * optional bytes prev = 12;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrev()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getPrev_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrev()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setPrev = function(value) {
  return jspb.Message.setProto3BytesField(this, 12, value);
};


/**
 * optional bytes next = 13;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrder.prototype.getNext = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * optional bytes next = 13;
 * This is a type-conversion wrapper around `getNext()`
 * @return {string}
 */
proto.protocol.MarketOrder.prototype.getNext_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getNext()));
};


/**
 * optional bytes next = 13;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNext()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrder.prototype.getNext_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getNext()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrder} returns this
 */
proto.protocol.MarketOrder.prototype.setNext = function(value) {
  return jspb.Message.setProto3BytesField(this, 13, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MarketOrderList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrderList.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrderList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrderList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderList.toObject = function(includeInstance, msg) {
  var f, obj = {
    ordersList: jspb.Message.toObjectList(msg.getOrdersList(),
    proto.protocol.MarketOrder.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrderList}
 */
proto.protocol.MarketOrderList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrderList;
  return proto.protocol.MarketOrderList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrderList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrderList}
 */
proto.protocol.MarketOrderList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.MarketOrder;
      reader.readMessage(value,proto.protocol.MarketOrder.deserializeBinaryFromReader);
      msg.addOrders(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrderList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrderList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrdersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.MarketOrder.serializeBinaryToWriter
    );
  }
};


/**
 * repeated MarketOrder orders = 1;
 * @return {!Array<!proto.protocol.MarketOrder>}
 */
proto.protocol.MarketOrderList.prototype.getOrdersList = function() {
  return /** @type{!Array<!proto.protocol.MarketOrder>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MarketOrder, 1));
};


/**
 * @param {!Array<!proto.protocol.MarketOrder>} value
 * @return {!proto.protocol.MarketOrderList} returns this
*/
proto.protocol.MarketOrderList.prototype.setOrdersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.MarketOrder=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketOrder}
 */
proto.protocol.MarketOrderList.prototype.addOrders = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.MarketOrder, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MarketOrderList} returns this
 */
proto.protocol.MarketOrderList.prototype.clearOrdersList = function() {
  return this.setOrdersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MarketOrderPairList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrderPairList.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrderPairList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrderPairList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderPairList.toObject = function(includeInstance, msg) {
  var f, obj = {
    orderpairList: jspb.Message.toObjectList(msg.getOrderpairList(),
    proto.protocol.MarketOrderPair.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrderPairList}
 */
proto.protocol.MarketOrderPairList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrderPairList;
  return proto.protocol.MarketOrderPairList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrderPairList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrderPairList}
 */
proto.protocol.MarketOrderPairList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.MarketOrderPair;
      reader.readMessage(value,proto.protocol.MarketOrderPair.deserializeBinaryFromReader);
      msg.addOrderpair(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderPairList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrderPairList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrderPairList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderPairList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrderpairList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.MarketOrderPair.serializeBinaryToWriter
    );
  }
};


/**
 * repeated MarketOrderPair orderPair = 1;
 * @return {!Array<!proto.protocol.MarketOrderPair>}
 */
proto.protocol.MarketOrderPairList.prototype.getOrderpairList = function() {
  return /** @type{!Array<!proto.protocol.MarketOrderPair>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MarketOrderPair, 1));
};


/**
 * @param {!Array<!proto.protocol.MarketOrderPair>} value
 * @return {!proto.protocol.MarketOrderPairList} returns this
*/
proto.protocol.MarketOrderPairList.prototype.setOrderpairList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.MarketOrderPair=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketOrderPair}
 */
proto.protocol.MarketOrderPairList.prototype.addOrderpair = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.MarketOrderPair, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MarketOrderPairList} returns this
 */
proto.protocol.MarketOrderPairList.prototype.clearOrderpairList = function() {
  return this.setOrderpairList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrderPair.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrderPair.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrderPair} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderPair.toObject = function(includeInstance, msg) {
  var f, obj = {
    sellTokenId: msg.getSellTokenId_asB64(),
    buyTokenId: msg.getBuyTokenId_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrderPair}
 */
proto.protocol.MarketOrderPair.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrderPair;
  return proto.protocol.MarketOrderPair.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrderPair} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrderPair}
 */
proto.protocol.MarketOrderPair.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSellTokenId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBuyTokenId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderPair.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrderPair.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrderPair} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderPair.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSellTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getBuyTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes sell_token_id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderPair.prototype.getSellTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes sell_token_id = 1;
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {string}
 */
proto.protocol.MarketOrderPair.prototype.getSellTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSellTokenId()));
};


/**
 * optional bytes sell_token_id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderPair.prototype.getSellTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSellTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderPair} returns this
 */
proto.protocol.MarketOrderPair.prototype.setSellTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes buy_token_id = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderPair.prototype.getBuyTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes buy_token_id = 2;
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {string}
 */
proto.protocol.MarketOrderPair.prototype.getBuyTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBuyTokenId()));
};


/**
 * optional bytes buy_token_id = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderPair.prototype.getBuyTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBuyTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderPair} returns this
 */
proto.protocol.MarketOrderPair.prototype.setBuyTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MarketAccountOrder.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketAccountOrder.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketAccountOrder.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketAccountOrder} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketAccountOrder.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerAddress: msg.getOwnerAddress_asB64(),
    ordersList: msg.getOrdersList_asB64(),
    count: jspb.Message.getFieldWithDefault(msg, 3, 0),
    totalCount: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketAccountOrder}
 */
proto.protocol.MarketAccountOrder.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketAccountOrder;
  return proto.protocol.MarketAccountOrder.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketAccountOrder} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketAccountOrder}
 */
proto.protocol.MarketAccountOrder.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addOrders(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketAccountOrder.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketAccountOrder.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketAccountOrder} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketAccountOrder.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getOrdersList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getTotalCount();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional bytes owner_address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketAccountOrder.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes owner_address = 1;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
proto.protocol.MarketAccountOrder.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketAccountOrder.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated bytes orders = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.MarketAccountOrder.prototype.getOrdersList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes orders = 2;
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array<string>}
 */
proto.protocol.MarketAccountOrder.prototype.getOrdersList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getOrdersList()));
};


/**
 * repeated bytes orders = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.MarketAccountOrder.prototype.getOrdersList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getOrdersList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.setOrdersList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.addOrders = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.clearOrdersList = function() {
  return this.setOrdersList([]);
};


/**
 * optional int64 count = 3;
 * @return {number}
 */
proto.protocol.MarketAccountOrder.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 total_count = 4;
 * @return {number}
 */
proto.protocol.MarketAccountOrder.prototype.getTotalCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketAccountOrder} returns this
 */
proto.protocol.MarketAccountOrder.prototype.setTotalCount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketPrice.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketPrice.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketPrice} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketPrice.toObject = function(includeInstance, msg) {
  var f, obj = {
    sellTokenQuantity: jspb.Message.getFieldWithDefault(msg, 1, 0),
    buyTokenQuantity: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketPrice}
 */
proto.protocol.MarketPrice.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketPrice;
  return proto.protocol.MarketPrice.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketPrice} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketPrice}
 */
proto.protocol.MarketPrice.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSellTokenQuantity(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBuyTokenQuantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketPrice.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketPrice.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketPrice} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketPrice.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSellTokenQuantity();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getBuyTokenQuantity();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 sell_token_quantity = 1;
 * @return {number}
 */
proto.protocol.MarketPrice.prototype.getSellTokenQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketPrice} returns this
 */
proto.protocol.MarketPrice.prototype.setSellTokenQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 buy_token_quantity = 2;
 * @return {number}
 */
proto.protocol.MarketPrice.prototype.getBuyTokenQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketPrice} returns this
 */
proto.protocol.MarketPrice.prototype.setBuyTokenQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MarketPriceList.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketPriceList.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketPriceList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketPriceList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketPriceList.toObject = function(includeInstance, msg) {
  var f, obj = {
    sellTokenId: msg.getSellTokenId_asB64(),
    buyTokenId: msg.getBuyTokenId_asB64(),
    pricesList: jspb.Message.toObjectList(msg.getPricesList(),
    proto.protocol.MarketPrice.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketPriceList}
 */
proto.protocol.MarketPriceList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketPriceList;
  return proto.protocol.MarketPriceList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketPriceList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketPriceList}
 */
proto.protocol.MarketPriceList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSellTokenId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBuyTokenId(value);
      break;
    case 3:
      var value = new proto.protocol.MarketPrice;
      reader.readMessage(value,proto.protocol.MarketPrice.deserializeBinaryFromReader);
      msg.addPrices(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketPriceList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketPriceList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketPriceList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketPriceList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSellTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getBuyTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getPricesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.protocol.MarketPrice.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes sell_token_id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketPriceList.prototype.getSellTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes sell_token_id = 1;
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {string}
 */
proto.protocol.MarketPriceList.prototype.getSellTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSellTokenId()));
};


/**
 * optional bytes sell_token_id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSellTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketPriceList.prototype.getSellTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSellTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketPriceList} returns this
 */
proto.protocol.MarketPriceList.prototype.setSellTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes buy_token_id = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketPriceList.prototype.getBuyTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes buy_token_id = 2;
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {string}
 */
proto.protocol.MarketPriceList.prototype.getBuyTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBuyTokenId()));
};


/**
 * optional bytes buy_token_id = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBuyTokenId()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketPriceList.prototype.getBuyTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBuyTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketPriceList} returns this
 */
proto.protocol.MarketPriceList.prototype.setBuyTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * repeated MarketPrice prices = 3;
 * @return {!Array<!proto.protocol.MarketPrice>}
 */
proto.protocol.MarketPriceList.prototype.getPricesList = function() {
  return /** @type{!Array<!proto.protocol.MarketPrice>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MarketPrice, 3));
};


/**
 * @param {!Array<!proto.protocol.MarketPrice>} value
 * @return {!proto.protocol.MarketPriceList} returns this
*/
proto.protocol.MarketPriceList.prototype.setPricesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.protocol.MarketPrice=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketPrice}
 */
proto.protocol.MarketPriceList.prototype.addPrices = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.protocol.MarketPrice, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MarketPriceList} returns this
 */
proto.protocol.MarketPriceList.prototype.clearPricesList = function() {
  return this.setPricesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrderIdList.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrderIdList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrderIdList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderIdList.toObject = function(includeInstance, msg) {
  var f, obj = {
    head: msg.getHead_asB64(),
    tail: msg.getTail_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrderIdList}
 */
proto.protocol.MarketOrderIdList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrderIdList;
  return proto.protocol.MarketOrderIdList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrderIdList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrderIdList}
 */
proto.protocol.MarketOrderIdList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHead(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderIdList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrderIdList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrderIdList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderIdList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHead_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTail_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes head = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderIdList.prototype.getHead = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes head = 1;
 * This is a type-conversion wrapper around `getHead()`
 * @return {string}
 */
proto.protocol.MarketOrderIdList.prototype.getHead_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHead()));
};


/**
 * optional bytes head = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHead()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderIdList.prototype.getHead_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHead()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderIdList} returns this
 */
proto.protocol.MarketOrderIdList.prototype.setHead = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes tail = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderIdList.prototype.getTail = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes tail = 2;
 * This is a type-conversion wrapper around `getTail()`
 * @return {string}
 */
proto.protocol.MarketOrderIdList.prototype.getTail_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTail()));
};


/**
 * optional bytes tail = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTail()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderIdList.prototype.getTail_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTail()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderIdList} returns this
 */
proto.protocol.MarketOrderIdList.prototype.setTail = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.ChainParameters.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.ChainParameters.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.ChainParameters.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.ChainParameters} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainParameters.toObject = function(includeInstance, msg) {
  var f, obj = {
    chainparameterList: jspb.Message.toObjectList(msg.getChainparameterList(),
    proto.protocol.ChainParameters.ChainParameter.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ChainParameters}
 */
proto.protocol.ChainParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.ChainParameters;
  return proto.protocol.ChainParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ChainParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ChainParameters}
 */
proto.protocol.ChainParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.ChainParameters.ChainParameter;
      reader.readMessage(value,proto.protocol.ChainParameters.ChainParameter.deserializeBinaryFromReader);
      msg.addChainparameter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ChainParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.ChainParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ChainParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChainparameterList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.ChainParameters.ChainParameter.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.ChainParameters.ChainParameter.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.ChainParameters.ChainParameter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.ChainParameters.ChainParameter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainParameters.ChainParameter.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ChainParameters.ChainParameter}
 */
proto.protocol.ChainParameters.ChainParameter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.ChainParameters.ChainParameter;
  return proto.protocol.ChainParameters.ChainParameter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ChainParameters.ChainParameter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ChainParameters.ChainParameter}
 */
proto.protocol.ChainParameters.ChainParameter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ChainParameters.ChainParameter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.ChainParameters.ChainParameter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ChainParameters.ChainParameter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainParameters.ChainParameter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.protocol.ChainParameters.ChainParameter.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.ChainParameters.ChainParameter} returns this
 */
proto.protocol.ChainParameters.ChainParameter.prototype.setKey = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 value = 2;
 * @return {number}
 */
proto.protocol.ChainParameters.ChainParameter.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ChainParameters.ChainParameter} returns this
 */
proto.protocol.ChainParameters.ChainParameter.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated ChainParameter chainParameter = 1;
 * @return {!Array<!proto.protocol.ChainParameters.ChainParameter>}
 */
proto.protocol.ChainParameters.prototype.getChainparameterList = function() {
  return /** @type{!Array<!proto.protocol.ChainParameters.ChainParameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.ChainParameters.ChainParameter, 1));
};


/**
 * @param {!Array<!proto.protocol.ChainParameters.ChainParameter>} value
 * @return {!proto.protocol.ChainParameters} returns this
*/
proto.protocol.ChainParameters.prototype.setChainparameterList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.ChainParameters.ChainParameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.ChainParameters.ChainParameter}
 */
proto.protocol.ChainParameters.prototype.addChainparameter = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.ChainParameters.ChainParameter, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.ChainParameters} returns this
 */
proto.protocol.ChainParameters.prototype.clearChainparameterList = function() {
  return this.setChainparameterList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Account.repeatedFields_ = [5,7,16,33,34,35];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Account.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Account.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Account} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountName: msg.getAccountName_asB64(),
    type: jspb.Message.getFieldWithDefault(msg, 2, 0),
    address: msg.getAddress_asB64(),
    balance: jspb.Message.getFieldWithDefault(msg, 4, 0),
    votesList: jspb.Message.toObjectList(msg.getVotesList(),
    proto.protocol.Vote.toObject, includeInstance),
    assetMap: (f = msg.getAssetMap()) ? f.toObject(includeInstance, undefined) : [],
    assetv2Map: (f = msg.getAssetv2Map()) ? f.toObject(includeInstance, undefined) : [],
    frozenList: jspb.Message.toObjectList(msg.getFrozenList(),
    proto.protocol.Account.Frozen.toObject, includeInstance),
    netUsage: jspb.Message.getFieldWithDefault(msg, 8, 0),
    acquiredDelegatedFrozenBalanceForBandwidth: jspb.Message.getFieldWithDefault(msg, 41, 0),
    delegatedFrozenBalanceForBandwidth: jspb.Message.getFieldWithDefault(msg, 42, 0),
    oldTronPower: jspb.Message.getFieldWithDefault(msg, 46, 0),
    tronPower: (f = msg.getTronPower()) && proto.protocol.Account.Frozen.toObject(includeInstance, f),
    assetOptimized: jspb.Message.getBooleanFieldWithDefault(msg, 60, false),
    createTime: jspb.Message.getFieldWithDefault(msg, 9, 0),
    latestOprationTime: jspb.Message.getFieldWithDefault(msg, 10, 0),
    allowance: jspb.Message.getFieldWithDefault(msg, 11, 0),
    latestWithdrawTime: jspb.Message.getFieldWithDefault(msg, 12, 0),
    code: msg.getCode_asB64(),
    isWitness: jspb.Message.getBooleanFieldWithDefault(msg, 14, false),
    isCommittee: jspb.Message.getBooleanFieldWithDefault(msg, 15, false),
    frozenSupplyList: jspb.Message.toObjectList(msg.getFrozenSupplyList(),
    proto.protocol.Account.Frozen.toObject, includeInstance),
    assetIssuedName: msg.getAssetIssuedName_asB64(),
    assetIssuedId: msg.getAssetIssuedId_asB64(),
    latestAssetOperationTimeMap: (f = msg.getLatestAssetOperationTimeMap()) ? f.toObject(includeInstance, undefined) : [],
    latestAssetOperationTimev2Map: (f = msg.getLatestAssetOperationTimev2Map()) ? f.toObject(includeInstance, undefined) : [],
    freeNetUsage: jspb.Message.getFieldWithDefault(msg, 19, 0),
    freeAssetNetUsageMap: (f = msg.getFreeAssetNetUsageMap()) ? f.toObject(includeInstance, undefined) : [],
    freeAssetNetUsagev2Map: (f = msg.getFreeAssetNetUsagev2Map()) ? f.toObject(includeInstance, undefined) : [],
    latestConsumeTime: jspb.Message.getFieldWithDefault(msg, 21, 0),
    latestConsumeFreeTime: jspb.Message.getFieldWithDefault(msg, 22, 0),
    accountId: msg.getAccountId_asB64(),
    netWindowSize: jspb.Message.getFieldWithDefault(msg, 24, 0),
    accountResource: (f = msg.getAccountResource()) && proto.protocol.Account.AccountResource.toObject(includeInstance, f),
    codehash: msg.getCodehash_asB64(),
    ownerPermission: (f = msg.getOwnerPermission()) && proto.protocol.Permission.toObject(includeInstance, f),
    witnessPermission: (f = msg.getWitnessPermission()) && proto.protocol.Permission.toObject(includeInstance, f),
    activePermissionList: jspb.Message.toObjectList(msg.getActivePermissionList(),
    proto.protocol.Permission.toObject, includeInstance),
    frozenv2List: jspb.Message.toObjectList(msg.getFrozenv2List(),
    proto.protocol.Account.FreezeV2.toObject, includeInstance),
    unfrozenv2List: jspb.Message.toObjectList(msg.getUnfrozenv2List(),
    proto.protocol.Account.UnFreezeV2.toObject, includeInstance),
    delegatedFrozenv2BalanceForBandwidth: jspb.Message.getFieldWithDefault(msg, 36, 0),
    acquiredDelegatedFrozenv2BalanceForBandwidth: jspb.Message.getFieldWithDefault(msg, 37, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Account}
 */
proto.protocol.Account.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Account;
  return proto.protocol.Account.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Account} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Account}
 */
proto.protocol.Account.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccountName(value);
      break;
    case 2:
      var value = /** @type {!proto.protocol.AccountType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBalance(value);
      break;
    case 5:
      var value = new proto.protocol.Vote;
      reader.readMessage(value,proto.protocol.Vote.deserializeBinaryFromReader);
      msg.addVotes(value);
      break;
    case 6:
      var value = msg.getAssetMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 56:
      var value = msg.getAssetv2Map();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 7:
      var value = new proto.protocol.Account.Frozen;
      reader.readMessage(value,proto.protocol.Account.Frozen.deserializeBinaryFromReader);
      msg.addFrozen(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNetUsage(value);
      break;
    case 41:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAcquiredDelegatedFrozenBalanceForBandwidth(value);
      break;
    case 42:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDelegatedFrozenBalanceForBandwidth(value);
      break;
    case 46:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setOldTronPower(value);
      break;
    case 47:
      var value = new proto.protocol.Account.Frozen;
      reader.readMessage(value,proto.protocol.Account.Frozen.deserializeBinaryFromReader);
      msg.setTronPower(value);
      break;
    case 60:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAssetOptimized(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreateTime(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestOprationTime(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAllowance(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestWithdrawTime(value);
      break;
    case 13:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCode(value);
      break;
    case 14:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsWitness(value);
      break;
    case 15:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsCommittee(value);
      break;
    case 16:
      var value = new proto.protocol.Account.Frozen;
      reader.readMessage(value,proto.protocol.Account.Frozen.deserializeBinaryFromReader);
      msg.addFrozenSupply(value);
      break;
    case 17:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAssetIssuedName(value);
      break;
    case 57:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAssetIssuedId(value);
      break;
    case 18:
      var value = msg.getLatestAssetOperationTimeMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 58:
      var value = msg.getLatestAssetOperationTimev2Map();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFreeNetUsage(value);
      break;
    case 20:
      var value = msg.getFreeAssetNetUsageMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 59:
      var value = msg.getFreeAssetNetUsagev2Map();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestConsumeTime(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestConsumeFreeTime(value);
      break;
    case 23:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccountId(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNetWindowSize(value);
      break;
    case 26:
      var value = new proto.protocol.Account.AccountResource;
      reader.readMessage(value,proto.protocol.Account.AccountResource.deserializeBinaryFromReader);
      msg.setAccountResource(value);
      break;
    case 30:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCodehash(value);
      break;
    case 31:
      var value = new proto.protocol.Permission;
      reader.readMessage(value,proto.protocol.Permission.deserializeBinaryFromReader);
      msg.setOwnerPermission(value);
      break;
    case 32:
      var value = new proto.protocol.Permission;
      reader.readMessage(value,proto.protocol.Permission.deserializeBinaryFromReader);
      msg.setWitnessPermission(value);
      break;
    case 33:
      var value = new proto.protocol.Permission;
      reader.readMessage(value,proto.protocol.Permission.deserializeBinaryFromReader);
      msg.addActivePermission(value);
      break;
    case 34:
      var value = new proto.protocol.Account.FreezeV2;
      reader.readMessage(value,proto.protocol.Account.FreezeV2.deserializeBinaryFromReader);
      msg.addFrozenv2(value);
      break;
    case 35:
      var value = new proto.protocol.Account.UnFreezeV2;
      reader.readMessage(value,proto.protocol.Account.UnFreezeV2.deserializeBinaryFromReader);
      msg.addUnfrozenv2(value);
      break;
    case 36:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDelegatedFrozenv2BalanceForBandwidth(value);
      break;
    case 37:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAcquiredDelegatedFrozenv2BalanceForBandwidth(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Account.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Account} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountName_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getBalance();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getVotesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.protocol.Vote.serializeBinaryToWriter
    );
  }
  f = message.getAssetMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getAssetv2Map(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(56, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getFrozenList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.protocol.Account.Frozen.serializeBinaryToWriter
    );
  }
  f = message.getNetUsage();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getAcquiredDelegatedFrozenBalanceForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      41,
      f
    );
  }
  f = message.getDelegatedFrozenBalanceForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      42,
      f
    );
  }
  f = message.getOldTronPower();
  if (f !== 0) {
    writer.writeInt64(
      46,
      f
    );
  }
  f = message.getTronPower();
  if (f != null) {
    writer.writeMessage(
      47,
      f,
      proto.protocol.Account.Frozen.serializeBinaryToWriter
    );
  }
  f = message.getAssetOptimized();
  if (f) {
    writer.writeBool(
      60,
      f
    );
  }
  f = message.getCreateTime();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getLatestOprationTime();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getAllowance();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getLatestWithdrawTime();
  if (f !== 0) {
    writer.writeInt64(
      12,
      f
    );
  }
  f = message.getCode_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      13,
      f
    );
  }
  f = message.getIsWitness();
  if (f) {
    writer.writeBool(
      14,
      f
    );
  }
  f = message.getIsCommittee();
  if (f) {
    writer.writeBool(
      15,
      f
    );
  }
  f = message.getFrozenSupplyList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.protocol.Account.Frozen.serializeBinaryToWriter
    );
  }
  f = message.getAssetIssuedName_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      17,
      f
    );
  }
  f = message.getAssetIssuedId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      57,
      f
    );
  }
  f = message.getLatestAssetOperationTimeMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(18, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getLatestAssetOperationTimev2Map(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(58, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getFreeNetUsage();
  if (f !== 0) {
    writer.writeInt64(
      19,
      f
    );
  }
  f = message.getFreeAssetNetUsageMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(20, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getFreeAssetNetUsagev2Map(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(59, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getLatestConsumeTime();
  if (f !== 0) {
    writer.writeInt64(
      21,
      f
    );
  }
  f = message.getLatestConsumeFreeTime();
  if (f !== 0) {
    writer.writeInt64(
      22,
      f
    );
  }
  f = message.getAccountId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      23,
      f
    );
  }
  f = message.getNetWindowSize();
  if (f !== 0) {
    writer.writeInt64(
      24,
      f
    );
  }
  f = message.getAccountResource();
  if (f != null) {
    writer.writeMessage(
      26,
      f,
      proto.protocol.Account.AccountResource.serializeBinaryToWriter
    );
  }
  f = message.getCodehash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      30,
      f
    );
  }
  f = message.getOwnerPermission();
  if (f != null) {
    writer.writeMessage(
      31,
      f,
      proto.protocol.Permission.serializeBinaryToWriter
    );
  }
  f = message.getWitnessPermission();
  if (f != null) {
    writer.writeMessage(
      32,
      f,
      proto.protocol.Permission.serializeBinaryToWriter
    );
  }
  f = message.getActivePermissionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      33,
      f,
      proto.protocol.Permission.serializeBinaryToWriter
    );
  }
  f = message.getFrozenv2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      34,
      f,
      proto.protocol.Account.FreezeV2.serializeBinaryToWriter
    );
  }
  f = message.getUnfrozenv2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      35,
      f,
      proto.protocol.Account.UnFreezeV2.serializeBinaryToWriter
    );
  }
  f = message.getDelegatedFrozenv2BalanceForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      36,
      f
    );
  }
  f = message.getAcquiredDelegatedFrozenv2BalanceForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      37,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Account.Frozen.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Account.Frozen.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Account.Frozen} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.Frozen.toObject = function(includeInstance, msg) {
  var f, obj = {
    frozenBalance: jspb.Message.getFieldWithDefault(msg, 1, 0),
    expireTime: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Account.Frozen}
 */
proto.protocol.Account.Frozen.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Account.Frozen;
  return proto.protocol.Account.Frozen.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Account.Frozen} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Account.Frozen}
 */
proto.protocol.Account.Frozen.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFrozenBalance(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpireTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Account.Frozen.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Account.Frozen.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Account.Frozen} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.Frozen.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrozenBalance();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getExpireTime();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 frozen_balance = 1;
 * @return {number}
 */
proto.protocol.Account.Frozen.prototype.getFrozenBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.Frozen} returns this
 */
proto.protocol.Account.Frozen.prototype.setFrozenBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 expire_time = 2;
 * @return {number}
 */
proto.protocol.Account.Frozen.prototype.getExpireTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.Frozen} returns this
 */
proto.protocol.Account.Frozen.prototype.setExpireTime = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Account.AccountResource.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Account.AccountResource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Account.AccountResource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.AccountResource.toObject = function(includeInstance, msg) {
  var f, obj = {
    energyUsage: jspb.Message.getFieldWithDefault(msg, 1, 0),
    frozenBalanceForEnergy: (f = msg.getFrozenBalanceForEnergy()) && proto.protocol.Account.Frozen.toObject(includeInstance, f),
    latestConsumeTimeForEnergy: jspb.Message.getFieldWithDefault(msg, 3, 0),
    acquiredDelegatedFrozenBalanceForEnergy: jspb.Message.getFieldWithDefault(msg, 4, 0),
    delegatedFrozenBalanceForEnergy: jspb.Message.getFieldWithDefault(msg, 5, 0),
    storageLimit: jspb.Message.getFieldWithDefault(msg, 6, 0),
    storageUsage: jspb.Message.getFieldWithDefault(msg, 7, 0),
    latestExchangeStorageTime: jspb.Message.getFieldWithDefault(msg, 8, 0),
    energyWindowSize: jspb.Message.getFieldWithDefault(msg, 9, 0),
    delegatedFrozenv2BalanceForEnergy: jspb.Message.getFieldWithDefault(msg, 10, 0),
    acquiredDelegatedFrozenv2BalanceForEnergy: jspb.Message.getFieldWithDefault(msg, 11, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Account.AccountResource}
 */
proto.protocol.Account.AccountResource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Account.AccountResource;
  return proto.protocol.Account.AccountResource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Account.AccountResource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Account.AccountResource}
 */
proto.protocol.Account.AccountResource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyUsage(value);
      break;
    case 2:
      var value = new proto.protocol.Account.Frozen;
      reader.readMessage(value,proto.protocol.Account.Frozen.deserializeBinaryFromReader);
      msg.setFrozenBalanceForEnergy(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestConsumeTimeForEnergy(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAcquiredDelegatedFrozenBalanceForEnergy(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDelegatedFrozenBalanceForEnergy(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStorageLimit(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStorageUsage(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestExchangeStorageTime(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyWindowSize(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDelegatedFrozenv2BalanceForEnergy(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAcquiredDelegatedFrozenv2BalanceForEnergy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Account.AccountResource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Account.AccountResource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Account.AccountResource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.AccountResource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEnergyUsage();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getFrozenBalanceForEnergy();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.Account.Frozen.serializeBinaryToWriter
    );
  }
  f = message.getLatestConsumeTimeForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getAcquiredDelegatedFrozenBalanceForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getDelegatedFrozenBalanceForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getStorageLimit();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getStorageUsage();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getLatestExchangeStorageTime();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getEnergyWindowSize();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getDelegatedFrozenv2BalanceForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getAcquiredDelegatedFrozenv2BalanceForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
};


/**
 * optional int64 energy_usage = 1;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getEnergyUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setEnergyUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional Frozen frozen_balance_for_energy = 2;
 * @return {?proto.protocol.Account.Frozen}
 */
proto.protocol.Account.AccountResource.prototype.getFrozenBalanceForEnergy = function() {
  return /** @type{?proto.protocol.Account.Frozen} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Account.Frozen, 2));
};


/**
 * @param {?proto.protocol.Account.Frozen|undefined} value
 * @return {!proto.protocol.Account.AccountResource} returns this
*/
proto.protocol.Account.AccountResource.prototype.setFrozenBalanceForEnergy = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.clearFrozenBalanceForEnergy = function() {
  return this.setFrozenBalanceForEnergy(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Account.AccountResource.prototype.hasFrozenBalanceForEnergy = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int64 latest_consume_time_for_energy = 3;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getLatestConsumeTimeForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setLatestConsumeTimeForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 acquired_delegated_frozen_balance_for_energy = 4;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getAcquiredDelegatedFrozenBalanceForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setAcquiredDelegatedFrozenBalanceForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 delegated_frozen_balance_for_energy = 5;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getDelegatedFrozenBalanceForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setDelegatedFrozenBalanceForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 storage_limit = 6;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getStorageLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setStorageLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int64 storage_usage = 7;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getStorageUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setStorageUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 latest_exchange_storage_time = 8;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getLatestExchangeStorageTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setLatestExchangeStorageTime = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 energy_window_size = 9;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getEnergyWindowSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setEnergyWindowSize = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 delegated_frozenV2_balance_for_energy = 10;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getDelegatedFrozenv2BalanceForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setDelegatedFrozenv2BalanceForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int64 acquired_delegated_frozenV2_balance_for_energy = 11;
 * @return {number}
 */
proto.protocol.Account.AccountResource.prototype.getAcquiredDelegatedFrozenv2BalanceForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.AccountResource} returns this
 */
proto.protocol.Account.AccountResource.prototype.setAcquiredDelegatedFrozenv2BalanceForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Account.FreezeV2.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Account.FreezeV2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Account.FreezeV2} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.FreezeV2.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    amount: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Account.FreezeV2}
 */
proto.protocol.Account.FreezeV2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Account.FreezeV2;
  return proto.protocol.Account.FreezeV2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Account.FreezeV2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Account.FreezeV2}
 */
proto.protocol.Account.FreezeV2.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.ResourceCode} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Account.FreezeV2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Account.FreezeV2.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Account.FreezeV2} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.FreezeV2.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional ResourceCode type = 1;
 * @return {!proto.protocol.ResourceCode}
 */
proto.protocol.Account.FreezeV2.prototype.getType = function() {
  return /** @type {!proto.protocol.ResourceCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.ResourceCode} value
 * @return {!proto.protocol.Account.FreezeV2} returns this
 */
proto.protocol.Account.FreezeV2.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int64 amount = 2;
 * @return {number}
 */
proto.protocol.Account.FreezeV2.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.FreezeV2} returns this
 */
proto.protocol.Account.FreezeV2.prototype.setAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Account.UnFreezeV2.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Account.UnFreezeV2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Account.UnFreezeV2} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.UnFreezeV2.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    unfreezeAmount: jspb.Message.getFieldWithDefault(msg, 3, 0),
    unfreezeExpireTime: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Account.UnFreezeV2}
 */
proto.protocol.Account.UnFreezeV2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Account.UnFreezeV2;
  return proto.protocol.Account.UnFreezeV2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Account.UnFreezeV2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Account.UnFreezeV2}
 */
proto.protocol.Account.UnFreezeV2.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.ResourceCode} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUnfreezeAmount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUnfreezeExpireTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Account.UnFreezeV2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Account.UnFreezeV2.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Account.UnFreezeV2} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Account.UnFreezeV2.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getUnfreezeAmount();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getUnfreezeExpireTime();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional ResourceCode type = 1;
 * @return {!proto.protocol.ResourceCode}
 */
proto.protocol.Account.UnFreezeV2.prototype.getType = function() {
  return /** @type {!proto.protocol.ResourceCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.ResourceCode} value
 * @return {!proto.protocol.Account.UnFreezeV2} returns this
 */
proto.protocol.Account.UnFreezeV2.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int64 unfreeze_amount = 3;
 * @return {number}
 */
proto.protocol.Account.UnFreezeV2.prototype.getUnfreezeAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.UnFreezeV2} returns this
 */
proto.protocol.Account.UnFreezeV2.prototype.setUnfreezeAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 unfreeze_expire_time = 4;
 * @return {number}
 */
proto.protocol.Account.UnFreezeV2.prototype.getUnfreezeExpireTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account.UnFreezeV2} returns this
 */
proto.protocol.Account.UnFreezeV2.prototype.setUnfreezeExpireTime = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bytes account_name = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getAccountName = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes account_name = 1;
 * This is a type-conversion wrapper around `getAccountName()`
 * @return {string}
 */
proto.protocol.Account.prototype.getAccountName_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccountName()));
};


/**
 * optional bytes account_name = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccountName()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getAccountName_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccountName()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAccountName = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional AccountType type = 2;
 * @return {!proto.protocol.AccountType}
 */
proto.protocol.Account.prototype.getType = function() {
  return /** @type {!proto.protocol.AccountType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.protocol.AccountType} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional bytes address = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes address = 3;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.Account.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional int64 balance = 4;
 * @return {number}
 */
proto.protocol.Account.prototype.getBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated Vote votes = 5;
 * @return {!Array<!proto.protocol.Vote>}
 */
proto.protocol.Account.prototype.getVotesList = function() {
  return /** @type{!Array<!proto.protocol.Vote>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Vote, 5));
};


/**
 * @param {!Array<!proto.protocol.Vote>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setVotesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.protocol.Vote=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Vote}
 */
proto.protocol.Account.prototype.addVotes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.protocol.Vote, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearVotesList = function() {
  return this.setVotesList([]);
};


/**
 * map<string, int64> asset = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getAssetMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearAssetMap = function() {
  this.getAssetMap().clear();
  return this;
};


/**
 * map<string, int64> assetV2 = 56;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getAssetv2Map = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 56, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearAssetv2Map = function() {
  this.getAssetv2Map().clear();
  return this;
};


/**
 * repeated Frozen frozen = 7;
 * @return {!Array<!proto.protocol.Account.Frozen>}
 */
proto.protocol.Account.prototype.getFrozenList = function() {
  return /** @type{!Array<!proto.protocol.Account.Frozen>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Account.Frozen, 7));
};


/**
 * @param {!Array<!proto.protocol.Account.Frozen>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setFrozenList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.protocol.Account.Frozen=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Account.Frozen}
 */
proto.protocol.Account.prototype.addFrozen = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.protocol.Account.Frozen, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearFrozenList = function() {
  return this.setFrozenList([]);
};


/**
 * optional int64 net_usage = 8;
 * @return {number}
 */
proto.protocol.Account.prototype.getNetUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setNetUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 acquired_delegated_frozen_balance_for_bandwidth = 41;
 * @return {number}
 */
proto.protocol.Account.prototype.getAcquiredDelegatedFrozenBalanceForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 41, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAcquiredDelegatedFrozenBalanceForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 41, value);
};


/**
 * optional int64 delegated_frozen_balance_for_bandwidth = 42;
 * @return {number}
 */
proto.protocol.Account.prototype.getDelegatedFrozenBalanceForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 42, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setDelegatedFrozenBalanceForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 42, value);
};


/**
 * optional int64 old_tron_power = 46;
 * @return {number}
 */
proto.protocol.Account.prototype.getOldTronPower = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 46, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setOldTronPower = function(value) {
  return jspb.Message.setProto3IntField(this, 46, value);
};


/**
 * optional Frozen tron_power = 47;
 * @return {?proto.protocol.Account.Frozen}
 */
proto.protocol.Account.prototype.getTronPower = function() {
  return /** @type{?proto.protocol.Account.Frozen} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Account.Frozen, 47));
};


/**
 * @param {?proto.protocol.Account.Frozen|undefined} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setTronPower = function(value) {
  return jspb.Message.setWrapperField(this, 47, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearTronPower = function() {
  return this.setTronPower(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Account.prototype.hasTronPower = function() {
  return jspb.Message.getField(this, 47) != null;
};


/**
 * optional bool asset_optimized = 60;
 * @return {boolean}
 */
proto.protocol.Account.prototype.getAssetOptimized = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 60, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAssetOptimized = function(value) {
  return jspb.Message.setProto3BooleanField(this, 60, value);
};


/**
 * optional int64 create_time = 9;
 * @return {number}
 */
proto.protocol.Account.prototype.getCreateTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setCreateTime = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 latest_opration_time = 10;
 * @return {number}
 */
proto.protocol.Account.prototype.getLatestOprationTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setLatestOprationTime = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int64 allowance = 11;
 * @return {number}
 */
proto.protocol.Account.prototype.getAllowance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAllowance = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int64 latest_withdraw_time = 12;
 * @return {number}
 */
proto.protocol.Account.prototype.getLatestWithdrawTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setLatestWithdrawTime = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional bytes code = 13;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getCode = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * optional bytes code = 13;
 * This is a type-conversion wrapper around `getCode()`
 * @return {string}
 */
proto.protocol.Account.prototype.getCode_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCode()));
};


/**
 * optional bytes code = 13;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCode()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getCode_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCode()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setCode = function(value) {
  return jspb.Message.setProto3BytesField(this, 13, value);
};


/**
 * optional bool is_witness = 14;
 * @return {boolean}
 */
proto.protocol.Account.prototype.getIsWitness = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 14, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setIsWitness = function(value) {
  return jspb.Message.setProto3BooleanField(this, 14, value);
};


/**
 * optional bool is_committee = 15;
 * @return {boolean}
 */
proto.protocol.Account.prototype.getIsCommittee = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 15, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setIsCommittee = function(value) {
  return jspb.Message.setProto3BooleanField(this, 15, value);
};


/**
 * repeated Frozen frozen_supply = 16;
 * @return {!Array<!proto.protocol.Account.Frozen>}
 */
proto.protocol.Account.prototype.getFrozenSupplyList = function() {
  return /** @type{!Array<!proto.protocol.Account.Frozen>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Account.Frozen, 16));
};


/**
 * @param {!Array<!proto.protocol.Account.Frozen>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setFrozenSupplyList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.protocol.Account.Frozen=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Account.Frozen}
 */
proto.protocol.Account.prototype.addFrozenSupply = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.protocol.Account.Frozen, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearFrozenSupplyList = function() {
  return this.setFrozenSupplyList([]);
};


/**
 * optional bytes asset_issued_name = 17;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getAssetIssuedName = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 17, ""));
};


/**
 * optional bytes asset_issued_name = 17;
 * This is a type-conversion wrapper around `getAssetIssuedName()`
 * @return {string}
 */
proto.protocol.Account.prototype.getAssetIssuedName_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAssetIssuedName()));
};


/**
 * optional bytes asset_issued_name = 17;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAssetIssuedName()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getAssetIssuedName_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAssetIssuedName()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAssetIssuedName = function(value) {
  return jspb.Message.setProto3BytesField(this, 17, value);
};


/**
 * optional bytes asset_issued_ID = 57;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getAssetIssuedId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 57, ""));
};


/**
 * optional bytes asset_issued_ID = 57;
 * This is a type-conversion wrapper around `getAssetIssuedId()`
 * @return {string}
 */
proto.protocol.Account.prototype.getAssetIssuedId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAssetIssuedId()));
};


/**
 * optional bytes asset_issued_ID = 57;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAssetIssuedId()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getAssetIssuedId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAssetIssuedId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAssetIssuedId = function(value) {
  return jspb.Message.setProto3BytesField(this, 57, value);
};


/**
 * map<string, int64> latest_asset_operation_time = 18;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getLatestAssetOperationTimeMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 18, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearLatestAssetOperationTimeMap = function() {
  this.getLatestAssetOperationTimeMap().clear();
  return this;
};


/**
 * map<string, int64> latest_asset_operation_timeV2 = 58;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getLatestAssetOperationTimev2Map = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 58, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearLatestAssetOperationTimev2Map = function() {
  this.getLatestAssetOperationTimev2Map().clear();
  return this;
};


/**
 * optional int64 free_net_usage = 19;
 * @return {number}
 */
proto.protocol.Account.prototype.getFreeNetUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setFreeNetUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};


/**
 * map<string, int64> free_asset_net_usage = 20;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getFreeAssetNetUsageMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 20, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearFreeAssetNetUsageMap = function() {
  this.getFreeAssetNetUsageMap().clear();
  return this;
};


/**
 * map<string, int64> free_asset_net_usageV2 = 59;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.protocol.Account.prototype.getFreeAssetNetUsagev2Map = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 59, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearFreeAssetNetUsagev2Map = function() {
  this.getFreeAssetNetUsagev2Map().clear();
  return this;
};


/**
 * optional int64 latest_consume_time = 21;
 * @return {number}
 */
proto.protocol.Account.prototype.getLatestConsumeTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setLatestConsumeTime = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int64 latest_consume_free_time = 22;
 * @return {number}
 */
proto.protocol.Account.prototype.getLatestConsumeFreeTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 22, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setLatestConsumeFreeTime = function(value) {
  return jspb.Message.setProto3IntField(this, 22, value);
};


/**
 * optional bytes account_id = 23;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getAccountId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 23, ""));
};


/**
 * optional bytes account_id = 23;
 * This is a type-conversion wrapper around `getAccountId()`
 * @return {string}
 */
proto.protocol.Account.prototype.getAccountId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccountId()));
};


/**
 * optional bytes account_id = 23;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccountId()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getAccountId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccountId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAccountId = function(value) {
  return jspb.Message.setProto3BytesField(this, 23, value);
};


/**
 * optional int64 net_window_size = 24;
 * @return {number}
 */
proto.protocol.Account.prototype.getNetWindowSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 24, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setNetWindowSize = function(value) {
  return jspb.Message.setProto3IntField(this, 24, value);
};


/**
 * optional AccountResource account_resource = 26;
 * @return {?proto.protocol.Account.AccountResource}
 */
proto.protocol.Account.prototype.getAccountResource = function() {
  return /** @type{?proto.protocol.Account.AccountResource} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Account.AccountResource, 26));
};


/**
 * @param {?proto.protocol.Account.AccountResource|undefined} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setAccountResource = function(value) {
  return jspb.Message.setWrapperField(this, 26, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearAccountResource = function() {
  return this.setAccountResource(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Account.prototype.hasAccountResource = function() {
  return jspb.Message.getField(this, 26) != null;
};


/**
 * optional bytes codeHash = 30;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Account.prototype.getCodehash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 30, ""));
};


/**
 * optional bytes codeHash = 30;
 * This is a type-conversion wrapper around `getCodehash()`
 * @return {string}
 */
proto.protocol.Account.prototype.getCodehash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCodehash()));
};


/**
 * optional bytes codeHash = 30;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCodehash()`
 * @return {!Uint8Array}
 */
proto.protocol.Account.prototype.getCodehash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCodehash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setCodehash = function(value) {
  return jspb.Message.setProto3BytesField(this, 30, value);
};


/**
 * optional Permission owner_permission = 31;
 * @return {?proto.protocol.Permission}
 */
proto.protocol.Account.prototype.getOwnerPermission = function() {
  return /** @type{?proto.protocol.Permission} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Permission, 31));
};


/**
 * @param {?proto.protocol.Permission|undefined} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setOwnerPermission = function(value) {
  return jspb.Message.setWrapperField(this, 31, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearOwnerPermission = function() {
  return this.setOwnerPermission(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Account.prototype.hasOwnerPermission = function() {
  return jspb.Message.getField(this, 31) != null;
};


/**
 * optional Permission witness_permission = 32;
 * @return {?proto.protocol.Permission}
 */
proto.protocol.Account.prototype.getWitnessPermission = function() {
  return /** @type{?proto.protocol.Permission} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Permission, 32));
};


/**
 * @param {?proto.protocol.Permission|undefined} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setWitnessPermission = function(value) {
  return jspb.Message.setWrapperField(this, 32, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearWitnessPermission = function() {
  return this.setWitnessPermission(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Account.prototype.hasWitnessPermission = function() {
  return jspb.Message.getField(this, 32) != null;
};


/**
 * repeated Permission active_permission = 33;
 * @return {!Array<!proto.protocol.Permission>}
 */
proto.protocol.Account.prototype.getActivePermissionList = function() {
  return /** @type{!Array<!proto.protocol.Permission>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Permission, 33));
};


/**
 * @param {!Array<!proto.protocol.Permission>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setActivePermissionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 33, value);
};


/**
 * @param {!proto.protocol.Permission=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Permission}
 */
proto.protocol.Account.prototype.addActivePermission = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 33, opt_value, proto.protocol.Permission, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearActivePermissionList = function() {
  return this.setActivePermissionList([]);
};


/**
 * repeated FreezeV2 frozenV2 = 34;
 * @return {!Array<!proto.protocol.Account.FreezeV2>}
 */
proto.protocol.Account.prototype.getFrozenv2List = function() {
  return /** @type{!Array<!proto.protocol.Account.FreezeV2>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Account.FreezeV2, 34));
};


/**
 * @param {!Array<!proto.protocol.Account.FreezeV2>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setFrozenv2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 34, value);
};


/**
 * @param {!proto.protocol.Account.FreezeV2=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Account.FreezeV2}
 */
proto.protocol.Account.prototype.addFrozenv2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 34, opt_value, proto.protocol.Account.FreezeV2, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearFrozenv2List = function() {
  return this.setFrozenv2List([]);
};


/**
 * repeated UnFreezeV2 unfrozenV2 = 35;
 * @return {!Array<!proto.protocol.Account.UnFreezeV2>}
 */
proto.protocol.Account.prototype.getUnfrozenv2List = function() {
  return /** @type{!Array<!proto.protocol.Account.UnFreezeV2>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Account.UnFreezeV2, 35));
};


/**
 * @param {!Array<!proto.protocol.Account.UnFreezeV2>} value
 * @return {!proto.protocol.Account} returns this
*/
proto.protocol.Account.prototype.setUnfrozenv2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 35, value);
};


/**
 * @param {!proto.protocol.Account.UnFreezeV2=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Account.UnFreezeV2}
 */
proto.protocol.Account.prototype.addUnfrozenv2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 35, opt_value, proto.protocol.Account.UnFreezeV2, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.clearUnfrozenv2List = function() {
  return this.setUnfrozenv2List([]);
};


/**
 * optional int64 delegated_frozenV2_balance_for_bandwidth = 36;
 * @return {number}
 */
proto.protocol.Account.prototype.getDelegatedFrozenv2BalanceForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 36, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setDelegatedFrozenv2BalanceForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 36, value);
};


/**
 * optional int64 acquired_delegated_frozenV2_balance_for_bandwidth = 37;
 * @return {number}
 */
proto.protocol.Account.prototype.getAcquiredDelegatedFrozenv2BalanceForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 37, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Account} returns this
 */
proto.protocol.Account.prototype.setAcquiredDelegatedFrozenv2BalanceForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 37, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Key.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Key.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Key} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Key.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: msg.getAddress_asB64(),
    weight: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Key}
 */
proto.protocol.Key.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Key;
  return proto.protocol.Key.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Key} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Key}
 */
proto.protocol.Key.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Key.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Key.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Key} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Key.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getWeight();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Key.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes address = 1;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.Key.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Key.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Key} returns this
 */
proto.protocol.Key.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 weight = 2;
 * @return {number}
 */
proto.protocol.Key.prototype.getWeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Key} returns this
 */
proto.protocol.Key.prototype.setWeight = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.DelegatedResource.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.DelegatedResource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.DelegatedResource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DelegatedResource.toObject = function(includeInstance, msg) {
  var f, obj = {
    from: msg.getFrom_asB64(),
    to: msg.getTo_asB64(),
    frozenBalanceForBandwidth: jspb.Message.getFieldWithDefault(msg, 3, 0),
    frozenBalanceForEnergy: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expireTimeForBandwidth: jspb.Message.getFieldWithDefault(msg, 5, 0),
    expireTimeForEnergy: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.DelegatedResource}
 */
proto.protocol.DelegatedResource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.DelegatedResource;
  return proto.protocol.DelegatedResource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.DelegatedResource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.DelegatedResource}
 */
proto.protocol.DelegatedResource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFrom(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTo(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFrozenBalanceForBandwidth(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFrozenBalanceForEnergy(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpireTimeForBandwidth(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpireTimeForEnergy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.DelegatedResource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.DelegatedResource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.DelegatedResource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DelegatedResource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrom_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTo_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getFrozenBalanceForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getFrozenBalanceForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getExpireTimeForBandwidth();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getExpireTimeForEnergy();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
};


/**
 * optional bytes from = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.DelegatedResource.prototype.getFrom = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes from = 1;
 * This is a type-conversion wrapper around `getFrom()`
 * @return {string}
 */
proto.protocol.DelegatedResource.prototype.getFrom_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFrom()));
};


/**
 * optional bytes from = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFrom()`
 * @return {!Uint8Array}
 */
proto.protocol.DelegatedResource.prototype.getFrom_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFrom()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setFrom = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes to = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.DelegatedResource.prototype.getTo = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes to = 2;
 * This is a type-conversion wrapper around `getTo()`
 * @return {string}
 */
proto.protocol.DelegatedResource.prototype.getTo_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTo()));
};


/**
 * optional bytes to = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTo()`
 * @return {!Uint8Array}
 */
proto.protocol.DelegatedResource.prototype.getTo_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTo()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setTo = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 frozen_balance_for_bandwidth = 3;
 * @return {number}
 */
proto.protocol.DelegatedResource.prototype.getFrozenBalanceForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setFrozenBalanceForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 frozen_balance_for_energy = 4;
 * @return {number}
 */
proto.protocol.DelegatedResource.prototype.getFrozenBalanceForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setFrozenBalanceForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 expire_time_for_bandwidth = 5;
 * @return {number}
 */
proto.protocol.DelegatedResource.prototype.getExpireTimeForBandwidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setExpireTimeForBandwidth = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 expire_time_for_energy = 6;
 * @return {number}
 */
proto.protocol.DelegatedResource.prototype.getExpireTimeForEnergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DelegatedResource} returns this
 */
proto.protocol.DelegatedResource.prototype.setExpireTimeForEnergy = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.authority.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.authority.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.authority} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.authority.toObject = function(includeInstance, msg) {
  var f, obj = {
    account: (f = msg.getAccount()) && proto.protocol.AccountId.toObject(includeInstance, f),
    permissionName: msg.getPermissionName_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.authority}
 */
proto.protocol.authority.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.authority;
  return proto.protocol.authority.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.authority} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.authority}
 */
proto.protocol.authority.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.AccountId;
      reader.readMessage(value,proto.protocol.AccountId.deserializeBinaryFromReader);
      msg.setAccount(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPermissionName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.authority.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.authority.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.authority} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.authority.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccount();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.AccountId.serializeBinaryToWriter
    );
  }
  f = message.getPermissionName_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional AccountId account = 1;
 * @return {?proto.protocol.AccountId}
 */
proto.protocol.authority.prototype.getAccount = function() {
  return /** @type{?proto.protocol.AccountId} */ (
    jspb.Message.getWrapperField(this, proto.protocol.AccountId, 1));
};


/**
 * @param {?proto.protocol.AccountId|undefined} value
 * @return {!proto.protocol.authority} returns this
*/
proto.protocol.authority.prototype.setAccount = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.authority} returns this
 */
proto.protocol.authority.prototype.clearAccount = function() {
  return this.setAccount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.authority.prototype.hasAccount = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes permission_name = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.authority.prototype.getPermissionName = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes permission_name = 2;
 * This is a type-conversion wrapper around `getPermissionName()`
 * @return {string}
 */
proto.protocol.authority.prototype.getPermissionName_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPermissionName()));
};


/**
 * optional bytes permission_name = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPermissionName()`
 * @return {!Uint8Array}
 */
proto.protocol.authority.prototype.getPermissionName_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPermissionName()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.authority} returns this
 */
proto.protocol.authority.prototype.setPermissionName = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Permission.repeatedFields_ = [7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Permission.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Permission.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Permission} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Permission.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    id: jspb.Message.getFieldWithDefault(msg, 2, 0),
    permissionName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    threshold: jspb.Message.getFieldWithDefault(msg, 4, 0),
    parentId: jspb.Message.getFieldWithDefault(msg, 5, 0),
    operations: msg.getOperations_asB64(),
    keysList: jspb.Message.toObjectList(msg.getKeysList(),
    proto.protocol.Key.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Permission}
 */
proto.protocol.Permission.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Permission;
  return proto.protocol.Permission.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Permission} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Permission}
 */
proto.protocol.Permission.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.Permission.PermissionType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPermissionName(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setThreshold(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setParentId(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOperations(value);
      break;
    case 7:
      var value = new proto.protocol.Key;
      reader.readMessage(value,proto.protocol.Key.deserializeBinaryFromReader);
      msg.addKeys(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Permission.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Permission.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Permission} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Permission.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getPermissionName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getThreshold();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getParentId();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getOperations_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getKeysList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.protocol.Key.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Permission.PermissionType = {
  OWNER: 0,
  WITNESS: 1,
  ACTIVE: 2
};

/**
 * optional PermissionType type = 1;
 * @return {!proto.protocol.Permission.PermissionType}
 */
proto.protocol.Permission.prototype.getType = function() {
  return /** @type {!proto.protocol.Permission.PermissionType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.Permission.PermissionType} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int32 id = 2;
 * @return {number}
 */
proto.protocol.Permission.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string permission_name = 3;
 * @return {string}
 */
proto.protocol.Permission.prototype.getPermissionName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setPermissionName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 threshold = 4;
 * @return {number}
 */
proto.protocol.Permission.prototype.getThreshold = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setThreshold = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 parent_id = 5;
 * @return {number}
 */
proto.protocol.Permission.prototype.getParentId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setParentId = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bytes operations = 6;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Permission.prototype.getOperations = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes operations = 6;
 * This is a type-conversion wrapper around `getOperations()`
 * @return {string}
 */
proto.protocol.Permission.prototype.getOperations_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOperations()));
};


/**
 * optional bytes operations = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOperations()`
 * @return {!Uint8Array}
 */
proto.protocol.Permission.prototype.getOperations_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOperations()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.setOperations = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * repeated Key keys = 7;
 * @return {!Array<!proto.protocol.Key>}
 */
proto.protocol.Permission.prototype.getKeysList = function() {
  return /** @type{!Array<!proto.protocol.Key>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Key, 7));
};


/**
 * @param {!Array<!proto.protocol.Key>} value
 * @return {!proto.protocol.Permission} returns this
*/
proto.protocol.Permission.prototype.setKeysList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.protocol.Key=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Key}
 */
proto.protocol.Permission.prototype.addKeys = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.protocol.Key, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Permission} returns this
 */
proto.protocol.Permission.prototype.clearKeysList = function() {
  return this.setKeysList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Witness.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Witness.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Witness} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Witness.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: msg.getAddress_asB64(),
    votecount: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pubkey: msg.getPubkey_asB64(),
    url: jspb.Message.getFieldWithDefault(msg, 4, ""),
    totalproduced: jspb.Message.getFieldWithDefault(msg, 5, 0),
    totalmissed: jspb.Message.getFieldWithDefault(msg, 6, 0),
    latestblocknum: jspb.Message.getFieldWithDefault(msg, 7, 0),
    latestslotnum: jspb.Message.getFieldWithDefault(msg, 8, 0),
    isjobs: jspb.Message.getBooleanFieldWithDefault(msg, 9, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Witness}
 */
proto.protocol.Witness.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Witness;
  return proto.protocol.Witness.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Witness} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Witness}
 */
proto.protocol.Witness.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setVotecount(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkey(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalproduced(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalmissed(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestblocknum(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLatestslotnum(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsjobs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Witness.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Witness.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Witness} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Witness.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVotecount();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getPubkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTotalproduced();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getTotalmissed();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getLatestblocknum();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getLatestslotnum();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getIsjobs();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
};


/**
 * optional bytes address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Witness.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes address = 1;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.Witness.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Witness.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 voteCount = 2;
 * @return {number}
 */
proto.protocol.Witness.prototype.getVotecount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setVotecount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes pubKey = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Witness.prototype.getPubkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes pubKey = 3;
 * This is a type-conversion wrapper around `getPubkey()`
 * @return {string}
 */
proto.protocol.Witness.prototype.getPubkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkey()));
};


/**
 * optional bytes pubKey = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkey()`
 * @return {!Uint8Array}
 */
proto.protocol.Witness.prototype.getPubkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setPubkey = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional string url = 4;
 * @return {string}
 */
proto.protocol.Witness.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 totalProduced = 5;
 * @return {number}
 */
proto.protocol.Witness.prototype.getTotalproduced = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setTotalproduced = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 totalMissed = 6;
 * @return {number}
 */
proto.protocol.Witness.prototype.getTotalmissed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setTotalmissed = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int64 latestBlockNum = 7;
 * @return {number}
 */
proto.protocol.Witness.prototype.getLatestblocknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setLatestblocknum = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 latestSlotNum = 8;
 * @return {number}
 */
proto.protocol.Witness.prototype.getLatestslotnum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setLatestslotnum = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional bool isJobs = 9;
 * @return {boolean}
 */
proto.protocol.Witness.prototype.getIsjobs = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.Witness} returns this
 */
proto.protocol.Witness.prototype.setIsjobs = function(value) {
  return jspb.Message.setProto3BooleanField(this, 9, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Votes.repeatedFields_ = [2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Votes.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Votes.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Votes} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Votes.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: msg.getAddress_asB64(),
    oldVotesList: jspb.Message.toObjectList(msg.getOldVotesList(),
    proto.protocol.Vote.toObject, includeInstance),
    newVotesList: jspb.Message.toObjectList(msg.getNewVotesList(),
    proto.protocol.Vote.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Votes}
 */
proto.protocol.Votes.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Votes;
  return proto.protocol.Votes.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Votes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Votes}
 */
proto.protocol.Votes.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 2:
      var value = new proto.protocol.Vote;
      reader.readMessage(value,proto.protocol.Vote.deserializeBinaryFromReader);
      msg.addOldVotes(value);
      break;
    case 3:
      var value = new proto.protocol.Vote;
      reader.readMessage(value,proto.protocol.Vote.deserializeBinaryFromReader);
      msg.addNewVotes(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Votes.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Votes.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Votes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Votes.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getOldVotesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.protocol.Vote.serializeBinaryToWriter
    );
  }
  f = message.getNewVotesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.protocol.Vote.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Votes.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes address = 1;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.Votes.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.Votes.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Votes} returns this
 */
proto.protocol.Votes.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated Vote old_votes = 2;
 * @return {!Array<!proto.protocol.Vote>}
 */
proto.protocol.Votes.prototype.getOldVotesList = function() {
  return /** @type{!Array<!proto.protocol.Vote>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Vote, 2));
};


/**
 * @param {!Array<!proto.protocol.Vote>} value
 * @return {!proto.protocol.Votes} returns this
*/
proto.protocol.Votes.prototype.setOldVotesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.protocol.Vote=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Vote}
 */
proto.protocol.Votes.prototype.addOldVotes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.protocol.Vote, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Votes} returns this
 */
proto.protocol.Votes.prototype.clearOldVotesList = function() {
  return this.setOldVotesList([]);
};


/**
 * repeated Vote new_votes = 3;
 * @return {!Array<!proto.protocol.Vote>}
 */
proto.protocol.Votes.prototype.getNewVotesList = function() {
  return /** @type{!Array<!proto.protocol.Vote>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Vote, 3));
};


/**
 * @param {!Array<!proto.protocol.Vote>} value
 * @return {!proto.protocol.Votes} returns this
*/
proto.protocol.Votes.prototype.setNewVotesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.protocol.Vote=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Vote}
 */
proto.protocol.Votes.prototype.addNewVotes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.protocol.Vote, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Votes} returns this
 */
proto.protocol.Votes.prototype.clearNewVotesList = function() {
  return this.setNewVotesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TXOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TXOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TXOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pubkeyhash: msg.getPubkeyhash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TXOutput}
 */
proto.protocol.TXOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TXOutput;
  return proto.protocol.TXOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TXOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TXOutput}
 */
proto.protocol.TXOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkeyhash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TXOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TXOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TXOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getPubkeyhash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional int64 value = 1;
 * @return {number}
 */
proto.protocol.TXOutput.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TXOutput} returns this
 */
proto.protocol.TXOutput.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes pubKeyHash = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TXOutput.prototype.getPubkeyhash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes pubKeyHash = 2;
 * This is a type-conversion wrapper around `getPubkeyhash()`
 * @return {string}
 */
proto.protocol.TXOutput.prototype.getPubkeyhash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkeyhash()));
};


/**
 * optional bytes pubKeyHash = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkeyhash()`
 * @return {!Uint8Array}
 */
proto.protocol.TXOutput.prototype.getPubkeyhash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkeyhash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TXOutput} returns this
 */
proto.protocol.TXOutput.prototype.setPubkeyhash = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TXInput.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TXInput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TXInput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXInput.toObject = function(includeInstance, msg) {
  var f, obj = {
    rawData: (f = msg.getRawData()) && proto.protocol.TXInput.raw.toObject(includeInstance, f),
    signature: msg.getSignature_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TXInput}
 */
proto.protocol.TXInput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TXInput;
  return proto.protocol.TXInput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TXInput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TXInput}
 */
proto.protocol.TXInput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.TXInput.raw;
      reader.readMessage(value,proto.protocol.TXInput.raw.deserializeBinaryFromReader);
      msg.setRawData(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TXInput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TXInput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TXInput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXInput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRawData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.TXInput.raw.serializeBinaryToWriter
    );
  }
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TXInput.raw.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TXInput.raw.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TXInput.raw} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXInput.raw.toObject = function(includeInstance, msg) {
  var f, obj = {
    txid: msg.getTxid_asB64(),
    vout: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pubkey: msg.getPubkey_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TXInput.raw}
 */
proto.protocol.TXInput.raw.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TXInput.raw;
  return proto.protocol.TXInput.raw.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TXInput.raw} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TXInput.raw}
 */
proto.protocol.TXInput.raw.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTxid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setVout(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TXInput.raw.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TXInput.raw.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TXInput.raw} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXInput.raw.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTxid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVout();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getPubkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional bytes txID = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TXInput.raw.prototype.getTxid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes txID = 1;
 * This is a type-conversion wrapper around `getTxid()`
 * @return {string}
 */
proto.protocol.TXInput.raw.prototype.getTxid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTxid()));
};


/**
 * optional bytes txID = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTxid()`
 * @return {!Uint8Array}
 */
proto.protocol.TXInput.raw.prototype.getTxid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTxid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TXInput.raw} returns this
 */
proto.protocol.TXInput.raw.prototype.setTxid = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 vout = 2;
 * @return {number}
 */
proto.protocol.TXInput.raw.prototype.getVout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TXInput.raw} returns this
 */
proto.protocol.TXInput.raw.prototype.setVout = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes pubKey = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TXInput.raw.prototype.getPubkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes pubKey = 3;
 * This is a type-conversion wrapper around `getPubkey()`
 * @return {string}
 */
proto.protocol.TXInput.raw.prototype.getPubkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkey()));
};


/**
 * optional bytes pubKey = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkey()`
 * @return {!Uint8Array}
 */
proto.protocol.TXInput.raw.prototype.getPubkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TXInput.raw} returns this
 */
proto.protocol.TXInput.raw.prototype.setPubkey = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional raw raw_data = 1;
 * @return {?proto.protocol.TXInput.raw}
 */
proto.protocol.TXInput.prototype.getRawData = function() {
  return /** @type{?proto.protocol.TXInput.raw} */ (
    jspb.Message.getWrapperField(this, proto.protocol.TXInput.raw, 1));
};


/**
 * @param {?proto.protocol.TXInput.raw|undefined} value
 * @return {!proto.protocol.TXInput} returns this
*/
proto.protocol.TXInput.prototype.setRawData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.TXInput} returns this
 */
proto.protocol.TXInput.prototype.clearRawData = function() {
  return this.setRawData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.TXInput.prototype.hasRawData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes signature = 4;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TXInput.prototype.getSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes signature = 4;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.protocol.TXInput.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.protocol.TXInput.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TXInput} returns this
 */
proto.protocol.TXInput.prototype.setSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.TXOutputs.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TXOutputs.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TXOutputs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TXOutputs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXOutputs.toObject = function(includeInstance, msg) {
  var f, obj = {
    outputsList: jspb.Message.toObjectList(msg.getOutputsList(),
    proto.protocol.TXOutput.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TXOutputs}
 */
proto.protocol.TXOutputs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TXOutputs;
  return proto.protocol.TXOutputs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TXOutputs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TXOutputs}
 */
proto.protocol.TXOutputs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.TXOutput;
      reader.readMessage(value,proto.protocol.TXOutput.deserializeBinaryFromReader);
      msg.addOutputs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TXOutputs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TXOutputs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TXOutputs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TXOutputs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOutputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.TXOutput.serializeBinaryToWriter
    );
  }
};


/**
 * repeated TXOutput outputs = 1;
 * @return {!Array<!proto.protocol.TXOutput>}
 */
proto.protocol.TXOutputs.prototype.getOutputsList = function() {
  return /** @type{!Array<!proto.protocol.TXOutput>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.TXOutput, 1));
};


/**
 * @param {!Array<!proto.protocol.TXOutput>} value
 * @return {!proto.protocol.TXOutputs} returns this
*/
proto.protocol.TXOutputs.prototype.setOutputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.TXOutput=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.TXOutput}
 */
proto.protocol.TXOutputs.prototype.addOutputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.TXOutput, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TXOutputs} returns this
 */
proto.protocol.TXOutputs.prototype.clearOutputsList = function() {
  return this.setOutputsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.ResourceReceipt.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.ResourceReceipt.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.ResourceReceipt} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ResourceReceipt.toObject = function(includeInstance, msg) {
  var f, obj = {
    energyUsage: jspb.Message.getFieldWithDefault(msg, 1, 0),
    energyFee: jspb.Message.getFieldWithDefault(msg, 2, 0),
    originEnergyUsage: jspb.Message.getFieldWithDefault(msg, 3, 0),
    energyUsageTotal: jspb.Message.getFieldWithDefault(msg, 4, 0),
    netUsage: jspb.Message.getFieldWithDefault(msg, 5, 0),
    netFee: jspb.Message.getFieldWithDefault(msg, 6, 0),
    result: jspb.Message.getFieldWithDefault(msg, 7, 0),
    energyPenaltyTotal: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ResourceReceipt}
 */
proto.protocol.ResourceReceipt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.ResourceReceipt;
  return proto.protocol.ResourceReceipt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ResourceReceipt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ResourceReceipt}
 */
proto.protocol.ResourceReceipt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyUsage(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyFee(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setOriginEnergyUsage(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyUsageTotal(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNetUsage(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNetFee(value);
      break;
    case 7:
      var value = /** @type {!proto.protocol.Transaction.Result.contractResult} */ (reader.readEnum());
      msg.setResult(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEnergyPenaltyTotal(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ResourceReceipt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.ResourceReceipt.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ResourceReceipt} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ResourceReceipt.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEnergyUsage();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getEnergyFee();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getOriginEnergyUsage();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getEnergyUsageTotal();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getNetUsage();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getNetFee();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getResult();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = message.getEnergyPenaltyTotal();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
};


/**
 * optional int64 energy_usage = 1;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getEnergyUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setEnergyUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 energy_fee = 2;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getEnergyFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setEnergyFee = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 origin_energy_usage = 3;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getOriginEnergyUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setOriginEnergyUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 energy_usage_total = 4;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getEnergyUsageTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setEnergyUsageTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 net_usage = 5;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getNetUsage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setNetUsage = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 net_fee = 6;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getNetFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setNetFee = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional Transaction.Result.contractResult result = 7;
 * @return {!proto.protocol.Transaction.Result.contractResult}
 */
proto.protocol.ResourceReceipt.prototype.getResult = function() {
  return /** @type {!proto.protocol.Transaction.Result.contractResult} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.protocol.Transaction.Result.contractResult} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setResult = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};


/**
 * optional int64 energy_penalty_total = 8;
 * @return {number}
 */
proto.protocol.ResourceReceipt.prototype.getEnergyPenaltyTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ResourceReceipt} returns this
 */
proto.protocol.ResourceReceipt.prototype.setEnergyPenaltyTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MarketOrderDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MarketOrderDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MarketOrderDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    makerorderid: msg.getMakerorderid_asB64(),
    takerorderid: msg.getTakerorderid_asB64(),
    fillsellquantity: jspb.Message.getFieldWithDefault(msg, 3, 0),
    fillbuyquantity: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MarketOrderDetail}
 */
proto.protocol.MarketOrderDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MarketOrderDetail;
  return proto.protocol.MarketOrderDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MarketOrderDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MarketOrderDetail}
 */
proto.protocol.MarketOrderDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMakerorderid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTakerorderid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFillsellquantity(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFillbuyquantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MarketOrderDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MarketOrderDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MarketOrderDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMakerorderid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTakerorderid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getFillsellquantity();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getFillbuyquantity();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional bytes makerOrderId = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderDetail.prototype.getMakerorderid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes makerOrderId = 1;
 * This is a type-conversion wrapper around `getMakerorderid()`
 * @return {string}
 */
proto.protocol.MarketOrderDetail.prototype.getMakerorderid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMakerorderid()));
};


/**
 * optional bytes makerOrderId = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMakerorderid()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderDetail.prototype.getMakerorderid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMakerorderid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderDetail} returns this
 */
proto.protocol.MarketOrderDetail.prototype.setMakerorderid = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes takerOrderId = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.MarketOrderDetail.prototype.getTakerorderid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes takerOrderId = 2;
 * This is a type-conversion wrapper around `getTakerorderid()`
 * @return {string}
 */
proto.protocol.MarketOrderDetail.prototype.getTakerorderid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTakerorderid()));
};


/**
 * optional bytes takerOrderId = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTakerorderid()`
 * @return {!Uint8Array}
 */
proto.protocol.MarketOrderDetail.prototype.getTakerorderid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTakerorderid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.MarketOrderDetail} returns this
 */
proto.protocol.MarketOrderDetail.prototype.setTakerorderid = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 fillSellQuantity = 3;
 * @return {number}
 */
proto.protocol.MarketOrderDetail.prototype.getFillsellquantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrderDetail} returns this
 */
proto.protocol.MarketOrderDetail.prototype.setFillsellquantity = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 fillBuyQuantity = 4;
 * @return {number}
 */
proto.protocol.MarketOrderDetail.prototype.getFillbuyquantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MarketOrderDetail} returns this
 */
proto.protocol.MarketOrderDetail.prototype.setFillbuyquantity = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Transaction.repeatedFields_ = [2,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Transaction.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Transaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Transaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    rawData: (f = msg.getRawData()) && proto.protocol.Transaction.raw.toObject(includeInstance, f),
    signatureList: msg.getSignatureList_asB64(),
    retList: jspb.Message.toObjectList(msg.getRetList(),
    proto.protocol.Transaction.Result.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Transaction}
 */
proto.protocol.Transaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Transaction;
  return proto.protocol.Transaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Transaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Transaction}
 */
proto.protocol.Transaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.Transaction.raw;
      reader.readMessage(value,proto.protocol.Transaction.raw.deserializeBinaryFromReader);
      msg.setRawData(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addSignature(value);
      break;
    case 5:
      var value = new proto.protocol.Transaction.Result;
      reader.readMessage(value,proto.protocol.Transaction.Result.deserializeBinaryFromReader);
      msg.addRet(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Transaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Transaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRawData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.Transaction.raw.serializeBinaryToWriter
    );
  }
  f = message.getSignatureList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
  f = message.getRetList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.protocol.Transaction.Result.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Transaction.Contract.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Transaction.Contract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Transaction.Contract} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.Contract.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    parameter: (f = msg.getParameter()) && google_protobuf_any_pb.Any.toObject(includeInstance, f),
    provider: msg.getProvider_asB64(),
    contractname: msg.getContractname_asB64(),
    permissionId: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Transaction.Contract}
 */
proto.protocol.Transaction.Contract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Transaction.Contract;
  return proto.protocol.Transaction.Contract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Transaction.Contract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Transaction.Contract}
 */
proto.protocol.Transaction.Contract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.Transaction.Contract.ContractType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new google_protobuf_any_pb.Any;
      reader.readMessage(value,google_protobuf_any_pb.Any.deserializeBinaryFromReader);
      msg.setParameter(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setProvider(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContractname(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPermissionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.Contract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Transaction.Contract.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Transaction.Contract} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.Contract.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getParameter();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_any_pb.Any.serializeBinaryToWriter
    );
  }
  f = message.getProvider_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getContractname_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getPermissionId();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Transaction.Contract.ContractType = {
  ACCOUNTCREATECONTRACT: 0,
  TRANSFERCONTRACT: 1,
  TRANSFERASSETCONTRACT: 2,
  VOTEASSETCONTRACT: 3,
  VOTEWITNESSCONTRACT: 4,
  WITNESSCREATECONTRACT: 5,
  ASSETISSUECONTRACT: 6,
  WITNESSUPDATECONTRACT: 8,
  PARTICIPATEASSETISSUECONTRACT: 9,
  ACCOUNTUPDATECONTRACT: 10,
  FREEZEBALANCECONTRACT: 11,
  UNFREEZEBALANCECONTRACT: 12,
  WITHDRAWBALANCECONTRACT: 13,
  UNFREEZEASSETCONTRACT: 14,
  UPDATEASSETCONTRACT: 15,
  PROPOSALCREATECONTRACT: 16,
  PROPOSALAPPROVECONTRACT: 17,
  PROPOSALDELETECONTRACT: 18,
  SETACCOUNTIDCONTRACT: 19,
  CUSTOMCONTRACT: 20,
  CREATESMARTCONTRACT: 30,
  TRIGGERSMARTCONTRACT: 31,
  GETCONTRACT: 32,
  UPDATESETTINGCONTRACT: 33,
  EXCHANGECREATECONTRACT: 41,
  EXCHANGEINJECTCONTRACT: 42,
  EXCHANGEWITHDRAWCONTRACT: 43,
  EXCHANGETRANSACTIONCONTRACT: 44,
  UPDATEENERGYLIMITCONTRACT: 45,
  ACCOUNTPERMISSIONUPDATECONTRACT: 46,
  CLEARABICONTRACT: 48,
  UPDATEBROKERAGECONTRACT: 49,
  SHIELDEDTRANSFERCONTRACT: 51,
  MARKETSELLASSETCONTRACT: 52,
  MARKETCANCELORDERCONTRACT: 53,
  FREEZEBALANCEV2CONTRACT: 54,
  UNFREEZEBALANCEV2CONTRACT: 55,
  WITHDRAWEXPIREUNFREEZECONTRACT: 56,
  DELEGATERESOURCECONTRACT: 57,
  UNDELEGATERESOURCECONTRACT: 58
};

/**
 * optional ContractType type = 1;
 * @return {!proto.protocol.Transaction.Contract.ContractType}
 */
proto.protocol.Transaction.Contract.prototype.getType = function() {
  return /** @type {!proto.protocol.Transaction.Contract.ContractType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.Transaction.Contract.ContractType} value
 * @return {!proto.protocol.Transaction.Contract} returns this
 */
proto.protocol.Transaction.Contract.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional google.protobuf.Any parameter = 2;
 * @return {?proto.google.protobuf.Any}
 */
proto.protocol.Transaction.Contract.prototype.getParameter = function() {
  return /** @type{?proto.google.protobuf.Any} */ (
    jspb.Message.getWrapperField(this, google_protobuf_any_pb.Any, 2));
};


/**
 * @param {?proto.google.protobuf.Any|undefined} value
 * @return {!proto.protocol.Transaction.Contract} returns this
*/
proto.protocol.Transaction.Contract.prototype.setParameter = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Transaction.Contract} returns this
 */
proto.protocol.Transaction.Contract.prototype.clearParameter = function() {
  return this.setParameter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Transaction.Contract.prototype.hasParameter = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bytes provider = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.Contract.prototype.getProvider = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes provider = 3;
 * This is a type-conversion wrapper around `getProvider()`
 * @return {string}
 */
proto.protocol.Transaction.Contract.prototype.getProvider_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getProvider()));
};


/**
 * optional bytes provider = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getProvider()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.Contract.prototype.getProvider_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getProvider()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.Contract} returns this
 */
proto.protocol.Transaction.Contract.prototype.setProvider = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes ContractName = 4;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.Contract.prototype.getContractname = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes ContractName = 4;
 * This is a type-conversion wrapper around `getContractname()`
 * @return {string}
 */
proto.protocol.Transaction.Contract.prototype.getContractname_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContractname()));
};


/**
 * optional bytes ContractName = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractname()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.Contract.prototype.getContractname_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContractname()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.Contract} returns this
 */
proto.protocol.Transaction.Contract.prototype.setContractname = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional int32 Permission_id = 5;
 * @return {number}
 */
proto.protocol.Transaction.Contract.prototype.getPermissionId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Contract} returns this
 */
proto.protocol.Transaction.Contract.prototype.setPermissionId = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Transaction.Result.repeatedFields_ = [26];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Transaction.Result.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Transaction.Result.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Transaction.Result} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.Result.toObject = function(includeInstance, msg) {
  var f, obj = {
    fee: jspb.Message.getFieldWithDefault(msg, 1, 0),
    ret: jspb.Message.getFieldWithDefault(msg, 2, 0),
    contractret: jspb.Message.getFieldWithDefault(msg, 3, 0),
    assetissueid: jspb.Message.getFieldWithDefault(msg, 14, ""),
    withdrawAmount: jspb.Message.getFieldWithDefault(msg, 15, 0),
    unfreezeAmount: jspb.Message.getFieldWithDefault(msg, 16, 0),
    exchangeReceivedAmount: jspb.Message.getFieldWithDefault(msg, 18, 0),
    exchangeInjectAnotherAmount: jspb.Message.getFieldWithDefault(msg, 19, 0),
    exchangeWithdrawAnotherAmount: jspb.Message.getFieldWithDefault(msg, 20, 0),
    exchangeId: jspb.Message.getFieldWithDefault(msg, 21, 0),
    shieldedTransactionFee: jspb.Message.getFieldWithDefault(msg, 22, 0),
    orderid: msg.getOrderid_asB64(),
    orderdetailsList: jspb.Message.toObjectList(msg.getOrderdetailsList(),
    proto.protocol.MarketOrderDetail.toObject, includeInstance),
    withdrawExpireAmount: jspb.Message.getFieldWithDefault(msg, 27, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Transaction.Result}
 */
proto.protocol.Transaction.Result.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Transaction.Result;
  return proto.protocol.Transaction.Result.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Transaction.Result} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Transaction.Result}
 */
proto.protocol.Transaction.Result.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFee(value);
      break;
    case 2:
      var value = /** @type {!proto.protocol.Transaction.Result.code} */ (reader.readEnum());
      msg.setRet(value);
      break;
    case 3:
      var value = /** @type {!proto.protocol.Transaction.Result.contractResult} */ (reader.readEnum());
      msg.setContractret(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssetissueid(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWithdrawAmount(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUnfreezeAmount(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeReceivedAmount(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeInjectAnotherAmount(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeWithdrawAnotherAmount(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setShieldedTransactionFee(value);
      break;
    case 25:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOrderid(value);
      break;
    case 26:
      var value = new proto.protocol.MarketOrderDetail;
      reader.readMessage(value,proto.protocol.MarketOrderDetail.deserializeBinaryFromReader);
      msg.addOrderdetails(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWithdrawExpireAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.Result.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Transaction.Result.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Transaction.Result} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.Result.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFee();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getRet();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getContractret();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getAssetissueid();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
  f = message.getWithdrawAmount();
  if (f !== 0) {
    writer.writeInt64(
      15,
      f
    );
  }
  f = message.getUnfreezeAmount();
  if (f !== 0) {
    writer.writeInt64(
      16,
      f
    );
  }
  f = message.getExchangeReceivedAmount();
  if (f !== 0) {
    writer.writeInt64(
      18,
      f
    );
  }
  f = message.getExchangeInjectAnotherAmount();
  if (f !== 0) {
    writer.writeInt64(
      19,
      f
    );
  }
  f = message.getExchangeWithdrawAnotherAmount();
  if (f !== 0) {
    writer.writeInt64(
      20,
      f
    );
  }
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      21,
      f
    );
  }
  f = message.getShieldedTransactionFee();
  if (f !== 0) {
    writer.writeInt64(
      22,
      f
    );
  }
  f = message.getOrderid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      25,
      f
    );
  }
  f = message.getOrderdetailsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      26,
      f,
      proto.protocol.MarketOrderDetail.serializeBinaryToWriter
    );
  }
  f = message.getWithdrawExpireAmount();
  if (f !== 0) {
    writer.writeInt64(
      27,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Transaction.Result.code = {
  SUCESS: 0,
  FAILED: 1
};

/**
 * @enum {number}
 */
proto.protocol.Transaction.Result.contractResult = {
  DEFAULT: 0,
  SUCCESS: 1,
  REVERT: 2,
  BAD_JUMP_DESTINATION: 3,
  OUT_OF_MEMORY: 4,
  PRECOMPILED_CONTRACT: 5,
  STACK_TOO_SMALL: 6,
  STACK_TOO_LARGE: 7,
  ILLEGAL_OPERATION: 8,
  STACK_OVERFLOW: 9,
  OUT_OF_ENERGY: 10,
  OUT_OF_TIME: 11,
  JVM_STACK_OVER_FLOW: 12,
  UNKNOWN: 13,
  TRANSFER_FAILED: 14,
  INVALID_CODE: 15
};

/**
 * optional int64 fee = 1;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setFee = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional code ret = 2;
 * @return {!proto.protocol.Transaction.Result.code}
 */
proto.protocol.Transaction.Result.prototype.getRet = function() {
  return /** @type {!proto.protocol.Transaction.Result.code} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.protocol.Transaction.Result.code} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setRet = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional contractResult contractRet = 3;
 * @return {!proto.protocol.Transaction.Result.contractResult}
 */
proto.protocol.Transaction.Result.prototype.getContractret = function() {
  return /** @type {!proto.protocol.Transaction.Result.contractResult} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.protocol.Transaction.Result.contractResult} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setContractret = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string assetIssueID = 14;
 * @return {string}
 */
proto.protocol.Transaction.Result.prototype.getAssetissueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setAssetissueid = function(value) {
  return jspb.Message.setProto3StringField(this, 14, value);
};


/**
 * optional int64 withdraw_amount = 15;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getWithdrawAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setWithdrawAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};


/**
 * optional int64 unfreeze_amount = 16;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getUnfreezeAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setUnfreezeAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 16, value);
};


/**
 * optional int64 exchange_received_amount = 18;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getExchangeReceivedAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setExchangeReceivedAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional int64 exchange_inject_another_amount = 19;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getExchangeInjectAnotherAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setExchangeInjectAnotherAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};


/**
 * optional int64 exchange_withdraw_another_amount = 20;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getExchangeWithdrawAnotherAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 20, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setExchangeWithdrawAnotherAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 20, value);
};


/**
 * optional int64 exchange_id = 21;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int64 shielded_transaction_fee = 22;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getShieldedTransactionFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 22, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setShieldedTransactionFee = function(value) {
  return jspb.Message.setProto3IntField(this, 22, value);
};


/**
 * optional bytes orderId = 25;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.Result.prototype.getOrderid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 25, ""));
};


/**
 * optional bytes orderId = 25;
 * This is a type-conversion wrapper around `getOrderid()`
 * @return {string}
 */
proto.protocol.Transaction.Result.prototype.getOrderid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOrderid()));
};


/**
 * optional bytes orderId = 25;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrderid()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.Result.prototype.getOrderid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOrderid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setOrderid = function(value) {
  return jspb.Message.setProto3BytesField(this, 25, value);
};


/**
 * repeated MarketOrderDetail orderDetails = 26;
 * @return {!Array<!proto.protocol.MarketOrderDetail>}
 */
proto.protocol.Transaction.Result.prototype.getOrderdetailsList = function() {
  return /** @type{!Array<!proto.protocol.MarketOrderDetail>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MarketOrderDetail, 26));
};


/**
 * @param {!Array<!proto.protocol.MarketOrderDetail>} value
 * @return {!proto.protocol.Transaction.Result} returns this
*/
proto.protocol.Transaction.Result.prototype.setOrderdetailsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 26, value);
};


/**
 * @param {!proto.protocol.MarketOrderDetail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketOrderDetail}
 */
proto.protocol.Transaction.Result.prototype.addOrderdetails = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 26, opt_value, proto.protocol.MarketOrderDetail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.clearOrderdetailsList = function() {
  return this.setOrderdetailsList([]);
};


/**
 * optional int64 withdraw_expire_amount = 27;
 * @return {number}
 */
proto.protocol.Transaction.Result.prototype.getWithdrawExpireAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 27, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.Result} returns this
 */
proto.protocol.Transaction.Result.prototype.setWithdrawExpireAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 27, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Transaction.raw.repeatedFields_ = [9,11];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Transaction.raw.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Transaction.raw.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Transaction.raw} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.raw.toObject = function(includeInstance, msg) {
  var f, obj = {
    refBlockBytes: msg.getRefBlockBytes_asB64(),
    refBlockNum: jspb.Message.getFieldWithDefault(msg, 3, 0),
    refBlockHash: msg.getRefBlockHash_asB64(),
    expiration: jspb.Message.getFieldWithDefault(msg, 8, 0),
    authsList: jspb.Message.toObjectList(msg.getAuthsList(),
    proto.protocol.authority.toObject, includeInstance),
    data: msg.getData_asB64(),
    contractList: jspb.Message.toObjectList(msg.getContractList(),
    proto.protocol.Transaction.Contract.toObject, includeInstance),
    scripts: msg.getScripts_asB64(),
    timestamp: jspb.Message.getFieldWithDefault(msg, 14, 0),
    feeLimit: jspb.Message.getFieldWithDefault(msg, 18, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Transaction.raw}
 */
proto.protocol.Transaction.raw.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Transaction.raw;
  return proto.protocol.Transaction.raw.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Transaction.raw} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Transaction.raw}
 */
proto.protocol.Transaction.raw.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRefBlockBytes(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setRefBlockNum(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRefBlockHash(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpiration(value);
      break;
    case 9:
      var value = new proto.protocol.authority;
      reader.readMessage(value,proto.protocol.authority.deserializeBinaryFromReader);
      msg.addAuths(value);
      break;
    case 10:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    case 11:
      var value = new proto.protocol.Transaction.Contract;
      reader.readMessage(value,proto.protocol.Transaction.Contract.deserializeBinaryFromReader);
      msg.addContract(value);
      break;
    case 12:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setScripts(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFeeLimit(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.raw.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Transaction.raw.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Transaction.raw} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transaction.raw.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRefBlockBytes_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getRefBlockNum();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getRefBlockHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getExpiration();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getAuthsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.protocol.authority.serializeBinaryToWriter
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      10,
      f
    );
  }
  f = message.getContractList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.protocol.Transaction.Contract.serializeBinaryToWriter
    );
  }
  f = message.getScripts_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      12,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = message.getFeeLimit();
  if (f !== 0) {
    writer.writeInt64(
      18,
      f
    );
  }
};


/**
 * optional bytes ref_block_bytes = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockBytes = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes ref_block_bytes = 1;
 * This is a type-conversion wrapper around `getRefBlockBytes()`
 * @return {string}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockBytes_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRefBlockBytes()));
};


/**
 * optional bytes ref_block_bytes = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRefBlockBytes()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockBytes_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRefBlockBytes()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setRefBlockBytes = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 ref_block_num = 3;
 * @return {number}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockNum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setRefBlockNum = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes ref_block_hash = 4;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes ref_block_hash = 4;
 * This is a type-conversion wrapper around `getRefBlockHash()`
 * @return {string}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRefBlockHash()));
};


/**
 * optional bytes ref_block_hash = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRefBlockHash()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.raw.prototype.getRefBlockHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRefBlockHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setRefBlockHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional int64 expiration = 8;
 * @return {number}
 */
proto.protocol.Transaction.raw.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setExpiration = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * repeated authority auths = 9;
 * @return {!Array<!proto.protocol.authority>}
 */
proto.protocol.Transaction.raw.prototype.getAuthsList = function() {
  return /** @type{!Array<!proto.protocol.authority>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.authority, 9));
};


/**
 * @param {!Array<!proto.protocol.authority>} value
 * @return {!proto.protocol.Transaction.raw} returns this
*/
proto.protocol.Transaction.raw.prototype.setAuthsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.protocol.authority=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.authority}
 */
proto.protocol.Transaction.raw.prototype.addAuths = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.protocol.authority, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.clearAuthsList = function() {
  return this.setAuthsList([]);
};


/**
 * optional bytes data = 10;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.raw.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * optional bytes data = 10;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.protocol.Transaction.raw.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 10;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.raw.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 10, value);
};


/**
 * repeated Contract contract = 11;
 * @return {!Array<!proto.protocol.Transaction.Contract>}
 */
proto.protocol.Transaction.raw.prototype.getContractList = function() {
  return /** @type{!Array<!proto.protocol.Transaction.Contract>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Transaction.Contract, 11));
};


/**
 * @param {!Array<!proto.protocol.Transaction.Contract>} value
 * @return {!proto.protocol.Transaction.raw} returns this
*/
proto.protocol.Transaction.raw.prototype.setContractList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.protocol.Transaction.Contract=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction.Contract}
 */
proto.protocol.Transaction.raw.prototype.addContract = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.protocol.Transaction.Contract, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.clearContractList = function() {
  return this.setContractList([]);
};


/**
 * optional bytes scripts = 12;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.Transaction.raw.prototype.getScripts = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * optional bytes scripts = 12;
 * This is a type-conversion wrapper around `getScripts()`
 * @return {string}
 */
proto.protocol.Transaction.raw.prototype.getScripts_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getScripts()));
};


/**
 * optional bytes scripts = 12;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getScripts()`
 * @return {!Uint8Array}
 */
proto.protocol.Transaction.raw.prototype.getScripts_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getScripts()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setScripts = function(value) {
  return jspb.Message.setProto3BytesField(this, 12, value);
};


/**
 * optional int64 timestamp = 14;
 * @return {number}
 */
proto.protocol.Transaction.raw.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int64 fee_limit = 18;
 * @return {number}
 */
proto.protocol.Transaction.raw.prototype.getFeeLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.Transaction.raw} returns this
 */
proto.protocol.Transaction.raw.prototype.setFeeLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional raw raw_data = 1;
 * @return {?proto.protocol.Transaction.raw}
 */
proto.protocol.Transaction.prototype.getRawData = function() {
  return /** @type{?proto.protocol.Transaction.raw} */ (
    jspb.Message.getWrapperField(this, proto.protocol.Transaction.raw, 1));
};


/**
 * @param {?proto.protocol.Transaction.raw|undefined} value
 * @return {!proto.protocol.Transaction} returns this
*/
proto.protocol.Transaction.prototype.setRawData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Transaction} returns this
 */
proto.protocol.Transaction.prototype.clearRawData = function() {
  return this.setRawData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Transaction.prototype.hasRawData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated bytes signature = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.Transaction.prototype.getSignatureList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes signature = 2;
 * This is a type-conversion wrapper around `getSignatureList()`
 * @return {!Array<string>}
 */
proto.protocol.Transaction.prototype.getSignatureList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getSignatureList()));
};


/**
 * repeated bytes signature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignatureList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.Transaction.prototype.getSignatureList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getSignatureList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.Transaction} returns this
 */
proto.protocol.Transaction.prototype.setSignatureList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction} returns this
 */
proto.protocol.Transaction.prototype.addSignature = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transaction} returns this
 */
proto.protocol.Transaction.prototype.clearSignatureList = function() {
  return this.setSignatureList([]);
};


/**
 * repeated Result ret = 5;
 * @return {!Array<!proto.protocol.Transaction.Result>}
 */
proto.protocol.Transaction.prototype.getRetList = function() {
  return /** @type{!Array<!proto.protocol.Transaction.Result>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Transaction.Result, 5));
};


/**
 * @param {!Array<!proto.protocol.Transaction.Result>} value
 * @return {!proto.protocol.Transaction} returns this
*/
proto.protocol.Transaction.prototype.setRetList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.protocol.Transaction.Result=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction.Result}
 */
proto.protocol.Transaction.prototype.addRet = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.protocol.Transaction.Result, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transaction} returns this
 */
proto.protocol.Transaction.prototype.clearRetList = function() {
  return this.setRetList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.TransactionInfo.repeatedFields_ = [5,8,17,26];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TransactionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TransactionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TransactionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: msg.getId_asB64(),
    fee: jspb.Message.getFieldWithDefault(msg, 2, 0),
    blocknumber: jspb.Message.getFieldWithDefault(msg, 3, 0),
    blocktimestamp: jspb.Message.getFieldWithDefault(msg, 4, 0),
    contractresultList: msg.getContractresultList_asB64(),
    contractAddress: msg.getContractAddress_asB64(),
    receipt: (f = msg.getReceipt()) && proto.protocol.ResourceReceipt.toObject(includeInstance, f),
    logList: jspb.Message.toObjectList(msg.getLogList(),
    proto.protocol.TransactionInfo.Log.toObject, includeInstance),
    result: jspb.Message.getFieldWithDefault(msg, 9, 0),
    resmessage: msg.getResmessage_asB64(),
    assetissueid: jspb.Message.getFieldWithDefault(msg, 14, ""),
    withdrawAmount: jspb.Message.getFieldWithDefault(msg, 15, 0),
    unfreezeAmount: jspb.Message.getFieldWithDefault(msg, 16, 0),
    internalTransactionsList: jspb.Message.toObjectList(msg.getInternalTransactionsList(),
    proto.protocol.InternalTransaction.toObject, includeInstance),
    exchangeReceivedAmount: jspb.Message.getFieldWithDefault(msg, 18, 0),
    exchangeInjectAnotherAmount: jspb.Message.getFieldWithDefault(msg, 19, 0),
    exchangeWithdrawAnotherAmount: jspb.Message.getFieldWithDefault(msg, 20, 0),
    exchangeId: jspb.Message.getFieldWithDefault(msg, 21, 0),
    shieldedTransactionFee: jspb.Message.getFieldWithDefault(msg, 22, 0),
    orderid: msg.getOrderid_asB64(),
    orderdetailsList: jspb.Message.toObjectList(msg.getOrderdetailsList(),
    proto.protocol.MarketOrderDetail.toObject, includeInstance),
    packingfee: jspb.Message.getFieldWithDefault(msg, 27, 0),
    withdrawExpireAmount: jspb.Message.getFieldWithDefault(msg, 28, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TransactionInfo}
 */
proto.protocol.TransactionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TransactionInfo;
  return proto.protocol.TransactionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TransactionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TransactionInfo}
 */
proto.protocol.TransactionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFee(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocknumber(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocktimestamp(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addContractresult(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContractAddress(value);
      break;
    case 7:
      var value = new proto.protocol.ResourceReceipt;
      reader.readMessage(value,proto.protocol.ResourceReceipt.deserializeBinaryFromReader);
      msg.setReceipt(value);
      break;
    case 8:
      var value = new proto.protocol.TransactionInfo.Log;
      reader.readMessage(value,proto.protocol.TransactionInfo.Log.deserializeBinaryFromReader);
      msg.addLog(value);
      break;
    case 9:
      var value = /** @type {!proto.protocol.TransactionInfo.code} */ (reader.readEnum());
      msg.setResult(value);
      break;
    case 10:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setResmessage(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssetissueid(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWithdrawAmount(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUnfreezeAmount(value);
      break;
    case 17:
      var value = new proto.protocol.InternalTransaction;
      reader.readMessage(value,proto.protocol.InternalTransaction.deserializeBinaryFromReader);
      msg.addInternalTransactions(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeReceivedAmount(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeInjectAnotherAmount(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeWithdrawAnotherAmount(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setShieldedTransactionFee(value);
      break;
    case 25:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOrderid(value);
      break;
    case 26:
      var value = new proto.protocol.MarketOrderDetail;
      reader.readMessage(value,proto.protocol.MarketOrderDetail.deserializeBinaryFromReader);
      msg.addOrderdetails(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPackingfee(value);
      break;
    case 28:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWithdrawExpireAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TransactionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TransactionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getFee();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getBlocknumber();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getBlocktimestamp();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getContractresultList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      5,
      f
    );
  }
  f = message.getContractAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getReceipt();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.protocol.ResourceReceipt.serializeBinaryToWriter
    );
  }
  f = message.getLogList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.protocol.TransactionInfo.Log.serializeBinaryToWriter
    );
  }
  f = message.getResult();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = message.getResmessage_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      10,
      f
    );
  }
  f = message.getAssetissueid();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
  f = message.getWithdrawAmount();
  if (f !== 0) {
    writer.writeInt64(
      15,
      f
    );
  }
  f = message.getUnfreezeAmount();
  if (f !== 0) {
    writer.writeInt64(
      16,
      f
    );
  }
  f = message.getInternalTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      17,
      f,
      proto.protocol.InternalTransaction.serializeBinaryToWriter
    );
  }
  f = message.getExchangeReceivedAmount();
  if (f !== 0) {
    writer.writeInt64(
      18,
      f
    );
  }
  f = message.getExchangeInjectAnotherAmount();
  if (f !== 0) {
    writer.writeInt64(
      19,
      f
    );
  }
  f = message.getExchangeWithdrawAnotherAmount();
  if (f !== 0) {
    writer.writeInt64(
      20,
      f
    );
  }
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      21,
      f
    );
  }
  f = message.getShieldedTransactionFee();
  if (f !== 0) {
    writer.writeInt64(
      22,
      f
    );
  }
  f = message.getOrderid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      25,
      f
    );
  }
  f = message.getOrderdetailsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      26,
      f,
      proto.protocol.MarketOrderDetail.serializeBinaryToWriter
    );
  }
  f = message.getPackingfee();
  if (f !== 0) {
    writer.writeInt64(
      27,
      f
    );
  }
  f = message.getWithdrawExpireAmount();
  if (f !== 0) {
    writer.writeInt64(
      28,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.TransactionInfo.code = {
  SUCESS: 0,
  FAILED: 1
};


/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.TransactionInfo.Log.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TransactionInfo.Log.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TransactionInfo.Log.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TransactionInfo.Log} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionInfo.Log.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: msg.getAddress_asB64(),
    topicsList: msg.getTopicsList_asB64(),
    data: msg.getData_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TransactionInfo.Log}
 */
proto.protocol.TransactionInfo.Log.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TransactionInfo.Log;
  return proto.protocol.TransactionInfo.Log.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TransactionInfo.Log} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TransactionInfo.Log}
 */
proto.protocol.TransactionInfo.Log.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addTopics(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.Log.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TransactionInfo.Log.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TransactionInfo.Log} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionInfo.Log.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTopicsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional bytes address = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.Log.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes address = 1;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.TransactionInfo.Log.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.Log.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo.Log} returns this
 */
proto.protocol.TransactionInfo.Log.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated bytes topics = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.TransactionInfo.Log.prototype.getTopicsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes topics = 2;
 * This is a type-conversion wrapper around `getTopicsList()`
 * @return {!Array<string>}
 */
proto.protocol.TransactionInfo.Log.prototype.getTopicsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getTopicsList()));
};


/**
 * repeated bytes topics = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTopicsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.TransactionInfo.Log.prototype.getTopicsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getTopicsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.TransactionInfo.Log} returns this
 */
proto.protocol.TransactionInfo.Log.prototype.setTopicsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.TransactionInfo.Log} returns this
 */
proto.protocol.TransactionInfo.Log.prototype.addTopics = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionInfo.Log} returns this
 */
proto.protocol.TransactionInfo.Log.prototype.clearTopicsList = function() {
  return this.setTopicsList([]);
};


/**
 * optional bytes data = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.Log.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes data = 3;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.protocol.TransactionInfo.Log.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.Log.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo.Log} returns this
 */
proto.protocol.TransactionInfo.Log.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes id = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.prototype.getId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes id = 1;
 * This is a type-conversion wrapper around `getId()`
 * @return {string}
 */
proto.protocol.TransactionInfo.prototype.getId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getId()));
};


/**
 * optional bytes id = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getId()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.prototype.getId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setId = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 fee = 2;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setFee = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 blockNumber = 3;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getBlocknumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setBlocknumber = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 blockTimeStamp = 4;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getBlocktimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setBlocktimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated bytes contractResult = 5;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.TransactionInfo.prototype.getContractresultList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 5));
};


/**
 * repeated bytes contractResult = 5;
 * This is a type-conversion wrapper around `getContractresultList()`
 * @return {!Array<string>}
 */
proto.protocol.TransactionInfo.prototype.getContractresultList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getContractresultList()));
};


/**
 * repeated bytes contractResult = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractresultList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.TransactionInfo.prototype.getContractresultList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getContractresultList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setContractresultList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.addContractresult = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.clearContractresultList = function() {
  return this.setContractresultList([]);
};


/**
 * optional bytes contract_address = 6;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.prototype.getContractAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes contract_address = 6;
 * This is a type-conversion wrapper around `getContractAddress()`
 * @return {string}
 */
proto.protocol.TransactionInfo.prototype.getContractAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContractAddress()));
};


/**
 * optional bytes contract_address = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.prototype.getContractAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContractAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setContractAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional ResourceReceipt receipt = 7;
 * @return {?proto.protocol.ResourceReceipt}
 */
proto.protocol.TransactionInfo.prototype.getReceipt = function() {
  return /** @type{?proto.protocol.ResourceReceipt} */ (
    jspb.Message.getWrapperField(this, proto.protocol.ResourceReceipt, 7));
};


/**
 * @param {?proto.protocol.ResourceReceipt|undefined} value
 * @return {!proto.protocol.TransactionInfo} returns this
*/
proto.protocol.TransactionInfo.prototype.setReceipt = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.clearReceipt = function() {
  return this.setReceipt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.TransactionInfo.prototype.hasReceipt = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated Log log = 8;
 * @return {!Array<!proto.protocol.TransactionInfo.Log>}
 */
proto.protocol.TransactionInfo.prototype.getLogList = function() {
  return /** @type{!Array<!proto.protocol.TransactionInfo.Log>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.TransactionInfo.Log, 8));
};


/**
 * @param {!Array<!proto.protocol.TransactionInfo.Log>} value
 * @return {!proto.protocol.TransactionInfo} returns this
*/
proto.protocol.TransactionInfo.prototype.setLogList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.protocol.TransactionInfo.Log=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.TransactionInfo.Log}
 */
proto.protocol.TransactionInfo.prototype.addLog = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.protocol.TransactionInfo.Log, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.clearLogList = function() {
  return this.setLogList([]);
};


/**
 * optional code result = 9;
 * @return {!proto.protocol.TransactionInfo.code}
 */
proto.protocol.TransactionInfo.prototype.getResult = function() {
  return /** @type {!proto.protocol.TransactionInfo.code} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.protocol.TransactionInfo.code} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setResult = function(value) {
  return jspb.Message.setProto3EnumField(this, 9, value);
};


/**
 * optional bytes resMessage = 10;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.prototype.getResmessage = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * optional bytes resMessage = 10;
 * This is a type-conversion wrapper around `getResmessage()`
 * @return {string}
 */
proto.protocol.TransactionInfo.prototype.getResmessage_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getResmessage()));
};


/**
 * optional bytes resMessage = 10;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getResmessage()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.prototype.getResmessage_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getResmessage()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setResmessage = function(value) {
  return jspb.Message.setProto3BytesField(this, 10, value);
};


/**
 * optional string assetIssueID = 14;
 * @return {string}
 */
proto.protocol.TransactionInfo.prototype.getAssetissueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setAssetissueid = function(value) {
  return jspb.Message.setProto3StringField(this, 14, value);
};


/**
 * optional int64 withdraw_amount = 15;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getWithdrawAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setWithdrawAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};


/**
 * optional int64 unfreeze_amount = 16;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getUnfreezeAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setUnfreezeAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 16, value);
};


/**
 * repeated InternalTransaction internal_transactions = 17;
 * @return {!Array<!proto.protocol.InternalTransaction>}
 */
proto.protocol.TransactionInfo.prototype.getInternalTransactionsList = function() {
  return /** @type{!Array<!proto.protocol.InternalTransaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.InternalTransaction, 17));
};


/**
 * @param {!Array<!proto.protocol.InternalTransaction>} value
 * @return {!proto.protocol.TransactionInfo} returns this
*/
proto.protocol.TransactionInfo.prototype.setInternalTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 17, value);
};


/**
 * @param {!proto.protocol.InternalTransaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.InternalTransaction}
 */
proto.protocol.TransactionInfo.prototype.addInternalTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 17, opt_value, proto.protocol.InternalTransaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.clearInternalTransactionsList = function() {
  return this.setInternalTransactionsList([]);
};


/**
 * optional int64 exchange_received_amount = 18;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getExchangeReceivedAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setExchangeReceivedAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional int64 exchange_inject_another_amount = 19;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getExchangeInjectAnotherAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setExchangeInjectAnotherAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};


/**
 * optional int64 exchange_withdraw_another_amount = 20;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getExchangeWithdrawAnotherAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 20, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setExchangeWithdrawAnotherAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 20, value);
};


/**
 * optional int64 exchange_id = 21;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int64 shielded_transaction_fee = 22;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getShieldedTransactionFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 22, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setShieldedTransactionFee = function(value) {
  return jspb.Message.setProto3IntField(this, 22, value);
};


/**
 * optional bytes orderId = 25;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.TransactionInfo.prototype.getOrderid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 25, ""));
};


/**
 * optional bytes orderId = 25;
 * This is a type-conversion wrapper around `getOrderid()`
 * @return {string}
 */
proto.protocol.TransactionInfo.prototype.getOrderid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOrderid()));
};


/**
 * optional bytes orderId = 25;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrderid()`
 * @return {!Uint8Array}
 */
proto.protocol.TransactionInfo.prototype.getOrderid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOrderid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setOrderid = function(value) {
  return jspb.Message.setProto3BytesField(this, 25, value);
};


/**
 * repeated MarketOrderDetail orderDetails = 26;
 * @return {!Array<!proto.protocol.MarketOrderDetail>}
 */
proto.protocol.TransactionInfo.prototype.getOrderdetailsList = function() {
  return /** @type{!Array<!proto.protocol.MarketOrderDetail>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MarketOrderDetail, 26));
};


/**
 * @param {!Array<!proto.protocol.MarketOrderDetail>} value
 * @return {!proto.protocol.TransactionInfo} returns this
*/
proto.protocol.TransactionInfo.prototype.setOrderdetailsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 26, value);
};


/**
 * @param {!proto.protocol.MarketOrderDetail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MarketOrderDetail}
 */
proto.protocol.TransactionInfo.prototype.addOrderdetails = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 26, opt_value, proto.protocol.MarketOrderDetail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.clearOrderdetailsList = function() {
  return this.setOrderdetailsList([]);
};


/**
 * optional int64 packingFee = 27;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getPackingfee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 27, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setPackingfee = function(value) {
  return jspb.Message.setProto3IntField(this, 27, value);
};


/**
 * optional int64 withdraw_expire_amount = 28;
 * @return {number}
 */
proto.protocol.TransactionInfo.prototype.getWithdrawExpireAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 28, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionInfo} returns this
 */
proto.protocol.TransactionInfo.prototype.setWithdrawExpireAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 28, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.TransactionRet.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.TransactionRet.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.TransactionRet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.TransactionRet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionRet.toObject = function(includeInstance, msg) {
  var f, obj = {
    blocknumber: jspb.Message.getFieldWithDefault(msg, 1, 0),
    blocktimestamp: jspb.Message.getFieldWithDefault(msg, 2, 0),
    transactioninfoList: jspb.Message.toObjectList(msg.getTransactioninfoList(),
    proto.protocol.TransactionInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.TransactionRet}
 */
proto.protocol.TransactionRet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.TransactionRet;
  return proto.protocol.TransactionRet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.TransactionRet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.TransactionRet}
 */
proto.protocol.TransactionRet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocknumber(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocktimestamp(value);
      break;
    case 3:
      var value = new proto.protocol.TransactionInfo;
      reader.readMessage(value,proto.protocol.TransactionInfo.deserializeBinaryFromReader);
      msg.addTransactioninfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.TransactionRet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.TransactionRet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.TransactionRet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.TransactionRet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlocknumber();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getBlocktimestamp();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getTransactioninfoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.protocol.TransactionInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 blockNumber = 1;
 * @return {number}
 */
proto.protocol.TransactionRet.prototype.getBlocknumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionRet} returns this
 */
proto.protocol.TransactionRet.prototype.setBlocknumber = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 blockTimeStamp = 2;
 * @return {number}
 */
proto.protocol.TransactionRet.prototype.getBlocktimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.TransactionRet} returns this
 */
proto.protocol.TransactionRet.prototype.setBlocktimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated TransactionInfo transactioninfo = 3;
 * @return {!Array<!proto.protocol.TransactionInfo>}
 */
proto.protocol.TransactionRet.prototype.getTransactioninfoList = function() {
  return /** @type{!Array<!proto.protocol.TransactionInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.TransactionInfo, 3));
};


/**
 * @param {!Array<!proto.protocol.TransactionInfo>} value
 * @return {!proto.protocol.TransactionRet} returns this
*/
proto.protocol.TransactionRet.prototype.setTransactioninfoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.protocol.TransactionInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.TransactionInfo}
 */
proto.protocol.TransactionRet.prototype.addTransactioninfo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.protocol.TransactionInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.TransactionRet} returns this
 */
proto.protocol.TransactionRet.prototype.clearTransactioninfoList = function() {
  return this.setTransactioninfoList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Transactions.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Transactions.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Transactions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Transactions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transactions.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionsList: jspb.Message.toObjectList(msg.getTransactionsList(),
    proto.protocol.Transaction.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Transactions}
 */
proto.protocol.Transactions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Transactions;
  return proto.protocol.Transactions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Transactions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Transactions}
 */
proto.protocol.Transactions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.Transaction;
      reader.readMessage(value,proto.protocol.Transaction.deserializeBinaryFromReader);
      msg.addTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Transactions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Transactions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Transactions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Transactions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Transaction transactions = 1;
 * @return {!Array<!proto.protocol.Transaction>}
 */
proto.protocol.Transactions.prototype.getTransactionsList = function() {
  return /** @type{!Array<!proto.protocol.Transaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Transaction, 1));
};


/**
 * @param {!Array<!proto.protocol.Transaction>} value
 * @return {!proto.protocol.Transactions} returns this
*/
proto.protocol.Transactions.prototype.setTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.Transaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction}
 */
proto.protocol.Transactions.prototype.addTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.Transaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Transactions} returns this
 */
proto.protocol.Transactions.prototype.clearTransactionsList = function() {
  return this.setTransactionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.BlockHeader.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.BlockHeader.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.BlockHeader} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockHeader.toObject = function(includeInstance, msg) {
  var f, obj = {
    rawData: (f = msg.getRawData()) && proto.protocol.BlockHeader.raw.toObject(includeInstance, f),
    witnessSignature: msg.getWitnessSignature_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.BlockHeader}
 */
proto.protocol.BlockHeader.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.BlockHeader;
  return proto.protocol.BlockHeader.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.BlockHeader} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.BlockHeader}
 */
proto.protocol.BlockHeader.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.BlockHeader.raw;
      reader.readMessage(value,proto.protocol.BlockHeader.raw.deserializeBinaryFromReader);
      msg.setRawData(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setWitnessSignature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.BlockHeader.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.BlockHeader} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockHeader.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRawData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.BlockHeader.raw.serializeBinaryToWriter
    );
  }
  f = message.getWitnessSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.BlockHeader.raw.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.BlockHeader.raw.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.BlockHeader.raw} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockHeader.raw.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: jspb.Message.getFieldWithDefault(msg, 1, 0),
    txtrieroot: msg.getTxtrieroot_asB64(),
    parenthash: msg.getParenthash_asB64(),
    number: jspb.Message.getFieldWithDefault(msg, 7, 0),
    witnessId: jspb.Message.getFieldWithDefault(msg, 8, 0),
    witnessAddress: msg.getWitnessAddress_asB64(),
    version: jspb.Message.getFieldWithDefault(msg, 10, 0),
    accountstateroot: msg.getAccountstateroot_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.BlockHeader.raw}
 */
proto.protocol.BlockHeader.raw.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.BlockHeader.raw;
  return proto.protocol.BlockHeader.raw.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.BlockHeader.raw} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.BlockHeader.raw}
 */
proto.protocol.BlockHeader.raw.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTxtrieroot(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setParenthash(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNumber(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWitnessId(value);
      break;
    case 9:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setWitnessAddress(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 11:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccountstateroot(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.raw.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.BlockHeader.raw.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.BlockHeader.raw} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockHeader.raw.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTxtrieroot_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getParenthash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getNumber();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getWitnessId();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getWitnessAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      9,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getAccountstateroot_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      11,
      f
    );
  }
};


/**
 * optional int64 timestamp = 1;
 * @return {number}
 */
proto.protocol.BlockHeader.raw.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes txTrieRoot = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockHeader.raw.prototype.getTxtrieroot = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes txTrieRoot = 2;
 * This is a type-conversion wrapper around `getTxtrieroot()`
 * @return {string}
 */
proto.protocol.BlockHeader.raw.prototype.getTxtrieroot_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTxtrieroot()));
};


/**
 * optional bytes txTrieRoot = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTxtrieroot()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.raw.prototype.getTxtrieroot_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTxtrieroot()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setTxtrieroot = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes parentHash = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockHeader.raw.prototype.getParenthash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes parentHash = 3;
 * This is a type-conversion wrapper around `getParenthash()`
 * @return {string}
 */
proto.protocol.BlockHeader.raw.prototype.getParenthash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getParenthash()));
};


/**
 * optional bytes parentHash = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getParenthash()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.raw.prototype.getParenthash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getParenthash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setParenthash = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional int64 number = 7;
 * @return {number}
 */
proto.protocol.BlockHeader.raw.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 witness_id = 8;
 * @return {number}
 */
proto.protocol.BlockHeader.raw.prototype.getWitnessId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setWitnessId = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional bytes witness_address = 9;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockHeader.raw.prototype.getWitnessAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * optional bytes witness_address = 9;
 * This is a type-conversion wrapper around `getWitnessAddress()`
 * @return {string}
 */
proto.protocol.BlockHeader.raw.prototype.getWitnessAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getWitnessAddress()));
};


/**
 * optional bytes witness_address = 9;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getWitnessAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.raw.prototype.getWitnessAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getWitnessAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setWitnessAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 9, value);
};


/**
 * optional int32 version = 10;
 * @return {number}
 */
proto.protocol.BlockHeader.raw.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional bytes accountStateRoot = 11;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockHeader.raw.prototype.getAccountstateroot = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * optional bytes accountStateRoot = 11;
 * This is a type-conversion wrapper around `getAccountstateroot()`
 * @return {string}
 */
proto.protocol.BlockHeader.raw.prototype.getAccountstateroot_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccountstateroot()));
};


/**
 * optional bytes accountStateRoot = 11;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccountstateroot()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.raw.prototype.getAccountstateroot_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccountstateroot()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockHeader.raw} returns this
 */
proto.protocol.BlockHeader.raw.prototype.setAccountstateroot = function(value) {
  return jspb.Message.setProto3BytesField(this, 11, value);
};


/**
 * optional raw raw_data = 1;
 * @return {?proto.protocol.BlockHeader.raw}
 */
proto.protocol.BlockHeader.prototype.getRawData = function() {
  return /** @type{?proto.protocol.BlockHeader.raw} */ (
    jspb.Message.getWrapperField(this, proto.protocol.BlockHeader.raw, 1));
};


/**
 * @param {?proto.protocol.BlockHeader.raw|undefined} value
 * @return {!proto.protocol.BlockHeader} returns this
*/
proto.protocol.BlockHeader.prototype.setRawData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.BlockHeader} returns this
 */
proto.protocol.BlockHeader.prototype.clearRawData = function() {
  return this.setRawData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.BlockHeader.prototype.hasRawData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes witness_signature = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockHeader.prototype.getWitnessSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes witness_signature = 2;
 * This is a type-conversion wrapper around `getWitnessSignature()`
 * @return {string}
 */
proto.protocol.BlockHeader.prototype.getWitnessSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getWitnessSignature()));
};


/**
 * optional bytes witness_signature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getWitnessSignature()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockHeader.prototype.getWitnessSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getWitnessSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockHeader} returns this
 */
proto.protocol.BlockHeader.prototype.setWitnessSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Block.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Block.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Block.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Block} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Block.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionsList: jspb.Message.toObjectList(msg.getTransactionsList(),
    proto.protocol.Transaction.toObject, includeInstance),
    blockHeader: (f = msg.getBlockHeader()) && proto.protocol.BlockHeader.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Block}
 */
proto.protocol.Block.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Block;
  return proto.protocol.Block.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Block} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Block}
 */
proto.protocol.Block.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.Transaction;
      reader.readMessage(value,proto.protocol.Transaction.deserializeBinaryFromReader);
      msg.addTransactions(value);
      break;
    case 2:
      var value = new proto.protocol.BlockHeader;
      reader.readMessage(value,proto.protocol.BlockHeader.deserializeBinaryFromReader);
      msg.setBlockHeader(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Block.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Block.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Block} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Block.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.Transaction.serializeBinaryToWriter
    );
  }
  f = message.getBlockHeader();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.BlockHeader.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Transaction transactions = 1;
 * @return {!Array<!proto.protocol.Transaction>}
 */
proto.protocol.Block.prototype.getTransactionsList = function() {
  return /** @type{!Array<!proto.protocol.Transaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Transaction, 1));
};


/**
 * @param {!Array<!proto.protocol.Transaction>} value
 * @return {!proto.protocol.Block} returns this
*/
proto.protocol.Block.prototype.setTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.Transaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction}
 */
proto.protocol.Block.prototype.addTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.Transaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Block} returns this
 */
proto.protocol.Block.prototype.clearTransactionsList = function() {
  return this.setTransactionsList([]);
};


/**
 * optional BlockHeader block_header = 2;
 * @return {?proto.protocol.BlockHeader}
 */
proto.protocol.Block.prototype.getBlockHeader = function() {
  return /** @type{?proto.protocol.BlockHeader} */ (
    jspb.Message.getWrapperField(this, proto.protocol.BlockHeader, 2));
};


/**
 * @param {?proto.protocol.BlockHeader|undefined} value
 * @return {!proto.protocol.Block} returns this
*/
proto.protocol.Block.prototype.setBlockHeader = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.Block} returns this
 */
proto.protocol.Block.prototype.clearBlockHeader = function() {
  return this.setBlockHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.Block.prototype.hasBlockHeader = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.ChainInventory.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.ChainInventory.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.ChainInventory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.ChainInventory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainInventory.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: jspb.Message.toObjectList(msg.getIdsList(),
    proto.protocol.ChainInventory.BlockId.toObject, includeInstance),
    remainNum: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ChainInventory}
 */
proto.protocol.ChainInventory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.ChainInventory;
  return proto.protocol.ChainInventory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ChainInventory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ChainInventory}
 */
proto.protocol.ChainInventory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.ChainInventory.BlockId;
      reader.readMessage(value,proto.protocol.ChainInventory.BlockId.deserializeBinaryFromReader);
      msg.addIds(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setRemainNum(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ChainInventory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.ChainInventory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ChainInventory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainInventory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.ChainInventory.BlockId.serializeBinaryToWriter
    );
  }
  f = message.getRemainNum();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.ChainInventory.BlockId.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.ChainInventory.BlockId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.ChainInventory.BlockId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainInventory.BlockId.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    number: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.ChainInventory.BlockId}
 */
proto.protocol.ChainInventory.BlockId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.ChainInventory.BlockId;
  return proto.protocol.ChainInventory.BlockId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.ChainInventory.BlockId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.ChainInventory.BlockId}
 */
proto.protocol.ChainInventory.BlockId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNumber(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.ChainInventory.BlockId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.ChainInventory.BlockId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.ChainInventory.BlockId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.ChainInventory.BlockId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getNumber();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.ChainInventory.BlockId.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.protocol.ChainInventory.BlockId.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.protocol.ChainInventory.BlockId.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.ChainInventory.BlockId} returns this
 */
proto.protocol.ChainInventory.BlockId.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 number = 2;
 * @return {number}
 */
proto.protocol.ChainInventory.BlockId.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ChainInventory.BlockId} returns this
 */
proto.protocol.ChainInventory.BlockId.prototype.setNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated BlockId ids = 1;
 * @return {!Array<!proto.protocol.ChainInventory.BlockId>}
 */
proto.protocol.ChainInventory.prototype.getIdsList = function() {
  return /** @type{!Array<!proto.protocol.ChainInventory.BlockId>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.ChainInventory.BlockId, 1));
};


/**
 * @param {!Array<!proto.protocol.ChainInventory.BlockId>} value
 * @return {!proto.protocol.ChainInventory} returns this
*/
proto.protocol.ChainInventory.prototype.setIdsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.ChainInventory.BlockId=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.ChainInventory.BlockId}
 */
proto.protocol.ChainInventory.prototype.addIds = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.ChainInventory.BlockId, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.ChainInventory} returns this
 */
proto.protocol.ChainInventory.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};


/**
 * optional int64 remain_num = 2;
 * @return {number}
 */
proto.protocol.ChainInventory.prototype.getRemainNum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.ChainInventory} returns this
 */
proto.protocol.ChainInventory.prototype.setRemainNum = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.BlockInventory.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.BlockInventory.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.BlockInventory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.BlockInventory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockInventory.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: jspb.Message.toObjectList(msg.getIdsList(),
    proto.protocol.BlockInventory.BlockId.toObject, includeInstance),
    type: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.BlockInventory}
 */
proto.protocol.BlockInventory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.BlockInventory;
  return proto.protocol.BlockInventory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.BlockInventory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.BlockInventory}
 */
proto.protocol.BlockInventory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.BlockInventory.BlockId;
      reader.readMessage(value,proto.protocol.BlockInventory.BlockId.deserializeBinaryFromReader);
      msg.addIds(value);
      break;
    case 2:
      var value = /** @type {!proto.protocol.BlockInventory.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.BlockInventory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.BlockInventory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.BlockInventory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockInventory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.protocol.BlockInventory.BlockId.serializeBinaryToWriter
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.BlockInventory.Type = {
  SYNC: 0,
  ADVTISE: 1,
  FETCH: 2
};




if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.BlockInventory.BlockId.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.BlockInventory.BlockId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.BlockInventory.BlockId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockInventory.BlockId.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    number: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.BlockInventory.BlockId}
 */
proto.protocol.BlockInventory.BlockId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.BlockInventory.BlockId;
  return proto.protocol.BlockInventory.BlockId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.BlockInventory.BlockId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.BlockInventory.BlockId}
 */
proto.protocol.BlockInventory.BlockId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNumber(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.BlockInventory.BlockId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.BlockInventory.BlockId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.BlockInventory.BlockId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.BlockInventory.BlockId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getNumber();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.BlockInventory.BlockId.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.protocol.BlockInventory.BlockId.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.protocol.BlockInventory.BlockId.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.BlockInventory.BlockId} returns this
 */
proto.protocol.BlockInventory.BlockId.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 number = 2;
 * @return {number}
 */
proto.protocol.BlockInventory.BlockId.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.BlockInventory.BlockId} returns this
 */
proto.protocol.BlockInventory.BlockId.prototype.setNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated BlockId ids = 1;
 * @return {!Array<!proto.protocol.BlockInventory.BlockId>}
 */
proto.protocol.BlockInventory.prototype.getIdsList = function() {
  return /** @type{!Array<!proto.protocol.BlockInventory.BlockId>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.BlockInventory.BlockId, 1));
};


/**
 * @param {!Array<!proto.protocol.BlockInventory.BlockId>} value
 * @return {!proto.protocol.BlockInventory} returns this
*/
proto.protocol.BlockInventory.prototype.setIdsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.protocol.BlockInventory.BlockId=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.BlockInventory.BlockId}
 */
proto.protocol.BlockInventory.prototype.addIds = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.protocol.BlockInventory.BlockId, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.BlockInventory} returns this
 */
proto.protocol.BlockInventory.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};


/**
 * optional Type type = 2;
 * @return {!proto.protocol.BlockInventory.Type}
 */
proto.protocol.BlockInventory.prototype.getType = function() {
  return /** @type {!proto.protocol.BlockInventory.Type} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.protocol.BlockInventory.Type} value
 * @return {!proto.protocol.BlockInventory} returns this
 */
proto.protocol.BlockInventory.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Inventory.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Inventory.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Inventory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Inventory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Inventory.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    idsList: msg.getIdsList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Inventory}
 */
proto.protocol.Inventory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Inventory;
  return proto.protocol.Inventory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Inventory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Inventory}
 */
proto.protocol.Inventory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.Inventory.InventoryType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addIds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Inventory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Inventory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Inventory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Inventory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getIdsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Inventory.InventoryType = {
  TRX: 0,
  BLOCK: 1
};

/**
 * optional InventoryType type = 1;
 * @return {!proto.protocol.Inventory.InventoryType}
 */
proto.protocol.Inventory.prototype.getType = function() {
  return /** @type {!proto.protocol.Inventory.InventoryType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.Inventory.InventoryType} value
 * @return {!proto.protocol.Inventory} returns this
 */
proto.protocol.Inventory.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * repeated bytes ids = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.Inventory.prototype.getIdsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes ids = 2;
 * This is a type-conversion wrapper around `getIdsList()`
 * @return {!Array<string>}
 */
proto.protocol.Inventory.prototype.getIdsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getIdsList()));
};


/**
 * repeated bytes ids = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getIdsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.Inventory.prototype.getIdsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getIdsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.Inventory} returns this
 */
proto.protocol.Inventory.prototype.setIdsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.Inventory} returns this
 */
proto.protocol.Inventory.prototype.addIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Inventory} returns this
 */
proto.protocol.Inventory.prototype.clearIdsList = function() {
  return this.setIdsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.Items.repeatedFields_ = [2,3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.Items.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.Items.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.Items} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Items.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    blocksList: jspb.Message.toObjectList(msg.getBlocksList(),
    proto.protocol.Block.toObject, includeInstance),
    blockHeadersList: jspb.Message.toObjectList(msg.getBlockHeadersList(),
    proto.protocol.BlockHeader.toObject, includeInstance),
    transactionsList: jspb.Message.toObjectList(msg.getTransactionsList(),
    proto.protocol.Transaction.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.Items}
 */
proto.protocol.Items.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.Items;
  return proto.protocol.Items.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.Items} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.Items}
 */
proto.protocol.Items.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.Items.ItemType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.protocol.Block;
      reader.readMessage(value,proto.protocol.Block.deserializeBinaryFromReader);
      msg.addBlocks(value);
      break;
    case 3:
      var value = new proto.protocol.BlockHeader;
      reader.readMessage(value,proto.protocol.BlockHeader.deserializeBinaryFromReader);
      msg.addBlockHeaders(value);
      break;
    case 4:
      var value = new proto.protocol.Transaction;
      reader.readMessage(value,proto.protocol.Transaction.deserializeBinaryFromReader);
      msg.addTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.Items.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.Items.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.Items} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.Items.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getBlocksList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.protocol.Block.serializeBinaryToWriter
    );
  }
  f = message.getBlockHeadersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.protocol.BlockHeader.serializeBinaryToWriter
    );
  }
  f = message.getTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.protocol.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.Items.ItemType = {
  ERR: 0,
  TRX: 1,
  BLOCK: 2,
  BLOCKHEADER: 3
};

/**
 * optional ItemType type = 1;
 * @return {!proto.protocol.Items.ItemType}
 */
proto.protocol.Items.prototype.getType = function() {
  return /** @type {!proto.protocol.Items.ItemType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.Items.ItemType} value
 * @return {!proto.protocol.Items} returns this
 */
proto.protocol.Items.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * repeated Block blocks = 2;
 * @return {!Array<!proto.protocol.Block>}
 */
proto.protocol.Items.prototype.getBlocksList = function() {
  return /** @type{!Array<!proto.protocol.Block>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Block, 2));
};


/**
 * @param {!Array<!proto.protocol.Block>} value
 * @return {!proto.protocol.Items} returns this
*/
proto.protocol.Items.prototype.setBlocksList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.protocol.Block=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Block}
 */
proto.protocol.Items.prototype.addBlocks = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.protocol.Block, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Items} returns this
 */
proto.protocol.Items.prototype.clearBlocksList = function() {
  return this.setBlocksList([]);
};


/**
 * repeated BlockHeader block_headers = 3;
 * @return {!Array<!proto.protocol.BlockHeader>}
 */
proto.protocol.Items.prototype.getBlockHeadersList = function() {
  return /** @type{!Array<!proto.protocol.BlockHeader>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.BlockHeader, 3));
};


/**
 * @param {!Array<!proto.protocol.BlockHeader>} value
 * @return {!proto.protocol.Items} returns this
*/
proto.protocol.Items.prototype.setBlockHeadersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.protocol.BlockHeader=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.BlockHeader}
 */
proto.protocol.Items.prototype.addBlockHeaders = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.protocol.BlockHeader, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Items} returns this
 */
proto.protocol.Items.prototype.clearBlockHeadersList = function() {
  return this.setBlockHeadersList([]);
};


/**
 * repeated Transaction transactions = 4;
 * @return {!Array<!proto.protocol.Transaction>}
 */
proto.protocol.Items.prototype.getTransactionsList = function() {
  return /** @type{!Array<!proto.protocol.Transaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.Transaction, 4));
};


/**
 * @param {!Array<!proto.protocol.Transaction>} value
 * @return {!proto.protocol.Items} returns this
*/
proto.protocol.Items.prototype.setTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.protocol.Transaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.Transaction}
 */
proto.protocol.Items.prototype.addTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.protocol.Transaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.Items} returns this
 */
proto.protocol.Items.prototype.clearTransactionsList = function() {
  return this.setTransactionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.DynamicProperties.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.DynamicProperties.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.DynamicProperties} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DynamicProperties.toObject = function(includeInstance, msg) {
  var f, obj = {
    lastSolidityBlockNum: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.DynamicProperties}
 */
proto.protocol.DynamicProperties.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.DynamicProperties;
  return proto.protocol.DynamicProperties.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.DynamicProperties} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.DynamicProperties}
 */
proto.protocol.DynamicProperties.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastSolidityBlockNum(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.DynamicProperties.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.DynamicProperties.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.DynamicProperties} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DynamicProperties.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLastSolidityBlockNum();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 last_solidity_block_num = 1;
 * @return {number}
 */
proto.protocol.DynamicProperties.prototype.getLastSolidityBlockNum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DynamicProperties} returns this
 */
proto.protocol.DynamicProperties.prototype.setLastSolidityBlockNum = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.DisconnectMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.DisconnectMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.DisconnectMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DisconnectMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    reason: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.DisconnectMessage}
 */
proto.protocol.DisconnectMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.DisconnectMessage;
  return proto.protocol.DisconnectMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.DisconnectMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.DisconnectMessage}
 */
proto.protocol.DisconnectMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.ReasonCode} */ (reader.readEnum());
      msg.setReason(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.DisconnectMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.DisconnectMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.DisconnectMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DisconnectMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReason();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional ReasonCode reason = 1;
 * @return {!proto.protocol.ReasonCode}
 */
proto.protocol.DisconnectMessage.prototype.getReason = function() {
  return /** @type {!proto.protocol.ReasonCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.ReasonCode} value
 * @return {!proto.protocol.DisconnectMessage} returns this
 */
proto.protocol.DisconnectMessage.prototype.setReason = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.HelloMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.HelloMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.HelloMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.HelloMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    from: (f = msg.getFrom()) && core_Discover_pb.Endpoint.toObject(includeInstance, f),
    version: jspb.Message.getFieldWithDefault(msg, 2, 0),
    timestamp: jspb.Message.getFieldWithDefault(msg, 3, 0),
    genesisblockid: (f = msg.getGenesisblockid()) && proto.protocol.HelloMessage.BlockId.toObject(includeInstance, f),
    solidblockid: (f = msg.getSolidblockid()) && proto.protocol.HelloMessage.BlockId.toObject(includeInstance, f),
    headblockid: (f = msg.getHeadblockid()) && proto.protocol.HelloMessage.BlockId.toObject(includeInstance, f),
    address: msg.getAddress_asB64(),
    signature: msg.getSignature_asB64(),
    nodetype: jspb.Message.getFieldWithDefault(msg, 9, 0),
    lowestblocknum: jspb.Message.getFieldWithDefault(msg, 10, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.HelloMessage}
 */
proto.protocol.HelloMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.HelloMessage;
  return proto.protocol.HelloMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.HelloMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.HelloMessage}
 */
proto.protocol.HelloMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new core_Discover_pb.Endpoint;
      reader.readMessage(value,core_Discover_pb.Endpoint.deserializeBinaryFromReader);
      msg.setFrom(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 4:
      var value = new proto.protocol.HelloMessage.BlockId;
      reader.readMessage(value,proto.protocol.HelloMessage.BlockId.deserializeBinaryFromReader);
      msg.setGenesisblockid(value);
      break;
    case 5:
      var value = new proto.protocol.HelloMessage.BlockId;
      reader.readMessage(value,proto.protocol.HelloMessage.BlockId.deserializeBinaryFromReader);
      msg.setSolidblockid(value);
      break;
    case 6:
      var value = new proto.protocol.HelloMessage.BlockId;
      reader.readMessage(value,proto.protocol.HelloMessage.BlockId.deserializeBinaryFromReader);
      msg.setHeadblockid(value);
      break;
    case 7:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAddress(value);
      break;
    case 8:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNodetype(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLowestblocknum(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.HelloMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.HelloMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.HelloMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.HelloMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrom();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      core_Discover_pb.Endpoint.serializeBinaryToWriter
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getGenesisblockid();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.protocol.HelloMessage.BlockId.serializeBinaryToWriter
    );
  }
  f = message.getSolidblockid();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.protocol.HelloMessage.BlockId.serializeBinaryToWriter
    );
  }
  f = message.getHeadblockid();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.protocol.HelloMessage.BlockId.serializeBinaryToWriter
    );
  }
  f = message.getAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      7,
      f
    );
  }
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      8,
      f
    );
  }
  f = message.getNodetype();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getLowestblocknum();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.HelloMessage.BlockId.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.HelloMessage.BlockId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.HelloMessage.BlockId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.HelloMessage.BlockId.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    number: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.HelloMessage.BlockId}
 */
proto.protocol.HelloMessage.BlockId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.HelloMessage.BlockId;
  return proto.protocol.HelloMessage.BlockId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.HelloMessage.BlockId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.HelloMessage.BlockId}
 */
proto.protocol.HelloMessage.BlockId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNumber(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.HelloMessage.BlockId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.HelloMessage.BlockId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.HelloMessage.BlockId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.HelloMessage.BlockId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getNumber();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.HelloMessage.BlockId.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.protocol.HelloMessage.BlockId.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.protocol.HelloMessage.BlockId.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.HelloMessage.BlockId} returns this
 */
proto.protocol.HelloMessage.BlockId.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 number = 2;
 * @return {number}
 */
proto.protocol.HelloMessage.BlockId.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.HelloMessage.BlockId} returns this
 */
proto.protocol.HelloMessage.BlockId.prototype.setNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional Endpoint from = 1;
 * @return {?proto.protocol.Endpoint}
 */
proto.protocol.HelloMessage.prototype.getFrom = function() {
  return /** @type{?proto.protocol.Endpoint} */ (
    jspb.Message.getWrapperField(this, core_Discover_pb.Endpoint, 1));
};


/**
 * @param {?proto.protocol.Endpoint|undefined} value
 * @return {!proto.protocol.HelloMessage} returns this
*/
proto.protocol.HelloMessage.prototype.setFrom = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.clearFrom = function() {
  return this.setFrom(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.HelloMessage.prototype.hasFrom = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 version = 2;
 * @return {number}
 */
proto.protocol.HelloMessage.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 timestamp = 3;
 * @return {number}
 */
proto.protocol.HelloMessage.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional BlockId genesisBlockId = 4;
 * @return {?proto.protocol.HelloMessage.BlockId}
 */
proto.protocol.HelloMessage.prototype.getGenesisblockid = function() {
  return /** @type{?proto.protocol.HelloMessage.BlockId} */ (
    jspb.Message.getWrapperField(this, proto.protocol.HelloMessage.BlockId, 4));
};


/**
 * @param {?proto.protocol.HelloMessage.BlockId|undefined} value
 * @return {!proto.protocol.HelloMessage} returns this
*/
proto.protocol.HelloMessage.prototype.setGenesisblockid = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.clearGenesisblockid = function() {
  return this.setGenesisblockid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.HelloMessage.prototype.hasGenesisblockid = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional BlockId solidBlockId = 5;
 * @return {?proto.protocol.HelloMessage.BlockId}
 */
proto.protocol.HelloMessage.prototype.getSolidblockid = function() {
  return /** @type{?proto.protocol.HelloMessage.BlockId} */ (
    jspb.Message.getWrapperField(this, proto.protocol.HelloMessage.BlockId, 5));
};


/**
 * @param {?proto.protocol.HelloMessage.BlockId|undefined} value
 * @return {!proto.protocol.HelloMessage} returns this
*/
proto.protocol.HelloMessage.prototype.setSolidblockid = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.clearSolidblockid = function() {
  return this.setSolidblockid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.HelloMessage.prototype.hasSolidblockid = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional BlockId headBlockId = 6;
 * @return {?proto.protocol.HelloMessage.BlockId}
 */
proto.protocol.HelloMessage.prototype.getHeadblockid = function() {
  return /** @type{?proto.protocol.HelloMessage.BlockId} */ (
    jspb.Message.getWrapperField(this, proto.protocol.HelloMessage.BlockId, 6));
};


/**
 * @param {?proto.protocol.HelloMessage.BlockId|undefined} value
 * @return {!proto.protocol.HelloMessage} returns this
*/
proto.protocol.HelloMessage.prototype.setHeadblockid = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.clearHeadblockid = function() {
  return this.setHeadblockid(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.HelloMessage.prototype.hasHeadblockid = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional bytes address = 7;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.HelloMessage.prototype.getAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * optional bytes address = 7;
 * This is a type-conversion wrapper around `getAddress()`
 * @return {string}
 */
proto.protocol.HelloMessage.prototype.getAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAddress()));
};


/**
 * optional bytes address = 7;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.HelloMessage.prototype.getAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 7, value);
};


/**
 * optional bytes signature = 8;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.HelloMessage.prototype.getSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * optional bytes signature = 8;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.protocol.HelloMessage.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 8;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.protocol.HelloMessage.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 8, value);
};


/**
 * optional int32 nodeType = 9;
 * @return {number}
 */
proto.protocol.HelloMessage.prototype.getNodetype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setNodetype = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 lowestBlockNum = 10;
 * @return {number}
 */
proto.protocol.HelloMessage.prototype.getLowestblocknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.HelloMessage} returns this
 */
proto.protocol.HelloMessage.prototype.setLowestblocknum = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.InternalTransaction.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.InternalTransaction.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.InternalTransaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.InternalTransaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.InternalTransaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    callerAddress: msg.getCallerAddress_asB64(),
    transfertoAddress: msg.getTransfertoAddress_asB64(),
    callvalueinfoList: jspb.Message.toObjectList(msg.getCallvalueinfoList(),
    proto.protocol.InternalTransaction.CallValueInfo.toObject, includeInstance),
    note: msg.getNote_asB64(),
    rejected: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    extra: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.InternalTransaction}
 */
proto.protocol.InternalTransaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.InternalTransaction;
  return proto.protocol.InternalTransaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.InternalTransaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.InternalTransaction}
 */
proto.protocol.InternalTransaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCallerAddress(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransfertoAddress(value);
      break;
    case 4:
      var value = new proto.protocol.InternalTransaction.CallValueInfo;
      reader.readMessage(value,proto.protocol.InternalTransaction.CallValueInfo.deserializeBinaryFromReader);
      msg.addCallvalueinfo(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setNote(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRejected(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setExtra(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.InternalTransaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.InternalTransaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.InternalTransaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getCallerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getTransfertoAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getCallvalueinfoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.protocol.InternalTransaction.CallValueInfo.serializeBinaryToWriter
    );
  }
  f = message.getNote_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
  f = message.getRejected();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getExtra();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.InternalTransaction.CallValueInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.InternalTransaction.CallValueInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.InternalTransaction.CallValueInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    callvalue: jspb.Message.getFieldWithDefault(msg, 1, 0),
    tokenid: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.InternalTransaction.CallValueInfo}
 */
proto.protocol.InternalTransaction.CallValueInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.InternalTransaction.CallValueInfo;
  return proto.protocol.InternalTransaction.CallValueInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.InternalTransaction.CallValueInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.InternalTransaction.CallValueInfo}
 */
proto.protocol.InternalTransaction.CallValueInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCallvalue(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTokenid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.InternalTransaction.CallValueInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.InternalTransaction.CallValueInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.InternalTransaction.CallValueInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCallvalue();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTokenid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int64 callValue = 1;
 * @return {number}
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.getCallvalue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.InternalTransaction.CallValueInfo} returns this
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.setCallvalue = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string tokenId = 2;
 * @return {string}
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.getTokenid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.InternalTransaction.CallValueInfo} returns this
 */
proto.protocol.InternalTransaction.CallValueInfo.prototype.setTokenid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.InternalTransaction.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.protocol.InternalTransaction.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes caller_address = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.InternalTransaction.prototype.getCallerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes caller_address = 2;
 * This is a type-conversion wrapper around `getCallerAddress()`
 * @return {string}
 */
proto.protocol.InternalTransaction.prototype.getCallerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCallerAddress()));
};


/**
 * optional bytes caller_address = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCallerAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.prototype.getCallerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCallerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setCallerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes transferTo_address = 3;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.InternalTransaction.prototype.getTransfertoAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes transferTo_address = 3;
 * This is a type-conversion wrapper around `getTransfertoAddress()`
 * @return {string}
 */
proto.protocol.InternalTransaction.prototype.getTransfertoAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransfertoAddress()));
};


/**
 * optional bytes transferTo_address = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransfertoAddress()`
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.prototype.getTransfertoAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransfertoAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setTransfertoAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * repeated CallValueInfo callValueInfo = 4;
 * @return {!Array<!proto.protocol.InternalTransaction.CallValueInfo>}
 */
proto.protocol.InternalTransaction.prototype.getCallvalueinfoList = function() {
  return /** @type{!Array<!proto.protocol.InternalTransaction.CallValueInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.InternalTransaction.CallValueInfo, 4));
};


/**
 * @param {!Array<!proto.protocol.InternalTransaction.CallValueInfo>} value
 * @return {!proto.protocol.InternalTransaction} returns this
*/
proto.protocol.InternalTransaction.prototype.setCallvalueinfoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.protocol.InternalTransaction.CallValueInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.InternalTransaction.CallValueInfo}
 */
proto.protocol.InternalTransaction.prototype.addCallvalueinfo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.protocol.InternalTransaction.CallValueInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.clearCallvalueinfoList = function() {
  return this.setCallvalueinfoList([]);
};


/**
 * optional bytes note = 5;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.InternalTransaction.prototype.getNote = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes note = 5;
 * This is a type-conversion wrapper around `getNote()`
 * @return {string}
 */
proto.protocol.InternalTransaction.prototype.getNote_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getNote()));
};


/**
 * optional bytes note = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNote()`
 * @return {!Uint8Array}
 */
proto.protocol.InternalTransaction.prototype.getNote_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getNote()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setNote = function(value) {
  return jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional bool rejected = 6;
 * @return {boolean}
 */
proto.protocol.InternalTransaction.prototype.getRejected = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setRejected = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional string extra = 7;
 * @return {string}
 */
proto.protocol.InternalTransaction.prototype.getExtra = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.InternalTransaction} returns this
 */
proto.protocol.InternalTransaction.prototype.setExtra = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.DelegatedResourceAccountIndex.repeatedFields_ = [2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.DelegatedResourceAccountIndex.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.DelegatedResourceAccountIndex} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DelegatedResourceAccountIndex.toObject = function(includeInstance, msg) {
  var f, obj = {
    account: msg.getAccount_asB64(),
    fromaccountsList: msg.getFromaccountsList_asB64(),
    toaccountsList: msg.getToaccountsList_asB64(),
    timestamp: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.DelegatedResourceAccountIndex}
 */
proto.protocol.DelegatedResourceAccountIndex.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.DelegatedResourceAccountIndex;
  return proto.protocol.DelegatedResourceAccountIndex.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.DelegatedResourceAccountIndex} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.DelegatedResourceAccountIndex}
 */
proto.protocol.DelegatedResourceAccountIndex.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccount(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addFromaccounts(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addToaccounts(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.DelegatedResourceAccountIndex.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.DelegatedResourceAccountIndex} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.DelegatedResourceAccountIndex.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccount_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getFromaccountsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
  f = message.getToaccountsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      3,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional bytes account = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getAccount = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes account = 1;
 * This is a type-conversion wrapper around `getAccount()`
 * @return {string}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getAccount_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccount()));
};


/**
 * optional bytes account = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccount()`
 * @return {!Uint8Array}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getAccount_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccount()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.setAccount = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated bytes fromAccounts = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getFromaccountsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes fromAccounts = 2;
 * This is a type-conversion wrapper around `getFromaccountsList()`
 * @return {!Array<string>}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getFromaccountsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getFromaccountsList()));
};


/**
 * repeated bytes fromAccounts = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFromaccountsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getFromaccountsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getFromaccountsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.setFromaccountsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.addFromaccounts = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.clearFromaccountsList = function() {
  return this.setFromaccountsList([]);
};


/**
 * repeated bytes toAccounts = 3;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getToaccountsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * repeated bytes toAccounts = 3;
 * This is a type-conversion wrapper around `getToaccountsList()`
 * @return {!Array<string>}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getToaccountsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getToaccountsList()));
};


/**
 * repeated bytes toAccounts = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getToaccountsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getToaccountsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getToaccountsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.setToaccountsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.addToaccounts = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.clearToaccountsList = function() {
  return this.setToaccountsList([]);
};


/**
 * optional int64 timestamp = 4;
 * @return {number}
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.DelegatedResourceAccountIndex} returns this
 */
proto.protocol.DelegatedResourceAccountIndex.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.NodeInfo.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    beginsyncnum: jspb.Message.getFieldWithDefault(msg, 1, 0),
    block: jspb.Message.getFieldWithDefault(msg, 2, ""),
    solidityblock: jspb.Message.getFieldWithDefault(msg, 3, ""),
    currentconnectcount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    activeconnectcount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    passiveconnectcount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    totalflow: jspb.Message.getFieldWithDefault(msg, 7, 0),
    peerinfolistList: jspb.Message.toObjectList(msg.getPeerinfolistList(),
    proto.protocol.NodeInfo.PeerInfo.toObject, includeInstance),
    confignodeinfo: (f = msg.getConfignodeinfo()) && proto.protocol.NodeInfo.ConfigNodeInfo.toObject(includeInstance, f),
    machineinfo: (f = msg.getMachineinfo()) && proto.protocol.NodeInfo.MachineInfo.toObject(includeInstance, f),
    cheatwitnessinfomapMap: (f = msg.getCheatwitnessinfomapMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo}
 */
proto.protocol.NodeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo;
  return proto.protocol.NodeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo}
 */
proto.protocol.NodeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBeginsyncnum(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBlock(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSolidityblock(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCurrentconnectcount(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setActiveconnectcount(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassiveconnectcount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalflow(value);
      break;
    case 8:
      var value = new proto.protocol.NodeInfo.PeerInfo;
      reader.readMessage(value,proto.protocol.NodeInfo.PeerInfo.deserializeBinaryFromReader);
      msg.addPeerinfolist(value);
      break;
    case 9:
      var value = new proto.protocol.NodeInfo.ConfigNodeInfo;
      reader.readMessage(value,proto.protocol.NodeInfo.ConfigNodeInfo.deserializeBinaryFromReader);
      msg.setConfignodeinfo(value);
      break;
    case 10:
      var value = new proto.protocol.NodeInfo.MachineInfo;
      reader.readMessage(value,proto.protocol.NodeInfo.MachineInfo.deserializeBinaryFromReader);
      msg.setMachineinfo(value);
      break;
    case 11:
      var value = msg.getCheatwitnessinfomapMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBeginsyncnum();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getBlock();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSolidityblock();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCurrentconnectcount();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getActiveconnectcount();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getPassiveconnectcount();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getTotalflow();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getPeerinfolistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.protocol.NodeInfo.PeerInfo.serializeBinaryToWriter
    );
  }
  f = message.getConfignodeinfo();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.protocol.NodeInfo.ConfigNodeInfo.serializeBinaryToWriter
    );
  }
  f = message.getMachineinfo();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.protocol.NodeInfo.MachineInfo.serializeBinaryToWriter
    );
  }
  f = message.getCheatwitnessinfomapMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(11, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.PeerInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo.PeerInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.PeerInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    lastsyncblock: jspb.Message.getFieldWithDefault(msg, 1, ""),
    remainnum: jspb.Message.getFieldWithDefault(msg, 2, 0),
    lastblockupdatetime: jspb.Message.getFieldWithDefault(msg, 3, 0),
    syncflag: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    headblocktimewebothhave: jspb.Message.getFieldWithDefault(msg, 5, 0),
    needsyncfrompeer: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    needsyncfromus: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    host: jspb.Message.getFieldWithDefault(msg, 8, ""),
    port: jspb.Message.getFieldWithDefault(msg, 9, 0),
    nodeid: jspb.Message.getFieldWithDefault(msg, 10, ""),
    connecttime: jspb.Message.getFieldWithDefault(msg, 11, 0),
    avglatency: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    synctofetchsize: jspb.Message.getFieldWithDefault(msg, 13, 0),
    synctofetchsizepeeknum: jspb.Message.getFieldWithDefault(msg, 14, 0),
    syncblockrequestedsize: jspb.Message.getFieldWithDefault(msg, 15, 0),
    unfetchsynnum: jspb.Message.getFieldWithDefault(msg, 16, 0),
    blockinporcsize: jspb.Message.getFieldWithDefault(msg, 17, 0),
    headblockwebothhave: jspb.Message.getFieldWithDefault(msg, 18, ""),
    isactive: jspb.Message.getBooleanFieldWithDefault(msg, 19, false),
    score: jspb.Message.getFieldWithDefault(msg, 20, 0),
    nodecount: jspb.Message.getFieldWithDefault(msg, 21, 0),
    inflow: jspb.Message.getFieldWithDefault(msg, 22, 0),
    disconnecttimes: jspb.Message.getFieldWithDefault(msg, 23, 0),
    localdisconnectreason: jspb.Message.getFieldWithDefault(msg, 24, ""),
    remotedisconnectreason: jspb.Message.getFieldWithDefault(msg, 25, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo.PeerInfo}
 */
proto.protocol.NodeInfo.PeerInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo.PeerInfo;
  return proto.protocol.NodeInfo.PeerInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo.PeerInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo.PeerInfo}
 */
proto.protocol.NodeInfo.PeerInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastsyncblock(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setRemainnum(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastblockupdatetime(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSyncflag(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setHeadblocktimewebothhave(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNeedsyncfrompeer(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNeedsyncfromus(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setHost(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPort(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeid(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setConnecttime(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAvglatency(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSynctofetchsize(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSynctofetchsizepeeknum(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSyncblockrequestedsize(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUnfetchsynnum(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBlockinporcsize(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.setHeadblockwebothhave(value);
      break;
    case 19:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsactive(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setScore(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNodecount(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setInflow(value);
      break;
    case 23:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisconnecttimes(value);
      break;
    case 24:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocaldisconnectreason(value);
      break;
    case 25:
      var value = /** @type {string} */ (reader.readString());
      msg.setRemotedisconnectreason(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.PeerInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo.PeerInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.PeerInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLastsyncblock();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRemainnum();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getLastblockupdatetime();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getSyncflag();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getHeadblocktimewebothhave();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getNeedsyncfrompeer();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getNeedsyncfromus();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getHost();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getNodeid();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getConnecttime();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getAvglatency();
  if (f !== 0.0) {
    writer.writeDouble(
      12,
      f
    );
  }
  f = message.getSynctofetchsize();
  if (f !== 0) {
    writer.writeInt32(
      13,
      f
    );
  }
  f = message.getSynctofetchsizepeeknum();
  if (f !== 0) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = message.getSyncblockrequestedsize();
  if (f !== 0) {
    writer.writeInt32(
      15,
      f
    );
  }
  f = message.getUnfetchsynnum();
  if (f !== 0) {
    writer.writeInt64(
      16,
      f
    );
  }
  f = message.getBlockinporcsize();
  if (f !== 0) {
    writer.writeInt32(
      17,
      f
    );
  }
  f = message.getHeadblockwebothhave();
  if (f.length > 0) {
    writer.writeString(
      18,
      f
    );
  }
  f = message.getIsactive();
  if (f) {
    writer.writeBool(
      19,
      f
    );
  }
  f = message.getScore();
  if (f !== 0) {
    writer.writeInt32(
      20,
      f
    );
  }
  f = message.getNodecount();
  if (f !== 0) {
    writer.writeInt32(
      21,
      f
    );
  }
  f = message.getInflow();
  if (f !== 0) {
    writer.writeInt64(
      22,
      f
    );
  }
  f = message.getDisconnecttimes();
  if (f !== 0) {
    writer.writeInt32(
      23,
      f
    );
  }
  f = message.getLocaldisconnectreason();
  if (f.length > 0) {
    writer.writeString(
      24,
      f
    );
  }
  f = message.getRemotedisconnectreason();
  if (f.length > 0) {
    writer.writeString(
      25,
      f
    );
  }
};


/**
 * optional string lastSyncBlock = 1;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getLastsyncblock = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setLastsyncblock = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 remainNum = 2;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getRemainnum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setRemainnum = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 lastBlockUpdateTime = 3;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getLastblockupdatetime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setLastblockupdatetime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool syncFlag = 4;
 * @return {boolean}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getSyncflag = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setSyncflag = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int64 headBlockTimeWeBothHave = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getHeadblocktimewebothhave = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setHeadblocktimewebothhave = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bool needSyncFromPeer = 6;
 * @return {boolean}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getNeedsyncfrompeer = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setNeedsyncfrompeer = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool needSyncFromUs = 7;
 * @return {boolean}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getNeedsyncfromus = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setNeedsyncfromus = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional string host = 8;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getHost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setHost = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional int32 port = 9;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setPort = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional string nodeId = 10;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getNodeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setNodeid = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional int64 connectTime = 11;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getConnecttime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setConnecttime = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional double avgLatency = 12;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getAvglatency = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setAvglatency = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional int32 syncToFetchSize = 13;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getSynctofetchsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setSynctofetchsize = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional int64 syncToFetchSizePeekNum = 14;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getSynctofetchsizepeeknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setSynctofetchsizepeeknum = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int32 syncBlockRequestedSize = 15;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getSyncblockrequestedsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setSyncblockrequestedsize = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};


/**
 * optional int64 unFetchSynNum = 16;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getUnfetchsynnum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setUnfetchsynnum = function(value) {
  return jspb.Message.setProto3IntField(this, 16, value);
};


/**
 * optional int32 blockInPorcSize = 17;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getBlockinporcsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 17, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setBlockinporcsize = function(value) {
  return jspb.Message.setProto3IntField(this, 17, value);
};


/**
 * optional string headBlockWeBothHave = 18;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getHeadblockwebothhave = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setHeadblockwebothhave = function(value) {
  return jspb.Message.setProto3StringField(this, 18, value);
};


/**
 * optional bool isActive = 19;
 * @return {boolean}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getIsactive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 19, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setIsactive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 19, value);
};


/**
 * optional int32 score = 20;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getScore = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 20, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setScore = function(value) {
  return jspb.Message.setProto3IntField(this, 20, value);
};


/**
 * optional int32 nodeCount = 21;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getNodecount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setNodecount = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int64 inFlow = 22;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getInflow = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 22, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setInflow = function(value) {
  return jspb.Message.setProto3IntField(this, 22, value);
};


/**
 * optional int32 disconnectTimes = 23;
 * @return {number}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getDisconnecttimes = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 23, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setDisconnecttimes = function(value) {
  return jspb.Message.setProto3IntField(this, 23, value);
};


/**
 * optional string localDisconnectReason = 24;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getLocaldisconnectreason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 24, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setLocaldisconnectreason = function(value) {
  return jspb.Message.setProto3StringField(this, 24, value);
};


/**
 * optional string remoteDisconnectReason = 25;
 * @return {string}
 */
proto.protocol.NodeInfo.PeerInfo.prototype.getRemotedisconnectreason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 25, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.PeerInfo} returns this
 */
proto.protocol.NodeInfo.PeerInfo.prototype.setRemotedisconnectreason = function(value) {
  return jspb.Message.setProto3StringField(this, 25, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.ConfigNodeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo.ConfigNodeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.ConfigNodeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    codeversion: jspb.Message.getFieldWithDefault(msg, 1, ""),
    p2pversion: jspb.Message.getFieldWithDefault(msg, 2, ""),
    listenport: jspb.Message.getFieldWithDefault(msg, 3, 0),
    discoverenable: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    activenodesize: jspb.Message.getFieldWithDefault(msg, 5, 0),
    passivenodesize: jspb.Message.getFieldWithDefault(msg, 6, 0),
    sendnodesize: jspb.Message.getFieldWithDefault(msg, 7, 0),
    maxconnectcount: jspb.Message.getFieldWithDefault(msg, 8, 0),
    sameipmaxconnectcount: jspb.Message.getFieldWithDefault(msg, 9, 0),
    backuplistenport: jspb.Message.getFieldWithDefault(msg, 10, 0),
    backupmembersize: jspb.Message.getFieldWithDefault(msg, 11, 0),
    backuppriority: jspb.Message.getFieldWithDefault(msg, 12, 0),
    dbversion: jspb.Message.getFieldWithDefault(msg, 13, 0),
    minparticipationrate: jspb.Message.getFieldWithDefault(msg, 14, 0),
    supportconstant: jspb.Message.getBooleanFieldWithDefault(msg, 15, false),
    mintimeratio: jspb.Message.getFloatingPointFieldWithDefault(msg, 16, 0.0),
    maxtimeratio: jspb.Message.getFloatingPointFieldWithDefault(msg, 17, 0.0),
    allowcreationofcontracts: jspb.Message.getFieldWithDefault(msg, 18, 0),
    allowadaptiveenergy: jspb.Message.getFieldWithDefault(msg, 19, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo.ConfigNodeInfo;
  return proto.protocol.NodeInfo.ConfigNodeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo.ConfigNodeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCodeversion(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setP2pversion(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setListenport(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDiscoverenable(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setActivenodesize(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPassivenodesize(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSendnodesize(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMaxconnectcount(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSameipmaxconnectcount(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBackuplistenport(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBackupmembersize(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBackuppriority(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDbversion(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinparticipationrate(value);
      break;
    case 15:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSupportconstant(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMintimeratio(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMaxtimeratio(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAllowcreationofcontracts(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAllowadaptiveenergy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.ConfigNodeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo.ConfigNodeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.ConfigNodeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCodeversion();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getP2pversion();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getListenport();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getDiscoverenable();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getActivenodesize();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getPassivenodesize();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getSendnodesize();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getMaxconnectcount();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getSameipmaxconnectcount();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getBackuplistenport();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getBackupmembersize();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getBackuppriority();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getDbversion();
  if (f !== 0) {
    writer.writeInt32(
      13,
      f
    );
  }
  f = message.getMinparticipationrate();
  if (f !== 0) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = message.getSupportconstant();
  if (f) {
    writer.writeBool(
      15,
      f
    );
  }
  f = message.getMintimeratio();
  if (f !== 0.0) {
    writer.writeDouble(
      16,
      f
    );
  }
  f = message.getMaxtimeratio();
  if (f !== 0.0) {
    writer.writeDouble(
      17,
      f
    );
  }
  f = message.getAllowcreationofcontracts();
  if (f !== 0) {
    writer.writeInt64(
      18,
      f
    );
  }
  f = message.getAllowadaptiveenergy();
  if (f !== 0) {
    writer.writeInt64(
      19,
      f
    );
  }
};


/**
 * optional string codeVersion = 1;
 * @return {string}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getCodeversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setCodeversion = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string p2pVersion = 2;
 * @return {string}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getP2pversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setP2pversion = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 listenPort = 3;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getListenport = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setListenport = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool discoverEnable = 4;
 * @return {boolean}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getDiscoverenable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setDiscoverenable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 activeNodeSize = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getActivenodesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setActivenodesize = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 passiveNodeSize = 6;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getPassivenodesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setPassivenodesize = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 sendNodeSize = 7;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getSendnodesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setSendnodesize = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 maxConnectCount = 8;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getMaxconnectcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setMaxconnectcount = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 sameIpMaxConnectCount = 9;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getSameipmaxconnectcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setSameipmaxconnectcount = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 backupListenPort = 10;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getBackuplistenport = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setBackuplistenport = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int32 backupMemberSize = 11;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getBackupmembersize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setBackupmembersize = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int32 backupPriority = 12;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getBackuppriority = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setBackuppriority = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int32 dbVersion = 13;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getDbversion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setDbversion = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional int32 minParticipationRate = 14;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getMinparticipationrate = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setMinparticipationrate = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional bool supportConstant = 15;
 * @return {boolean}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getSupportconstant = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 15, false));
};


/**
 * @param {boolean} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setSupportconstant = function(value) {
  return jspb.Message.setProto3BooleanField(this, 15, value);
};


/**
 * optional double minTimeRatio = 16;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getMintimeratio = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 16, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setMintimeratio = function(value) {
  return jspb.Message.setProto3FloatField(this, 16, value);
};


/**
 * optional double maxTimeRatio = 17;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getMaxtimeratio = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 17, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setMaxtimeratio = function(value) {
  return jspb.Message.setProto3FloatField(this, 17, value);
};


/**
 * optional int64 allowCreationOfContracts = 18;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getAllowcreationofcontracts = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setAllowcreationofcontracts = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional int64 allowAdaptiveEnergy = 19;
 * @return {number}
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.getAllowadaptiveenergy = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.ConfigNodeInfo} returns this
 */
proto.protocol.NodeInfo.ConfigNodeInfo.prototype.setAllowadaptiveenergy = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.NodeInfo.MachineInfo.repeatedFields_ = [12,13];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.MachineInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo.MachineInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    threadcount: jspb.Message.getFieldWithDefault(msg, 1, 0),
    deadlockthreadcount: jspb.Message.getFieldWithDefault(msg, 2, 0),
    cpucount: jspb.Message.getFieldWithDefault(msg, 3, 0),
    totalmemory: jspb.Message.getFieldWithDefault(msg, 4, 0),
    freememory: jspb.Message.getFieldWithDefault(msg, 5, 0),
    cpurate: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    javaversion: jspb.Message.getFieldWithDefault(msg, 7, ""),
    osname: jspb.Message.getFieldWithDefault(msg, 8, ""),
    jvmtotalmemory: jspb.Message.getFieldWithDefault(msg, 9, 0),
    jvmfreememory: jspb.Message.getFieldWithDefault(msg, 10, 0),
    processcpurate: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
    memorydescinfolistList: jspb.Message.toObjectList(msg.getMemorydescinfolistList(),
    proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.toObject, includeInstance),
    deadlockthreadinfolistList: jspb.Message.toObjectList(msg.getDeadlockthreadinfolistList(),
    proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo.MachineInfo}
 */
proto.protocol.NodeInfo.MachineInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo.MachineInfo;
  return proto.protocol.NodeInfo.MachineInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo.MachineInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo.MachineInfo}
 */
proto.protocol.NodeInfo.MachineInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setThreadcount(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDeadlockthreadcount(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCpucount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalmemory(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFreememory(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCpurate(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setJavaversion(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setOsname(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setJvmtotalmemory(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setJvmfreememory(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setProcesscpurate(value);
      break;
    case 12:
      var value = new proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo;
      reader.readMessage(value,proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.deserializeBinaryFromReader);
      msg.addMemorydescinfolist(value);
      break;
    case 13:
      var value = new proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo;
      reader.readMessage(value,proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.deserializeBinaryFromReader);
      msg.addDeadlockthreadinfolist(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.MachineInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo.MachineInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getThreadcount();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getDeadlockthreadcount();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getCpucount();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTotalmemory();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getFreememory();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getCpurate();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getJavaversion();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getOsname();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getJvmtotalmemory();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getJvmfreememory();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getProcesscpurate();
  if (f !== 0.0) {
    writer.writeDouble(
      11,
      f
    );
  }
  f = message.getMemorydescinfolistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      12,
      f,
      proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.serializeBinaryToWriter
    );
  }
  f = message.getDeadlockthreadinfolistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    initsize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    usesize: jspb.Message.getFieldWithDefault(msg, 3, 0),
    maxsize: jspb.Message.getFieldWithDefault(msg, 4, 0),
    userate: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo;
  return proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setInitsize(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUsesize(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMaxsize(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setUserate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInitsize();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getUsesize();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getMaxsize();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getUserate();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 initSize = 2;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.getInitsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.setInitsize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 useSize = 3;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.getUsesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.setUsesize = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 maxSize = 4;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.getMaxsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.setMaxsize = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional double useRate = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.getUserate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo.prototype.setUserate = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    lockname: jspb.Message.getFieldWithDefault(msg, 2, ""),
    lockowner: jspb.Message.getFieldWithDefault(msg, 3, ""),
    state: jspb.Message.getFieldWithDefault(msg, 4, ""),
    blocktime: jspb.Message.getFieldWithDefault(msg, 5, 0),
    waittime: jspb.Message.getFieldWithDefault(msg, 6, 0),
    stacktrace: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo;
  return proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLockname(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLockowner(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setState(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocktime(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWaittime(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setStacktrace(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLockname();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLockowner();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getState();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getBlocktime();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getWaittime();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getStacktrace();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string lockName = 2;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getLockname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setLockname = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string lockOwner = 3;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getLockowner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setLockowner = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string state = 4;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getState = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setState = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 blockTime = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getBlocktime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setBlocktime = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int64 waitTime = 6;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getWaittime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setWaittime = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string stackTrace = 7;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.getStacktrace = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.setStacktrace = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional int32 threadCount = 1;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getThreadcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setThreadcount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 deadLockThreadCount = 2;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getDeadlockthreadcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setDeadlockthreadcount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 cpuCount = 3;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getCpucount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setCpucount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 totalMemory = 4;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getTotalmemory = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setTotalmemory = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 freeMemory = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getFreememory = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setFreememory = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional double cpuRate = 6;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getCpurate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setCpurate = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional string javaVersion = 7;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getJavaversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setJavaversion = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string osName = 8;
 * @return {string}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getOsname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setOsname = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional int64 jvmTotalMemory = 9;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getJvmtotalmemory = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setJvmtotalmemory = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 jvmFreeMemory = 10;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getJvmfreememory = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setJvmfreememory = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional double processCpuRate = 11;
 * @return {number}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getProcesscpurate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.setProcesscpurate = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * repeated MemoryDescInfo memoryDescInfoList = 12;
 * @return {!Array<!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo>}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getMemorydescinfolistList = function() {
  return /** @type{!Array<!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo, 12));
};


/**
 * @param {!Array<!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo>} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
*/
proto.protocol.NodeInfo.MachineInfo.prototype.setMemorydescinfolistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 12, value);
};


/**
 * @param {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.addMemorydescinfolist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.protocol.NodeInfo.MachineInfo.MemoryDescInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.clearMemorydescinfolistList = function() {
  return this.setMemorydescinfolistList([]);
};


/**
 * repeated DeadLockThreadInfo deadLockThreadInfoList = 13;
 * @return {!Array<!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo>}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.getDeadlockthreadinfolistList = function() {
  return /** @type{!Array<!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo, 13));
};


/**
 * @param {!Array<!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo>} value
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
*/
proto.protocol.NodeInfo.MachineInfo.prototype.setDeadlockthreadinfolistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo}
 */
proto.protocol.NodeInfo.MachineInfo.prototype.addDeadlockthreadinfolist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.protocol.NodeInfo.MachineInfo.DeadLockThreadInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.NodeInfo.MachineInfo} returns this
 */
proto.protocol.NodeInfo.MachineInfo.prototype.clearDeadlockthreadinfolistList = function() {
  return this.setDeadlockthreadinfolistList([]);
};


/**
 * optional int64 beginSyncNum = 1;
 * @return {number}
 */
proto.protocol.NodeInfo.prototype.getBeginsyncnum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setBeginsyncnum = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string block = 2;
 * @return {string}
 */
proto.protocol.NodeInfo.prototype.getBlock = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setBlock = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string solidityBlock = 3;
 * @return {string}
 */
proto.protocol.NodeInfo.prototype.getSolidityblock = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setSolidityblock = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 currentConnectCount = 4;
 * @return {number}
 */
proto.protocol.NodeInfo.prototype.getCurrentconnectcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setCurrentconnectcount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 activeConnectCount = 5;
 * @return {number}
 */
proto.protocol.NodeInfo.prototype.getActiveconnectcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setActiveconnectcount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 passiveConnectCount = 6;
 * @return {number}
 */
proto.protocol.NodeInfo.prototype.getPassiveconnectcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setPassiveconnectcount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int64 totalFlow = 7;
 * @return {number}
 */
proto.protocol.NodeInfo.prototype.getTotalflow = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.setTotalflow = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * repeated PeerInfo peerInfoList = 8;
 * @return {!Array<!proto.protocol.NodeInfo.PeerInfo>}
 */
proto.protocol.NodeInfo.prototype.getPeerinfolistList = function() {
  return /** @type{!Array<!proto.protocol.NodeInfo.PeerInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.NodeInfo.PeerInfo, 8));
};


/**
 * @param {!Array<!proto.protocol.NodeInfo.PeerInfo>} value
 * @return {!proto.protocol.NodeInfo} returns this
*/
proto.protocol.NodeInfo.prototype.setPeerinfolistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.protocol.NodeInfo.PeerInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.NodeInfo.PeerInfo}
 */
proto.protocol.NodeInfo.prototype.addPeerinfolist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.protocol.NodeInfo.PeerInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.clearPeerinfolistList = function() {
  return this.setPeerinfolistList([]);
};


/**
 * optional ConfigNodeInfo configNodeInfo = 9;
 * @return {?proto.protocol.NodeInfo.ConfigNodeInfo}
 */
proto.protocol.NodeInfo.prototype.getConfignodeinfo = function() {
  return /** @type{?proto.protocol.NodeInfo.ConfigNodeInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.NodeInfo.ConfigNodeInfo, 9));
};


/**
 * @param {?proto.protocol.NodeInfo.ConfigNodeInfo|undefined} value
 * @return {!proto.protocol.NodeInfo} returns this
*/
proto.protocol.NodeInfo.prototype.setConfignodeinfo = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.clearConfignodeinfo = function() {
  return this.setConfignodeinfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.NodeInfo.prototype.hasConfignodeinfo = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional MachineInfo machineInfo = 10;
 * @return {?proto.protocol.NodeInfo.MachineInfo}
 */
proto.protocol.NodeInfo.prototype.getMachineinfo = function() {
  return /** @type{?proto.protocol.NodeInfo.MachineInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.NodeInfo.MachineInfo, 10));
};


/**
 * @param {?proto.protocol.NodeInfo.MachineInfo|undefined} value
 * @return {!proto.protocol.NodeInfo} returns this
*/
proto.protocol.NodeInfo.prototype.setMachineinfo = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.clearMachineinfo = function() {
  return this.setMachineinfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.NodeInfo.prototype.hasMachineinfo = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * map<string, string> cheatWitnessInfoMap = 11;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.protocol.NodeInfo.prototype.getCheatwitnessinfomapMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 11, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.protocol.NodeInfo} returns this
 */
proto.protocol.NodeInfo.prototype.clearCheatwitnessinfomapMap = function() {
  this.getCheatwitnessinfomapMap().clear();
  return this;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    interval: jspb.Message.getFieldWithDefault(msg, 1, 0),
    node: (f = msg.getNode()) && proto.protocol.MetricsInfo.NodeInfo.toObject(includeInstance, f),
    blockchain: (f = msg.getBlockchain()) && proto.protocol.MetricsInfo.BlockChainInfo.toObject(includeInstance, f),
    net: (f = msg.getNet()) && proto.protocol.MetricsInfo.NetInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo}
 */
proto.protocol.MetricsInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo;
  return proto.protocol.MetricsInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo}
 */
proto.protocol.MetricsInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setInterval(value);
      break;
    case 2:
      var value = new proto.protocol.MetricsInfo.NodeInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NodeInfo.deserializeBinaryFromReader);
      msg.setNode(value);
      break;
    case 3:
      var value = new proto.protocol.MetricsInfo.BlockChainInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.BlockChainInfo.deserializeBinaryFromReader);
      msg.setBlockchain(value);
      break;
    case 4:
      var value = new proto.protocol.MetricsInfo.NetInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.deserializeBinaryFromReader);
      msg.setNet(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInterval();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getNode();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.MetricsInfo.NodeInfo.serializeBinaryToWriter
    );
  }
  f = message.getBlockchain();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.protocol.MetricsInfo.BlockChainInfo.serializeBinaryToWriter
    );
  }
  f = message.getNet();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.protocol.MetricsInfo.NetInfo.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NodeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NodeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NodeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    ip: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nodetype: jspb.Message.getFieldWithDefault(msg, 2, 0),
    version: jspb.Message.getFieldWithDefault(msg, 3, ""),
    backupstatus: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NodeInfo}
 */
proto.protocol.MetricsInfo.NodeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NodeInfo;
  return proto.protocol.MetricsInfo.NodeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NodeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NodeInfo}
 */
proto.protocol.MetricsInfo.NodeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setIp(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNodetype(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBackupstatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NodeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NodeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NodeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIp();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNodetype();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getBackupstatus();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * optional string ip = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.getIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.NodeInfo} returns this
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.setIp = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 nodeType = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.getNodetype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NodeInfo} returns this
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.setNodetype = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string version = 3;
 * @return {string}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.NodeInfo} returns this
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 backupStatus = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.getBackupstatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NodeInfo} returns this
 */
proto.protocol.MetricsInfo.NodeInfo.prototype.setBackupstatus = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MetricsInfo.BlockChainInfo.repeatedFields_ = [10,13];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.BlockChainInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    headblocknum: jspb.Message.getFieldWithDefault(msg, 1, 0),
    headblocktimestamp: jspb.Message.getFieldWithDefault(msg, 2, 0),
    headblockhash: jspb.Message.getFieldWithDefault(msg, 3, ""),
    forkcount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    failforkcount: jspb.Message.getFieldWithDefault(msg, 5, 0),
    blockprocesstime: (f = msg.getBlockprocesstime()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    tps: (f = msg.getTps()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    transactioncachesize: jspb.Message.getFieldWithDefault(msg, 8, 0),
    missedtransaction: (f = msg.getMissedtransaction()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    witnessesList: jspb.Message.toObjectList(msg.getWitnessesList(),
    proto.protocol.MetricsInfo.BlockChainInfo.Witness.toObject, includeInstance),
    failprocessblocknum: jspb.Message.getFieldWithDefault(msg, 11, 0),
    failprocessblockreason: jspb.Message.getFieldWithDefault(msg, 12, ""),
    dupwitnessList: jspb.Message.toObjectList(msg.getDupwitnessList(),
    proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo}
 */
proto.protocol.MetricsInfo.BlockChainInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.BlockChainInfo;
  return proto.protocol.MetricsInfo.BlockChainInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo}
 */
proto.protocol.MetricsInfo.BlockChainInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setHeadblocknum(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setHeadblocktimestamp(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setHeadblockhash(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setForkcount(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFailforkcount(value);
      break;
    case 6:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setBlockprocesstime(value);
      break;
    case 7:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setTps(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTransactioncachesize(value);
      break;
    case 9:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setMissedtransaction(value);
      break;
    case 10:
      var value = new proto.protocol.MetricsInfo.BlockChainInfo.Witness;
      reader.readMessage(value,proto.protocol.MetricsInfo.BlockChainInfo.Witness.deserializeBinaryFromReader);
      msg.addWitnesses(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFailprocessblocknum(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setFailprocessblockreason(value);
      break;
    case 13:
      var value = new proto.protocol.MetricsInfo.BlockChainInfo.DupWitness;
      reader.readMessage(value,proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.deserializeBinaryFromReader);
      msg.addDupwitness(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.BlockChainInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeadblocknum();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getHeadblocktimestamp();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getHeadblockhash();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getForkcount();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getFailforkcount();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getBlockprocesstime();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getTps();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getTransactioncachesize();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getMissedtransaction();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getWitnessesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.protocol.MetricsInfo.BlockChainInfo.Witness.serializeBinaryToWriter
    );
  }
  f = message.getFailprocessblocknum();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getFailprocessblockreason();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getDupwitnessList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.BlockChainInfo.Witness.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.Witness} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    version: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.Witness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.BlockChainInfo.Witness;
  return proto.protocol.MetricsInfo.BlockChainInfo.Witness.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.Witness} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.Witness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.BlockChainInfo.Witness.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.Witness} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.Witness} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 version = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.Witness} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.Witness.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    blocknum: jspb.Message.getFieldWithDefault(msg, 2, 0),
    count: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.BlockChainInfo.DupWitness;
  return proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBlocknum(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBlocknum();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 blockNum = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.getBlocknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.setBlocknum = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 count = 3;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.DupWitness.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 headBlockNum = 1;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getHeadblocknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setHeadblocknum = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 headBlockTimestamp = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getHeadblocktimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setHeadblocktimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string headBlockHash = 3;
 * @return {string}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getHeadblockhash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setHeadblockhash = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 forkCount = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getForkcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setForkcount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 failForkCount = 5;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getFailforkcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setFailforkcount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional RateInfo blockProcessTime = 6;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getBlockprocesstime = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 6));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
*/
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setBlockprocesstime = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.clearBlockprocesstime = function() {
  return this.setBlockprocesstime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.hasBlockprocesstime = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional RateInfo tps = 7;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getTps = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 7));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
*/
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setTps = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.clearTps = function() {
  return this.setTps(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.hasTps = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional int32 transactionCacheSize = 8;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getTransactioncachesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setTransactioncachesize = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional RateInfo missedTransaction = 9;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getMissedtransaction = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 9));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
*/
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setMissedtransaction = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.clearMissedtransaction = function() {
  return this.setMissedtransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.hasMissedtransaction = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * repeated Witness witnesses = 10;
 * @return {!Array<!proto.protocol.MetricsInfo.BlockChainInfo.Witness>}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getWitnessesList = function() {
  return /** @type{!Array<!proto.protocol.MetricsInfo.BlockChainInfo.Witness>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MetricsInfo.BlockChainInfo.Witness, 10));
};


/**
 * @param {!Array<!proto.protocol.MetricsInfo.BlockChainInfo.Witness>} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
*/
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setWitnessesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.Witness=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.Witness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.addWitnesses = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.protocol.MetricsInfo.BlockChainInfo.Witness, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.clearWitnessesList = function() {
  return this.setWitnessesList([]);
};


/**
 * optional int64 failProcessBlockNum = 11;
 * @return {number}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getFailprocessblocknum = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setFailprocessblocknum = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional string failProcessBlockReason = 12;
 * @return {string}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getFailprocessblockreason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setFailprocessblockreason = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * repeated DupWitness dupWitness = 13;
 * @return {!Array<!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness>}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.getDupwitnessList = function() {
  return /** @type{!Array<!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MetricsInfo.BlockChainInfo.DupWitness, 13));
};


/**
 * @param {!Array<!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness>} value
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
*/
proto.protocol.MetricsInfo.BlockChainInfo.prototype.setDupwitnessList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo.DupWitness}
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.addDupwitness = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.protocol.MetricsInfo.BlockChainInfo.DupWitness, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MetricsInfo.BlockChainInfo} returns this
 */
proto.protocol.MetricsInfo.BlockChainInfo.prototype.clearDupwitnessList = function() {
  return this.setDupwitnessList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.RateInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.RateInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.RateInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    count: jspb.Message.getFieldWithDefault(msg, 1, 0),
    meanrate: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    oneminuterate: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    fiveminuterate: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    fifteenminuterate: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.RateInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.RateInfo;
  return proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.RateInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCount(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMeanrate(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setOneminuterate(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFiveminuterate(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFifteenminuterate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.RateInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getMeanrate();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getOneminuterate();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getFiveminuterate();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getFifteenminuterate();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
};


/**
 * optional int64 count = 1;
 * @return {number}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.RateInfo} returns this
 */
proto.protocol.MetricsInfo.RateInfo.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional double meanRate = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.getMeanrate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.RateInfo} returns this
 */
proto.protocol.MetricsInfo.RateInfo.prototype.setMeanrate = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double oneMinuteRate = 3;
 * @return {number}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.getOneminuterate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.RateInfo} returns this
 */
proto.protocol.MetricsInfo.RateInfo.prototype.setOneminuterate = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double fiveMinuteRate = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.getFiveminuterate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.RateInfo} returns this
 */
proto.protocol.MetricsInfo.RateInfo.prototype.setFiveminuterate = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double fifteenMinuteRate = 5;
 * @return {number}
 */
proto.protocol.MetricsInfo.RateInfo.prototype.getFifteenminuterate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.RateInfo} returns this
 */
proto.protocol.MetricsInfo.RateInfo.prototype.setFifteenminuterate = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MetricsInfo.NetInfo.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    errorprotocount: jspb.Message.getFieldWithDefault(msg, 1, 0),
    api: (f = msg.getApi()) && proto.protocol.MetricsInfo.NetInfo.ApiInfo.toObject(includeInstance, f),
    connectioncount: jspb.Message.getFieldWithDefault(msg, 3, 0),
    validconnectioncount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    tcpintraffic: (f = msg.getTcpintraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    tcpouttraffic: (f = msg.getTcpouttraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    disconnectioncount: jspb.Message.getFieldWithDefault(msg, 7, 0),
    disconnectiondetailList: jspb.Message.toObjectList(msg.getDisconnectiondetailList(),
    proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.toObject, includeInstance),
    udpintraffic: (f = msg.getUdpintraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    udpouttraffic: (f = msg.getUdpouttraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    latency: (f = msg.getLatency()) && proto.protocol.MetricsInfo.NetInfo.LatencyInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo}
 */
proto.protocol.MetricsInfo.NetInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo;
  return proto.protocol.MetricsInfo.NetInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo}
 */
proto.protocol.MetricsInfo.NetInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setErrorprotocount(value);
      break;
    case 2:
      var value = new proto.protocol.MetricsInfo.NetInfo.ApiInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.ApiInfo.deserializeBinaryFromReader);
      msg.setApi(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConnectioncount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setValidconnectioncount(value);
      break;
    case 5:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setTcpintraffic(value);
      break;
    case 6:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setTcpouttraffic(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisconnectioncount(value);
      break;
    case 8:
      var value = new proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.deserializeBinaryFromReader);
      msg.addDisconnectiondetail(value);
      break;
    case 9:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setUdpintraffic(value);
      break;
    case 10:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setUdpouttraffic(value);
      break;
    case 11:
      var value = new proto.protocol.MetricsInfo.NetInfo.LatencyInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.LatencyInfo.deserializeBinaryFromReader);
      msg.setLatency(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getErrorprotocount();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getApi();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.MetricsInfo.NetInfo.ApiInfo.serializeBinaryToWriter
    );
  }
  f = message.getConnectioncount();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getValidconnectioncount();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getTcpintraffic();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getTcpouttraffic();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getDisconnectioncount();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getDisconnectiondetailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.serializeBinaryToWriter
    );
  }
  f = message.getUdpintraffic();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getUdpouttraffic();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getLatency();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.protocol.MetricsInfo.NetInfo.LatencyInfo.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.ApiInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    qps: (f = msg.getQps()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    failqps: (f = msg.getFailqps()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    outtraffic: (f = msg.getOuttraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    detailList: jspb.Message.toObjectList(msg.getDetailList(),
    proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo.ApiInfo;
  return proto.protocol.MetricsInfo.NetInfo.ApiInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setQps(value);
      break;
    case 2:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setFailqps(value);
      break;
    case 3:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setOuttraffic(value);
      break;
    case 4:
      var value = new proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.deserializeBinaryFromReader);
      msg.addDetail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.ApiInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQps();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getFailqps();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getOuttraffic();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getDetailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    qps: (f = msg.getQps()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    failqps: (f = msg.getFailqps()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f),
    outtraffic: (f = msg.getOuttraffic()) && proto.protocol.MetricsInfo.RateInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo;
  return proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setQps(value);
      break;
    case 3:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setFailqps(value);
      break;
    case 4:
      var value = new proto.protocol.MetricsInfo.RateInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.RateInfo.deserializeBinaryFromReader);
      msg.setOuttraffic(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getQps();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getFailqps();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
  f = message.getOuttraffic();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.protocol.MetricsInfo.RateInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional RateInfo qps = 2;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.getQps = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 2));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.setQps = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.clearQps = function() {
  return this.setQps(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.hasQps = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional RateInfo failQps = 3;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.getFailqps = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 3));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.setFailqps = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.clearFailqps = function() {
  return this.setFailqps(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.hasFailqps = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional RateInfo outTraffic = 4;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.getOuttraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 4));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.setOuttraffic = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.clearOuttraffic = function() {
  return this.setOuttraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.hasOuttraffic = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional RateInfo qps = 1;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.getQps = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 1));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.setQps = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.clearQps = function() {
  return this.setQps(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.hasQps = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RateInfo failQps = 2;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.getFailqps = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 2));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.setFailqps = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.clearFailqps = function() {
  return this.setFailqps(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.hasFailqps = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional RateInfo outTraffic = 3;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.getOuttraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 3));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.setOuttraffic = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.clearOuttraffic = function() {
  return this.setOuttraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.hasOuttraffic = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated ApiDetailInfo detail = 4;
 * @return {!Array<!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo>}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.getDetailList = function() {
  return /** @type{!Array<!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo, 4));
};


/**
 * @param {!Array<!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo>} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.setDetailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.addDetail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.protocol.MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MetricsInfo.NetInfo.ApiInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.ApiInfo.prototype.clearDetailList = function() {
  return this.setDetailList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    reason: jspb.Message.getFieldWithDefault(msg, 1, ""),
    count: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo;
  return proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReason(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReason();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string reason = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.getReason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.setReason = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 count = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.LatencyInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    top99: jspb.Message.getFieldWithDefault(msg, 1, 0),
    top95: jspb.Message.getFieldWithDefault(msg, 2, 0),
    top75: jspb.Message.getFieldWithDefault(msg, 3, 0),
    totalcount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    delay1s: jspb.Message.getFieldWithDefault(msg, 5, 0),
    delay2s: jspb.Message.getFieldWithDefault(msg, 6, 0),
    delay3s: jspb.Message.getFieldWithDefault(msg, 7, 0),
    detailList: jspb.Message.toObjectList(msg.getDetailList(),
    proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo.LatencyInfo;
  return proto.protocol.MetricsInfo.NetInfo.LatencyInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop99(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop95(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop75(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalcount(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay1s(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay2s(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay3s(value);
      break;
    case 8:
      var value = new proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo;
      reader.readMessage(value,proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.deserializeBinaryFromReader);
      msg.addDetail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.LatencyInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTop99();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getTop95();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTop75();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTotalcount();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getDelay1s();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getDelay2s();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getDelay3s();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getDetailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    witness: jspb.Message.getFieldWithDefault(msg, 1, ""),
    top99: jspb.Message.getFieldWithDefault(msg, 2, 0),
    top95: jspb.Message.getFieldWithDefault(msg, 3, 0),
    top75: jspb.Message.getFieldWithDefault(msg, 4, 0),
    count: jspb.Message.getFieldWithDefault(msg, 5, 0),
    delay1s: jspb.Message.getFieldWithDefault(msg, 6, 0),
    delay2s: jspb.Message.getFieldWithDefault(msg, 7, 0),
    delay3s: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo;
  return proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWitness(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop99(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop95(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTop75(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCount(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay1s(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay2s(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDelay3s(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWitness();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTop99();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTop95();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTop75();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getDelay1s();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getDelay2s();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getDelay3s();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
};


/**
 * optional string witness = 1;
 * @return {string}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getWitness = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setWitness = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 top99 = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getTop99 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setTop99 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 top95 = 3;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getTop95 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setTop95 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 top75 = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getTop75 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setTop75 = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 count = 5;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 delay1S = 6;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getDelay1s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setDelay1s = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 delay2S = 7;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getDelay2s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setDelay2s = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 delay3S = 8;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.getDelay3s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.setDelay3s = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 top99 = 1;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getTop99 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setTop99 = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 top95 = 2;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getTop95 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setTop95 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 top75 = 3;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getTop75 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setTop75 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 totalCount = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getTotalcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setTotalcount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 delay1S = 5;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getDelay1s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setDelay1s = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 delay2S = 6;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getDelay2s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setDelay2s = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 delay3S = 7;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getDelay3s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setDelay3s = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * repeated LatencyDetailInfo detail = 8;
 * @return {!Array<!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo>}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.getDetailList = function() {
  return /** @type{!Array<!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo, 8));
};


/**
 * @param {!Array<!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo>} value
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.setDetailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.addDetail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.protocol.MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MetricsInfo.NetInfo.LatencyInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.LatencyInfo.prototype.clearDetailList = function() {
  return this.setDetailList([]);
};


/**
 * optional int32 errorProtoCount = 1;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getErrorprotocount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.setErrorprotocount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional ApiInfo api = 2;
 * @return {?proto.protocol.MetricsInfo.NetInfo.ApiInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getApi = function() {
  return /** @type{?proto.protocol.MetricsInfo.NetInfo.ApiInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.NetInfo.ApiInfo, 2));
};


/**
 * @param {?proto.protocol.MetricsInfo.NetInfo.ApiInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setApi = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearApi = function() {
  return this.setApi(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasApi = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int32 connectionCount = 3;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getConnectioncount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.setConnectioncount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 validConnectionCount = 4;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getValidconnectioncount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.setValidconnectioncount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional RateInfo tcpInTraffic = 5;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getTcpintraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 5));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setTcpintraffic = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearTcpintraffic = function() {
  return this.setTcpintraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasTcpintraffic = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional RateInfo tcpOutTraffic = 6;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getTcpouttraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 6));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setTcpouttraffic = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearTcpouttraffic = function() {
  return this.setTcpouttraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasTcpouttraffic = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional int32 disconnectionCount = 7;
 * @return {number}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getDisconnectioncount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.setDisconnectioncount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * repeated DisconnectionDetailInfo disconnectionDetail = 8;
 * @return {!Array<!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo>}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getDisconnectiondetailList = function() {
  return /** @type{!Array<!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo, 8));
};


/**
 * @param {!Array<!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo>} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setDisconnectiondetailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.addDisconnectiondetail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.protocol.MetricsInfo.NetInfo.DisconnectionDetailInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearDisconnectiondetailList = function() {
  return this.setDisconnectiondetailList([]);
};


/**
 * optional RateInfo udpInTraffic = 9;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getUdpintraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 9));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setUdpintraffic = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearUdpintraffic = function() {
  return this.setUdpintraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasUdpintraffic = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional RateInfo udpOutTraffic = 10;
 * @return {?proto.protocol.MetricsInfo.RateInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getUdpouttraffic = function() {
  return /** @type{?proto.protocol.MetricsInfo.RateInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.RateInfo, 10));
};


/**
 * @param {?proto.protocol.MetricsInfo.RateInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setUdpouttraffic = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearUdpouttraffic = function() {
  return this.setUdpouttraffic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasUdpouttraffic = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional LatencyInfo latency = 11;
 * @return {?proto.protocol.MetricsInfo.NetInfo.LatencyInfo}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.getLatency = function() {
  return /** @type{?proto.protocol.MetricsInfo.NetInfo.LatencyInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.NetInfo.LatencyInfo, 11));
};


/**
 * @param {?proto.protocol.MetricsInfo.NetInfo.LatencyInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
*/
proto.protocol.MetricsInfo.NetInfo.prototype.setLatency = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo.NetInfo} returns this
 */
proto.protocol.MetricsInfo.NetInfo.prototype.clearLatency = function() {
  return this.setLatency(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.NetInfo.prototype.hasLatency = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional int64 interval = 1;
 * @return {number}
 */
proto.protocol.MetricsInfo.prototype.getInterval = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.MetricsInfo} returns this
 */
proto.protocol.MetricsInfo.prototype.setInterval = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional NodeInfo node = 2;
 * @return {?proto.protocol.MetricsInfo.NodeInfo}
 */
proto.protocol.MetricsInfo.prototype.getNode = function() {
  return /** @type{?proto.protocol.MetricsInfo.NodeInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.NodeInfo, 2));
};


/**
 * @param {?proto.protocol.MetricsInfo.NodeInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo} returns this
*/
proto.protocol.MetricsInfo.prototype.setNode = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo} returns this
 */
proto.protocol.MetricsInfo.prototype.clearNode = function() {
  return this.setNode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.prototype.hasNode = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional BlockChainInfo blockchain = 3;
 * @return {?proto.protocol.MetricsInfo.BlockChainInfo}
 */
proto.protocol.MetricsInfo.prototype.getBlockchain = function() {
  return /** @type{?proto.protocol.MetricsInfo.BlockChainInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.BlockChainInfo, 3));
};


/**
 * @param {?proto.protocol.MetricsInfo.BlockChainInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo} returns this
*/
proto.protocol.MetricsInfo.prototype.setBlockchain = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo} returns this
 */
proto.protocol.MetricsInfo.prototype.clearBlockchain = function() {
  return this.setBlockchain(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.prototype.hasBlockchain = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional NetInfo net = 4;
 * @return {?proto.protocol.MetricsInfo.NetInfo}
 */
proto.protocol.MetricsInfo.prototype.getNet = function() {
  return /** @type{?proto.protocol.MetricsInfo.NetInfo} */ (
    jspb.Message.getWrapperField(this, proto.protocol.MetricsInfo.NetInfo, 4));
};


/**
 * @param {?proto.protocol.MetricsInfo.NetInfo|undefined} value
 * @return {!proto.protocol.MetricsInfo} returns this
*/
proto.protocol.MetricsInfo.prototype.setNet = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.MetricsInfo} returns this
 */
proto.protocol.MetricsInfo.prototype.clearNet = function() {
  return this.setNet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.MetricsInfo.prototype.hasNet = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.PBFTMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.PBFTMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.PBFTMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    rawData: (f = msg.getRawData()) && proto.protocol.PBFTMessage.Raw.toObject(includeInstance, f),
    signature: msg.getSignature_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.PBFTMessage}
 */
proto.protocol.PBFTMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.PBFTMessage;
  return proto.protocol.PBFTMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.PBFTMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.PBFTMessage}
 */
proto.protocol.PBFTMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.protocol.PBFTMessage.Raw;
      reader.readMessage(value,proto.protocol.PBFTMessage.Raw.deserializeBinaryFromReader);
      msg.setRawData(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.PBFTMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.PBFTMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.PBFTMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRawData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.protocol.PBFTMessage.Raw.serializeBinaryToWriter
    );
  }
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.protocol.PBFTMessage.MsgType = {
  VIEW_CHANGE: 0,
  REQUEST: 1,
  PREPREPARE: 2,
  PREPARE: 3,
  COMMIT: 4
};

/**
 * @enum {number}
 */
proto.protocol.PBFTMessage.DataType = {
  BLOCK: 0,
  SRL: 1
};




if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.PBFTMessage.Raw.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.PBFTMessage.Raw.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.PBFTMessage.Raw} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTMessage.Raw.toObject = function(includeInstance, msg) {
  var f, obj = {
    msgType: jspb.Message.getFieldWithDefault(msg, 1, 0),
    dataType: jspb.Message.getFieldWithDefault(msg, 2, 0),
    viewN: jspb.Message.getFieldWithDefault(msg, 3, 0),
    epoch: jspb.Message.getFieldWithDefault(msg, 4, 0),
    data: msg.getData_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.PBFTMessage.Raw}
 */
proto.protocol.PBFTMessage.Raw.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.PBFTMessage.Raw;
  return proto.protocol.PBFTMessage.Raw.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.PBFTMessage.Raw} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.PBFTMessage.Raw}
 */
proto.protocol.PBFTMessage.Raw.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.protocol.PBFTMessage.MsgType} */ (reader.readEnum());
      msg.setMsgType(value);
      break;
    case 2:
      var value = /** @type {!proto.protocol.PBFTMessage.DataType} */ (reader.readEnum());
      msg.setDataType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setViewN(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEpoch(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.PBFTMessage.Raw.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.PBFTMessage.Raw.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.PBFTMessage.Raw} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTMessage.Raw.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMsgType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getDataType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getViewN();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getEpoch();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
};


/**
 * optional MsgType msg_type = 1;
 * @return {!proto.protocol.PBFTMessage.MsgType}
 */
proto.protocol.PBFTMessage.Raw.prototype.getMsgType = function() {
  return /** @type {!proto.protocol.PBFTMessage.MsgType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.protocol.PBFTMessage.MsgType} value
 * @return {!proto.protocol.PBFTMessage.Raw} returns this
 */
proto.protocol.PBFTMessage.Raw.prototype.setMsgType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional DataType data_type = 2;
 * @return {!proto.protocol.PBFTMessage.DataType}
 */
proto.protocol.PBFTMessage.Raw.prototype.getDataType = function() {
  return /** @type {!proto.protocol.PBFTMessage.DataType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.protocol.PBFTMessage.DataType} value
 * @return {!proto.protocol.PBFTMessage.Raw} returns this
 */
proto.protocol.PBFTMessage.Raw.prototype.setDataType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional int64 view_n = 3;
 * @return {number}
 */
proto.protocol.PBFTMessage.Raw.prototype.getViewN = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.PBFTMessage.Raw} returns this
 */
proto.protocol.PBFTMessage.Raw.prototype.setViewN = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 epoch = 4;
 * @return {number}
 */
proto.protocol.PBFTMessage.Raw.prototype.getEpoch = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.protocol.PBFTMessage.Raw} returns this
 */
proto.protocol.PBFTMessage.Raw.prototype.setEpoch = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bytes data = 5;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.PBFTMessage.Raw.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes data = 5;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.protocol.PBFTMessage.Raw.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.protocol.PBFTMessage.Raw.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.PBFTMessage.Raw} returns this
 */
proto.protocol.PBFTMessage.Raw.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional Raw raw_data = 1;
 * @return {?proto.protocol.PBFTMessage.Raw}
 */
proto.protocol.PBFTMessage.prototype.getRawData = function() {
  return /** @type{?proto.protocol.PBFTMessage.Raw} */ (
    jspb.Message.getWrapperField(this, proto.protocol.PBFTMessage.Raw, 1));
};


/**
 * @param {?proto.protocol.PBFTMessage.Raw|undefined} value
 * @return {!proto.protocol.PBFTMessage} returns this
*/
proto.protocol.PBFTMessage.prototype.setRawData = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.protocol.PBFTMessage} returns this
 */
proto.protocol.PBFTMessage.prototype.clearRawData = function() {
  return this.setRawData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.protocol.PBFTMessage.prototype.hasRawData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes signature = 2;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.PBFTMessage.prototype.getSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes signature = 2;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.protocol.PBFTMessage.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.protocol.PBFTMessage.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.PBFTMessage} returns this
 */
proto.protocol.PBFTMessage.prototype.setSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.PBFTCommitResult.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.PBFTCommitResult.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.PBFTCommitResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.PBFTCommitResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTCommitResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: msg.getData_asB64(),
    signatureList: msg.getSignatureList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.PBFTCommitResult}
 */
proto.protocol.PBFTCommitResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.PBFTCommitResult;
  return proto.protocol.PBFTCommitResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.PBFTCommitResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.PBFTCommitResult}
 */
proto.protocol.PBFTCommitResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addSignature(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.PBFTCommitResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.PBFTCommitResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.PBFTCommitResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.PBFTCommitResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSignatureList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes data = 1;
 * @return {!(string|Uint8Array)}
 */
proto.protocol.PBFTCommitResult.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes data = 1;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.protocol.PBFTCommitResult.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.protocol.PBFTCommitResult.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.protocol.PBFTCommitResult} returns this
 */
proto.protocol.PBFTCommitResult.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated bytes signature = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.PBFTCommitResult.prototype.getSignatureList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes signature = 2;
 * This is a type-conversion wrapper around `getSignatureList()`
 * @return {!Array<string>}
 */
proto.protocol.PBFTCommitResult.prototype.getSignatureList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getSignatureList()));
};


/**
 * repeated bytes signature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignatureList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.PBFTCommitResult.prototype.getSignatureList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getSignatureList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.PBFTCommitResult} returns this
 */
proto.protocol.PBFTCommitResult.prototype.setSignatureList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.PBFTCommitResult} returns this
 */
proto.protocol.PBFTCommitResult.prototype.addSignature = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.PBFTCommitResult} returns this
 */
proto.protocol.PBFTCommitResult.prototype.clearSignatureList = function() {
  return this.setSignatureList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.protocol.SRL.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.protocol.SRL.prototype.toObject = function(opt_includeInstance) {
  return proto.protocol.SRL.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.protocol.SRL} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.SRL.toObject = function(includeInstance, msg) {
  var f, obj = {
    sraddressList: msg.getSraddressList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.protocol.SRL}
 */
proto.protocol.SRL.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.protocol.SRL;
  return proto.protocol.SRL.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.protocol.SRL} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.protocol.SRL}
 */
proto.protocol.SRL.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addSraddress(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.protocol.SRL.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.protocol.SRL.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.protocol.SRL} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.protocol.SRL.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSraddressList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      1,
      f
    );
  }
};


/**
 * repeated bytes srAddress = 1;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.protocol.SRL.prototype.getSraddressList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * repeated bytes srAddress = 1;
 * This is a type-conversion wrapper around `getSraddressList()`
 * @return {!Array<string>}
 */
proto.protocol.SRL.prototype.getSraddressList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getSraddressList()));
};


/**
 * repeated bytes srAddress = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSraddressList()`
 * @return {!Array<!Uint8Array>}
 */
proto.protocol.SRL.prototype.getSraddressList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getSraddressList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.protocol.SRL} returns this
 */
proto.protocol.SRL.prototype.setSraddressList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.protocol.SRL} returns this
 */
proto.protocol.SRL.prototype.addSraddress = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.protocol.SRL} returns this
 */
proto.protocol.SRL.prototype.clearSraddressList = function() {
  return this.setSraddressList([]);
};


/**
 * @enum {number}
 */
proto.protocol.AccountType = {
  NORMAL: 0,
  ASSETISSUE: 1,
  CONTRACT: 2
};

/**
 * @enum {number}
 */
proto.protocol.ReasonCode = {
  REQUESTED: 0,
  BAD_PROTOCOL: 2,
  TOO_MANY_PEERS: 4,
  DUPLICATE_PEER: 5,
  INCOMPATIBLE_PROTOCOL: 6,
  RANDOM_ELIMINATION: 7,
  PEER_QUITING: 8,
  UNEXPECTED_IDENTITY: 9,
  LOCAL_IDENTITY: 10,
  PING_TIMEOUT: 11,
  USER_REASON: 16,
  RESET: 17,
  SYNC_FAIL: 18,
  FETCH_FAIL: 19,
  BAD_TX: 20,
  BAD_BLOCK: 21,
  FORKED: 22,
  UNLINKABLE: 23,
  INCOMPATIBLE_VERSION: 24,
  INCOMPATIBLE_CHAIN: 25,
  TIME_OUT: 32,
  CONNECT_FAIL: 33,
  TOO_MANY_PEERS_WITH_SAME_IP: 34,
  LIGHT_NODE_SYNC_FAIL: 35,
  UNKNOWN: 255
};

goog.object.extend(exports, proto.protocol);
