import axios from 'axios'


export default axios.create({
    baseURL: 'https://api-procrew-task.herokuapp.com/',
    headers: {

        'Content-type': 'application/json'
    }
})