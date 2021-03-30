import React from 'react';
import Axios from "axios";
import styled from 'styled-components';
import { AppContainer } from './components/AppContainer'
import ChoicePage from './pages/ChoicePage';
import SearchAd from './pages/SearchAd';





export default class App extends React.Component {
	state={
		page: 'ChoicePage'
	}


	onClickChangePage = (namePage) => {
		this.setState({page: namePage})
	}

	renderPage = () => {
		switch(this.state.page){
			case 'SearchAd':
				return <SearchAd/>
			case 'CreateAd':
				return <CreateAd/>
			case 'ChoicePAge':
				return <ChoicePage
				onClickChangePage={this.onClickChangePage}
				/>
			default:
				return <div/>
		}
	}




	render(){
		return(
			<div>
				{this.renderPage()}
			</div>
			)
	}
}