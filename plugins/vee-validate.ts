import { defineRule } from 'vee-validate';

// @ts-ignore


export default defineNuxtPlugin(() => {

    defineRule('required', (value: string | any[]) => {
        if (!value || !value.length) {
            return 'Trường không được để trống';
        }
        return true;
    });
    defineRule('email', (value: string | any[]) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(<string>value)) {
            return 'Email không hợp lệ.';
        }
        return true
    });

    defineRule('password', (value: string | any[]) => {
        if (value.length <8) {
            return 'Mật khẩu phải có ít nhất 8 ký tự';
        }
        else if (!/[A-Z]/.test(<string>value)) {
            return 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa';
        }

        else if  (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(<string>value))  {
            return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt';
        }
        return true
    });

    defineRule('confirmPassword', (value: string | any[]) => {
        // @ts-ignore
        if (value != password.value) {
            return 'Mật khẩu xác nhận không khớp'
        }
        return true
    });

});
