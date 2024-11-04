import React, { useState, useEffect } from 'react';

const Home = () => {
    const [promedioHealth, setPromedioHealth] = useState(0);
    const [precioTotalMenu, setPrecioTotalMenu] = useState(0);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        menu ? setPromedioHealth(calcularPromedio(menu)) : setPromedioHealth(0);
        menu ? setPrecioTotalMenu(sumarElementos(menu)) : setPrecioTotalMenu(0);
      }, []);

      return(
        <>
        </>
      );
}

export default Home;