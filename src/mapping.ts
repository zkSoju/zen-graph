import { BigInt } from "@graphprotocol/graph-ts";
import {
  Zen as ZenContract,
  SwapAccepted as AcceptEvent,
  SwapCancelled as CancelEvent,
  SwapCreated as CreateEvent,
} from "../generated/Zen/Zen";

import { Swap, User, OfferToken, RequestToken } from "../generated/schema";

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
    swap.status = "ACTIVE";

    let zenContract = ZenContract.bind(event.address);

    let offerTokens = zenContract.getSwapOffer(event.params.swapId);
    let requestTokens = zenContract.getSwapRequest(event.params.swapId);

    for (let i = 0; i < offerTokens.length; i++) {
      let token = offerTokens[i];
      let offerToken = new OfferToken(
        event.params.swapId.toString() + i.toString()
      );

      offerToken.associatedSwap = event.params.swapId.toString();
      offerToken.contractAddress = token.contractAddress;
      offerToken.tokenIds = token.tokenIds;
      offerToken.quantities = token.tokenQuantities;
      offerToken.save();
    }

    for (let i = 0; i < requestTokens.length; i++) {
      let token = requestTokens[i];
      let requestToken = new RequestToken(
        event.params.swapId.toString() + i.toString()
      );

      requestToken.associatedSwap = event.params.swapId.toString();
      requestToken.contractAddress = token.contractAddress;
      requestToken.tokenIds = token.tokenIds;
      requestToken.quantities = token.tokenQuantities;
      requestToken.save();
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
