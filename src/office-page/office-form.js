import React from 'react'
import '../scss/main.scss'
import axios from 'axios'
import GV from '../shared/global-vars'
import cookie from 'react-cookie';
import OfficePageService from './office-page.service'
 axios.interceptors.request.use(function (config) {
            var authData = cookie.load('authorizationData');
            if(authData && authData.token){
                config.headers['Authorization'] = `Basic ${authData.token}`
            }
            return config;
        }, function (error) {
            // Do something with request error 
            return Promise.reject(error);
});
class OfficeForm extends React.Component{
    constructor(props){
        super(props)
     this.state = {
        fileVal: '',
        titleVal: '',
        descrVal: '',
        file: '',
       };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        var data = new FormData();
        data.append('file', this.state.file);
        data.append('title', this.state.titleVal);
        data.append('description', this.state.descrVal);
        var myThis = this
        OfficePageService.saveVideo(data).then(function(res){
            myThis.setState({
                file: '',
                fileVal: '',
                titleVal:'',
                descrVal:''
            })
            myThis.props.getSavedVideo(res.data)
        });
    }
    
    handleInputChange(event){
         const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name+ ' '+ value)
        if(name === "fileVal"){
                let files = target.files;
                this.setState({
                file: files[0]
            })

        }
        
        this.setState({
            [name]:value
        })
        
  
}
   
    render(){
        return(
            <form name="form1" onSubmit={this.handleSubmit} className="video-upload-form" encType="multipart/form-data">
                    <div>
                        <input name="fileVal" value={this.state.fileVal} onChange={this.handleInputChange} type="file"   className="upload form-control input-lg"/>
                    </div>
                    <div>
                        <input name="titleVal" value={this.state.titleVal} onChange={this.handleInputChange} placeholder="title" className="upload form-control input-lg" type="text"/>
                    </div>
                    <div>
                        <textarea name="descrVal" value={this.state.descrVal} onChange={this.handleInputChange} placeholder="description" className="upload form-control input-lg"/>
                    </div>
                    <div>
                        <button className="btn btn-dark top20"  type="submit">Save</button>
                    </div>
                </form>
        )
    }
    
}

export default OfficeForm