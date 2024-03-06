import type { DeepPartial } from "@/_shared_/types/deep-partial";

type PriceProperty = DeepPartial<{
    oneTime: number,
    recurring: {
        daily: number,
        weekly: number,
        monthly: number,
        yearly: number
    }
}>;

const emptyPrice : PriceProperty = {
    oneTime: undefined,
    recurring: {
        daily: undefined,
        weekly: undefined,
        monthly: undefined,
        yearly: undefined,
    }
}

type OfferItem = {
    title: string;
    features?: string[];
    icon?: string;
    price?: PriceProperty;
    overridePrice?: PriceProperty;
    alert?: string
};

type OfferData = {
    descriptionParagraphs?: string[],
    items: OfferItem[];
    overridePrice?: PriceProperty, 
    currencySymbol: string;
};

export default class Offer implements OfferData {
    public readonly items;
    public readonly currencySymbol;
    public readonly overridePrice;
    public readonly descriptionParagraphs;
    constructor(offer: Readonly<OfferData>) {
        this.items = offer.items;
        this.currencySymbol = offer.currencySymbol;
        this.overridePrice = offer.overridePrice;
        this.descriptionParagraphs = offer.descriptionParagraphs;
    }
    get prices() {
        let itemsOriginalTotal = emptyPrice;
        let itemsOverrideTotal = emptyPrice;
        this.items.forEach((i) => {
            // item non-zero original price
            itemsOriginalTotal = Offer.addPrice(itemsOriginalTotal, i.price);
            // item non-zero override price
            itemsOverrideTotal = Offer.addPrice(itemsOverrideTotal, i.overridePrice ?? i.price);
        });
        return {
            itemsOriginalTotal,
            itemsOverrideTotal,
            final : (this.overridePrice && !Offer.priceIsZero(this.overridePrice)) ? this.overridePrice : 
                    (itemsOverrideTotal && !Offer.priceIsZero(itemsOverrideTotal)) ? itemsOverrideTotal :
                    itemsOriginalTotal,
            // finalPriceType: (this.overridePrice && !Offer.priceIsZero(this.overridePrice)) ? "overall offer override price" : 
            //                 (itemsOverrideTotal && !Offer.priceIsZero(itemsOverrideTotal)) && (!Offer.priceIsEqual(itemsOriginalTotal, itemsOverrideTotal)) ? "items total with overrides applied" :
            //                 "items total without any overrides applied"
        };
    }
    priceToStrings(price?: Readonly<PriceProperty>) {
        const toString = (n?: number) => n ? this.currencySymbol + n.toFixed(2) : undefined;
        return {
            oneTime: toString(price?.oneTime),
            recurring: {
                daily: toString(price?.recurring?.daily),
                weekly: toString(price?.recurring?.weekly),
                monthly: toString(price?.recurring?.monthly),
                yearly: toString(price?.recurring?.yearly),
            }
        }
    }
    priceToString(price: Readonly<PriceProperty>) {
        const prices = this.priceToStrings(price);
        let string = "";
        if (prices.oneTime) {
            string += prices.oneTime;
        }
        if (prices.oneTime && prices.recurring && (prices.recurring.daily || prices.recurring.weekly || prices.recurring.monthly || prices.recurring.yearly)) {
            string += ", then "
        }
        if (prices.recurring.daily) {
            string += `${prices.recurring.daily}/day`
        }
        if (prices.recurring.weekly) {
            if (prices.recurring.daily) {
                string += ", ";
            }
            string += `${prices.recurring.weekly}/week`
        }
        if (prices.recurring.monthly) {
            if (prices.recurring.daily || prices.recurring.weekly) {
                string += ", ";
            }
            string += `${prices.recurring.monthly}/month`
        }
        if (prices.recurring.yearly) {
            if (prices.recurring.daily || prices.recurring.weekly || prices.recurring.monthly) {
                string += ", ";
            }
            string += `${prices.recurring.yearly}/year`
        }
        const result = string.length > 1 ? string : "FREE";
        return result;
    }
    get pricesAsStrings() {
        const price = this.prices;
        return {
            itemsOriginalTotal: this.priceToStrings(price.itemsOriginalTotal),
            itemsOverrideTotal: this.priceToStrings(price.itemsOverrideTotal),
            final: this.priceToStrings(price.final),
        }
    }
    get priceStrings() {
        const price = this.prices;
        return {
            itemsOriginalTotal: this.priceToString(price.itemsOriginalTotal),
            itemsOverrideTotal: this.priceToString(price.itemsOverrideTotal),
            final: this.priceToString(price.final),
        }
    }
    static priceIsZero(price?: Readonly<PriceProperty>) {
        const flatSum = (price?.oneTime ?? 0) + (price?.recurring?.daily ?? 0) + (price?.recurring?.weekly ?? 0) + (price?.recurring?.monthly ?? 0) + (price?.recurring?.yearly ?? 0);
        return flatSum === 0;
    }
    static priceIsEqual(a: Readonly<PriceProperty>, b: Readonly<PriceProperty>) {
        return (
            a.oneTime === b.oneTime &&
            a.recurring?.daily === b.recurring?.daily &&
            a.recurring?.weekly === b.recurring?.weekly &&
            a.recurring?.monthly === b.recurring?.monthly &&
            a.recurring?.yearly === b.recurring?.yearly
        )
    }
    private static addPrice(a: Readonly<PriceProperty>, b?: Readonly<PriceProperty>) {
        const _a = JSON.parse(JSON.stringify(a));
        if (b && !Offer.priceIsZero(b)) {
            if (b.oneTime) {
                _a.oneTime = (_a.oneTime ?? 0) + b.oneTime;
            }
            if (b.recurring && b.recurring.daily) {
                if (!_a.recurring) {
                    _a.recurring = {};
                }
                _a.recurring.daily = (_a.recurring.daily ?? 0) + b.recurring.daily;
            }
            if (b.recurring && b.recurring.weekly) {
                if (!_a.recurring) {
                    _a.recurring = {};
                }
                _a.recurring.weekly = (_a.recurring.weekly ?? 0) + b.recurring.weekly;
            }
            if (b.recurring && b.recurring.monthly) {
                if (!_a.recurring) {
                    _a.recurring = {};
                }
                _a.recurring.monthly = (_a.recurring.monthly ?? 0) + b.recurring.monthly;
            }
            if (b.recurring && b.recurring.yearly) {
                if (!_a.recurring) {
                    _a.recurring = {};
                }
                _a.recurring.yearly = (_a.recurring.yearly ?? 0) + b.recurring.yearly;
            }
        }
        return _a;
    }
}
