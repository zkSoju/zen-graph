import { BigInt } from "@graphprotocol/graph-ts";
import {
  Zen as ZenContract,
  SwapAccepted as AcceptEvent,
  SwapCancelled as CancelEvent,
  SwapCreated as CreateEvent,
} from "../generated/Zen/Zen";

import { Swap, User, SwapComponent, Token } from "../generated/schema";

export function handleAccept(event: AcceptEvent): void {
  let swap = Swap.load(event.params.swapId.toString());

  if (!swap) {
  } else {
    swap.status = "COMPLETE";
    swap.save();
  }

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getOfferTokens(...)
  // - contract.getRequestTokens(...)
  // - contract.getSwapIndex(...)
  // - contract.getSwapSingle(...)
  // - contract.getSwaps(...)
  // - contract.getSwapsOutgoing(...)
}

export function handleCancel(event: CancelEvent): void {
  let swap = Swap.load(event.params.swapId.toString());

  if (!swap) {
  } else {
    swap.status = "INACTIVE";
    swap.save();
  }
}

export function handleCreate(event: CreateEvent): void {
  let swap = Swap.load(event.params.swapId.toString());
  if (!swap) {
    swap = new Swap(event.params.swapId.toString());
    swap.sender = event.params.sender.toHexString();
    swap.recipient = event.params.recipient.toHexString();
    swap.createdAt = event.block.timestamp;
    swap.allotedTime = event.params.allotedTime;
    swap.status = "ACTIVE";

    let zenContract = ZenContract.bind(event.address);

    let offerComponent = zenContract.getSwapOffer(event.params.swapId);

    // offerComponent => token[] => token(contract, ids[], quantities[]) + type

    let swapComponent = new SwapComponent(
      event.params.swapId.toString() + "offer"
    );

    swapComponent.type = "Offer";
    swapComponent.offerSwap = event.params.swapId.toString();

    swapComponent.save();

    for (let i = 0; i < offerComponent.length; i++) {
      let tokenBatch = offerComponent[i];

      if (tokenBatch.tokenQuantities.length === 0) {
        // erc721
        for (let j = 0; j < tokenBatch.tokenIds.length; j++) {
          let token = new Token(
            event.params.swapId.toString() +
              "offer" +
              tokenBatch.contractAddress.toHexString() +
              "-" +
              tokenBatch.tokenIds[j].toString()
          );
          token.type = "ERC721";
          token.parentComponent = event.params.swapId.toString() + "offer";
          token.contractAddress = tokenBatch.contractAddress;
          token.tokenId = tokenBatch.tokenIds[j];
          token.quantity = BigInt.fromI32(0);
          token.save();
        }
      } else if (tokenBatch.tokenIds.length === 0) {
        // erc20
      } else {
        // erc721
        for (let j = 0; j < tokenBatch.tokenIds.length; j++) {
          let token = new Token(
            event.params.swapId.toString() +
              "offer" +
              tokenBatch.contractAddress.toHexString() +
              "-" +
              tokenBatch.tokenIds[j].toString()
          );
          token.type = "ERC1155";
          token.parentComponent = event.params.swapId.toString() + "offer";
          token.contractAddress = tokenBatch.contractAddress;
          token.tokenId = tokenBatch.tokenIds[j];
          token.quantity = tokenBatch.tokenQuantities[j];
          token.save();
        }
      }

      let requestComponent = zenContract.getSwapRequest(event.params.swapId);

      // offerComponent => token[] => token(contract, ids[], quantities[]) + type

      let swapComponent = new SwapComponent(
        event.params.swapId.toString() + "request"
      );

      swapComponent.type = "Request";
      swapComponent.requestSwap = event.params.swapId.toString();

      swapComponent.save();

      for (let i = 0; i < requestComponent.length; i++) {
        let tokenBatch = requestComponent[i];

        if (tokenBatch.tokenQuantities.length === 0) {
          // erc721
          for (let j = 0; j < tokenBatch.tokenIds.length; j++) {
            let token = new Token(
              event.params.swapId.toString() +
                "request" +
                tokenBatch.contractAddress.toHexString() +
                "-" +
                tokenBatch.tokenIds[j].toString()
            );
            token.type = "ERC721";
            token.parentComponent = event.params.swapId.toString() + "request";
            token.contractAddress = tokenBatch.contractAddress;
            token.tokenId = tokenBatch.tokenIds[j];
            token.quantity = BigInt.fromI32(0);
            token.save();
          }
        } else if (tokenBatch.tokenIds.length === 0) {
          // erc20
        } else {
          // erc721
          for (let j = 0; j < tokenBatch.tokenIds.length; j++) {
            let token = new Token(
              event.params.swapId.toString() +
                "request" +
                tokenBatch.contractAddress.toHexString() +
                "-" +
                tokenBatch.tokenIds[j].toString()
            );
            token.type = "ERC1155";
            token.parentComponent = event.params.swapId.toString() + "request";
            token.contractAddress = tokenBatch.contractAddress;
            token.tokenId = tokenBatch.tokenIds[j];
            token.quantity = tokenBatch.tokenQuantities[j];
            token.save();
          }
        }
      }
    }
    swap.save();

    // register sender if non-existent
    let sender = User.load(event.params.sender.toHexString());
    if (!sender) {
      sender = new User(event.params.sender.toHexString());
      sender.save();
    }

    // register recipient if non-existent
    let recipient = User.load(event.params.recipient.toHexString());
    if (!recipient) {
      recipient = new User(event.params.recipient.toHexString());
      recipient.save();
    }
  }
}
