import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                width: '50px',
                height: '50px',
                margin: '13rem auto',
                display: 'block',
            }}
        ></Spinner>
    );
};

export default Loader;