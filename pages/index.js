/**
 * Created by Igor on 12/11/2018.
 */
//import axios from 'axios';
import fetch from 'isomorphic-fetch';

import Link from 'next/link';
import Layout from '../components/Layout';

import ToDoList from '../components/ToDoList';

const Index = (props) =>(
    <Layout>
        <div>
            {/*<ul>
                <li><Link href="/"><a>Home</a></Link></li>
            </ul>*/}
            <h1>To do list</h1>


            <ToDoList items={props.items}/>


        </div>
    </Layout>
);

//Index.getInitialProps = async function(){
Index.getInitialProps =  async () => {

    const res = await fetch('http://localhost:3000/api/v1/to-do-items');
            //if (res.status >= 400) {
            //    throw new Error("Bad response from server");
            //}

    const json = await res.json();


    console.log(json.toDoItems);


    return { items: json.toDoItems }
};

export default Index;