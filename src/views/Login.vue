<template>
    <div class="container">  
        <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
            Login successfully. <small>waiting for redirect.</small>
            <loader-component width="30"></loader-component>
        </div>  
  		<div id="loginbox" class="mainbox"> 
        	<div class="panel panel-default" style="padding : 0px 0px 60px 0px" >
            	<div class="panel-heading">
					<div style="text-align : left"><img src="../assets/images/logo.jpg" alt="Masmovil"></div>	
                	<div class="panel-title text-center">BSFT MERCURIO</div>
							</div>   
							
							<div class="panel-box">
									<div class="row" style="background-color: #ffffff; ">
											<div class="col-md-6 login-form-1 panel-body" style="border-right:2px solid silver">
                                                <div class="alert alert-info" v-if="errorOcurred">{{errorDetails}}</div>
													<form name="form" id="form" class="form-horizontal" enctype="multipart/form-data" method="POST">
															<div style="text-align : left">
																<p>To access enter</p>
															</div>
															<div class="input-group">
																	<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
																	<input id="userName" v-model="userName" type="text" class="form-control" name="userName" value="" placeholder="Username" :class="{ 'is-invalid': submitted && $v.userName.$error }">                                        
                                                                    <div v-if="submitted && !$v.userName.required" class="invalid-feedback">UserName is required</div>
                                                            </div>
															<div class="input-group">
																	<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
																	<input id="password" v-model="password" type="password" class="form-control" name="password" placeholder="Password" :class="{ 'is-invalid': submitted && $v.password.$error }">
                                                                    <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required</div>
															</div>                                                                  
															<div class="form-group" style="padding: 0px 0px 0px 10px; color: #333">
															<!-- Button -->
																	<div class="col-sm-12 controls">
																			<button id="login" type="submit" href="#" class="btn pull-left" style="background-color:#F9CE2C;" @click.prevent="login" v-if="!isLoggingIn"> Log in</button>
                                                                            <button class="btn pull-left" style="background-color:#F9CE2C;" disabled @click.prevent="login" v-if="isLoggingIn"><loader-component width="20"></loader-component></button> 
																			<div class="forgetPassword"><a href="">Forgot your password?</a> </div>   
																	</div>
															</div>

                                                            <div class="form-group" style="padding: 0px 0px 0px 25px; color: #333; text-align:left">
															   <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
															</div>
													</form>     
											</div> 
											<div class="col-md-6 login-form-2 panel-body" >
													<div class="panel2" style="text-align : left">
															<span style="font-weight:bold ; font-style: italic">If not a customer</span>    
															<p class="panel2Body" style="padding-top: 10px;">BSFT MERCURIO is an IP technology switchboard with all the functionlities of a conventional physical switchboard</p>
															<p class="panel2Body" style="padding-top: 5px;">Discover all the advantages and benefits!</p>
															<!-- Button -->
															<div class="col-sm-12 controls" style="padding-top: 18px; padding-left: 30px; ">
																	<button type="submit" href="#" class="btn pull-left" style="background-color:#F9CE2C"> To know more, <i>Click Here!</i></button>                          
															</div>                                    
													</div>
											</div> 
									</div>
							</div>
					</div>  
    	</div>
	</div>
</template>

<script>
import LoaderComponent from '../components/LoadingComponent'
import { setTimeout } from 'timers';
import axios from 'axios'
import { required } from "vuelidate/lib/validators";

export default {
    name : 'Login',
    components : {
        LoaderComponent
    },
    data() {
        return {
            userName : "",
            password : "",
            isLoggingIn: false,
            isAlertShow: false,
            errorOcurred:false,
            errorDetails:'',
            submitted: false,
        }
    },
    validations: {
        userName : { required },
        password : { required },
    },
    methods: {
        login() {
            this.submitted = true;  
            // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
            const apiUrl = "http://localhost:8090/login";
                axios.post(apiUrl, {
                    email : this.userName,
                    password : this.password
                })
                .then((response) => {
                    if(response.status == '208'){
                        const data = response.data;
                        this.errorDetails = data.message;
                        this.errorOcurred = true;
                    }else{
                        //this.headingDetails = 'Registered Successfully.';
                       console.log(response);
                       this.isLoggingIn = true
                        setTimeout(() => {
                            this.isLoggingIn = false
                            this.isAlertShow = true
                            setTimeout(() => this.redirect(), 1000)
                        }, 1000)
                        
                        
                        localStorage.setItem('token', response.data.jwt);
                        console.log(response.data.user.mobileNumber);
                        localStorage.setItem('userMobile', response.data.user.mobileNumber);
                        //this.user = {}
                        //this.$router.push({name: 'Login'})
                    }
                })
                .catch((error)=>{
                     if (error.response) {
                        // Request made and server responded
                        const data = error.response.data;
                        console.log(data)
                        this.errorDetails = data.message;
                        this.errorOcurred = true;
                     } else if (error.request) {
                        // The request was made but no response was received
                        console.log("res2"+error.request);
                     } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("res3"+ error.message);
                     }
                });


            
        },
        redirect() {
            this.$router.push({name: 'OTPPage'})
        }
    }
}
</script>

<style lang="scss">
.widget {
    margin: 0;
    height: unset;
}
.login-panel {
    position: relative;
    padding: 200px 0;
    .alert {
        opacity: 0;
        position: absolute;
        width: 100%;
        top: 100px;
        transition: all .5s;
        &.alert-primary {
            background-color: #007BFF;
            color: #fff;
            font-size: 18px;
            border: none;
        }
        .widget {
            position: absolute;
            right: 5px;
            top: 0;
            margin: 10px;
        }
    }
}
</style>