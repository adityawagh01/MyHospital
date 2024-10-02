import React, { useState } from 'react';
import './Login.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios'; // Import axios to make API requests
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: email,
        password: password
      });
      
      // If login is successful, store token (e.g., in localStorage)
      const { token } = response.data;
      localStorage.setItem('token', token);
      // Redirect to the new page
      navigate('/success');
      // setSuccess('Login successful!');
      // setError('');
      
      // Redirect to a protected route, if necessary
      // window.location.href = '/protected-route';
    } catch (err) {
      setError('Invalid username or password');
      setSuccess('');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Email address'
                id='formControlLg'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p style={{color: 'red'}}>{error}</p>}
              {success && <p style={{color: 'green'}}>{success}</p>}

              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Dont have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;



// // src/pages/Login.js
// import React from 'react';
// import './Login.css';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon
// }
// from 'mdb-react-ui-kit';

// function Login() {
//   return (
//     <MDBContainer fluid>

//       <MDBRow className='d-flex justify-content-center align-items-center h-100'>
//         <MDBCol col='12'>

//           <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
//             <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

//               <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//               <p className="text-white-50 mb-5">Please enter your login and password!</p>

//               <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
//               <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

//               <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
//               <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
//                 Login
//               </MDBBtn>

//               <div className='d-flex flex-row mt-3 mb-5'>
//                 <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
//                   <MDBIcon fab icon='facebook-f' size="lg"/>
//                 </MDBBtn>

//                 <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
//                   <MDBIcon fab icon='twitter' size="lg"/>
//                 </MDBBtn>

//                 <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
//                   <MDBIcon fab icon='google' size="lg"/>
//                 </MDBBtn>
//               </div>

//               <div>
//                 <p className="mb-0">Dont have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>

//               </div>
//             </MDBCardBody>
//           </MDBCard>

//         </MDBCol>
//       </MDBRow>

//     </MDBContainer>
//   );
// }

// export default Login;
