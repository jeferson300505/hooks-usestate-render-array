import React from 'react'
import { Person } from './Person';
import { useState } from 'react';

export const Persons = ({persons, setPersons}) => {

  const [editingId, setEditingID] = useState(null)
  const [editedPerson, setEditedPerson] = useState({
    name:"",
    role:"",
    img:""
  });
  const  [isEditing, setIsEditing] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null)

  const handleChange = (e) =>{
    const {name, value}= e.target;
    setEditedPerson(prevState=>({
      ...prevState,
      [name]: value
    }))
  }
  
 
  const handleEdit = (id) => {
      // Establece el ID de la persona que queremos editar
    setEditingID(id);
    // Activamos el estado de edición 
    setIsEditing(true);
    // Buscamos la persona a editar por medio del id y la asigna a personToEdit
    const personToEdit = persons.find(person => person.id ===id);
    // Establecemos los datos de la persona a editar
    setEditedPerson({...personToEdit})
  }
  const handleSave = (e) => {
    // Actualizar el array de persons con los cambios que tenemos en el formulario
    setPersons(persons.map(person => person.id === editingId ? editedPerson : person ));
    // Resetear el ID a null, de la persona que ya se editó
    setEditingID(null);
    // Resetear los datos de la persona editada
    setEditedPerson({ name:'', role:'', img:'' });
    // Desactiva el estado de edición
    setIsEditing(false);
  }
  //Metodo para eliminar a una persona del array
  //Establece la persona a eliminar
  const handleDelete= (id)=>{
    setPersonToDelete(id)
  }
  const confirmDelete = (e) => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }
  const canceDelete = (e) => {
    setPersonToDelete(null);
  }
  const handlCreate = (e)=> {
    setPersons([...persons,{id: persons.length + 1, ...editedPerson}])
    setEditedPerson({name:'',role:'',img:''})
  }

  return (
    <div>
      <h2 className='text-show'>IT Team</h2>
      <div className='container '>
        <div className='row d-flex flex-wrap row-cols-lg-3 '>
          {persons.map((persons)=>{
            return(
              <div key={persons.id}>
                <Person
                  id={persons.id} 
                  name={persons.name}
                  role={persons.role}
                  img={persons.img}
                  handleEdit={()=> handleEdit(persons.id)}
                  handleDelete={handleDelete}
                />
              </div>
            )
          })}
        </div>

      </div>
      <div className='mt-4 row'>
        <h2 className='text-show'>{isEditing ? 'Modificar Datos' : 'Datos de la nueva persona'}</h2>
        <div>
          <input type="text" name="name" value={editedPerson.name} onChange={handleChange} placeholder='Nombre' className='form-control mb-2' />
          <input type="text" name="role" value={editedPerson.role} onChange={handleChange} placeholder='Rol' className='form-control mb-2' />
          <input type="text" name="img" value={editedPerson.img} onChange={handleChange} placeholder='image' className='form-control mb-2' />
        </div>
        <div className='mt-4'>
          <button className='btn btn-primary' onClick={isEditing ? handleSave : handlCreate}>{isEditing ? 'Guardar' : 'Crear'}</button>
        </div>
      </div>
      {/* Modal de confirmacion */}
      <div id='deleteModal' className='modal fade' tabIndex={"-1"}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar eliminacion</h4>
              <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close' onClick={canceDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estas seguro que quieres eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss="modal" onClick={canceDelete} >Cancelar</button>
              <button type='button' className='btn btn-danger' data-bs-dismiss="modal"  onClick={confirmDelete} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
