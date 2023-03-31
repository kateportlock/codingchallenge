import { useState, useEffect } from 'react';
import ForcesList from '../components/forces/ForcesList';
import SearchInput from '../components/forms/SearchInput';
import Header from '../components/global/Header';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = (props) => {

    const [forcesList, setForcesList] = useState([]);
    const [currentforcesList, setCurrentForcesList] = useState(forcesList);
    const [searchVal, setSearchVal] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios.get('https://data.police.uk/api/forces', {
        })
            .then(function (response) {

                if (response.status === 200) {
                    const data = response.data.sort((a, b) => a['index'] - b['index']);
                    setForcesList(data);
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [setForcesList]);

    useEffect(() => {

        const newArr = forcesList.filter(item => item.name.toLocaleLowerCase().indexOf(searchVal.toLocaleLowerCase()) !== -1);
        setCurrentForcesList(newArr);

    }, [searchVal, forcesList]);

    return (
        <div className="pb-6">
            <Header />
            <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} page={'main'} />
            {
                currentforcesList && !isLoading ? (
                    <ForcesList forcesList={currentforcesList} searchVal={searchVal} />
                ) : (
                    <div className='m-auto'>
                        <CircularProgress />
                    </div>
                )
            }
        </div>
    );
};

export default HomePage;