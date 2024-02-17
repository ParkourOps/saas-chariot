import subscribeToCollection from "./subscribe-to-collection";
import subscribeToDoc from "./subscribe-to-doc";

export function useDb() {
    return {
        subscribeToCollection,
        subscribeToDoc,
    }
};
