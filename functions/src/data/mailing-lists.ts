type MailingListDirectory = {
    [key: string]: {
        title: string,
        description?: string,
    }
}

const declareMailingLists = <T extends MailingListDirectory>(arg: T) => arg;

export default declareMailingLists({
    "kbozgt": {
        title: "Waiting List",
    },
});
