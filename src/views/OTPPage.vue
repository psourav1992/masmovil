<template>
    <div class="container">
        <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
            OTP is correct. <small>waiting for redirect.</small>
            <loader-component width="30"></loader-component>
        </div> 
           <div class="row centered-form">
                <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div class="panel panel-default">
                        
                        <div class="panel-heading">
			    		    <div class="panel-title"><h3>Please Enter Your OTP </h3>Sent to XXXXXXX{{userMobile.substring(userMobile.length-3,userMobile.length)}}</div>
			 			</div>

                         <div class="alert alert-info" v-if="errorOcurred">{{errorDetails}}</div>
                         <!-- <div class="alert alert-info" v-if="headingRequired">{{headingDetails}}</div> -->
                         
                        <div class="panel-body">
                            <form @submit.prevent="handleSubmit">
                                
                                <div class="form-group">
                                    <input type="text" v-model="otp" id="otp" name="otp" placeholder="Enter OTP here" class="form-control" :class="{ 'is-invalid': submitted && $v.otp.$error }" />
                                    <div v-if="submitted && $v.otp.$error" class="invalid-feedback">
                                        <span v-if="!$v.otp.required">OTP is required</span>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <button id="login" type="submit" href="#" class="btn pull-left" style="background-color:#F9CE2C;" @click.prevent="handleSubmit" v-if="!isLoggingIn"> Submit</button>
                                    <button class="btn pull-left" style="background-color:#F9CE2C;" disabled @click.prevent="handleSubmit" v-if="isLoggingIn"><loader-component width="20"></loader-component></button> 
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { setTimeout } from 'timers';
import LoaderComponent from '../components/LoadingComponent'

import axios from 'axios'

    export default {
        name: "OTPPage",
        components : {
            LoaderComponent
        },
        data() {
            return {
                otp: "",
                submitted: false,
                isLoggingIn:false,
                isAlertShow: false,
                errorOcurred:false,
                errorDetails:'',
                userMobile: localStorage.getItem('userMobile')
            };
        },
        validations: {
            otp: { required }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;  
                this.errorOcurred = false;
                
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                
                const apiUrl = "http://localhost:8090/validateOTP";
                axios.post(apiUrl, {
                    otpString : this.otp
                } ,
                {
                    headers : {
                        Authorization : 'Bearer '+localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    console.log(response)
                    if(response.status == '208'){
                        const data = response.data;
                        this.errorDetails = data.message;
                        this.errorOcurred = true;
                    }else{
                        //this.headingDetails = 'Registered Successfully.';
                        this.isLoggingIn = true
                        setTimeout(() => {
                            this.isLoggingIn = false
                            this.isAlertShow = true
                            setTimeout(() => this.redirect(), 1000)
                        }, 1000)
                        
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
                this.$router.push({name: 'Home'})
            }
        }
    };
</script>

<style scoped>

</style>


