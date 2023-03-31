import OfficerItem from './OfficerItem';

const OfficersList = ({ officersList }) => {

    return (
        <div>
            {
                officersList.length > 0 && officersList.map((item, i) => {
                    return (
                        <OfficerItem key={i} item={item} />
                    )
                })
            }
        </div>
    )
}

export default OfficersList;