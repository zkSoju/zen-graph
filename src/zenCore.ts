import { BigInt, ipfs, json, log } from "@graphprotocol/graph-ts";
import {
  ApprovalForAll as ApproveEvent,
  Transfer as TransferEvent,
} from "../generated/EIP721/EIP721";
import { EIP721 as EIP721Contract } from "../generated/EIP721/EIP721";

import { Approval } from "../generated/schema";

export function handleApproveAll(event: ApproveEvent): void {
  let approval = Approval.load(event.params.owner + "approved" + event.address);

  if (
    event.params.operator.toHexString() ===
    "0x3374ff4a09b84df7212c18483dbd1f519e68cdff"
  ) {
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
