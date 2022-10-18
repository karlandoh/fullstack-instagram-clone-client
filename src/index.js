import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';

import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThemeProvider} from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
	//here you set palette, typography ect...
  });

root.render(
	
		<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}> 
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</GoogleOAuthProvider>

);
