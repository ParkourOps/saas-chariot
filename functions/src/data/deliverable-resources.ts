type DeliverableResourceDirectory = {
    [key: string]: {
        path: string, // the path relative to 'deliverable-resources' folder in the default storage bucket.
        title?: string,
        description?: string,
    } | undefined
}

const declareDeliverableResources = (arg: DeliverableResourceDirectory) => arg;

export default declareDeliverableResources({
    "xrbmvnmbqagf": {
        path: "waiting-list-lead-magnet.pdf",
    },
});
