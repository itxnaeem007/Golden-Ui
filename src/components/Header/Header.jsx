import React, { useState } from 'react';
import './Header.scss';
import { Nav, Navbar } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';
import AuthModal from '../WalletModal/authModal';
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Scroll = require('react-scroll');


const Header = () => {
	const [showAuthModal, setShowAuthModal] = useState(false)
	const { account } = useWeb3React()
	const { pathname } = useLocation()
	const history = useHistory()

	console.log('account', account);
	return (
		<div>
			<Navbar className="defi-navbar mx-0" expand="lg" fixed="top">
				<Navbar.Brand
					onClick={() =>
						Scroll.scroller.scrollTo('home', {
							smooth: true,
							offset: -240,
							duration: 500,
						})
					}
				>
					<img
						src={'/assets/dist/logo.png'}
						alt=""
						height={100}
						style={{ cursor: 'pointer', paddingTop: '20px' }}
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link
							onClick={() => {
								if (pathname === '/mint-nft-golden-id-club' || pathname === '/whitelist-golden-id-club') {
									history.push('/')
								}
								Scroll.scroller.scrollTo('home', {
									smooth: true,
									offset: -240,
									duration: 500,
								})
							}}
						>
							<img
								src={'/assets/dist/logo.png'}
								alt=""
								className='logo-class'
								height={170}
								style={{ cursor: 'pointer', width: '85px', height: '100px', marginLeft: '0px', paddingRight: '0px' }}
							/>
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								if (pathname === '/mint-nft-golden-id-club' || pathname === '/whitelist-golden-id-club') {
									history.push('/')
								}
								setTimeout(() => {
									Scroll.scroller.scrollTo('welcome', {
										smooth: true,
										offset: -240,
										duration: 500,
									})
								}, 200);

							}}
						>
							THE CLUB
						</Nav.Link>
						{/* <Nav.Link
							href='/whitelist-golden-id-club'
						>
							WhiteList
						</Nav.Link>
						<Nav.Link
							href='/mint-nft-golden-id-club'
						>
							Mint NFT
						</Nav.Link> */}


						<Nav.Link
							onClick={() => {
								if (pathname === '/mint-nft-golden-id-club' || pathname === '/whitelist-golden-id-club') {
									history.push('/')
								}
								setTimeout(() => {
									Scroll.scroller.scrollTo('privileges', {
										smooth: true,
										offset: -180,
										duration: 500,
									})
								}, 200);

							}}
						>
							BENEFITS
						</Nav.Link>


						<Nav.Link
							onClick={() => {
								if (pathname === '/mint-nft-golden-id-club' || pathname === '/whitelist-golden-id-club') {
									history.push('/')
								}
								setTimeout(() => {
									Scroll.scroller.scrollTo('briefing', {
										smooth: true,
										offset: -240,
										duration: 500,
									})
								}, 200);

							}}
						>
							EXECUTIVE BRIEFING
						</Nav.Link>

						<Nav.Link
							onClick={() => {
								if (pathname === '/mint-nft-golden-id-club' || pathname === '/whitelist-golden-id-club') {
									history.push('/')
								}
								setTimeout(() => {
									Scroll.scroller.scrollTo('routes', {
										smooth: true,
										offset: -210,
										duration: 500,
									})
								}, 200);

							}}
						>
							ROADMAP
						</Nav.Link>

						<div className='flexRow'>
							<a href="https://twitter.com/GoldenIDClub" target={'_blank'} rel="noreferrer"><img
								src={'/assets/tweeter.png'}
								alt=""
								width={40}
								height={40}
								style={{ cursor: 'pointer', marginLeft: '10px' }}
							/></a>
							<a href="https://www.instagram.com/goldenidclub/" target={'_blank'} rel="noreferrer">

								<img
									src={'/assets/instagram.png'}
									alt=""
									width={40}
									height={40}
									style={{ cursor: 'pointer', marginLeft: '10px', width: '44px' }}
								/>
							</a>

							<a href="https://t.me/GoldenIDClub" target={'_blank'} rel="noreferrer">

								<img
									src={'/assets/telegram.png'}
									alt=""
									width={30}
									height={30}
									style={{ cursor: 'pointer', marginLeft: '10px', width: '44px' }}
								/>
							</a>
						</div>
						<Nav.Link>
							<div>
								{account ?
									<button className='btn-connect' onClick={() => { window.open('https://etherscan.io/address/${account}') }}>
										{shortenAddress(account, 9)}
									</button> :
									<button onClick={() => { setShowAuthModal(true) }} className='btn-connect'>
										Connect Wallet
									</button>}
							</div>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>


			</Navbar>
			<AuthModal
				show={showAuthModal}
				handleClose={() => setShowAuthModal(false)}
			/>
		</div>
	);
};

export default Header;
