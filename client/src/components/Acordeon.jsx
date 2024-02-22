export default function AccordionExpandDefault({ modules, lecciones, course, handleLeccion }) {

  const leccionChange = (indexModule, indexLeccion) => {
    let leccionNumber = 0;

    for(let i = 0; i < modules.length ; i++){
      if(i === indexModule){
        
        const leccionesDelModulo = lecciones.filter(leccion => leccion.id_module === modules[i].id);
        
        const leccionSeleccionada = leccionesDelModulo[indexLeccion];

        console.log(leccionSeleccionada)
        
        handleLeccion(leccionSeleccionada, indexLeccion); 
        break; 
      }
    }
  }

  console.log(lecciones)
  
  return (
    <div className="border-end">
      <div className="accordion" id="accordionExample">
        
        { modules && modules.map((modulo, indexModule) => (
          <div className="accordion-item" key={indexModule}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${indexModule}`}
                aria-expanded="true"
                aria-controls={`collapse-${indexModule}`}
              >
                Modulo {indexModule + 1}
              </button>
            </h2>
            <div
              id={`collapse-${indexModule}`}
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body d-flex flex-column">
                {lecciones &&
                  lecciones
                    .filter((leccion) => leccion.id_module === modulo.id)
                    .map((leccion, index) => (
                      <button onClick={()=>{leccionChange(indexModule, index)}} type="button" className="btn" key={index}>
                        {`Lección ${index + 1}`}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}