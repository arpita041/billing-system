import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { Link } from 'react-router-dom';
import { Password } from 'primereact/password';
import './PasswordResetPage.css';

function PasswordResetPage(props) {
    const [email, setEmail] = useState('');
    const [renderUi, setRenderUi] = useState({
        renderOtpBlock:false,
        renderPasswordBlock:false
    })
    const [token, setToken] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('')

    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        let newRenderUi = {...renderUi}
        if (email != '') {
           newRenderUi.renderOtpBlock = true;
        } else {
            newRenderUi.renderOtpBlock = false;
        }
        setRenderUi(newRenderUi);
    }
    const handleError = () =>{
        let errorEmail='';
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
            errorEmail = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            errorEmail = 'Email is invalid.';
        } 
        setErrorEmail(errorEmail);
    }
    const renderBlock = () => {
        if (renderUi.renderOtpBlock) {
            return <>
                <div className='flex justify-content-center'>
                    <div className="fadeinright animation-duration-400 flex align-items-center justify-content-center
        font-bold">
                        <InputOtp value={token} onChange={(e) => setToken(e.value)} />
                    </div>
                </div>
            </>
        }
        if (renderUi.renderPasswordBlock) {
            return <>
                <div className='password-field'>
                 <FloatLabel>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                </div>
                <div>
                <FloatLabel>
                    <Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false} />
                    <label htmlFor="Cpassword">Confirm Password</label>
                </FloatLabel>     
                </div>
              
            </>
        }
        else {
            return <>
                <FloatLabel >
                    <InputText
                        style={{ width: '100%' }}
                        id="email"
                        name='email'
                        value={email}
                        onChange={handleChange}
                        onBlur={handleError}
                        invalid={errorEmail}
                    />
                    <label htmlFor="email">Enter your Email</label>
                </FloatLabel>
                {errorEmail && <div className='flex align-item-center m-1'> <i className='p-error pi pi-exclamation-triangle mr-1'></i><small className='p-error' >{errorEmail}</small></div>}
            </>
        }
    }
    return (
        <div className='container'>
            <div className='container--shapes'></div>
            <div className='field-container'>
                <div className='container--header'>Reset your Password</div>
                <div style={{ paddingBottom: '8%' }}>
                    {renderBlock()}
                </div>
                <Button onClick={handleSubmit} style={{ width: '100%' }} label="Submit" />
                <div ><Link to='/login' className='container--end'>Return to login Page</Link></div>
            </div>

        </div>
    );
}

export default PasswordResetPage;