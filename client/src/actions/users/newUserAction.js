import {GET_USER_SUCCESS,GET_USER_ERROR,ADD_USER_SUCCESS,ADD_USER_ERROR,DELETE_USER_SUCCESS,DELETE_USER_ERROR,EDIT_USER_SUCCESS,EDIT_USER_ERROR} from '../actionTypes';
import axios from 'axios';
import swal from 'sweetalert';



//const apiUrl = 'http://localhost:5000/newusers'
const apiUrl = '/newusers'
export const addUserAction = (addUser) => {                                                      
  return (dispatch) => {
    return axios.post(apiUrl, addUser)                                                
      .then(response => {
        let data = response.data;
        dispatch({type: ADD_USER_SUCCESS, payload: {
          
          id:data.id,
          user_name: data.user_name,
          contact_no: data.contact_no,
          address: data.address,
          
          
         }})  
        if(response.status===200)
                swal("User Added Successfully");
                else
                swal(response.data.message);
      })
     
      .catch(error => { throw(error) });
  };
};

      

export const getUserAction = () => {                                   
  return (dispatch) => {
    return axios.get(apiUrl)                               
      .then(response => {
        dispatch({type: GET_USER_SUCCESS, newusers: response.data})  
      })
      .catch(error => { throw(error); });
  };
};




export const deleteUserAction = (deleteUser) =>  {

    //console.log("localStorage.getItem('token')"+localStorage.getItem('token'));
    return (dispatch) => {
 
    return axios.delete(`${apiUrl}/${deleteUser.userId}`)

    
     .then(res => {
         console.log(res.data.value);
         console.log(res.data.message);
         dispatch({type: DELETE_USER_SUCCESS, payload: deleteUser.userId})
         if (res.status === 200)
         swal("User is deleted successfully");
         else
         swal(res.data.message);
     })
     .catch(err => {
         dispatch({
             type: DELETE_USER_ERROR,
             payload: err
         });
     });
 }
}


 export const editUserAction = (editUser) => {

    //console.log("localStorage.getItem('token')"+localStorage.getItem('token'));
    return (dispatch) =>{
    return axios.put(`${apiUrl}/${editUser.userId}`, editUser)
      
     .then(res => {
         console.log(res.data.value);
         console.log(res.data.message);
         let data = res.data;
         dispatch({type: EDIT_USER_SUCCESS, payload: {
           
          id:data.id,
          user_name: data.user_name,
          contact_no: data.contact_no,
          address: data.address,
         
          }})  
        
         if (res.status === 200)
         swal("User is edited successfully");
         else
         swal(res.data.message);
     })
     .catch(err => {
         dispatch({
             type: EDIT_USER_ERROR,
             payload: err
         });
     });
 }
}

 

