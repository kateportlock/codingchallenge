import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfficersList from '../../components/officers/OfficersList';
import NeighbourhoodList from '../../components/neighbourhoods/NeighbourhoodList';
import SearchInput from '../../components/forms/SearchInput';
import Header from '../../components/global/Header';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from '@mui/material/Link';
import parse from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import styles from "../../styles/modules/Pagination.module.scss";
import axios from "axios";

const ForcesPage = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [force, setForce] = useState({});
    const [officersList, setOfficersList] = useState([]);
    const [neighbourhoodList, setNeighbourhoodList] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const [pageCount, setPageCount] = useState(Math.ceil(neighbourhoodList.length / itemsPerPage));
    const [currentNeighbourhoods, setCurrentNeighbourhoods] = useState(neighbourhoodList.slice(itemOffset, endOffset));
    const [curPage, setCurPage] = useState(null);

    useEffect(() => {

        axios.get(`https://data.police.uk/api/forces/${id}`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    setForce(response.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [id]);

    useEffect(() => {

        axios.get(`https://data.police.uk/api/forces/${id}/people`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    setOfficersList(response.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [id]);

    useEffect(() => {

        axios.get(`https://data.police.uk/api/${id}/neighbourhoods`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    setNeighbourhoodList(response.data);
                    setIsLoading(false);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [id]);
    
    useEffect(() => {

        const newArr = neighbourhoodList.filter(item => item.name.toLocaleLowerCase().indexOf(searchVal.toLocaleLowerCase()) !== -1);
        setCurrentNeighbourhoods(newArr.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(newArr.length / itemsPerPage));
        setCurPage((endOffset / itemsPerPage) - 1);

    }, [searchVal, neighbourhoodList, itemOffset, endOffset]);


    useEffect(() => {

        if (searchVal) {
            setCurPage(0);
            setItemOffset(0);
        }

    }, [searchVal]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % neighbourhoodList.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='mb-6'>
            <Header />
            {
                Object.keys(force).length !== 0 && (
                    <Container maxWidth="lg">
                        <p className="is-size-3 mb-3">{force.name}</p>
                        <Link href={force.url} underline="none">
                            <Button variant="contained" size="small">
                                Visit page
                            </Button>
                        </Link>
                        <div className="is-flex mb-5 mt-5">
                            <PhoneIcon />
                            <span className="ml-2">Contact: <strong>{force.telephone}</strong></span>
                        </div>
                        {
                            force.description && (
                                <>
                                    <p className='is-size-6 is-uppercase mb-2'>About this department:</p>
                                    <div className='mb-3'>{parse(force.description)}</div>
                                </>
                            )
                        }
                        {
                            officersList.length > 0 && (
                                <>
                                    <p className='is-size-7 is-uppercase mb-2'>Senior officers in this department:</p>
                                    <OfficersList officersList={officersList} />
                                </>
                            )
                        }
                        <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
                        {
                            currentNeighbourhoods.length > 0 && (
                                <p className='is-size-7 is-uppercase mb-2'>Neighbourhoods covered by {force.name}:</p>
                            )
                        }
                        {
                            currentNeighbourhoods && !isLoading ? (
                                <>
                                    <NeighbourhoodList currentNeighbourhoods={currentNeighbourhoods} />
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Next"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={itemsPerPage}
                                        pageCount={pageCount}
                                        previousLabel="Previous"
                                        renderOnZeroPageCount={null}
                                        containerClassName={"pagination-list is-justify-content-center mt-6"}
                                        pageLinkClassName={"pagination-link"}
                                        previousLinkClassName={`pagination-link pagination-previous ${styles.hideBtn}`}
                                        nextLinkClassName={`pagination-link pagination-previous ${styles.hideBtn}`}
                                        disabledClassName={`pagination-link is-disabled ${styles.hideBtn}`}
                                        activeLinkClassName={"pagination-link has-background-link has-text-white"}
                                        forcePage={curPage}
                                    />
                                </>
                            ) : (
                                <CircularProgress />
                            )
                        }
                        <div className='has-text-centered mt-5'>
                            <Button variant="outlined" size="medium" onClick={() => navigate(`/`)}>
                                Back to the list
                            </Button>
                        </div>
                    </Container>
                )
            }
        </div>
    )
}

export default ForcesPage;