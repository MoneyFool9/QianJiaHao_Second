; (function (doc) {
    //获取元素
    var obj = doc.getElementsByClassName
    //初始化值
    var field = 'tag',
        pageNum = 0;
    //保存网络请求API
    var API = {
        getArticleSource: '',

    };
    //入口函数
    var init = () => {
        getArticleSource();
        bindEvent();
    }
    //事件绑定函数
    function bindEvent() {
        obj.addEventListener('click', ObjClick, false);
    }

    function ObjClick() {

    }

    function getArticleSource() {
        ajax({
            url: API.getArticleSource,
            data: {

            },
            success: function (data) {
                var res = data.res,
                    pageNum = res.pageNum;

                _setDatas(field, res.data);
            },
            error: function () {

            },
        })
    }

    function _setDatas(field, data) {
        if (data && data.length > 0) {
            obj.innerHTML = renderList(field, data);
            showWarningTip(false);
        } else {
            showWarningTip(true);
        }
    }

    function showWarningTip(show) {
        if (show) {

        }
    }

    function renderList(listField, data) {
        var list = ''
        data.forEach((elem) => {
            list += listItemTpl.replace(/{{(.*?)}}/g, (node, key) => {
                return {
                    id: elem.id,
                    course: elem.course,
                    hour: elem.hour,
                    teacher: elem.teacher,
                    field: elem.field,
                    type: listField == 'trash' ? 'regain' : 'search',
                    typeText: listField == 'trash' ? '恢复' : '删除'
                }[key];
            })
        })
        return list;
    }

    init();
})(document)