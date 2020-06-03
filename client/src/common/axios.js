import Axios from 'axios';

var axios = Axios.create({
    baseURL : "http://localhost:5000/"
})

export default axios;