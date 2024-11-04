import React, { useState, useEffect } from 'react';
import Plato from '../../components/Plato';

const Home = () => {
    const [promedioHealth, setPromedioHealth] = useState(0);
    const [precioTotalMenu, setPrecioTotalMenu] = useState(0);
    const [menu, setMenu] = useState([]);

    const agregarAlMenu = (plato) => {
        let vegano = 0;
        let noVegano = 0;
        if(menu.length == 4){
            return "El menu esta al maximo de platos(4)";
        }else{
            for(let i = 0; i < menu.length; i++){
                menu[i].vegan ? vegano++ : noVegano++;
            }

            if(plato.vegan && vegano >= 2 || !plato.vegan && noVegano >= 2){
                return "El menu puede tener como maximo dos veganos y como maximo dos no veganos";
            }
            else{
                setMenu(...prev, plato);
            }
        }
    }

    useEffect(() => {
        menu ? setPromedioHealth(calcularPromedio(menu)) : setPromedioHealth(0);
        menu ? setPrecioTotalMenu(sumarElementos(menu)) : setPrecioTotalMenu(0);
      }, []);

      
      return (
        <View style={styles.container}>
          <FlatList
            data={menu}
            renderItem={({ item }) => (
                <Plato nombre={item.title} imagen={item.image} />
              )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
    },
  });

export default Home;