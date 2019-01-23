const fakeData = [
    {
        id: '2nu0d21cibmfkq05agsfc71mpd',
        itemTitle: 'Send email to HR',
        itemDate: '2018-11-15T15:30:00+08:00',
        itemDetails: {}
    },
    {
        id: '2nu0d21cibmfkq05agsfc71mpd2',
        itemTitle: 'Send email to HR2',
        itemDate: '2018-11-15T16:30:00+08:00',
        itemDetails: {}
    }
];

export default async () => {
    return await new Promise((resolve) => {
        resolve(fakeData)
    });
}
