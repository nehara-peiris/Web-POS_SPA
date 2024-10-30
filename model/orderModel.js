export default class OrderModel {
    constructor(orderId, customerId, orderDetails) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._orderDetails = orderDetails; // Array of items in the order
    }

    get orderId() {
        return this._orderId;
    }
    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }
    set customerId(value) {
        this._customerId = value;
    }

    get orderDetails() {
        return this._orderDetails;
    }
    set orderDetails(value) {
        this._orderDetails = value;
    }
}
