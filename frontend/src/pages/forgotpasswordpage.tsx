import m from 'mithril';
import { bind } from '../uiutils';
import { Page } from './page';
import { AuthClient } from '../authclient';
import { LabelledInput } from '../components/labelledinput';
import { Button } from '../components/button';
import { LoginPanel } from '../components/loginpanel';

export class ForgotPasswordPage {

    email: string = '';

    oncreate(){
        document.getElementById('email').focus();
    }

    view() {
        return <LoginPanel title="Reset your password">
            <div {...bind(this)}>   
                <div class="mb-4">
                    <LabelledInput label="Email" id="email" type="email" placeholder="me@awesome.com"/>    
                    {AuthClient.user.loginError && <p class="text-red-500 text-xs italic">{AuthClient.user.loginError}</p>}
                </div>
                <div class="mb-4">
                    <Button label="Reset" disabled={!this.complete()} callback={() => this.resetpassword()}/>
                </div>
            </div>
        </LoginPanel>
    }

    async resetpassword() {
        await AuthClient.forgotPassword(this.email);
        if (!AuthClient.user.loginError){
            m.route.set('/confirmforgotpassword');
        }
        else {
            m.redraw();
        }
    }

    complete() {
        return this.email !== '';
    }
}