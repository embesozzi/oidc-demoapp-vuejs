<template>
		<v-app id="keep">
		<!-- Bar -->
		<v-app-bar
			app
			clipped-left
		>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<img
				src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Telekom_Logo_2013.svg/200px-Telekom_Logo_2013.svg.png" style="width:60px;"
				alt="HT"
			>
			<span class="title ml-3 mr-5">Store&nbsp;<span class="font-weight-light">Online</span></span>
			<v-text-field
				solo-inverted
				flat
				hide-details
				label="Search"
			></v-text-field>
			<v-btn icon @click="callService" v-if="content=='products'">
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
				<v-btn icon @click="content='products'">
					<v-icon>mdi-apps</v-icon>
				</v-btn>
			 <v-btn icon @click="content='settings'">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
			<span v-if="response && response.profile">
				<v-icon
					color="grey lighten-3"
					large
				>
					mdi-account-circle
				</v-icon> 
				{{response.profile.name}}
			</span>
		</v-app-bar>
			<!-- Home menu -->
			<v-navigation-drawer
				v-model="drawer"
				app
				clipped
				color="grey lighten-4"
			>
				 <v-list
					dense
					class="grey lighten-4"
				 >
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-view-dashboard</v-icon>
						</v-list-item-icon>
						<v-list-item-content @click="content='products'">
							<v-list-item-title>Product Catalog</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-image</v-icon>
						</v-list-item-icon>
						<v-list-item-content @click="content='tokens'">
							<v-list-item-title>View tokens</v-list-item-title>
						</v-list-item-content>
						</v-list-item>
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-cog</v-icon>
						</v-list-item-icon>
						<v-list-item-content @click="content='settings'">
							<v-list-item-title>Settings</v-list-item-title>
						 </v-list-item-content>
					</v-list-item>
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-content @click="logout()">
							<v-list-item-title>Logout</v-list-item-title>
						 </v-list-item-content>
					</v-list-item>
				 </v-list>
		 </v-navigation-drawer>
		<v-main class="grey lighten-4">
			<v-progress-linear v-if="api.loading" :indeterminate="true" />
			<v-alert v-if="this.error.show"
				color="red"
				dense
				dismissible
				elevation="8"
				prominent
				text
				type="error"
			>{{this.error.msg}}</v-alert>
			<v-container
				fluid
				class="grey lighten-4"
			>
				<!-- Products page content -->
				<v-row v-if="content=='products' && !this.error.show"
					justify="center"
					align="center"
				>
					 <v-col
						v-for="result in results"
						:key="result.title"
						cols="3"
					>
					<v-card>
						<v-img
							:src='"product-" + result.id +".png"'
							class="white--text align-end"
							gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
							height="250px"
						>
						</v-img>
						<v-card-title>
							{{result.name}}
						</v-card-title>
						<v-card-subtitle>
							 {{result.description}}
						</v-card-subtitle>
						<v-card-text>
							<v-row
								align="center"
								class="mx-0"
							>
								<v-rating
									:value="result.id"
									color="amber"
									dense
									half-increments
									readonly
									size="14"
								></v-rating>
								<div class="grey--text ml-4">{{result.id}} (200)</div>
							</v-row>
						</v-card-text>
						<v-card-actions>
							 <v-btn text>Details</v-btn>
								<v-btn
									text
								>
									Buy
								</v-btn>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				</v-row>
				<!-- Token page content -->
				<v-row v-if="content=='tokens'">
					<v-expansion-panels popout>
						<v-expansion-panel>
							<v-expansion-panel-header>ID Token JWT</v-expansion-panel-header>
							<v-expansion-panel-content>
									{{response.id_token}}
							</v-expansion-panel-content>
						</v-expansion-panel>
						<v-expansion-panel>
							<v-expansion-panel-header>ID Token Payload</v-expansion-panel-header>
							<v-expansion-panel-content>
									<pre>{{idTokenPayload}}</pre>
							</v-expansion-panel-content>
						</v-expansion-panel>
						<v-expansion-panel>
							<v-expansion-panel-header>Access Token JWT</v-expansion-panel-header>
							<v-expansion-panel-content>
								{{accessToken}}	
							</v-expansion-panel-content>
						</v-expansion-panel>
						<v-expansion-panel>
							<v-expansion-panel-header>Access Token Payload</v-expansion-panel-header>
							<v-expansion-panel-content>
									<pre>{{accessTokenPayload}}</pre>
							</v-expansion-panel-content>
						</v-expansion-panel>
						<v-expansion-panel>
							<v-expansion-panel-header>Scopes</v-expansion-panel-header>
							<v-expansion-panel-content>
									{{response.scope}}
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-row>
				<!-- Setting page content -->
				<v-row v-if="content=='settings'">
						<v-col cols="12" sm="12">
							<v-text-field
								v-model="api.url"
								label="API Endpoint"
								outlined
								clearable
							></v-text-field>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	 </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
	name: 'User',
	data: () => ({
		results: null,
		content : "products", // Default page
		api : {
			url: (process.env) ? process.env.VUE_APP_API_URI : window.config.VUE_APP_API_URI,
			loading : false
		},
		error: {
			show : false,
			msg : null,
			errorCodes : {
				401 : " Not Unauthorized",
				403 : " Forbidden "
			}
		},
		drawer: null
	}),
	watch: {
    	content: function (val) {
			this.error.show = false;
      		if(val=="products"){
				this.callService();
			}
		}
    },
	computed: {
		...mapGetters({
				accessToken : 'auth/accessToken',
				response : 'auth/tokenResponse'
			}),
			idTokenPayload() {
					return JSON.stringify(JSON.parse(Buffer.from(this.response.id_token.split(".")[1], 'base64').toString()), null, 2);
			},
			accessTokenPayload() {
					return JSON.stringify(JSON.parse(Buffer.from(this.accessToken.split(".")[1], 'base64').toString()), null, 2);
			}
	},
	methods: {
		callService : function() 
		{
				console.log("Calling service: " + this.api.url);
				this.api.loading = true;
				console.log(Buffer.from(this.accessToken.split(".")[1], 'base64').toString())
				let authHeader = { headers: { Authorization: 'Bearer ' + this.accessToken } };
				axios.get(this.api.url, authHeader).then((response) => {
					this.results = response.data;
					this.api.loading = false;
					console.log(this.results)
			}).catch( error => { 
				console.log("Handling error code: " + error); 
				this.error.show =true;
				if(error.response){
					this.error.msg = this.error.errorCodes[error.response.status];
				}
				this.error.msg = this.error.msg  || "We received a server error"

				this.api.loading = false;
			});
		},
		logout : function () {
			this.$store.dispatch("auth/signOut");
		}
	}
}
</script>