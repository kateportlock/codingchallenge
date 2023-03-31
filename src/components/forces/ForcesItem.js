import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';

const ForcesItem = ({ item }) => {

    const navigate = useNavigate();

    return (
        <ListItem key={item._id}>
            <p className="is-clickable" onClick={() => navigate(`/forces/${item.id}`)}>{item.name}</p>
        </ListItem>
    )
}

export default ForcesItem;