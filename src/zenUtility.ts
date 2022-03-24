import {
  BigInt,
  Address,
  Bytes,
  ipfs,
  json,
  log,
} from "@graphprotocol/graph-ts";
import {
  ApprovalForAll as ApproveEvent,
  Transfer as TransferEvent,
} from "../generated/EIP721/EIP721";
import { EIP721 as EIP721Contract } from "../generated/EIP721/EIP721";

import {
  Approval,
  Token,
  User,
  Swap,
  SwapComponent,
} from "../generated/schema";

function supportsInterface(
  contract: EIP721Contract,
  interfaceId: string,
  expected: boolean = true
): boolean {
  let supports = contract.try_supportsInterface(
    Bytes.fromHexString(interfaceId)
  );
  return !supports.reverted && supports.value == true;
}

let zenContract = "0x3374ff4a09b84df7212c18483dbd1f519e68cdff";

// export function handleTransfer(event: TransferEvent): void {
//   // find swap of owner and invalidate if transfer out and check valid if in
//   let sender = User.load(event.params.from.toHexString());
//   if (!sender) {
//   } else {
//     let outgoingSwaps = sender.outgoingSwaps;
//     let incomingSwaps = sender.incomingSwaps;

//     for (let i = 0; i < outgoingSwaps.length; i++) {
//       let swap = Swap.load(outgoingSwaps[i]);
//       if (swap) {
//         let offerComponent = SwapComponent.load(swap.offerComponent);
//         if (offerComponent) {
//           for (let j = 0; j < offerComponent.tokens.length; j++) {
//             let token = Token.load(offerComponent.tokens[i]);

//             if (token) {
//               if (
//                 BigInt.compare(token.tokenId, event.params.tokenId) == 0 &&
//                 Address.fromBytes(token.contractAddress) == event.address
//               ) {
//                 if (swap.status == "ACTIVE") {
//                   swap.status = "UNAUTHORIZED";
//                   swap.save();
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     for (let i = 0; i < incomingSwaps.length; i++) {
//       let swap = Swap.load(incomingSwaps[i]);
//       if (swap) {
//         let requestComponent = SwapComponent.load(swap.offerComponent);
//         if (requestComponent) {
//           for (let j = 0; j < requestComponent.tokens.length; j++) {
//             let token = Token.load(requestComponent.tokens[i]);

//             if (token) {
//               if (
//                 BigInt.compare(token.tokenId, event.params.tokenId) == 0 &&
//                 Address.fromBytes(token.contractAddress) == event.address
//               ) {
//                 if (swap.status == "ACTIVE") {
//                   swap.status = "UNAUTHORIZED";
//                   swap.save();
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   let receiver = User.load(event.params.from.toHexString());
//   if (!receiver) {
//   } else {
//     let outgoingSwaps = receiver.outgoingSwaps;
//     let incomingSwaps = receiver.incomingSwaps;

//     for (let i = 0; i < outgoingSwaps.length; i++) {
//       let swap = Swap.load(outgoingSwaps[i]);
//       if (swap) {
//         let offerComponent = SwapComponent.load(swap.offerComponent);
//         if (offerComponent) {
//           for (let j = 0; j < offerComponent.tokens.length; j++) {
//             let token = Token.load(offerComponent.tokens[i]);

//             if (token) {
//               if (
//                 BigInt.compare(token.tokenId, event.params.tokenId) == 0 &&
//                 Address.fromBytes(token.contractAddress) == event.address
//               ) {
//                 if (swap.status == "UNAUTHORIZED") {
//                   swap.status = "ACTIVE";
//                   swap.save();
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     for (let i = 0; i < incomingSwaps.length; i++) {
//       let swap = Swap.load(incomingSwaps[i]);
//       if (swap) {
//         let requestComponent = SwapComponent.load(swap.offerComponent);
//         if (requestComponent) {
//           for (let j = 0; j < requestComponent.tokens.length; j++) {
//             let token = Token.load(requestComponent.tokens[i]);

//             if (token) {
//               if (
//                 BigInt.compare(token.tokenId, event.params.tokenId) == 0 &&
//                 Address.fromBytes(token.contractAddress) == event.address
//               ) {
//                 if (swap.status == "UNAUTHORIZED") {
//                   swap.status = "ACTIVE";
//                   swap.save();
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

export function handleApproveAll(event: ApproveEvent): void {
  let approval = Approval.load(
    event.params.owner.toHexString() + "approved" + event.address.toHexString()
  );
  log.info("approval {}", [event.params.operator.toHexString()]);
  if (event.params.operator.toHexString() == zenContract) {
    log.info("approval of {}", [event.params.operator.toHexString()]);

    if (!approval) {
      approval = new Approval(
        event.params.owner.toHexString() +
          "approve" +
          event.address.toHexString()
      );
      approval.contractAddress = event.address;
      approval.user = event.params.owner.toHexString();
      approval.isApproved = event.params.approved;
      approval.save();
    } else {
      approval.isApproved = event.params.approved;
      approval.save();
    }
  }
}
