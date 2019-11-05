import React, { Component } from 'react';
import { Auth, API} from 'aws-amplify';
// To federated sign in from Facebook
class AppleLogin extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        if (!window.FB) this.createScript();
    }

    signIn() {
        const apple = window.AppleID
        apple.auth.signIn((response) => {
            this.getAWSCredentials(response)
        });
    }

    getAWSCredentials(response) {
        const { id_token, user } = response;
        const date = new Date();
        const expires_at = Date.now() * 1000 + date.getTime();
        if (!id_token || !user) {
            return;
        }

        Auth.federatedSignIn('developer', { token: id_token, expires_at: expires_at}, user)
        .then(credentials => {
            console.log(credentials);
        });
    }

    createScript() {
        // load the sdk
        window.asyncInit = this.asyncInit;
        const script = document.createElement('script');
        script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
        script.async = true;
        script.onload = this.init;
        document.body.appendChild(script);
    }

    init() {
        // eslint-disable-next-line 
        const apple = window.AppleID;
        console.log('AppleJs inited');
    }

    asyncInit() {
        // init the fb sdk client
        const apple = window.AppleID;
        apple.auth.init({
            clientId : '[CLIENT_ID]',
            scope : '[SCOPES]',
            redirectURI: '[REDIRECT_URI]',
            state : '[STATE]'
        });;
    }

    render() {
        return (
            <div>
                <button onClick={this.signIn}>Apple login</button>
            </div>
        );
    }
}

export default AppleLogin