import NeighbourhoodItem from './NeighbourhoodItem';
import styles from "../../styles/modules/Neighbourhoods.module.scss";

const NeighbourhoodList = ({ currentNeighbourhoods }) => {

    return (
        <div className={styles.container}>
            {
                currentNeighbourhoods.length > 0 && currentNeighbourhoods.map((item) => {
                    return (
                        <NeighbourhoodItem key={item.id} item={item} />
                    )
                })
            }
        </div>
    )
}

export default NeighbourhoodList;