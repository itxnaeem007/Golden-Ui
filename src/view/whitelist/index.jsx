import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from './../../hook/useWeb3'
import ContractABI from './../../utils/abi/abiSmart.json';
import { toast } from "react-toastify";
import './style.scss'
import { CONTRACT_ADDRESS } from '../../config/index';
import { FaPlus, FaMinus } from 'react-icons/fa'
import AuthModal from './../../components/WalletModal/authModal';


const PreSale = () => {
    const { account } = useWeb3React()
    const [loading, setLoading] = useState(false)
    const [totalMinted, setTotalMinted] = useState(0)
    const webThree = useWeb3();
    let [mintValue, setMintValue] = useState(1)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const selectedWallet = sessionStorage.getItem('wallet') || ''
    const [isSucceed, setIsSucced] = useState(false)

    const getContract = async () => {
        const contract = new webThree.eth.Contract(ContractABI, CONTRACT_ADDRESS);
        return contract
    };

    const getTotalSupply = async () => {
        const contract = await getContract()

        try {
            let res = await contract.methods.totalSupply().call()
            setTotalMinted(res)
            setIsSucced(false)
        } catch (error) {
            console.log(error);
            setIsSucced(false)
        }

    }
    useEffect(() => {
        getTotalSupply()
    }, [account])

    useEffect(() => {
        isSucceed && getTotalSupply()
    }, [isSucceed])

    // const fetchTotalSupply = async (value) => {
    //     let check = false
    //     const contract = await getContract()
    //     let res = await contract.methods.userPresaleMintCount(account).call({ from: account })
    //     if (+res === 1) {
    //         toast.info(`You already minted`)
    //         check = false
    //     } else {
    //         check = true
    //     }
    //     return check;
    // }

    const mint = async () => {
        setLoading(true)

        // const valid = await fetchTotalSupply(mintValue)
        // if (valid) {
        toast.info('Minting Start')
        let totalAmount = 0.09 * mintValue;
        const amount = webThree.utils.toWei(totalAmount.toString(), 'ether')
        const mintContractInstance = await getContract()

        try {
            let res = await mintContractInstance.methods.totalSupply().call()
            if (+res <= 9999) {
                const txHash = await mintContractInstance.methods.preSale(mintValue).send({ from: account, value: amount, gas: 600000 })
                setLoading(false)
                setIsSucced(true)
                console.log('txHash', txHash);
            } else {
                toast.info('Pre sale NFT minting limit reached')
            }

            localStorage.setItem('minted', res)
            toast.info('Token minted Successfully')

            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
            if (error.code === 4001) {
                toast.error('User Reject transaction')
            } else {
                toast.error('Transaction Failed')

            }

        }
        // } else {
        //     setLoading(false)

        // }
    }

    const handleChange = (key) => {
        let tempValue = mintValue;
        if (key === 'plus' ) {
            tempValue = tempValue + 1;
            setMintValue(tempValue)
        } else {
            if (tempValue === 1) {
                return
            }
            tempValue = tempValue - 1;
            setMintValue(tempValue)
        }
    }


    return (
        <div className='main' id="main">
            <div className='main-heading' >PREVENTA</div>
            <div className='price-box'>
                <img className='price-image' src='/assets/dist/whitelist.png' alt="" />
                <div className='sub-flex'>
                    <div className='main-min-head'>Precio NFT</div>
                    <div className='price-text'>0.09 ETH</div>

                </div>
            </div>
            <div className='input-box-xp mt-4 mt-md-5'>
                <div className='input-sec'>
                    <FaMinus className='pointer' onClick={() => { handleChange('minus') }} />
                    <input className='input-xp' value={mintValue} type="number" />
                    <FaPlus className='pointer' onClick={() => { handleChange('plus') }} />
                </div>
                <button className='btn-set' onClick={() => { setMintValue(10) }}>
                    Set Max
                </button>
            </div>
            <div className='total-box mt-4 mt-md-5'>
                <div className='total-text'>
                    Total
                </div>
                <div className='total-price'>
                    {0.09 * mintValue} ETH
                </div>
            </div>
            <div className='mt-4 mt-md-5'>
                {account ?
                    <button className='btn-set' onClick={() => {
                        if (!loading) {
                            mint()
                        }
                    }}>
                        {loading ? "Loading..." : "Mint Now"}
                    </button> :
                    <button className='btn-set' onClick={() => { setShowAuthModal(true) }}>
                        CONNECT
                    </button>
                }

                <p className='main-p '>{totalMinted} / 9999</p>
            </div>
            <AuthModal
                show={showAuthModal}
                handleClose={() => setShowAuthModal(false)}
            />
            {/* <p className='main-p-link'><a target="_blank" href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}>{shortenAddress(CONTRACT_ADDRESS, 10)}</a></p> */}
        </div>
    );
}

export default PreSale;