$(function() {
    const { form } = layui
    let index
    getCateList()

    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            const htmlStr = template('tpl', res)
                // console.log(htmlStr);

            $('tbody').html(htmlStr)
        })
    }
    $('.add-btn').click(function() {

        index = layer.open({
            title: '添加文章分类',
            content: $('.add-form-container').html(),
            area: ['500px', '300px']
        });
    })

    $(document).on('submit', '.add-form', function(e) {
        e.preventDefault()
        axios.post('/my/article/addcates', $(this).serialize()).then(res => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            layer.msg('添加分类成功')
            layer.close(index)
            getCateList()
        })
    })

      $(document).on('click',  '.edit-btn',  function()  {
        // console.log('编辑');
        index  =  layer.open({
            type:  1,
            title:   '修改文章分类',
            area:  ['500px',  '250px'],
            content:  $('.edit-form-container').html()

        })
        console.log($(this).data('id'));   
        const id = $(this).data('id')
        axios.get(`/my/article/cates/${id}`).then(res => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            form.val('edit-form', res.data)
        })
    })
    $(document).on('submit', '.edit-form', function(e) {
        e.preventDefault()
        axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            layer.close(index)
            getCateList()

        })
    })

    // 点击删除
    $(document).on('click', '.clear-btn', function(e) {
        e.preventDefault()
        console.log($(this).data('id'));   
        const id = $(this).data('id')
        console.log(id);

        axios.get(`/my/article/deletecate/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('删除失败!')
            }
            layer.msg('删除成功!')
            getCateList()

        })
    })
})