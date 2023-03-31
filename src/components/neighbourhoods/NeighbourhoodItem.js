import ListItem from '@mui/material/ListItem';

const NeighbourhoodItem = ({ item }) => {

    return (
        <ListItem key={item._id}>
            <p>{item.name}</p>
        </ListItem>
    )
}

export default NeighbourhoodItem;