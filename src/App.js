import React from 'react';
import Axios from "axios";
import styled from 'styled-components';
import { AppContainer } from './components/AppContainer'
import ChoicePage from './pages/ChoicePage';
import SearchAd from './pages/SearchAd';
import CreateAd from './pages/CreateAd'

export default class App extends React.Component {
	state={
		page: 'SearchAd'
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
			case 'ChoicePage':
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