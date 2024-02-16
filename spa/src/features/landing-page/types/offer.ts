type OfferItem = {
    title: string;
    subtitles?: string[];
    icon?: string;
    price: number;
    newPrice?: number | "FREE";
    highlight?: "limitedTime";
};

type OfferData = {
    items: OfferItem[];
    currencySymbol: string;
};

export default class Offer implements OfferData {
    public items;
    public currencySymbol;
    constructor(items: OfferItem[], currencySymbol: string) {
        this.items = items;
        this.currencySymbol = currencySymbol;
    }
    get total() {
        return this.items.reduce((prev, curr) => {
            if (curr.newPrice && curr.newPrice === "FREE") {
                return prev;
            } else if (curr.newPrice) {
                return prev + curr.newPrice;
            } else if (curr.price) {
                return prev + curr.price;
            } else {
                return prev;
            }
        }, 0);
    }
}
