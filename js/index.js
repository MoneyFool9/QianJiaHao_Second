window.addEventListener('DOMContentLoaded', () => {
    const signUpAction = ((doc) => {
        var oModal = doc.getElementsByClassName('J_userPage')[0],
            oUsername = doc.getElementById('J_username'),
            oPassword = doc.getElementById('J_password'),
            oSubmitBtn = doc.getElementsByClassName('J_signUpBtn')[0],
            oIsPassword = doc.getElementById('J_isPassword'),
            clearUserNameInput = doc.getElementsByClassName('J_clearInput')[2],
            clearPassWordInput = doc.getElementsByClassName('J_clearInput')[3],
            hidePw = doc.getElementsByClassName('J_hidePw')[1],
            showPw = doc.getElementsByClassName('J_showPw')[1],
            hideConfirmPw = doc.getElementsByClassName('J_hidePw')[2],
            showConfirmPw = doc.getElementsByClassName('J_showPw')[2],
            oU_ErrorTip = doc.getElementsByClassName('J_UerrorTip')[0],
            oP_ErrorTip = doc.getElementsByClassName('J_PerrorTip')[0],
            oIs_ErrorTip = doc.getElementsByClassName('J_IserrorTip')[0];

        return {
            register: function (e) {
                e.preventDefault();

                var username = trimSpace(oUsername.value),
                    password = trimSpace(oPassword.value),
                    isPassword = trimSpace(oIsPassword.value);

                if (username.length < 6 || username.length > 20) {
                    oU_ErrorTip.innerText = '用户名长度：6-20位';
                    return;
                }
                if (password.length < 6 || password.length > 20) {
                    oP_ErrorTip.innerText = '密码长度：6-20位';
                    return;
                }
                if (password !== isPassword) {
                    oIs_ErrorTip.innerText = '两次密码输入不一致';
                    return;
                }
                this.submitForm(username, password);
            },
            submitForm: (username, password) => {
                ajax({
                    url: 'http://1.12.220.218:8585/cat/user/register',
                    method: 'POST',
                    data: {
                        username: username,
                        password: password
                    },
                    contentType: "application/json",
                    success: (res) => {
                        if (res.code === 200) {
                            window.location.reload();
                            alert('注册成功，快去登录吧！')
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },



            openSignUpBoard: () => {
                oModal.style.display = 'block';
            },
            closeSignUpBoard: () => {
                oModal.style.display = 'none';
                oUsername.value = '';
                oPassword.value = '';
            },
            checkInput: () => {
                oUsername.addEventListener('input', signUpAction.enableLoginBtn, false);
                oPassword.addEventListener('input', signUpAction.enableLoginBtn, false);
                oIsPassword.addEventListener('input', signUpAction.enableLoginBtn, false);
            },
            enableLoginBtn: () => {
                if (oUsername.value && oPassword.value && oIsPassword.value) {
                    oSubmitBtn.className += ' checked';
                } else {
                    oSubmitBtn.className = 'login-btn J_signUpBtn';
                }
                if (oUsername.value) {
                    clearUserNameInput.style.display = 'block';
                } else {
                    clearUserNameInput.style.display = 'none';
                }

                if (oPassword.value) {
                    clearPassWordInput.style.display = 'block';
                    hidePw.style.display = 'block';
                } else {
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                }
                if (oIsPassword.value) {
                    hideConfirmPw.style.display = 'block';
                } else {
                    hideConfirmPw.style.display = 'none';
                }
                oU_ErrorTip.innerText = '';
                oIs_ErrorTip.innerText = '';
                oP_ErrorTip.innerText = '';
            },
            clearUserNameInputEvent: () => {
                clearUserNameInput.addEventListener('click', () => {
                    oUsername.value = '';
                    clearUserNameInput.style.display = 'none';
                }, false);
            },
            clearPassWordInputEvent: () => {
                clearPassWordInput.addEventListener('click', () => {
                    oPassword.value = '';
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                    showPw.style.display = 'none';
                }, false);
            },
            hidePwEvent: () => {
                hidePw.addEventListener('click', () => {
                    hidePw.style.display = 'none';
                    showPw.style.display = 'block';
                    oPassword.type = 'text';
                }, false);
            },
            showPwEvent: () => {
                showPw.addEventListener('click', () => {
                    hidePw.style.display = 'block';
                    showPw.style.display = 'none';
                    oPassword.type = 'password';
                }, false);
            },
            hideConfirmPwEvent: () => {
                hideConfirmPw.addEventListener('click', () => {
                    hideConfirmPw.style.display = 'none';
                    showConfirmPw.style.display = 'block';
                    oIsPassword.type = 'text';
                }, false);
            },
            showConfirmPwEvent: () => {
                showConfirmPw.addEventListener('click', () => {
                    showConfirmPw.style.display = 'none';
                    hideConfirmPw.style.display = 'block';
                    oIsPassword.type = 'password';
                }, false);
            },
            clearInput: () => {
                oUsername.value = '';
                oPassword.value = '';
                oIsPassword.value = '';
                clearUserNameInput.style.display = 'none';
                clearPassWordInput.style.display = 'none';
                hidePw.style.display = 'none';
                showPw.style.display = 'none';
                hideConfirmPw.style.display = 'none';
                showConfirmPw.style.display = 'none';
                oSubmitBtn.className = 'login-btn J_signUpBtn';
            }
        }
    })(document)

    const loginAction = ((doc) => {
        var oUsername = doc.getElementById('J_loginUsername'),
            oPassword = doc.getElementById('J_loginPassword'),
            isPersisted = doc.getElementsByClassName('J_persistedPw')[0],
            oSubmitBtn = doc.getElementsByClassName('J_loginBtn')[0],
            clearUserNameInput = doc.getElementsByClassName('J_clearInput')[0],
            clearPassWordInput = doc.getElementsByClassName('J_clearInput')[1],
            hidePw = doc.getElementsByClassName('J_hidePw')[0],
            showPw = doc.getElementsByClassName('J_showPw')[0],
            oU_ErrorTip = doc.getElementsByClassName('J_Login_UerrorTip')[0],
            oP_ErrorTip = doc.getElementsByClassName('J_Login_PerrorTip')[0],
            loginStatusToggle = doc.getElementById('J_loginStatusToggle').innerHTML,
            openLoginPage = doc.getElementsByClassName('J_openLoginPage')[0],
            loginedHistory = doc.getElementById('J_loginedHistory').innerHTML,
            historyBox = doc.getElementsByClassName('J_historyBox')[0];

        var API = {
            submitLogin: 'http://1.12.220.218:8585/cat/user/login',
            getUserInfo: 'http://1.12.220.218:8585/cat/user/me',
            logout: 'http://1.12.220.218:8585/cat/user/logout'
        }

        return {
            login: function (e) {
                e.preventDefault();

                var username = trimSpace(oUsername.value),
                    password = trimSpace(oPassword.value),
                    isPersistedLogin = isPersisted.checked;

                if (username.length < 6 || username.length > 20) {
                    oU_ErrorTip.innerText = '用户名长度：6-20位';
                    return;
                }
                if (password.length < 6 || password.length > 20) {
                    oP_ErrorTip.innerText = '密码长度：6-20位';
                    return;
                }
                this.submitForm(username, password, isPersistedLogin);
            },
            submitForm: function (username, password, isPersistedLogin) {
                _self = this;
                ajax({
                    url: API.submitLogin,
                    method: 'POST',
                    data: {
                        username: username,
                        password: password
                    },
                    contentType: "application/json",
                    success: (res) => {
                        if (res.code === 200) {
                            window.localStorage.setItem('Token', res.data);
                            alert('登录成功！');
                            window.location.reload();
                            _self.checkAuth();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            checkAuth: function () {
                var Token = window.localStorage.getItem('Token');
                if (Token !== null) {
                    this.getUserInfo();
                    this.render(true);
                    this.loginEvent(true);
                } else {
                    alert('您还没有登录，快去登录吧！')
                    window.location.href = 'index.html';
                }

            },
            render: (isLogin) => {
                if (isLogin) {
                    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

                    if (userInfo) {
                        openLoginPage.innerHTML = loginStatusToggle.replace(/{{(.*?)}}/g, (node, key) => {
                            return {
                                userImg: userInfo.avatar || './images/userImg.png',
                                userName: userInfo.username,
                                fans: JSON.stringify(userInfo.fans) || '--',
                                follows: JSON.stringify(userInfo.follows) || '--',
                                like: JSON.stringify(userInfo.like) || '--'
                            }[key.trim()];
                        })
                    }

                    historyBox.innerHTML = loginedHistory;
                }
            },
            getUserInfo: () => {
                var Token = window.localStorage.getItem('Token');
                ajax({
                    url: API.getUserInfo,
                    headers: {
                        token: Token
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            window.localStorage.setItem('userInfo', JSON.stringify(res.data));
                        } else {
                            alert('登录已失效，请重新登录！');
                            window.location.reload();
                        }
                    }
                });
            },
            loginOut: () => {
                ajax({
                    url: API.logout,
                    method: 'POST',
                    header: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            window.localStorage.removeItem('Token');
                            window.localStorage.removeItem('userInfo');
                            window.location.reload();
                            alert('退出成功');
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            toMyUserPage: () => {
                window.location.href = '?field=userInfo';
            },
            toUserProfile: () => {
                window.location.href = '?field=userProfile';
            },
            loginEvent: function (isLogin) {
                if (isLogin) {
                    var loginOutBtn = doc.getElementById('J_loginOutBtn'),
                        toMyUserBtn = doc.getElementById('J_toMyUserBtn'),
                        userImgBox = doc.getElementById('J_userImgBox'),
                        toUserProfile = doc.getElementById('J_toUserProfile');

                    loginOutBtn.addEventListener('click', this.loginOut, false);
                    toMyUserBtn.addEventListener('click', this.toMyUserPage, false);
                    userImgBox.addEventListener('click', this.toMyUserPage, false);
                    toUserProfile.addEventListener('click', this.toUserProfile, false);
                }
            },

            checkInput: () => {
                oUsername.addEventListener('input', loginAction.enableLoginBtn, false);
                oPassword.addEventListener('input', loginAction.enableLoginBtn, false);
            },
            enableLoginBtn: () => {
                if (oUsername.value && oPassword.value) {
                    oSubmitBtn.className += ' checked';
                } else {
                    oSubmitBtn.className = 'login-btn J_loginBtn';
                }
                if (oUsername.value) {
                    clearUserNameInput.style.display = 'block';
                } else {
                    clearUserNameInput.style.display = 'none';
                }

                if (oPassword.value) {
                    clearPassWordInput.style.display = 'block';
                    hidePw.style.display = 'block';
                } else {
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                }

                oU_ErrorTip.innerText = '';
                oP_ErrorTip.innerText = '';
            },
            clearUserNameInputEvent: () => {
                clearUserNameInput.addEventListener('click', () => {
                    oUsername.value = '';
                    clearUserNameInput.style.display = 'none';
                }, false);
            },
            clearPassWordInputEvent: () => {
                clearPassWordInput.addEventListener('click', () => {
                    oPassword.value = '';
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                    showPw.style.display = 'none';
                }, false);
            },
            hidePwEvent: () => {
                hidePw.addEventListener('click', () => {
                    hidePw.style.display = 'none';
                    showPw.style.display = 'block';
                    oPassword.type = 'text';
                }, false);
            },
            showPwEvent: () => {
                showPw.addEventListener('click', () => {
                    hidePw.style.display = 'block';
                    showPw.style.display = 'none';
                    oPassword.type = 'password';
                }, false);
            },
            clearInput: () => {
                oUsername.value = '';
                oPassword.value = '';
                clearUserNameInput.style.display = 'none';
                clearPassWordInput.style.display = 'none';
                hidePw.style.display = 'none';
                showPw.style.display = 'none';
                oSubmitBtn.className = 'login-btn J_loginBtn';
            }
        }

    })(document)

    const commentAction = ((doc) => {
        var commentBroad = doc.getElementById('J_commentBroad'),
            commentCon = doc.getElementById('comment_content'),
            inputNumLimit = doc.getElementById('inputNumLimit'),
            commentListContainer = doc.getElementsByClassName('J_commentListContainer')[0],
            commentListTpl = doc.getElementById('J_commentListTpl').innerHTML,
            submitCmtBtn = doc.getElementById('J_submitCmtBtn');

        var API = {
            postComment: 'http://1.12.220.218:8585/cat/comment/post',
            deleteComment: 'http://1.12.220.218:8585/cat/comment/delete',
            getFirstComment: 'http://1.12.220.218:8585/cat/comment/first',
            getMultiComment: 'http://1.12.220.218:8585/cat/comment/multi',
            getUserInfo: 'http://1.12.220.218:8585/cat/user/'
        }

        var flag = true,
            userData = [],
            commentValue = '';

        return {
            init: function () {
                var _self = this;
                this.bindEvents();
                setTimeout(() => {
                    _self.getFirstComment(10, 1);

                }, 1000);
                setTimeout(() => {
                    var commentReplayBtn = doc.getElementsByClassName('J_commentReplayBtn'),
                        secondCommentCon = doc.getElementsByClassName('J_secondCommentCon'),
                        deleteBtn = doc.getElementsByClassName('J_deleteBtn');
                    for (let i = 0; i < commentReplayBtn.length; i++) {
                        commentReplayBtn[i].addEventListener('click', _self.openReplayBroad, false)
                        commentReplayBtn[i].setAttribute('data-i', i);
                        secondCommentCon[i].addEventListener('input', _self.checkSecondInputNum, false)
                        secondCommentCon[i].setAttribute('data-i', i);
                        deleteBtn[i].addEventListener('click', _self.deleteComment, false);
                    }

                }, 1500)
            },
            bindEvents: function () {
                commentCon.addEventListener('input', this.checkInputNum, false)
                submitCmtBtn.addEventListener('click', this.submitCmtBtnClick.bind(commentAction), false)
            },
            submitCmtBtnClick: function () {
                commentValue = commentCon.value;
                const articleId = getUrlQueryValue('articleId');

                this.submitComment(commentCon, inputNumLimit, articleId, commentValue, 0);

            },
            openCommentBroad: (show) => {
                if (show) {
                    commentBroad.classList.add('show');
                } else {
                    commentBroad.classList.remove('show');
                }
            },
            openReplayBroad: function (e) {
                var secondEditInput = doc.getElementsByClassName('J_secondEditInput'),
                    commentReplayBtn = doc.getElementsByClassName('J_commentReplayBtn');
                var tar = e.target;
                const i = tar.getAttribute('data-i');
                if (flag) {
                    flag = false;
                    commentReplayBtn[i].innerHTML = '<i class="iconfont">&#xe63a;</i>收起';
                    secondEditInput[i].classList.add('show');
                } else {
                    flag = true;
                    commentReplayBtn[i].innerHTML = '<i class="iconfont">&#xe63a;</i>回复';
                    secondEditInput[i].classList.remove('show');
                }
            },
            submitComment: function (obj, em, articleId, content, parentId) {
                ajax({
                    url: API.postComment,
                    method: 'POST',
                    contentType: 'application/json',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId,
                        content: content,
                        parentId: parentId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            obj.value = '';
                            em.innerText = 1000;
                            console.log('成功');
                            this._makeItem();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            deleteComment: (e) => {
                var tar = e.target,
                    commentId;
                while (tar = tar.parentNode) {
                    if (tar.className === 'comment-list') {
                        commentId = tar.getAttribute('data-id');
                        break;
                    }
                }
                ajax({
                    url: API.deleteComment,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        commentId: commentId,
                    },
                    success: (res) => {
                        tar.innerHTML = '';
                        if (res.code === 200) {
                            console.log('成功');

                        }
                    }
                })
            },
            getFirstComment: function (pageSize, Page) {
                ajax({
                    url: API.getFirstComment,
                    data: {
                        articleId: getUrlQueryValue('articleId'),
                        pageSize: pageSize,
                        page: Page
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log('res=>', res);
                            commentListContainer.innerHTML = this.renderCmtList(res.data.records);
                            var comment_img = doc.getElementsByClassName('J_comment_img'),
                                comment_name = doc.getElementsByClassName('J_comment_name');
                            setTimeout(() => {
                                for (let i = 0; i < comment_img.length; i++) {
                                    var j = comment_img.length - (1 + i);
                                    comment_img[i].src = userData[j].avatar ? userData[j].avatar : './images/userImg.png';
                                    comment_name[i].innerText = userData[j].username;
                                }
                            }, 1000)

                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            getSecondComment: function (commentId) {
                ajax({
                    url: API.getMultiComment,
                    data: {
                        commentId: commentId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log('res=>', res);
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            getUserInfo: function (userId) {
                ajax({
                    url: API.getUserInfo,
                    path: {
                        id: userId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            userData.push(res.data);
                        }
                    }
                })
            },
            renderCmtList: function (data) {
                var list = '';
                for (let i = 0; i < data.length; i++) {
                    this.getUserInfo(data[i].userId);
                }
                if (data) {
                    data.forEach((elem) => {
                        list += commentListTpl.replace(/{{(.*?)}}/g, (node, key) => {
                            return {
                                id: elem.id,
                                content: elem.content || ''
                            }[key.trim()]
                        })
                    })
                }

                return list;
            },
            _makeItem: function () {
                var firstItem = doc.getElementsByClassName('comment-list')[0];

                const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                var newElement = commentListTpl.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        id: 0,
                        avatar: userInfo.avatar || './images/userImg.png',
                        username: userInfo.username || '',
                        content: commentValue || ''
                    }[key.trim()]
                })
                firstItem.insertAdjacentHTML('beforebegin', newElement)
            },
            _appendSecondCmt: function () {

            },
            checkInputNum: () => {
                var val = commentCon.value,
                    valLen = val.length;

                inputNumLimit.innerText = 1000 - valLen;
            },
            checkSecondInputNum: (e) => {
                const i = e.target.getAttribute('data-i');
                var inputNumLimit_second = doc.getElementsByClassName('inputNumLimit_second'),
                    secondCommentCon = doc.getElementsByClassName('J_secondCommentCon');

                var val = secondCommentCon[i].value,
                    valLen = val.length;

                inputNumLimit_second[i].innerText = 1000 - valLen;
            },


        }
    })(document)

    const userDetailAction = ((doc) => {
        var userDetailPage = doc.getElementsByClassName('J_userDetailPage')[0],
            mainContent = doc.getElementsByClassName('J_mainContent')[0],
            userMsgTpl = doc.getElementById('J_searchUserInfo').innerHTML,
            userMsg_img = doc.getElementById('userMsg_img'),
            userMsg_name = doc.getElementById('userMsg_name');

        var userInfo = {};

        var API = {
            doFollow: 'http://1.12.220.218:8585/cat/user/follow',
            getFansList: 'http://1.12.220.218:8585/cat/user/fans',
            getFollowList: 'http://1.12.220.218:8585/cat/user/follows',
            getMyArticleList: 'http://1.12.220.218:8585/cat/article/me',
            isFollow: 'http://1.12.220.218:8585/cat/user/isFollow'
        }

        return {
            init: function () {
                this.bindEvent();
            },
            bindEvent: function () {

            },
            getFansList: function (userId) {
                ajax({
                    url: API.getFansList,
                    data: {
                        userId: userId
                    },
                    success: (res) => {
                        if (res.code === 200) {

                        }
                    }
                })
            },
            getFollowList: function (userId) {
                ajax({
                    url: API.getFollowList,
                    data: {
                        userId: userId
                    },
                    success: (res) => {
                        if (res.code === 200) {

                        }
                    }
                })
            },
            getMyArticle: function (pageSize, page) {
                ajax({
                    url: API.getMyArticleList,
                    data: {
                        pageSize: pageSize,
                        page: page
                    },
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {

                        }
                    }
                })
            },
            doFollow: function (userId) {
                ajax({
                    url: API.doFollow,
                    method: 'POST',
                    data: {
                        userId: userId
                    },
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {

                        }
                    }
                })
            },
            isFollow: function (userId) {
                ajax({
                    url: API.isFollow,
                    data: {
                        userId: userId
                    },
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {

                        }
                    }
                })
            },
            checkedUrlToDetail: function () {
                userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                if (getUrlQueryValue('field') === 'userProfile') {
                    mainContent.style.display = 'none';
                    userDetailPage.style.display = '';
                    userMsg_img.src = userInfo.avatar;
                    userMsg_name.innerText = userInfo.username;
                    this.init();
                }
            },
            toUserDetail: () => {
                window.location.href = '?field=userProfile';
            }
        }
    })(document)

    const userInfoModifyAction = ((doc) => {
        var myUserPage = doc.getElementsByClassName('J_myUserPage')[0],
            mainContent = doc.getElementsByClassName('J_mainContent')[0],
            userInfo_img = doc.getElementById('userInfo_img'),
            userInfo_name = doc.getElementById('userInfo_name'),
            userInfo_nickname = doc.getElementById('userInfo_nickname'),
            userInfo_id = doc.getElementById('userInfo_id'),
            userInfo_intro = doc.getElementById('userInfo_intro'),
            newPwInput = doc.getElementById('newPwInput'),
            submitNewPw = doc.getElementById('submitNewPw'),
            modifyPwdClose = doc.getElementById('modifyPwdClose'),
            newPwdForm = doc.getElementById('newPwdForm'),
            modifyPwdBtn = doc.getElementById('modifyPwdBtn'),
            modifyUserInfoBtn = doc.getElementById('modifyUserInfoBtn'),
            togglePwdBtn = doc.getElementById('togglePwdBtn'),
            modifyUserInfoForm = doc.getElementById('modifyUserInfoForm'),
            userInfoClose = doc.getElementById('userInfoClose'),
            userNameInput = document.getElementById('userNameInput'),
            userIntroInput = document.getElementById('userIntroInput'),
            userImgInput = doc.getElementById('userImgInput'),
            uploadImgBtn = doc.getElementById('uploadImg'),
            submitUserInfoBtn = doc.getElementById('submitUserInfo');



        var userInfo = {},
            flag = true,
            userImg = '',
            imgFile;

        var API = {
            modifyUserInfo: 'http://1.12.220.218:8585/cat/user/modify/userInfo',
            modifyUserPassword: 'http://1.12.220.218:8585/cat/user/modify/password',
            uploadUserImg: 'http://1.12.220.218:8585/cat/file/uploadImg',
        }

        return {
            init: function () {
                this.loadingUserInfo();
                this.bindEvent();
            },
            loadingUserInfo: () => {
                userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                userInfo_img.src = userInfo.avatar ? userInfo.avatar : './images/userImg.png';
                userInfo_name.innerText = userInfo.username;
                userInfo_nickname.innerText = userInfo.username;
                userInfo_id.innerText = userInfo.id;
                userInfo_intro.innerText = userInfo.intro;
            },
            bindEvent: function () {
                _self = this;
                submitNewPw.addEventListener('click', (e) => {
                    e.preventDefault();
                    _self.submitNewPwd();
                })
                modifyPwdClose.addEventListener('click', () => {
                    newPwInput.value = '';
                    newPwdForm.style.display = 'none';
                })
                modifyPwdBtn.addEventListener('click', () => {
                    newPwdForm.style.display = 'block';
                })
                togglePwdBtn.addEventListener('click', () => {
                    if (flag) {
                        flag = false;
                        newPwInput.type = 'text';
                        togglePwdBtn.innerHTML = '<i class="iconfont">&#xe730;</i>'
                    } else {
                        flag = true;
                        newPwInput.type = 'password';
                        togglePwdBtn.innerHTML = '<i class="iconfont">&#xe7a8;</i>'
                    }
                })
                userInfoClose.addEventListener('click', () => {
                    userNameInput.value = '';
                    userIntroInput.value = '';
                    userImgInput.value = '';
                    userImg = '';
                    modifyUserInfoForm.style.display = 'none';
                })
                modifyUserInfoBtn.addEventListener('click', () => {
                    modifyUserInfoForm.style.display = 'block';
                })
                userImgInput.addEventListener('change', this.uploadFileEvent, false);
                uploadImgBtn.addEventListener('click', this.uploadBtnClick.bind(userInfoModifyAction), false)
                submitUserInfoBtn.addEventListener('click', this.submitUserInfoBtnClick.bind(userInfoModifyAction));
            },
            uploadBtnClick: function (e) {
                e.preventDefault();

                this.uploadUserImg(imgFile);
            },
            submitUserInfoBtnClick: function (e) {
                e.preventDefault();

                var username = userNameInput.value,
                    intro = userIntroInput.value;

                this.submitUserInfo(username, intro, userImg);
            },
            uploadFileEvent: function () {
                imgFile = this.files[0];
            },
            submitNewPwd: function () {
                var newPwd = newPwInput.value;
                ajax({
                    url: API.modifyUserPassword,
                    method: 'POST',
                    contentType: 'application/json',
                    data: {
                        password: newPwd
                    },
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('密码修改成功，请重新登录');
                            loginAction.loginOut();
                        }
                    }
                })
            },
            submitUserInfo: function (username, intro, avatar) {
                ajax({
                    url: API.modifyUserInfo,
                    method: 'POST',
                    contentType: 'application/json',
                    data: {
                        username: username,
                        intro: intro,
                        avatar: avatar
                    },
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('用户信息修改成功');
                            window.location.reload();
                        }
                    }
                })
            },
            uploadUserImg: function (file) {
                var fd = new FormData();
                fd.append('file', file);

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.onload = () => {
                    res = JSON.parse(xhr.response);
                    if (res.code = 200) {
                        userImg = res.data;
                        uploadImgBtn.innerText = '上传成功';
                    } else {
                        alert(res.msg);
                    }

                }
                xhr.open("POST", API.uploadUserImg);
                xhr.setRequestHeader("token", window.localStorage.getItem("Token"));

                xhr.send(fd);
            },
            checkedUrlToUser: function () {
                if (getUrlQueryValue('field') === 'userInfo') {
                    mainContent.style.display = 'none';
                    myUserPage.style.display = '';
                    this.init();
                }
            }
        }
    })(document)

    const articleAction = ((doc) => {
        var articleDetailPage = doc.getElementsByClassName('J_articleDetailPage')[0],
            postArticlePage = doc.getElementsByClassName('J_postArticlePage')[0],
            mainContent = doc.getElementsByClassName('J_mainContent')[0],
            articleDetailCon = doc.getElementsByClassName('articleDetail-content')[0],
            articleTpl = doc.getElementById('articleTpl').innerHTML,
            fanBox = doc.getElementById('fanBox').querySelector('span'),
            avatarBox = doc.getElementsByClassName('avatar_pic')[0],
            cardName = doc.getElementById('card_name'),
            profileName = doc.getElementsByClassName('profile-name')[0],
            profileImg = doc.getElementsByClassName('profile-img')[0];


        const API = {
            postArticle: 'http://1.12.220.218:8585/cat/article/post',
            modifyArticleCon: 'http://1.12.220.218:8585/cat/article/update',
            deleteArticle: 'http://1.12.220.218:8585/cat/article/delete',
            collectArticle: 'http://1.12.220.218:8585/cat/article/collect',
            likeArticle: 'http://1.12.220.218:8585/cat/article/like',
            dislikeArticle: 'http://1.12.220.218:8585/cat/article/dislike',
            addArticleView: 'http://1.12.220.218:8585/cat/article/view',
            isCollection: 'http://1.12.220.218:8585/cat/article/idCollected',
            isLiked: 'http://1.12.220.218:8585/cat/article/isLiked',
            getArticleDetail: 'http://1.12.220.218:8585/cat/article/detail',
            getSpecialArticle: 'http://1.12.220.218:8585/cat/article/related'
        }

        return {
            init: function () {
                this.getArticleDetail();
                this.bindEvent();
            },
            bindEvent: function () {

            },

            getSpecialArticle: function (type) {
                ajax({
                    url: API.getSpecialArticle,
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        type: type
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log(res.data);
                        }
                    }
                })
            },
            postArticle: function (title, type, img, content, summary) {
                ajax({
                    url: API.postArticle,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    contentType: 'application/json',
                    data: {
                        title: title,
                        type: type,
                        img: img,
                        content: content,
                        summary: summary
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('文章发布成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            modifyArticleCon: function (articleId, title, type, img, content, summary) {
                ajax({
                    url: API.modifyArticleCon,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    contentType: 'application/json',
                    data: {
                        id: articleId,
                        title: title,
                        type: type,
                        img: img,
                        content: content,
                        summary: summary
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('文章修改成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            deleteArticle: function (articleId) {
                ajax({
                    url: API.deleteArticle,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        id: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('文章删除成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            collectArticle: function (articleId) {
                ajax({
                    url: API.collectArticle,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('文章收藏成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            isCollection: function (articleId) {
                ajax({
                    url: API.isCollection,
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log(res.data);
                        }
                    }
                })
            },
            likeArticle: function (articleId) {
                ajax({
                    url: API.likeArticle,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('文章点赞成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            dislikeArticle: function (articleId) {
                ajax({
                    url: API.dislikeArticle,
                    method: 'POST',
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            alert('踩文章成功');
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            isLiked: function (articleId) {
                ajax({
                    url: API.isLiked,
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: articleId
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log(res.data);
                        }
                    }
                })
            },
            addArticleView: function () {
                ajax({
                    url: API.addArticleView,
                    headers: {
                        token: window.localStorage.getItem('Token')
                    },
                    data: {
                        articleId: getUrlQueryValue('articleId')
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log(res.data);
                        }
                    }
                })
            },
            getArticleDetail: function () {
                _self = this;
                ajax({
                    url: API.getArticleDetail,
                    data: {
                        id: getUrlQueryValue('articleId')
                    },
                    success: (res) => {
                        if (res.code === 200) {
                            console.log(res.data);
                            _self.renderArticleDetailPage(res.data);
                        }
                    }
                })
            },
            renderArticleDetailPage: (data) => {
                fanBox.innerText = data['userInfo']['fans'];
                avatarBox.src = data['userInfo']['avatar'] ? data['userInfo']['avatar'] : './images/userImg.png';
                profileImg.src = data['userInfo']['avatar'] ? data['userInfo']['avatar'] : './images/userImg.png';
                cardName.innerText = data['userInfo']['username'];
                profileName.innerHTML = data['userInfo']['username'];

                articleDetailCon.innerHTML = articleTpl.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        title: data['title'],
                        createTime: data['createTime'],
                        collected: data['collected'],
                        content: data['content'],
                        type: data['type'],
                        viewed: data['viewed'],
                        liked: data['liked'],
                        username: data['userInfo']['username']
                    }[key.trim()]
                })
            },



            toArticleDetail: (articleId) => {
                window.location.href = `index.html?articleId=${articleId}`;
            },
            toPostArticle: () => {
                window.location.href = 'index.html?field=postArticle';
            },

            checkedUrlToArticle: function () {
                if (getUrlQueryValue('articleId')) {
                    mainContent.style.display = 'none';
                    articleDetailPage.style.display = '';
                    commentAction.init();
                    this.init();
                }
            },
            checkUrlToPostArticle: () => {
                var navCon = doc.getElementById('J_navCon'),
                    nav_left = navCon.querySelector('.nav-left'),
                    nav_middle = navCon.querySelector('.nav-middle');

                if (getUrlQueryValue('field') === 'postArticle') {
                    mainContent.style.display = 'none';
                    postArticlePage.style.display = '';
                    nav_left.innerHTML = '<a href="./index.html"><img src="./images/logo.png" alt=""></a><span class="postArt-title"><i id="postArt-goBack" class="iconfont">&#xe685;</i>发布文章</span>'
                    nav_middle.innerHTML = '';
                    const goBack = doc.getElementById('postArt-goBack');
                    goBack.addEventListener('click', () => {
                        window.history.back();
                    })
                }
            }
        }
    })(document)

    ; ((doc) => {
        //获取dom元素
        var slide_rightArrow = doc.getElementsByClassName('J_rightArrow')[0],
            slide_leftArrow = doc.getElementsByClassName('J_leftArrow')[0],
            focus = doc.getElementsByClassName('J_focus')[0],
            focusWidth = focus.offsetWidth,
            slide_ul = focus.querySelector('ul'),
            slide_ol = focus.querySelector('ol'),
            topArtPic = doc.getElementsByClassName('J_topArtPic')[0],
            topArtInfo = doc.getElementsByClassName('J_topArtInfo')[0],
            ArticleBox = doc.getElementsByClassName('J_ArticleBox')[0],
            HotArticleBox = doc.getElementsByClassName('J_HotArticleBox')[0],
            mainNav = doc.getElementsByClassName('J_mainNav')[0],
            mainNav_ul = mainNav.querySelector('ul'),
            mainArticleBox = doc.getElementsByClassName('J_mainArticle')[0],
            mainArticleCon = doc.getElementById('J_mainArticleCon').innerHTML,
            loginForm = doc.getElementsByClassName('J_loginForm')[0],
            registerForm = doc.getElementsByClassName('J_signUpForm')[0],
            closeFormBtn1 = doc.getElementsByClassName('J_closeForm')[0],
            closeFormBtn2 = doc.getElementsByClassName('J_closeForm')[1],
            openFormBtn = doc.getElementsByClassName('J_openLoginPage')[0],
            toRegister = doc.getElementsByClassName('J_toRegister')[0],
            toLogin = doc.getElementsByClassName('J_toLogin')[0],
            loginInfo = doc.getElementsByClassName('J_loginInfo')[0],
            openBtn = doc.getElementsByClassName('J_openBtn')[0],
            _openBtn = doc.getElementsByClassName('J_openBtn')[1],
            headerTypeBox = doc.getElementsByClassName('J_headerTypeBox')[0],
            headerType_ul = doc.getElementsByClassName('J_headerType_ul')[0],
            headerType_ul_li = headerType_ul.querySelectorAll('a'),
            TypeBoxDown = doc.getElementById('J_down'),
            TypeBoxUp = doc.getElementById('J_up'),
            mainRightFixed = doc.getElementById('mainRightFixed'),
            searchInput = doc.getElementsByClassName('J_searchInput')[0],
            searchBtn = doc.getElementsByClassName('J_searchBtn')[0],
            downList = doc.getElementsByClassName('J_downList')[0],
            downList_ul = downList.querySelector('ul'),
            searchNav = doc.getElementsByClassName('J_searchNav')[0],
            searchNav_ul = searchNav.querySelector('ul'),
            mainContent = doc.getElementsByClassName('J_mainContent')[0],
            searchContent = doc.getElementsByClassName('J_searchContent')[0],
            searchArticleContent = doc.getElementsByClassName('J_searchCon')[0],
            postArticle = doc.getElementsByClassName('J_postArticle')[0],
            postArtBtn = doc.getElementsByClassName('J_postArtBtn')[0],
            registerBtn = doc.getElementsByClassName('J_signUpBtn')[0],
            loginBtn = doc.getElementsByClassName('J_loginBtn')[0],
            searchUserInfo = doc.getElementById('J_searchUserInfo').innerHTML,
            commonList = doc.getElementById('J_commonList'),
            loadingTpl = doc.getElementById('J_loadingTpl').innerHTML,
            defaultTpl = doc.getElementById('J_defaultTpl').innerHTML,
            postArticleBtn = doc.getElementById('J_postArticleBtn'),
            commentCloseBtn = doc.getElementById('J_commentCloseBtn'),
            commentOpenBtn = doc.getElementById('J_commentOpenBtn'),
            openComment = doc.getElementById('J_openComment'),
            navList_ul = doc.getElementsByClassName('J_D_navList')[0].querySelector('ul'),
            commentBroad = doc.getElementById('J_commentBroad'),
            toUserInfoBtn = doc.getElementById('J_toUserInfo');


        //初始化变量值
        var num = 0,
            flag = true,
            circle = 0,
            timer = null,
            isLoading = false,
            isToBottom = true,
            page = 1,
            keyword = '',
            field = '';

        var API = {
            getArticleList: 'http://1.12.220.218:8585/cat/article/all',
            getHotArticle: 'http://1.12.220.218:8585/cat/article/hot',
            userLogin: 'http://1.12.220.218:8585/cat/user/login',
            userRegister: 'http://1.12.220.218:8585/cat/user/register',
            getArticleType: 'http://1.12.220.218:8585/cat/article/getTypes',
            getSearchList: 'http://1.12.220.218:8585/cat/article/search',
            getUserSearchList: 'http://1.12.220.218:8585/cat/user/search',
            getArticleToType: 'http://1.12.220.218:8585/cat/article/type'
        };

        const init = () => {
            createDocument();
            bindEvents();
            autoSlide(true);
            getArticleList(5, 1, _setArticleData);
            getHotArticle(5, 1, _setHotArticleData);
            someEffects();
            getArticleList(10, 1, _setMainArticleData);
            getArticleType();
            signUpAction.checkInput();
            loginAction.checkInput();
            loadSearchContent();
            loginAction.checkAuth();
            userInfoModifyAction.checkedUrlToUser();
            userDetailAction.checkedUrlToDetail();
            articleAction.checkUrlToPostArticle();
            articleAction.checkedUrlToArticle();
        }

        const getArticleList = (pageSize, page, fn) => {
            ajax({
                url: API.getArticleList,
                data: {
                    pageSize: pageSize,
                    page: page
                },
                success: (res) => {
                    if (res.code == 200) {
                        fn(res)
                    } else {
                        console.log('请求数据失败');
                    }
                },
                error: () => {

                }
            })
        }

        const getHotArticle = (pageSize, page, fn) => {
            ajax({
                url: API.getHotArticle,
                data: {
                    pageSize: pageSize,
                    page: page

                },
                success: (res) => {
                    if (res.code === 200) {
                        fn(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
        }

        const getArticleType = () => {
            ajax({
                url: API.getArticleType,
                success: (res) => {
                    if (res.code === 200) {
                        _setArticleType(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
        }

        const getSearchList = (keyword, pageSize, page, fn) => {
            ajax({
                url: API.getSearchList,
                data: {
                    key: keyword,
                    pageSize: pageSize,
                    page: page
                },
                success: (res) => {
                    if (res.code === 200) {

                        fn(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
        }

        const getUserSearchList = (keyword, pageSize, page) => {
            ajax({
                url: API.getUserSearchList,
                data: {
                    key: keyword,
                    pageSize: pageSize,
                    page: page
                },
                success: (res) => {
                    if (res.code === 200) {
                        searchArticleContent.innerHTML = loadingTpl;
                        _setUserSearchListData(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
        }

        const getMoreArticle = () => {
            if (!isLoading) {
                isLoading = true;
                page++;
                console.log(1);
                getArticleList(10, page, _setMainArticleData);

                setTimeout(() => {
                    isLoading = false;
                }, 1000)
            }
        }

        const renderMainArticle = (data) => {
            var list = '';

            data.forEach((elem) => {
                list += mainArticleCon.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        img: elem.img || './images/ImgLoading.jpg',
                        title: elem.title,
                        content: elem.content,
                        liked: elem.liked,
                        disliked: elem.disliked,
                        username: elem.userInfo.username,
                        id: elem.id
                    }[key.trim()];
                })
            })
            return list;
        }

        const renderUserSearchList = (data) => {
            var list = '';

            data.forEach((elem) => {
                list += searchUserInfo.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        img: elem.avatar || './images/userImg.png',
                        username: elem.username,
                        follows: elem.follows || '0',
                        fans: elem.fans || '0',
                        intro: elem.info || '这家伙很懒，什么都没有留下',
                        id: elem.id
                    }[key.trim()];
                })
            })
            return list;
        }

        const _setHotArticleData = (res) => {
            var HotArticleBox_ul = HotArticleBox.querySelector('ul')
            for (let i = 0; i < res.data.records.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = `
<h2>${res.data.records[i].title}</h2>
<p>${res.data.records[i].summary}</p>
`;
                HotArticleBox_ul.appendChild(li);
            }
        }

        const _setMainArticleData = (res) => {
            if (res.data && res.data.records && res.data.records.length) {
                mainArticleBox.innerHTML += renderMainArticle(res.data.records);
                bindMainArticleToDetail();
            }
        }

        const _setSearchArticleData = (res) => {
            searchArticleContent.innerHTML = loadingTpl;
            if (res.data && res.data.records && res.data.records.length) {
                searchArticleContent.innerHTML = renderMainArticle(res.data.records);
                bindMainArticleToDetail();
            } else {
                searchArticleContent.innerHTML = defaultTpl;
            }
        }

        const _setArticleType = (res) => {
            if (res.data && res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                    headerType_ul_li[i].innerText = res.data[i].name;
                }
            }
        }

        const _setSearchListData = (res) => {
            for (let i = 0; i < res.data.records.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = `
<a href="#">${res.data.records[i].title}</a>
`;
                downList_ul.appendChild(li);
            }
        }

        const _setHotArticleToSearchCon = (res) => {
            if (res.data && res.data.records && res.data.records.length) {
                searchArticleContent.innerHTML = renderMainArticle(res.data.records);
                bindMainArticleToDetail();
            } else {
                searchArticleContent.innerHTML = defaultTpl;
            }
        }

        const _setArticleData = (res) => {
            var topArtPic_img = topArtPic.querySelector('img');
            topArtPic_img.src = res.data.records[1].img[0];

            var topArtInfo_h2 = topArtInfo.querySelector('h2'),
                topArtInfo_p = topArtInfo.querySelector('p');

            var ArticleBox_ul = ArticleBox.querySelector('ul');
            topArtInfo_h2.innerText = res.data.records[1].title;
            topArtInfo_p.innerText = res.data.records[1].summary;
            for (let i = 0; i < res.data.records.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = `
<h2>${res.data.records[i].title}</h2>
<p>${res.data.records[i].summary}</p>
`;
                ArticleBox_ul.appendChild(li);
            }
        }

        const _setUserSearchListData = (res) => {
            if (res.data && res.data.records && res.data.records.length) {
                searchArticleContent.innerHTML = renderUserSearchList(res.data.records);
            } else {
                searchArticleContent.innerHTML = defaultTpl;
            }
        }

        const bindEvents = () => {
            focus.addEventListener('mouseenter', focusMouseIn, false);
            focus.addEventListener('mouseleave', focusMouseOut, false);
            slide_leftArrow.addEventListener('click', sdLeftClick, false);
            slide_rightArrow.addEventListener('click', sdRightClick, false);
            mainNav_ul.addEventListener('click', mainNavClick, false);
            navList_ul.addEventListener('click', navClick, false);
            searchNav_ul.addEventListener('click', searchNavClick, false);
            closeFormBtn1.addEventListener('click', signUpAction.closeSignUpBoard, false);
            closeFormBtn2.addEventListener('click', signUpAction.closeSignUpBoard, false);
            openFormBtn.addEventListener('click', (e) => {
                signUpAction.openSignUpBoard();
                return false;
            }, false);
            openBtn.addEventListener('click', () => {
                signUpAction.openSignUpBoard();
                loginInfo.style.transition = 'none';
                loginInfo.style.visibility = 'hidden';
                loginInfo.style.opacity = '0';
            }, false);
            _openBtn.addEventListener('click', signUpAction.openSignUpBoard, false);
            openFormBtn.addEventListener('mouseenter', loginMouseIn, false);
            openFormBtn.addEventListener('mouseleave', loginMouseOut, false);
            postArtBtn.addEventListener('mouseenter', postArtMouseIn, false);
            postArtBtn.addEventListener('mouseleave', postArtMouseOut, false);
            postArtBtn.addEventListener('click', articleAction.toPostArticle, false);
            toRegister.addEventListener('click', toRegisterClick, false);
            toLogin.addEventListener('click', toLoginClick, false);
            registerBtn.addEventListener('click', signUpAction.register.bind(signUpAction), false);
            loginBtn.addEventListener('click', loginAction.login.bind(loginAction), false);
            loginAction.clearPassWordInputEvent();
            loginAction.clearUserNameInputEvent();
            loginAction.hidePwEvent();
            loginAction.showPwEvent();
            signUpAction.clearUserNameInputEvent();
            signUpAction.clearPassWordInputEvent();
            signUpAction.hidePwEvent();
            signUpAction.showPwEvent();
            signUpAction.hideConfirmPwEvent();
            signUpAction.showConfirmPwEvent();
            headerTypeBox.addEventListener('mouseenter', TypeBoxMouseIn, false);
            headerTypeBox.addEventListener('mouseleave', TypeBoxMouseOut, false);
            window.addEventListener('scroll', () => {
                scrollToBottom(getMoreArticle);
                isMainRightFixed();
            }, false);
            searchInput.addEventListener('input', searchInputing, false);
            searchInput.addEventListener('keyup', searchInputKeyup, false);
            searchBtn.addEventListener('click', searchBtnClick, false);
            commonList.addEventListener('click', commonListClick, false);
            postArticleBtn.addEventListener('click', articleAction.toPostArticle, false);
            commentOpenBtn.addEventListener('click', commentAction.openCommentBroad.bind(null, true), false);
            openComment.addEventListener('click', commentAction.openCommentBroad.bind(null, true), false);
            commentCloseBtn.addEventListener('click', commentAction.openCommentBroad.bind(null, false), false);
            commentBroad.addEventListener('click', commentAction.openCommentBroad.bind(null, false), false);
            downList_ul.addEventListener('click', downListClick, false);
            toUserInfoBtn.addEventListener('click', userDetailAction.toUserDetail, false)
        }

        const searchInputing = () => {
            keyword = searchInput.value;
            downList_ul.innerHTML = '';
            if (keyword === '') {
                downList.style.display = 'none';
            } else {
                downList.style.display = 'block';
            }
            throttle(getSearchList(keyword, 10, 1, _setSearchListData), 1000);
        }

        const searchInputKeyup = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                searchBtnClick();
            }
        }

        const TypeBoxMouseIn = () => {
            headerType_ul.classList.add('active');
            TypeBoxDown.style.display = 'none';
            TypeBoxUp.style.display = 'block';
        }

        const TypeBoxMouseOut = () => {
            headerType_ul.classList.remove('active');
            TypeBoxDown.style.display = 'block';
            TypeBoxUp.style.display = 'none';
        }

        const focusMouseIn = () => {
            autoSlide(false);
            slide_rightArrow.style.opacity = 1;
            slide_leftArrow.style.opacity = 1;
            slide_leftArrow.style.transform = 'translate(0)';
            slide_rightArrow.style.transform = 'translate(0)';
        }

        const focusMouseOut = () => {
            autoSlide(true);
            slide_rightArrow.style.opacity = 0;
            slide_leftArrow.style.opacity = 0;
            slide_leftArrow.style.transform = 'translate(-60px)';
            slide_rightArrow.style.transform = 'translate(60px)';
        }

        const loginMouseIn = () => {
            loginInfo.style.visibility = 'visible';
            loginInfo.style.opacity = '1';
        }

        const loginMouseOut = () => {
            loginInfo.style.visibility = 'hidden';
            loginInfo.style.opacity = '0';
        }

        const postArtMouseIn = () => {
            postArticle.style.visibility = 'visible';
            postArticle.style.opacity = '1';
        }

        const postArtMouseOut = () => {
            postArticle.style.visibility = 'hidden';
            postArticle.style.opacity = '0';
        }

        const downListClick = (e) => {
            const tar = e.target;
            if (tar.tagName === 'A') {
                keyword = tar.innerText;
            } else {
                keyword = tar.children[0].innerText;
            }
            window.location.href = `?path=${keyword}`;
        }

        const sdLeftClick = () => {
            if (flag) {
                flag = false;
                if (num == 0) {
                    num = slide_ul.children.length - 1;
                    slide_ul.style.left = -num * focusWidth + 'px';

                }
                num--;
                animate(slide_ul, -num * focusWidth, () => {
                    flag = true;
                })
                circle--;
                if (circle < 0) {
                    circle = slide_ol.children.length - 1;
                }
                circleChange();
            }
        }

        const sdRightClick = () => {
            if (flag) {
                flag = false;
                if (num == slide_ul.children.length - 1) {
                    num = 0;
                    slide_ul.style.left = 0;
                }
                num++;
                animate(slide_ul, -num * focusWidth, () => {
                    flag = true;
                })
                circle++;
                if (circle == slide_ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }
        }

        const mainNavClick = (e) => {
            tar = e.target;
            for (let i = 0; i < mainNav_ul.children.length; i++) {
                mainNav_ul.children[i].className = '';
            }
            if (tar.tagName === 'A') {
                tar.parentNode.className = 'current'
            } else {
                tar.className = 'current';
            }
        }

        const navClick = (e) => {
            tar = e.target;
            for (let i = 0; i < navList_ul.children.length; i++) {
                navList_ul.children[i].className = '';
            }
            tar.className = 'current';
        }

        const searchNavClick = (e) => {
            tar = e.target;
            keyword = getUrlQueryValue('path');
            for (let i = 0; i < searchNav_ul.children.length; i++) {
                searchNav_ul.children[i].className = '';
            }
            if (tar.tagName === 'A') {
                tar.parentNode.className = 'current'
                field = tar.parentNode.dataset.field;
            } else {
                tar.className = 'current';
                field = tar.dataset.field;
            }
            if (field === 'user') {
                searchArticleContent.innerHTML = '';
                getUserSearchList(keyword, 10, 1);
            } else {
                searchArticleContent.innerHTML = '';
                getSearchList(keyword, 10, 1, _setSearchArticleData);
            }
        }

        const commonListClick = (e) => {
            tar = e.target;
            var click = '';
            keyword = getUrlQueryValue('path');
            for (let i = 0; i < commonList.children.length; i++) {
                commonList.children[i].className = '';
            }
            if (tar.tagName === 'A') {
                tar.parentNode.className = 'current'
                click = tar.parentNode.dataset.click;
            } else {
                tar.className = 'current';
                click = tar.dataset.click;
            }
            if (click === 'hotCon') {
                searchArticleContent.innerHTML = loadingTpl;
                getHotArticle(10, 1, _setHotArticleToSearchCon);
            } else {
                searchArticleContent.innerHTML = loadingTpl;
                getSearchList(keyword, 10, 1, _setSearchArticleData);
            }

        }

        const toRegisterClick = () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            loginAction.clearInput();
        }

        const toLoginClick = () => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            signUpAction.clearInput();
        }

        const searchBtnClick = () => {
            keyword = searchInput.value;
            window.location.href = `?path=${keyword}`;
        }

        const bindMainArticleToDetail = () => {
            var mainBox = doc.getElementsByClassName('J_mainBox');
            for (let i = 0; i < mainBox.length; i++) {
                mainBox[i].addEventListener('click', (e) => {
                    var tar = e.target;
                    const articleId = getItemNode(tar).dataset.articleid;
                    articleAction.toArticleDetail(articleId);
                })
            }

        }

        const createDocument = () => {
            for (let i = 0; i < slide_ul.children.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('index', i);
                slide_ol.appendChild(li);
                slide_ol.children[0].className = 'current';
                li.addEventListener('mouseenter', function () {
                    for (let i = 0; i < slide_ol.children.length; i++) {
                        slide_ol.children[i].className = '';
                    }
                    this.className = 'current';
                    var index = this.getAttribute('index');
                    num = index;
                    circle = index;
                    animate(slide_ul, -num * focusWidth);
                }, false);
            }
            var first = slide_ul.children[0].cloneNode(true);
            slide_ul.appendChild(first);
        }

        const circleChange = () => {
            for (let i = 0; i < slide_ol.children.length; i++) {
                slide_ol.children[i].className = '';
            }
            slide_ol.children[circle].className = 'current';
        }

        const isMainRightFixed = () => {
            const scrollTop = getScrollTop();
            const clientHeight = mainRightFixed.clientHeight;

            if (isToBottom && scrollTop >= 1300) {
                isToBottom = false;
                mainRightFixed.classList.add('active');
            } else if (scrollTop < 1300) {
                isToBottom = true;
                mainRightFixed.classList.remove('active');
            }
        }

        const autoSlide = (show) => {
            if (show) {
                timer = setInterval(() => {
                    sdRightClick();
                }, 2000)
            } else {
                clearInterval(timer);
                timer = null;
            }
        }

        const someEffects = () => {

        }

        const loadSearchContent = () => {
            if (getUrlQueryValue('path')) {
                mainContent.style.display = 'none';
                searchContent.style.display = 'block';
                keyword = getUrlQueryValue('path');
                searchInput.value = keyword;
                getSearchList(keyword, 10, 1, _setSearchArticleData);
            }
        }

        const getItemNode = (target) => {

            if (target.className === 'mainBox J_mainBox') {
                return target;
            }
            while (target = target.parentNode) {
                if (target.className === 'mainBox J_mainBox') {
                    return target;
                }
            }
        }

        init();


    })(document)
})

