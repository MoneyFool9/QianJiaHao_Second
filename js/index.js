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
                }
                
            },
            render: (isLogin) => {
                if (isLogin) {
                    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

                    if (userInfo) {
                        openLoginPage.innerHTML = loginStatusToggle.replace(/{{(.*?)}}/g, (node, key) => {
                            return {
                                userImg: userInfo.avatar || '../images/userImg.png',
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
        var API = {
            postComment: 'http://1.12.220.218:8585/cat/comment/post',
            deleteComment: 'http://1.12.220.218:8585/cat/comment/delete',
            getFirstComment: 'http://1.12.220.218:8585/cat/comment/first',
            getMultiComment: 'http://1.12.220.218:8585/cat/comment/multi'
        }

        return {

        }
    })(document)

    const userDetailAction = ((doc) => {
        var userDetailPage = doc.getElementsByClassName('J_userDetailPage')[0],
            mainContent = doc.getElementsByClassName('J_mainContent')[0];


        var API = {
            doFollow: 'http://1.12.220.218:8585/cat/user/follow',
            getFansList: 'http://1.12.220.218:8585/cat/user/fans',
            getFollowList: 'http://1.12.220.218:8585/cat/user/follows',
            getArticleList: 'http://1.12.220.218:8585/cat/article/me',
            isFollow: 'http://1.12.220.218:8585/cat/user/isFollow'
        }

        return {
            checkedUrlToDetail: () => {
                if (getUrlQueryValue('field') === 'userProfile') {
                    mainContent.style.display = 'none';
                    userDetailPage.style.display = '';
                }
            }
        }
    })(document)

    const userInfoModifyAction = ((doc) => {
        var myUserPage = doc.getElementsByClassName('J_myUserPage')[0],
            mainContent = doc.getElementsByClassName('J_mainContent')[0];


        var API = {
            modifyUserInfo: 'http://1.12.220.218:8585/cat/user/modify/userInfo',
            modifyUserPassword: 'http://1.12.220.218:8585/cat/user/modify/password',
            uploadUserImg: 'http://1.12.220.218:8585/cat/file/uploadImg',
        }

        return {
            checkedUrlToUser: () => {
                if (getUrlQueryValue('field') === 'userInfo') {
                    mainContent.style.display = 'none';
                    myUserPage.style.display = '';
                }
            }
        }
    })(document)

    const articleAction = ((doc) => {
        var API = {
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

        }

        return {

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
            searchUserInfo = doc.getElementById('J_searchUserInfo').innerHTML;
            
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
                        console.log("res =>", res.data);
                        fn(res)
                    } else {
                        console.log('请求数据失败');
                    }
                },
                error: () => {

                }
            })
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

        const getHotArticle = (pageSize, page, fn) => {
            ajax({
                url: API.getHotArticle,
                data: {
                    pageSize: pageSize,
                    page: page

                },
                success: (res) => {
                    if (res.code === 200) {
                        console.log('res=>', res);
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
                        console.log('res=>', res);
                        _setArticleType(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
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
            }
        }

        const _setSearchArticleData = (res) => {
            if (res.data && res.data.records && res.data.records.length) {
                searchArticleContent.innerHTML += renderMainArticle(res.data.records);
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
                        console.log('res=>', res);
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
                        console.log('res=>', res);
                        _setUserSearchListData(res);
                    } else {
                        console.log('请求数据失败');
                    }
                }
            })
        }

        const _setUserSearchListData = (res) => {
            if (res.data && res.data.records && res.data.records.length) {
                searchArticleContent.innerHTML += renderUserSearchList(res.data.records);
            }
        }

        const bindEvents = () => {
            focus.addEventListener('mouseenter', focusMouseIn, false);
            focus.addEventListener('mouseleave', focusMouseOut, false);
            slide_leftArrow.addEventListener('click', sdLeftClick, false);
            slide_rightArrow.addEventListener('click', sdRightClick, false);
            mainNav_ul.addEventListener('click', mainNavClick, false);
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
            postArtBtn.addEventListener('click', postArtBtnClick, false);
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
            searchBtn.addEventListener('click', searchBtnClick, false);
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

        const postArtBtnClick = () => {

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

        const renderMainArticle = (data) => {
            var list = '';

            data.forEach((elem) => {
                list += mainArticleCon.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        img: elem.img,
                        title: elem.title,
                        content: elem.content,
                        liked: elem.liked,
                        disliked: elem.disliked,
                        username: elem.userInfo.username
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
                        img: elem.avatar || '../images/userImg.png',
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

        const loadSearchContent = () => {
            if (getUrlQueryValue('path')) {
                mainContent.style.display = 'none';
                searchContent.style.display = 'block';
                keyword = getUrlQueryValue('path');
                getSearchList(keyword, 10, 1, _setSearchArticleData);
            }
        }

        init();


    })(document)
})

