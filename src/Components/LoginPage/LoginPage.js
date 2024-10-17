import React, { useState, useRef } from 'react';
import './LoginPage.css';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';

function LoginPage(props) {
    const toast = useRef(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({
        errorEmail: '',
        errorPassword: '',
        valid: false // Initially invalid
    });

    const showError = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password.',
            life: 3000
        });
    };

    const [checked, setChecked] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        handleError(name); // Validate on change
    };

    const handleError = (field) => {
        let newError = { ...error }; 
        let valid = true; // Assume valid until proven otherwise

        if (field === 'email') {
            if (!form.email) {
                newError.errorEmail = 'Email is required.';
                valid = false;
            } else if (!emailRegex.test(form.email)) {
                newError.errorEmail = 'Email is invalid.';
                valid = false;
            } else {
                newError.errorEmail = ''; 
            }
        }

        if (field === 'password') {
            if (!form.password) {
                newError.errorPassword = 'Password is required.';
                valid = false;
            } else {
                newError.errorPassword = ''; 
            }
        }

        // Set the overall validity based on all fields
        newError.valid = !!form.email && !!form.password && !newError.errorEmail && !newError.errorPassword;
        setError(newError); 
        console.log("Error state:", newError); 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form Data:', form); 

       
            showError(); // Show error if form is invalid
          
        
        // Reset the form (optional)
        setForm({ email: '', password: '' });
        // Continue with your form submission logic here
    };

    return (
        <div className='container'>
            <div className='container--shapes'></div>
            <div className='login-container'>
                <Toast ref={toast} position="top-center"/>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='form--heading'>Welcome back!</div>
                    <div className='form--subtext'>The faster you fill up, the faster you get a ticket!</div>
                    <div>
                        <FloatLabel>
                            <InputText
                                style={{ width: '100%' }}
                                id="email"
                                name='email'
                                value={form.email}
                                onInput={handleChange}
                                onBlur={() => handleError('email')}
                                invalid={!!error.errorEmail}
                            />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                        {error.errorEmail && <small className='p-error'>{error.errorEmail}</small>}
                    </div>

                    <div className='form--padding'>
                        <FloatLabel>
                            <Password
                                style={{ width: '100%' }}
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                onBlur={() => handleError('password')}
                                feedback={false}
                                invalid={!!error.errorPassword}
                            />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                        {error.errorPassword && <small className='p-error'>{error.errorPassword}</small>}
                    </div>
                    <div className='form--texts'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                            <label htmlFor="rememberMe" style={{ marginLeft: '0.5rem' }}>Remember me</label>
                        </div>
                        <div>
                            <Link to='/passwordReset' className='form-link'>Forgot Password?</Link>
                        </div>
                    </div>
                    <div className='form--button'>
                        <Button 
                            type='submit' 
                            style={{ width: '100%' }} 
                            label="Log in"  
                            disabled={!error.valid} // Button is disabled when valid is false
                        />
                    </div>
                    <div className="form--register"></div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
