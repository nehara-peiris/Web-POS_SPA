export default class ItemModel {
    constructor(id, itemName, itemCode, quantity, price) {
        this._id = id;
        this._itemName = itemName;
        this._itemCode = itemCode;
        this._quantity = quantity;
        this._price = price;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get itemName() {
        return this._itemName;
    }
    set itemName(value) {
        this._itemName = value;
    }

    get itemCode() {
        return this._itemCode;
    }
    set itemCode(value) {
        this._itemCode = value;
    }

    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}
