import React, { useContext, useEffect, useState } from 'react';
import countriesDatas from '../ContriesData/data.json';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Contex';

const Countries = () => {
    const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
    const [countriesData, setCountriesData] = useState(countriesDatas);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [dark, setDark] = useState(true)
    const {state,dispatch}=useContext(Context)
    let fileterCountries = countriesDatas.map((i) => i.region);
    let final = new Set(fileterCountries);
    console.log(state);
    let countriesList = [];
    final.forEach((ites) => countriesList.push(ites));

    const handleSelect = (region) => {
        setSelectedRegion(region);
        filterCountries(region, searchTerm);
    };
    const changeMode=()=>{
        dispatch({type:"color",payload:!state.mode})
    }
    const userSearch = (data) => {
        setSearchTerm(data);
        filterCountries(selectedRegion, data);
    }

    const filterCountries = (region, term) => {
        let filteredData = countriesDatas;

        if (region !== "Filter by Region") {
            filteredData = filteredData.filter((datas) => datas.region === region);
        }

        if (term) {
            filteredData = filteredData.filter((datas) => datas.name.toLowerCase().includes(term.toLowerCase()));
        }

        setCountriesData(filteredData);
    }

    // const dark = () => {
    //     document.body.style.backgroundColor = "black"
    // }

    useEffect(() => {
        if(state.mode)
            {
                setDark(true)
                 document.body.style.backgroundColor = "#fff"
            }
        else{
            setDark(false)
             document.body.style.backgroundColor = "#202d36"
        }
    }, [state.mode])

    return (
        <>
            <div className="header-sections" style={dark ? {}:{boxShadow: "0px 2px 5px #d9dbdd"}}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className={dark ? "":"text-white"}>Where in the world?</h3>
                        <span className={dark ? " icons-text":"text-white"}><i className="bi bi-moon" style={{cursor:"pointer"}} onClick={changeMode}></i> Dark Mode</span>
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center my-4">
                    <div className="input-group" style={{ width: '40%' }}>
                        <div className="input-group-prepend">
                            <span className={dark ? "input-group-text":" input-group-text bg-light "} id="basic-addon1">
                                <i className="bi bi-search" style={{color:"#ced4da"}}></i>
                                <input type="text" className="form-control" placeholder="Search country" onChange={(e) => userSearch(e.target.value)} />
                            </span>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedRegion}
                        </button>
                        <ul className="dropdown-menu">
                            <li className='dropdown-item' onClick={() => handleSelect("Filter by Region")}>All</li>
                            {
                                countriesList.map((items, index) => (
                                    <li className='dropdown-item' key={index} onClick={() => handleSelect(items)}>{items}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {
                        countriesData.map(country => (
                            <div className="col-md-3 mb-4" key={country.name}>
                                <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate(`/countrieDetails/${country.name}`)}>
                                    <img src={country.flag} className="card-img-top" alt={country.name} />
                                    <div className="card-body" style={dark ? {color: "#000"}:{background: "#202d36",color: "#fff"}}>
                                        <h6 className="card-title">{country.name}</h6>
                                        <p className="card-text">
                                            <strong>Population: </strong>{country.population}<br />
                                            <strong>Region: </strong>{country.region}<br />
                                            <strong>Capital: </strong>{country.capital}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Countries;
