import Layout from '../components/Layout';
import ToDoList from '../components/ToDoList';

import requestInitialProps from "../services/requestInitialProps";

const Index = (props) =>(
    <Layout>
        <div>
            <h1>To do list</h1>
            <ToDoList items={props.items}/>
        </div>
    </Layout>
);

Index.getInitialProps =  async () => {

    let data = {};
    try {
        data = await requestInitialProps();
    } catch (error){
        data = {items: [{}], requestStatus: "error"}
    }

    return data;
};

export default Index;