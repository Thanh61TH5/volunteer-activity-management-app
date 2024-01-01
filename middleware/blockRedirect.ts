// @ts-ignore
export default function ({ route, redirect }) {
    // Kiểm tra nếu route là /admin/ và có cố gắng chuyển hướng về /
    if (route.fullPath === '/admin/') {
        // Chặn chuyển hướng và thực hiện xử lý
        redirect('/admin/') // Chuyển hướng đến trang thông báo lỗi hoặc trang khác
    }
}
