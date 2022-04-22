import React, {useState, useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import FormularioTareas from './components/FormularioTareas'
import ListaTareas from './components/ListaTareas'

const App = () => {

  /*Obtenemos las tareas guardadas de local storage*/
  const tareasGuardadas = 
    localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : []

  /*Establecemos el estado de las tareas*/
    const [tareas,setTareas] = useState(tareasGuardadas);

  /*Guardando el estado dentro de local storage */
    useEffect(()=>{
    localStorage.setItem('tareas', JSON.stringify(tareas))
  },[tareas])

  
  /*Accedemos a localStorage y comprobamos si mostrarcompletadas es null*/

  let configMostrarCompletadas = '';
  if (localStorage.getItem('mostrarCompletadas') === null){
    configMostrarCompletadas= true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true'
  }
  
  /*El estado de mostrar completadas*/
  const [mostrarCompletadas, setMostrarCompletadas] = useState(configMostrarCompletadas)

  useEffect(()=>{
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString())
  },[mostrarCompletadas])

  return (
    <div className="contenedor">
      <Header 
      mostrarCompletadas={mostrarCompletadas} 
      setMostrarCompletadas={setMostrarCompletadas}/>
      <FormularioTareas tareas={tareas} setTareas={setTareas}/>
      <ListaTareas 
        tareas={tareas} 
        setTareas={setTareas}
        mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default App;
