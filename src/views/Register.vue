<template>

    <div class="container">
        <div class="alert alert-primary" role="alert" :style="{opacity: headingRequired ? 1 : 0}">
            Registered Successfully. <small>waiting for redirect.</small>
            <loader-component width="30"></loader-component>
        </div> 
           <div class="row centered-form">
                <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div class="panel panel-default">
                        
                        <div class="panel-heading">
			    		    <h3 class="panel-title">BSFT MERCURIO</h3>
			 			</div>

                         <div class="alert alert-info" v-if="errorOcurred">{{errorDetails}}</div>
                         <!-- <div class="alert alert-info" v-if="headingRequired">{{headingDetails}}</div> -->
                         
                        <div class="panel-body">
                            <form @submit.prevent="handleSubmit">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="user.firstName" id="firstName" name="firstName" placeholder="First Name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.firstName.$error }" />
                                            <div v-if="submitted && !$v.user.firstName.required" class="invalid-feedback">First Name is required</div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="user.lastName" id="lastName" name="lastName" placeholder="Last Name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.lastName.$error }" />
                                            <div v-if="submitted && !$v.user.lastName.required" class="invalid-feedback">Last Name is required</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email Address" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                        <span v-if="!$v.user.email.required">Email is required</span>
                                        <span v-if="!$v.user.email.email">Email is invalid</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="text" v-model="user.mobileNumber" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number" class="form-control" :class="{ 'is-invalid': submitted && $v.user.mobileNumber.$error }" />
                                    <div v-if="submitted && !$v.user.mobileNumber.required" class="invalid-feedback">Mobile Number is required</div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <input type="password" v-model="user.password" id="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                            <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                                <span v-if="!$v.user.password.required">Password is required</span>
                                                <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                                            <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                                                <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                                                <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-info btn-block">Register</button>
                                </div>
                                <div class="form-group" style="padding: 0px 0px 0px 25px; color: #333; text-align:left">
									<p>Already Registerd? <router-link to="/login">Login here</router-link></p>
								</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!-- </form>
  </div> -->
</template>

<script>
import LoaderComponent from '../components/LoadingComponent'
import { setTimeout } from 'timers';
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

import axios from 'axios'

    export default {
        name: "Register",
        components : {
            LoaderComponent
        },
        data() {
            return {
                user: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobileNumber : ""
                    
                },
                submitted: false,
                errorOcurred:false,
                errorDetails:'',
                headingRequired:false,
                headingDetails:'',
                
            };
        },
        validations: {
            user: {
                firstName: { required },
                lastName: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confirmPassword: { required, sameAsPassword: sameAs('password') },
                mobileNumber: { required }
            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;  
                this.errorOcurred = false;
                this.headingRequired = false;
                //this.errorDetails = 'sourav';
                

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                
                const apiUrl = "http://localhost:8090/register-process";
                axios.post(apiUrl, this.user)
                .then((response) => {
                    if(response.status == '208'){
                        const data = response.data;
                        this.errorDetails = data.message;
                        this.errorOcurred = true;
                    }else{
                        //this.headingDetails = 'Registered Successfully.';
                        this.headingRequired = true;
                        setTimeout(() => {
                            this.isLoggingIn = false
                            this.isAlertShow = true
                            setTimeout(() => this.redirect(), 1000)
                        }, 1000)
                        
                        //this.user = {}
                        //this.$router.push({name: 'Login'})
                    }
                })
                .catch(function (error){
                     if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                     } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                     } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                     }
                });

               // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                
            },
            redirect() {
                this.$router.push({name: 'Login'})
            }
        }
    };
</script>

