import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class AlgoTsPlay extends Contract {
  itxnSendAssetCreation(): Asset {
    return sendAssetCreation({
      configAssetTotal: 1_000_000_000_000,
      configAssetDecimals: 9,
      configAssetName: 'AlgoTsPlay',
      configAssetUnitName: 'ATP',
      configAssetManager: this.app.address,
    });
  }

  itxnSendAssetTransfer(asset: Asset, receiver: Address): void {
    sendAssetTransfer({
      assetReceiver: this.txn.sender,
      assetAmount: 1_000_000,
      xferAsset: asset,
      assetSender: this.app.address,
    });
  }
}
