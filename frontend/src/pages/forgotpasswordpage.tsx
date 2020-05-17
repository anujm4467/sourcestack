import m from 'mithril';
import { bind } from '../uiutils';
import { Page } from './page';
import { AuthClient } from '../authclient';
import { LabelledInput } from '../components/labelledinput';
import { Button } from '../components/button';

export class ForgotPasswordPage {

    email: string = '';

    oncreate(){
        document.getElementById('email').focus();
    }

    view() {
        let complete = this.complete();
        return <Page hideNavbar={true}>
            <div class="flex justify-center">
                <div class="w-full max-w-md pt-8">
                    <h1 class="text-center text-2xl mb-4">Reset your password</h1>
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" {...bind(this)}>
                        <div class="mb-4">
                            <LabelledInput label="Email" id="email" type="email" placeholder="me@awesome.com"/>    
                            {AuthClient.user.loginError && <p class="text-red-500 text-xs italic">{AuthClient.user.loginError}</p>}
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <Button label="Reset" disabled={!this.complete()} callback={() => this.resetpassword()}/>
                        </div>
                    </form>

                </div>
            </div>
        </Page>
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