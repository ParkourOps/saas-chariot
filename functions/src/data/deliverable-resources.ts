type DeliverableResourceDirectory = {
    [key: string]: {
        path: string, // the path relative to 'deliverable-resources' folder in the default storage bucket.
        title?: string,
        description?: string,
    }
}

const declareDeliverableResources = <T extends DeliverableResourceDirectory>(arg: T) => arg;

export default declareDeliverableResources({
    "xrbmvnmbqagf": {
        path: "waiting-list-lead-magnet.pdf",
    },
});
