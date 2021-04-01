import React from 'react';
import Axios from "axios";
import styled from 'styled-components';
import { AppContainer } from './components/AppContainer'
import ChoicePage from './pages/ChoicePage';
import SearchAd from './pages/SearchAd';
import CreateAd from './pages/CreateAd'

const DivContainer = styled.div`
	background: #E8EBF0;
	width: 100vw;
	margin: 0;
	padding: 0;
`

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
				return <SearchAd
				onClickChangePage={this.onClickChangePage}/>
			case 'CreateAd':
				return <CreateAd
				onClickChangePage={this.onClickChangePage}/>
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
			<DivContainer>
				{this.renderPage()}
			</DivContainer>
			)
	}
}