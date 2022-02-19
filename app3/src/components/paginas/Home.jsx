import React, {useEffect, useState} from 'react';
import Card from '../elementos/Card'

const Home = () => {

    const ini = 1

    const [flag, setFalg] = useState(ini)

    const load = () => {
        console.log('era para renderizar')
        return ( 
        <>
            <Card flag={flag} muda={setFalg}/>
        </>
     );
    }


    useEffect(() =>{
        load()
        console.log('Pai de todos')
        console.log(flag)
    }, [flag])

    return(
        <div>
            {load()}
        </div>
    )
    
}
 
export default Home;