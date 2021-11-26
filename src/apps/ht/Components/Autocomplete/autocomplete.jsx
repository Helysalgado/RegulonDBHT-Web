import React, { Component } from 'react'
import GetAutoComplete from '../../webServices/dataset/dataset_autoComplete'


 class Autocomplete extends Component {
    state = {
        sugges:[]
    }

    shouldComponentUpdate(nextProps, nextState){
          if(nextProps.keyword === this.props.keyword){
              return false
          }
          return true
    }


    render() {
        const {
            keyword,
            location
        } = this.props
        return (
            <GetAutoComplete keyWord={keyword} location={location} resoultsData={(data)=>{
                this.setState({sugges: data})
            }} />
        )
    }
}

export default Autocomplete
