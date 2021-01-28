$(function() {
    // 从layui中提取form表单模块
    const { form } = layui

    $('.link a').click(function() {
        $('.layui-form').toggle()
    })

    form.verify({
        pass: [
            /\w{6,12}$/,
            '密码只能在6到12位之间'
        ],
        samePass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.reg-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                $('.login-form a').click()
            })
    })

    $('.login-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token)
                layer.msg
                location.href = './index.html'
            })

    })






})