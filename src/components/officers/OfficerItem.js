import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import parse from 'html-react-parser';

const OfficerItem = ({ item }) => {

    const [expand, setExpand] = useState(false);

    return (
        <>
            <div className='is-flex is-clickable m-1' key={item._id}>
                {
                    expand ? (
                        <ExpandLessIcon style={{ color: '#3b66d6' }} />
                    ) : (
                        <ExpandMoreIcon style={{ color: '#3b66d6' }} />
                    )
                }
                <div className='ml-2' onClick={() => setExpand(!expand)}>{item.name} - {item.rank}</div>
            </div>
            {
                item.bio.length > 0 && expand && (
                    <div className='m-2 is-size-7'>{parse(item.bio)}</div>
                )
            }
        </>
    )
}

export default OfficerItem;