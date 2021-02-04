<template>

    <div class="container">
           <div class="row centered-form">
                <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
			    		    <h3 class="panel-title">BSFT MERCURIO</h3>
			 			</div>
                        <div class="panel-body">
                            <h6>Your password has expired. Please change now.<br/><br/></h6>
                            <form @submit.prevent="handleSubmit">
                                
                                   
                                        <div class="form-group">
                                            <input type="password" v-model="user.password" id="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                            <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                                <span v-if="!$v.user.password.required">Password is required</span>
                                                <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                            </div>
                                        </div>
                                    
                                        <div class="form-group">
                                            <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                                            <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                                                <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                                                <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                                            </div>
                                        </div>
                                    
                                
                                <div class="form-group">
                                    <button class="btn btn-info btn-block">Change Password</button>
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";

    export default {
        name: "ChangePassword",
        data() {
            return {
                user: {
                    password: "",
                    confirmPassword: ""
                },
                submitted: false
            };
        },
        validations: {
            user: {
                password: { required, minLength: minLength(6) },
                confirmPassword: { required, sameAsPassword: sameAs('password') }
            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

               // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                alert("SUCCESS!! :-)\n\n" + "Password Change request submitted");
                this.$router.push({name: 'Home'})
            }
        }
    };
</script>

