import fetch from 'isomorphic-fetch';
import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';

const Index = (props) =>(
    <Layout>
        <div>
            <h1>To do list</h1>
            <ToDoList items={props.items}/>
        </div>
    </Layout>
);

Index.getInitialProps =  async () => {

    const res = await fetch('http://localhost:3000/api/v1/to-do-items');
            //if (res.status >= 400) {
            //    throw new Error("Bad response from server");
            //}

    const json = await res.json();

    return { items: json.toDoItems }
};

export default Index;