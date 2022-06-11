import React from 'react'
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import {URL_FILE_UPLOAD_NEWS} from '../pages/constants';

class FileUpload extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFile:'',
            //id_news:'',
            pictures: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount(){
      const id_news=this.props.id_news;
      alert(id_news)
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
          //console.log(event)
    }

    submit(){
        const data = new FormData() 
        data.append('file', this.state.pictures[0])
        //console.warn(this.state.selectedFile);
        //let url = "http://www.ncod.in/sneha/JRM/controller/upload.php";
        let url = `${URL_FILE_UPLOAD_NEWS}`;
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res);
        })
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log(picture);
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                       
                            <div className="form-row">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop} 
                                imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                withPreview={true}
                                name="upload_file"
                                accept="accept=image/*"
                            />
                               
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default FileUpload;