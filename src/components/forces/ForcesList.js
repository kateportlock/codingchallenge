import ForcesItem from './ForcesItem';
import Container from '@mui/material/Container';

const ForcesList = ({ forcesList }) => {

    return (
        <Container maxWidth="md">
            {
                forcesList.length > 0 && forcesList.map((item) => {
                    return (
                        <ForcesItem key={item.id} item={item} />
                    )
                })
            }
        </Container>
    )
}

export default ForcesList;