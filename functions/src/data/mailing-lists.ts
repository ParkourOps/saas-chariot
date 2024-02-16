type MailingListDirectory = {
    [key: string]: {
        title: string,
        description?: string,
    } | undefined
}

const declareMailingLists = (arg: MailingListDirectory) => arg;

export default declareMailingLists({
    "kbozgt": {
        title: "Waiting List",
    },
});
