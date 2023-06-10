import React, { useEffect, useState } from "react";
import "./style.scss";
import Timer from "./Timer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CONTRACT_ADDRESS } from "../../config/index";
import useWeb3 from "../../hook/useWeb3";
import ContractABI from "../../utils/abi/abiSmart.json";
import moment from "moment";
import { useHistory } from "react-router-dom";

const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <img src={`./assets/dist/right-arrow.svg`} alt="" />,
    prevArrow: <img src={`./assets/dist/left-arrow.svg`} alt="" />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const sliderImages = [
    { image: "/assets/dist/egg1.png" },
    { image: "/assets/dist/egg2.png" },
    { image: "/assets/dist/egg3.png" },
    { image: "/assets/dist/egg4.png" },
    { image: "/assets/dist/egg5.png" },
    { image: "/assets/dist/egg6.png" },
    { image: "/assets/dist/egg7.png" },
    { image: "/assets/dist/egg8.png" },
    { image: "/assets/dist/egg9.png" },
];

const Home = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const history = useHistory();
    const webThree = useWeb3();

    //white listed
    const [startTime, setStartTime] = useState("1655108705");
    const [endTime, setEndTime] = useState("1656334800");
    var e = new Date(Number(endTime * 1000)).toUTCString();
    var s = new Date(Number(startTime * 1000)).toUTCString();
    const startWhitelist = +new moment(`${s}`).utc() > +new Date();
    const differenceInWhiteList =
        +new moment(`${startWhitelist ? s : e}`).utc() - +new Date();

    //Public sale
    const [startTimePublic, setStartTimePublic] = useState("1658944800");
    const [endTimePublic, setEndTimePublic] = useState("1650658970");
    var ePublic = new Date(Number(startTimePublic * 1000)).toUTCString();
    var sPublic = new Date(Number(endTimePublic * 1000)).toUTCString();
    const startPublic = +new moment(`${sPublic}`).utc() > +new Date();
    const differenceInPublic =
        +new moment(`${startPublic ? sPublic : ePublic}`).utc() - +new Date();

    const getContract = async () => {
        const contract = new webThree.eth.Contract(ContractABI, CONTRACT_ADDRESS);
        return contract;
    };

    const isWhiteListedCall = async () => {
        const contract = await getContract();
        try {
            let whiteListStartTime = await contract.methods
                .preSaleOpenTime()
                .call(); //white list start
            let whiteListCloseTime = await contract.methods
                .preSaleCloseTime()
                .call(); //white list end
            let publicStartTime = await contract.methods.publicSaleStartTime().call(); //Public call
            //setter for Whitelist
            setStartTime(whiteListStartTime);
            setEndTime(whiteListCloseTime);
            //setter for Public
            setStartTimePublic(publicStartTime);
            setEndTimePublic(publicStartTime);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        isWhiteListedCall();
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            if (differenceInWhiteList > 0) {
                setDays(Math.floor(differenceInWhiteList / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((differenceInWhiteList / (1000 * 60 * 60)) % 24));
                setMinutes(Math.floor((differenceInWhiteList / 1000 / 60) % 60));
                setSeconds(Math.floor((differenceInWhiteList / 1000) % 60));
            } else if (differenceInPublic > 0) {
                setDays(Math.floor(differenceInPublic / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((differenceInPublic / (1000 * 60 * 60)) % 24));
                setMinutes(Math.floor((differenceInPublic / 1000 / 60) % 60));
                setSeconds(Math.floor((differenceInPublic / 1000) % 60));
            }
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    return (
        <div className="mainWrapper" id="home">
            <h1 className="heading-x">
                {" "}
                <img src={"/assets/text/club.png"} alt="" width="500" height="300" />
            </h1>
            <div className="subtext">
                {" "}
                <img
                    src={"/assets/text/identity.png"}
                    alt=""
                    width="250"
                    height="300"
                />
            </div>
            <div className="row">
                <div className="col-12 col-md-4 ">
                    <img
                        src={"/assets/new/GoldenL.png"}
                        alt=""
                        width={250}
                        className={"mx-auto"}
                    />
                </div>
                <div className="col-12 col-md-4 ">
                    <div className="blackBox">
                        {differenceInWhiteList > 0 ? (
                            <>
                                <div className="my-4 subtext1">
                                    {startWhitelist
                                        ? "Preventa 27 de Junio"
                                        : "Preventa 27 de Junio"}
                                </div>
                                <Timer
                                    days={days}
                                    hours={hours}
                                    minutes={minutes}
                                    seconds={seconds}
                                    startTime={startTime}
                                    endTime={endTime}
                                />
                                {console.log("startwhite", new Date().getTime())}
                                {
                                    startWhitelist ? (
                                        ""
                                    ) : (
                                        <button
                                            className="mt-4 btn-set"
                                            onClick={() => {
                                                history.push("/whitelist-golden-id-club");
                                            }}
                                        >
                                            Mint Now
                                        </button>
                                    )
                                }
                            </>
                        ) : differenceInPublic > 0 ? (
                            <>
                                <div className="my-4 subtext">
                                    {startPublic ? "Minting will start after" : ""}
                                </div>
                                <Timer
                                    days={days}
                                    hours={hours}
                                    minutes={minutes}
                                    seconds={seconds}
                                    startTime={startTime}
                                    endTime={endTime}
                                />
                            </>
                        ) : (
                            <button
                                className="mt-4 btn-set"
                                onClick={() => {
                                    history.push("/mint-nft-golden-id-club");
                                }}
                            >
                                Mint Now
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-12 col-md-4 ">
                    <img
                        src={"/assets/new/GoldenR.png"}
                        alt=""
                        width={250}
                        className={"mx-auto"}
                    />
                </div>
            </div>
            <div className="lineblue"></div>
            <div className="row marginTop40" id="welcome">
                <div className="col-12 col-md-6 d-none d-md-block">
                    <div className="d-flex justify-content-center">
                        <iframe
                            src="https://player.vimeo.com/video/709730157?h=6abe50769a&loop=1&color=ffffff&title=0&byline=0&portrait=0"
                            width="380"
                            height="280"
                        ></iframe>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="whiteBox w-100 hetic widthHeightX ">
                        <img
                            src={"/assets/dist/welcome.png"}
                            alt=""
                            width="450"
                            height="300"
                            style={{ marginTop: '-20px' }}
                        />
                        <br />
                        <div className="d-block d-md-none">
                            <iframe
                                src="https://player.vimeo.com/video/709730157?h=6abe50769a&loop=1&color=ffffff&title=0&byline=0&portrait=0"
                                width="380"
                                height="280"
                            ></iframe>
                            <br />
                        </div>

                        Golden Identity Club es una comunidad de rebeldes que reivindican EL VALOR DE LA IDENTIDAD, como compromiso en la creación de valor presente y futuro en cada una de nuestras acciones, fomentando el desarrollo de negocios entre líderes de opinión y amantes de los NFTs.<br />
                        Todos reunidos mediante la participación de eventos presenciales y virtuales que proporcionarán divertidas e inolvidables experiencias junto a nuestros otros 9.999 protagonistas, los GOLDEN EGGIS.

                    </div>
                </div>
            </div>
            <div className="lineblue"></div>
            <div className="storyText heading-x marginTop40" id="privileges">
                <img
                    src={"/assets/text/benefits.png"}
                    alt=""
                    width="250"
                    height="250"
                />
            </div>
            <div className="row marginTop40 container-fluid">
                <div className="col-12 col-md-4 col-lg">
                    <div className="">
                        <img src={"/assets/prev/Club2.png"} alt="" class="w-100" />
                    </div>
                    <br />
                    <div className="egg-bottom-text text-center">Eventos presenciales y virtuales.</div>
                </div>
                <div className="col-12 col-md-4 col-lg">
                    <div>
                        <img src={"/assets/prev/Club3.png"} alt="" class="w-100" />
                    </div>
                    <br />
                    <div className="egg-bottom-text  d-flex justify-content-center">
                        <div className="text-center">
                            DAO <br />
                            &nbsp;&nbsp; . Derecho a voto.
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  . 1 NFT por cartera (Presale).
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  . 2 NFT por cartera (Public Sale). <br />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg">
                    <div className="">
                        <img src={"/assets/prev/Club4.png"} alt="" class="w-100" />
                    </div>
                    <br />
                    <div className="egg-bottom-text text-center">
                        NFT único con el 100% de sus derechos comerciales{" "}
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg">
                    <div className="">
                        <img src={"/assets/prev/Club5.png"} alt="" class="w-100" />
                    </div>
                    <br />
                    <div className="egg-bottom-text text-center">Responsabilidad social</div>
                </div>
                <div className="col-12 col-md-4 col-lg">
                    <div className="">
                        <img src={"/assets/prev/Club6.png"} alt="" class="w-100" />
                    </div>
                    <br />
                    <div className="egg-bottom-text d-flex justify-content-center">
                        <div className="text-left">
                            . No hay venta privada.
                            <br />
                            . Todos se venden al mismo precio.
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="lineblue"></div>
            <div className="row marginTop40">
                <div className="col-12 col-md-6 ">
                    <h1 className="heading-x">
                        {" "}
                        <img
                            src={"/assets/text/island.png"}
                            alt=""
                            width="200"
                            height="200"
                        />
                    </h1>
                    <div className="d-block d-md-none">
                        <br />
                        <img
                            src={"/assets/new/EGGISLAND.png"}
                            alt=""
                            className="m-auto imageGirlll"
                        />
                    </div>
                    <div className="whiteBox w-100 widthHeightX">
                        <br />
                        Los poseedores de nuestros GOLDEN EGGIS tendrán acceso exclusivo a la isla de los Eggis:
                        <br />
                        <br />
                        <span style={{ color: "#FED44C", fontSize: "17px", fontWeight: 'bold' }}>
                            Networking:
                        </span>
                        <br /> Entre nuestra comunidad (Influencers, Empresarios y Amantes de los NFTs). <br />
                        <br />
                        <span style={{ color: "#FED44C", fontSize: "17px", fontWeight: 'bold' }}>
                            Eventos presenciales:
                            <br />{" "}
                        </span>
                        Conciertos de música, retos con premios y otras experiencias en comunidad en los lugares más maravillosos que puedas imaginar.

                        <br />
                        <br />
                        <span style={{ color: "#FED44C", fontSize: "17px", fontWeight: 'bold' }}>
                            Ponencias:
                            <br />{" "}
                        </span>
                        Tendencias del mundo cripto.
                        <br />
                        <br />
                        <span style={{ color: "#FED44C", fontSize: "17px", fontWeight: 'bold' }}>
                            Contenido audiovisual:
                            <br />{" "}
                        </span>{" "}
                        Entrevistas y aventuras reales entre miembros de la comunidad e Influencers.
                        <br />
                        <br />
                    </div>
                </div>

                <div className="col-12 col-md-6 d-none d-md-block">
                    <img
                        src={"/assets/new/EGGISLAND.png"}
                        alt=""
                        className="m-auto imageGirlll"
                    />
                </div>
            </div>
            <div className="lineblue"></div>
            <div className="row marginTop40" id="social">
                <div className="col-12 col-md-5 d-none d-md-block">
                    <img
                        src={"/assets/dist/shakeHand.png"}
                        alt=""
                        className="m-auto imageGigi"
                        style={{ height: "350px", width: "350px" }}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <br />
                    <h1 className="heading-x">
                        <img
                            src={"/assets/text/foundation.png"}
                            alt=""
                            width="400"
                            height="300"
                        />
                    </h1>

                    <div className="d-block d-md-none">
                        <br />
                        <img
                            src={"/assets/dist/shakeHand.png"}
                            alt=""
                            className="m-auto imageGigi"
                            style={{ height: "350px", width: "350px" }}
                        />
                    </div>

                    <div className="whiteBox widthHeightX">
                        <br />
                        Las causas sociales forman parte del ADN de la Comunidad Golden ID Club. Es por ello, que parte de nuestro presupuesto está destinado al objetivo irrenunciable de mejorar la vida en nuestro planeta a través de decisiones compartidas entre los miembros.{" "}
                    </div>
                </div>
            </div>
            <div className="lineblue"></div>
            <div className="row marginTop40" id="briefing">
                <div className="col-12 col-md-4 d-none d-md-block">
                    <img
                        src={"/assets/new/GoldenEggi.png"}
                        alt=""
                        style={{ height: "75%", width: "100%" }}
                    />
                </div>
                <div className="col-12 col-md-8 ">
                    <h1 className="heading-x">
                        <img
                            src={"/assets/text/briefing.png"}
                            alt=""
                            width="400"
                            height="300"
                        />
                    </h1>

                    <div className="d-block d-md-none">
                        <img
                            src={"/assets/new/GoldenEggi.png"}
                            alt=""
                            style={{ height: "80%", width: "100%" }}
                        />
                    </div>

                    <div className="whiteBox widthHeighthhhX">
                        <br />
                        GOLDEN EGGIS es una colección limitada de 9.999 personajes de Artwork dibujados por el artista Tatsuri, con cierto grado de humor e ironía, en la que su diseño está formado por un collage de 441 rasgos  (4+4+1= 9) que caracterizan las “identidades” más rebeldes y salvajes de nuestros protagonistas. Todos son geniales, pero algunos son más raros que otros.<br /><br />
                        Solo hay un rasgo común a todos los GOLDEN EGGIS, la silueta de la cabeza con FORMA DE HUEVO, representando el nacimiento de nuestra verdadera identidad, y a la cual nunca deberíamos renunciar. <br /><br />
                        La colección está representada por el mágico número NUEVE, símbolo del VALOR ABSOLUTO, porque tan pronto como termina un ciclo de Valor con el 9, una nueva etapa comienza.

                    </div>
                </div>
            </div>
            <div className="lineblue"></div>

            <div className="row marginTop40" id="briefing">
                <h1 className="heading-x">
                    <img
                        src={"/assets/text/category.png"}
                        alt=""
                        width="250"
                        height="180"
                    />
                </h1>
                <div className="whiteBox widthHeighthhhX">
                    <br />
                    La colección consta de un total de 9.999 Golden Eggis. Cada Golden Eggi te dará acceso a todos los beneficios de Golden ID Club (Eventos Presenciales y Virtuales, Gobierno justo,  Singularidad, Fundación Eggis y Transparencia).
                    <br />
                    <br />
                    Sólo los 999 Golden Eggis minteados en la preventa recibirán el diploma honorífico llamado "GOLDEN MEMBER" (NFT); un NFT extra exclusivo que te dará acceso todos los beneficios del Club.
                </div>
            </div>
            <div>
                <div className="heading-xx"> 3 CATEGORÍAS DE GOLDEN EGGIS </div>
                <div className="row justify-content-center">
                    <div className="customCol">
                        <div className="">
                            <img
                                src={"/assets/new/category1.png"}
                                alt=""
                            // style={{ maxWidth: "115%" }}
                            />
                        </div>
                        <br />
                        <div className="egg-bottom-textc1">COLORFUL</div>
                        <br />
                        <div className="egg-bottom-textc1c">
                            Rasgos Coloridos. <br />
                        </div>
                    </div>
                    <div className="customCol" >
                        <div className="">
                            <img
                                src={"/assets/new/category2.png"}
                                alt=""
                            // style={{ maxWidth: "115%" }}
                            />
                        </div>
                        <br />
                        <div className="egg-bottom-text2">GOLDEN </div> <br />
                        <div className="egg-bottom-textc1c">
                            Rasgos de Oro y Coloridos. <br />
                        </div>
                    </div>
                    <div className="customCol" >
                        <div className="">
                            <img
                                src={"/assets/new/category3.png"}
                                alt=""
                            // style={{ maxWidth: "115%" }}
                            />
                        </div>
                        <br />
                        <div className="egg-bottom-text44">GOLDEN PREMIUM </div> <br />
                        <div className="egg-bottom-textc1c">
                            Rasgos de Oro. <br />
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div className="lineblue"></div>

            <div className="row marginTop40">
                <div className="col-12 col-md-6 " id="fiche">
                    <div className="marginLeft20 whiteBox d-flex d-md-block justify-content-center">
                        <ul className="text-left fontSizeXp hint">
                            <li>Presale: 27/06/2022</li>
                            <li>Public sale: 27/07/2022</li>
                            <li>Colección: GOLDEN EGGIS</li>
                            <li>Unidades: 9,999</li>
                            <li>Blockchain: Ethereum</li>
                            <li className="w-100">Precio: 0.09 ETH</li>
                            <button className="btn-set-contract" hidden="true">
                                Contract
                            </button>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <img
                        src={"/assets/dist/flowwalk.png"}
                        alt=""
                        className="imageGirllll m-auto "
                    />
                </div>
            </div>
            <div className="lineblue"></div>

            <div className="my-5">
                <div className="m-auto w-75 d-none d-md-block">
                    <Slider {...settings}>
                        {sliderImages.map((item, index) => (
                            <img
                                key={index}
                                src={item.image}
                                alt=""
                                className="m-auto imageGirll"
                            />
                        ))}
                    </Slider>
                </div>

                <div className="m-auto w-50 d-block d-md-none">
                    <Slider {...settings}>
                        {sliderImages.map((item, index) => (
                            <img
                                key={index}
                                src={item.image}
                                alt=""
                                className="m-auto imageGirll"
                            />
                        ))}
                    </Slider>
                </div>

            </div>
            <div className="lineblue"></div>

            <div className="row marginTop40" >
                <h1 className='heading-x'>
                    <img
                        src={"/assets/text/eggonomics.png"}
                        alt=""
                        width="300"
                        height="300"
                    />
                </h1>
                <div className="mx-5">
                    <br />
                    <img
                        src={"/assets/dist/egginomicsimg.png"}
                        className="w-100"
                        alt=""
                    />
                </div>
            </div>

            <div className="lineblue"></div>

            <div className="row marginTop40" id="routes">
                <h1 className='heading-x'>
                    <img
                        src={"/assets/text/roadtovalue.png"}
                        alt=""
                        width="450"
                        height="300"
                    />
                </h1>
                <div className="mx-5 d-block d-md-none">
                    <br />
                    <img
                        src={"/assets/dist/roadmap.png"}
                        className="w-100"
                        alt=""
                    />
                </div>
                <div className="whiteBox widthHeighthhhX">
                    <br />

                    En la primera reunión de trabajo, el equipo redactó una declaración explícita y compartida sobre quiénes somos, qué queremos ser en el futuro y los valores irrenunciables que debemos seguir para alcanzar el objetivo compartido. Para ello, acordamos el lema de nuestro proyecto, "El valor de la identidad", como compromiso de crear valor presente y futuro en cada una de nuestras acciones. Alcanzado el porcentaje de Golden Eggis minteados iniciaremos cada una de las acciones programadas.

                </div>
            </div>
            <div className="mx-5 marginTop20 d-none d-md-block">
                <img
                    src={"/assets/dist/roadmap.png"}
                    className="marginLeftRoadMap"
                    alt=""
                />
            </div>
            <br />
            <div style={{ opacity: "0.5", fontSize: "12px" }}>
                Nuestros oídos estarán abiertos a las propuestas de la comunidad GID Club y nuestra visión en el horizonte.

            </div>

            {/* <div className='flexx marginTop40' id='members'>
                <h1 className='flex m-auto'>GID MEMBERS</h1>
                <div className='row'>
                    {[1, 2, 3, 4 ,5,6,7,8].map((item, index) => (

                        <img
                            key={index}
                            src={'/assets/dist/EmptyEgg.png'}
                            alt=""
                            className='m-auto imageEggss col-6 col-md-3'
                        />))}
                </div>

               
            </div> */}
            {/* <div className='lineblue '></div> */}

            {/* <div id='community' >
                <h1 className='m-auto'>COMMUNITY</h1>
                <div className='mt-5'>
                    <img
                        src={'/assets/dist/bunty.jpeg'}
                        alt=""
                        width={'80%'}
                        style={{ height: '500px' }}


                        className='m-auto'
                    />
                </div>


            </div> */}
            <div className="marginTop40">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <button
                            className="btn-set-contract"
                            style={{ height: "50px" }}
                            hidden="true"
                        >
                            Contract
                        </button>
                    </div>
                    <div className="mt-5 col-12 mt-md-1 col-md-4">
                        <div className="flexRodw">
                            <a
                                href="https://twitter.com/GoldenIDClub"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <img
                                    src={"/assets/tweeter.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/goldenidclub/"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <img
                                    src={"/assets/instagram.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                        width: "44px",
                                        marginTop: "-4px",
                                    }}
                                />
                            </a>
                            <a
                                href="https://t.me/GoldenIDClub"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <img
                                    src={"/assets/telegram.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                        width: "44px",
                                        marginTop: "-4px",
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="mt-5 col-12 mt-md-1 col-md-4">
                        <div style={{ fontSize: "10px" }}>
                            Renunciamos al uso de cookies de terceros en nuestro sitio{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
