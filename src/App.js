import './App.css';
import contractABI from './contracts/contractABI.json';
import Web3 from 'web3';
import { useEffect, useState} from 'react';
import { styleReset, Button, Window, WindowHeader, AppBar, WindowContent, Divider} from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import logo3 from "react95/dist/images/logo3.png";
import dgn1 from './dgn1.gif';
import { Image } from 'react-bootstrap';
import TwitterIcon from './TwitterIcon.png';
import dgnIcon from './dgnIcon.png';
import OpenseaIcon from './OpenseaIcon.png';
import EtherscanIcon from './EtherscanIcon.png'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

//change to mainnet address upon live deployment
//import new ABI 
const contractAddressNum = "0x874894191f832cbA2efD72E40e4f6D11fEc38429";
const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(contractABI, contractAddressNum);

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 700;
    font-style: normal
  }
  @font-face {
    font-family: 'Roboto';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const getWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0]
    setCurrentAccount(account)
    return accounts[0]
}

const connectWallet = async () => {
  if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      window.ethereum.request({ method: "eth_requestAccounts"})
      console.log("connected")
  } catch (err) {
    console.log(err)
  }
  } else {
    console.log("Please install metamask")
  }
}

const mintNft = async () => {
  try {
    let account = await getWallet()
    let txn = await contract.methods.mint(1).send({from: account})
    return {
      status: 'Success',
      data: txn
    }
  } catch (err) {
    console.log(err)
  }
}

const connectWalletButton = () => {
    return (
      <Button onClick={connectWallet}>
        Connect Wallet
      </Button>
    )
  }

const mintNftButton = () => {
    return (
      <Button onClick={mintNft}>
        Mint
      </Button>
    )
  }

  const displayAddress = () => {
    return (
        <Button disabled style ={{position: 'absolute',display:'flex', left:85, bottom:3, height:'90%', width:475, backgroundColor:'#f9f9f9',fontSize:12}}>
          Wallet Connected: {currentAccount}
        </Button>
    )
  }

  const twitterLink = () => {
    window.open("https://twitter.com/dgn_alpha");
  }
  const openSeaLink = () => {
    window.open("https://opensea.io/collection/dgn-alpha")
  }
  const etherscanLink = () => {
    window.open("https://etherscan.io/address/0x874894191f832cba2efd72e40e4f6d11fec38429")
  }
  const secretLink = () => {
    window.open('https://secret-dgn.web.app', "_self")
  }

useEffect(() => {
    getWallet();
  }, [])

  return (
    <div className='main-app' style={{fontFamily:'Roboto'}}>
      <GlobalStyles/>
      <ThemeProvider theme={original}>
        <Window style={{ width:"100%", height: '100%' , position: 'absolute',top:0, left:0, right: 0, backgroundColor: '#008080'}}>
        <div>
          <div className='wl-only-list' style={{position: 'absolute', right:10, top:'85%'}}>
            <div>DGN is invite only and WL was given to members of DGN.</div>
            <div>Buying DGN tokens on OpenSea currently gives no value.</div>
            <div>We are not liable for anyone buying / selling DGN tokens.</div>
          </div>
          <Window style={{top: 80}}>
            <div>
              <WindowHeader style={{height: 21,padding:1.5}}>
                <Button style={{position:'absolute' ,right:7,top:8, width:20, height: 20}}>x</Button>
                <Button style={{position:'absolute' ,right:28,top:8, width:20, height: 20}}>-</Button>
              </WindowHeader>
            </div>
            <WindowContent>
              <Image src={dgn1} style={{height:325}}></Image>
              <div>
                <div>{currentAccount ? mintNftButton() : connectWalletButton()}</div>
             </div>
            </WindowContent>
          </Window>
        </div>
          <WindowContent>
            <AppBar style={{display: 'flex', height:'5%', width:'100%', position:'absolute', top:'95%', fontSize:12}}>
              <Button onClick={secretLink} style ={{cursor:'pointer',position: 'absolute', left:5, bottom:3, height:'90%', width:75, fontSize:12}}>
                <Image src={logo3} style={{height:20}}/>
                Start
              </Button>
              {currentAccount ? displayAddress() : displayAddress}
              <Button style ={{position: 'absolute', right:5, bottom:3, height:'90%', width:75, fontSize:10}}>10:22 am</Button>
            </AppBar>
          </WindowContent>
        <div className='wl-only-list' style={{position: 'absolute', right:8, top: 80}}>
          <Window> 
            <div>Whitelist Only</div>
            <Divider/>
            <div>DGN Only</div>
          </Window>
        </div>
        <div className='wl-only-list' style={{position: 'absolute', right:8, top: 10}}>
          <Window> 
            <div>This site was made for desktop use</div>
            <Divider/>
            <div>Some devices may have problems</div>
          </Window>
        </div>
        </Window>
        <div className="icons" style={{padding:20 ,position:'absolute', top: 50, left:50, color:'#fff', fontSize:13}}>
          <div style={{marginTop:"17%"}}>
            <Image src={TwitterIcon} onClick={twitterLink} style={{cursor:'pointer',height:75, left:20}}/>
            <div style={{fontColor:'#fff'}}>Twitter</div>
          </div>
          <div style={{marginTop:"17%"}}>
            <Image src={OpenseaIcon} onClick={openSeaLink} style={{cursor:'pointer',height:75, left:20, marginTop:20}}/>
            <div>Opensea</div>
          </div>
          <div style={{marginTop:"17%"}}>
            <Image src={EtherscanIcon} onClick={etherscanLink} style={{cursor:'pointer',height:75, left:20, marginTop:20}}/>
            <div>Contract</div>
          </div>
          <div style={{marginTop:"17%"}}>
            <Image src={dgnIcon} style={{height:75, left:20, marginTop:20}}/>
            <div>DGN</div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
export default App;
