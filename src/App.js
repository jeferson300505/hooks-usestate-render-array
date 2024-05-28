import './App.css';
import { Persons } from './components/Persons';
import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    {
      id:1,
      name:"Fran",
      role:"Frontend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar5.png"
    },
    {
      id:2,
      name:"Camilo",
      role:"Diseñador",
      img:"https://bootdey.com/img/Content/avatar/avatar6.png"
    },
    {
      id:3,
      name:"Fernanda",
      role:"Frontend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar3.png"
    },
    {
      id:4,
      name:"David",
      role:"Backend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar7.png"
    },
    {
      id:5,
      name:"Teresa ",
      role:"Frontend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar8.png"
    },
  ]);

  return (
    <div className='App'>
      <div className='container'>
        <Persons persons={persons} setPersons={setPersons}/>
      </div>
    </div>
  );
}

export default App;
