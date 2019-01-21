import fetch from 'isomorphic-fetch';

export default async () => {
    const res = await fetch('http://localhost:3000/api/v1/to-do-items');
    const json = await res.json();

    const data = {items: json.toDoItems, requestStatus: "done"};

    return data;
};