import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import countriesDatas from '../ContriesData/data.json'
import { Context } from '../Context/Contex';
const CountrieDetails = () => {
    const { regionName } = useParams();
    let findDatas = countriesDatas.find((items) => items.name == regionName);
    const [dark, setDark] = useState(true)
    const {state,dispatch}=useContext(Context)
    console.log(findDatas);
    const navigate = useNavigate();

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

    const changeMode=()=>{
        dispatch({type:"color",payload:!state.mode})
    }
    return (
        <>
            <div className="header-sections">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className={dark ? "":"text-white"}>Where in the world?</h3>
                        <span className={dark ? " icons-text":"text-white"}><i className="bi bi-moon" style={{cursor:"pointer"}} onClick={changeMode}></i> Dark Mode</span>
                    </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="back-btn pb-5">
                    <button className='btn btn-light back-button' onClick={() => navigate("/")}><i class="bi bi-arrow-left" ></i> Back</button>
                </div>

                <div class="card card-temp mb-3"  style={dark ? { maxWidth: "100%" } :{ maxWidth: "100%",backgroundColor:"#202d36",color:"#fff" }}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src={findDatas.flag} class="card-img" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body card-design">
                                <h5 class="card-title">{findDatas.name}</h5>
                                <div className="card-contents">
                                    <div className="right">
                                        <p className='titles'>NativeName: <span className='title-value'>{findDatas.nativeName}</span></p>
                                        <p className='titles'>Population: <span className='title-value'>{findDatas.population}</span></p>
                                        <p className='titles'>Region: <span className='title-value'>{findDatas.region}</span></p>
                                        <p className='titles'>Sub Region: <span className='title-value'>{findDatas.subregion}</span></p>
                                        <p className='titles'>Capital: <span className='title-value'>{findDatas.capital}</span></p>
                                    </div>
                                    <div className="left pe-5">
                                        <p className='titles'>Top Level Domain: <span className='title-value'>{findDatas.topLevelDomain?.map((items) => items)}</span></p>
                                        <p className='titles'>Currencies: <span className='title-value'>{findDatas.currencies?.map((e) => e.name)}</span></p>
                                        <p className='titles'>Languages: <span className='title-value'>{findDatas.languages?.map((i) => {
                                            return (<span>{i.name} ,</span>)
                                        })} </span></p>

                                    </div>
                                </div>
                                <p className='border-contries titles'>Border Countries: {findDatas.borders?.map((datas) => {
                                    return (<button className='btn border ms-3 gap-4' style={dark ?{color:"#000"}:{color:"#fff"}}>{datas}</button>)
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountrieDetails
