// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("sender", Value.fromString(""));
    this.set("recipient", Value.fromString(""));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("allotedTime", Value.fromBigInt(BigInt.zero()));
    this.set("status", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Swap must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get recipient(): string {
    let value = this.get("recipient");
    return value!.toString();
  }

  set recipient(value: string) {
    this.set("recipient", Value.fromString(value));
  }

  get offerComponent(): string {
    let value = this.get("offerComponent");
    return value!.toString();
  }

  set offerComponent(value: string) {
    this.set("offerComponent", Value.fromString(value));
  }

  get requestComponent(): string {
    let value = this.get("requestComponent");
    return value!.toString();
  }

  set requestComponent(value: string) {
    this.set("requestComponent", Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get allotedTime(): BigInt {
    let value = this.get("allotedTime");
    return value!.toBigInt();
  }

  set allotedTime(value: BigInt) {
    this.set("allotedTime", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }
}

export class SwapComponent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("type", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SwapComponent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SwapComponent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SwapComponent", id.toString(), this);
    }
  }

  static load(id: string): SwapComponent | null {
    return changetype<SwapComponent | null>(store.get("SwapComponent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get offerSwap(): string | null {
    let value = this.get("offerSwap");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set offerSwap(value: string | null) {
    if (!value) {
      this.unset("offerSwap");
    } else {
      this.set("offerSwap", Value.fromString(<string>value));
    }
  }

  get requestSwap(): string | null {
    let value = this.get("requestSwap");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set requestSwap(value: string | null) {
    if (!value) {
      this.unset("requestSwap");
    } else {
      this.set("requestSwap", Value.fromString(<string>value));
    }
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("type", Value.fromString(""));
    this.set("image", Value.fromString(""));
    this.set("parentComponent", Value.fromString(""));
    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("quantity", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get image(): string {
    let value = this.get("image");
    return value!.toString();
  }

  set image(value: string) {
    this.set("image", Value.fromString(value));
  }

  get parentComponent(): string {
    let value = this.get("parentComponent");
    return value!.toString();
  }

  set parentComponent(value: string) {
    this.set("parentComponent", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value!.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get quantity(): BigInt {
    let value = this.get("quantity");
    return value!.toBigInt();
  }

  set quantity(value: BigInt) {
    this.set("quantity", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get outgoingSwaps(): Array<string> {
    let value = this.get("outgoingSwaps");
    return value!.toStringArray();
  }

  set outgoingSwaps(value: Array<string>) {
    this.set("outgoingSwaps", Value.fromStringArray(value));
  }

  get incomingSwaps(): Array<string> {
    let value = this.get("incomingSwaps");
    return value!.toStringArray();
  }

  set incomingSwaps(value: Array<string>) {
    this.set("incomingSwaps", Value.fromStringArray(value));
  }

  get zenOperatorApprovals(): Array<string> {
    let value = this.get("zenOperatorApprovals");
    return value!.toStringArray();
  }

  set zenOperatorApprovals(value: Array<string>) {
    this.set("zenOperatorApprovals", Value.fromStringArray(value));
  }
}

export class Approval extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("user", Value.fromString(""));
    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("isApproved", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Approval entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Approval must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Approval", id.toString(), this);
    }
  }

  static load(id: string): Approval | null {
    return changetype<Approval | null>(store.get("Approval", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value!.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get isApproved(): boolean {
    let value = this.get("isApproved");
    return value!.toBoolean();
  }

  set isApproved(value: boolean) {
    this.set("isApproved", Value.fromBoolean(value));
  }
}
