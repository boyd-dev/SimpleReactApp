import React from 'react';
import Loader from 'react-loader-spinner';
import { Center } from "../layouts/Modal";


const Spinning = (props) => (
    <Center>
        <Loader type={props.type} color="#CE62D4" height={100} width={100} />
    </Center>
);

export default Spinning;
