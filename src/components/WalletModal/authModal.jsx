import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Modal } from 'react-bootstrap'

import './auth.scss'
import useAuth from '../../hook/useAuth'
import { SUPPORTED_WALLETS } from './../../config/index'
import { toast } from 'react-toastify'
import { RiCloseFill } from 'react-icons/ri'

const AuthModal = ({
    show,
    handleClose,
}) => {
    const { account, library } = useWeb3React()
    const [loading, setLoading] = useState(false)
    const { login, logout } = useAuth()


    const onAuthHandler = async () => {

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <div>
                        Connect Wallet

                    </div>

                </Modal.Title>
                <RiCloseFill onClick={handleClose}  size={26} className={'ml-auto mt-2 pointer'}/>
            </Modal.Header>
            <Modal.Body className="my-4 d-flex align-items-center">
                <div className='wallet-box'>
                    <img className='image-wallet' onClick={async () => {
                        await login(SUPPORTED_WALLETS.METAMASK.connector , SUPPORTED_WALLETS.METAMASK.name )
                        toast.info('Wallet Connected')
                        handleClose()

                    }} src='/assets/dist/metamask.png' alt="" />
                    <img className='image-wallet' onClick={ async() => { 
                        await login(SUPPORTED_WALLETS.WALLET_CONNECT.connector , SUPPORTED_WALLETS.WALLET_CONNECT.name )
                        toast.info('Wallet Connected')
                        handleClose()
                         }} src='/assets/dist/walletC.svg' alt="" />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal
