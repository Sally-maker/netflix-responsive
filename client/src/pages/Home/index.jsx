/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Featured from "../../components/Featured"
import List from "../../components/List"
import NavBar from "../../components/NavBar"
import axios from 'axios'
import "./styles.scss"

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
  
    useEffect(() => {
      const getRandomLists = async () => {
        try {
          const res = await axios.get(
            `lists${type ? "?type=" + type : ""}${
              genre ? "&genre=" + genre : ""
            }`,
            {
              headers: {
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMxODhjZjNiYmQwMGNmMGJhM2NiYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTc5MjIyNywiZXhwIjoxNjQ2NjU2MjI3fQ.rOUfN7FIQP1qqNdA9TrlmgwnNCvySPpH-3e-kqubxxA"
              },
            }
          );
          setLists(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getRandomLists();
    }, [type, genre]);
  
    return (
      <div className="home">
        <NavBar />
        <Featured type={type} setGenre={setGenre}/>
        {lists.map((list) => (
          <List list={list} />
        ))}
      </div>
    );
  };

export default Home
