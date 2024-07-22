import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, phantomWallet } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider 
    activeChain={"polygon"}
    supportedWallets={[
        metamaskWallet({
            recommended: true,
        }),
    coinbaseWallet(),
    walletConnect(),
    ]}
     clientId="bf783e8afe4c2547a9373fc7770da66e"
    >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)