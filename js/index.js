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
            hideConfirmPw = doc.getElementsByClassName('J_hidePw')[2];

        return {
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
            },
            clearUserNameInputEvent: () => {

            },
            clearPassWordInputEvent: () => {

            },
            hidePwEvent: () => {

            },
            hideConfirmPwEvent: () => {

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
            showPw = doc.getElementsByClassName('J_showPw')[0];

        return {
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
            },
            clearUserNameInputEvent: () => {
                clearUserNameInput.addEventListener('click', () => {
                    oUsername.value = '';
                }, false);
            },
            clearPassWordInputEvent: () => {
                clearPassWordInput.addEventListener('click', () => {
                    oPassword.value = '';
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
                userPage = doc.getElementsByClassName('J_userPage')[0],
                loginForm = doc.getElementsByClassName('J_loginForm')[0],
                registerForm = doc.getElementsByClassName('J_signUpForm')[0],
                closeFormBtn1 = doc.getElementsByClassName('J_closeForm')[0],
                closeFormBtn2 = doc.getElementsByClassName('J_closeForm')[1],
                openFormBtn = doc.getElementsByClassName('J_openLoginPage')[0],
                toRegister = doc.getElementsByClassName('J_toRegister')[0],
                toLogin = doc.getElementsByClassName('J_toLogin')[0];
            //初始化变量值
            var num = 0,
                flag = true,
                circle = 0,
                timer = null;

            var API = {
                getArticleList: 'http://1.12.220.218:8585/cat/article/all',
                getHotArticle: 'http://1.12.220.218:8585/cat/article/hot',
                userLogin: 'http://1.12.220.218:8585/cat/user/login',
                userRegister: 'http://1.12.220.218:8585/cat/user/register'
            };

            const init = () => {
                createDocument();
                bindEvents();
                autoSlide(true);
                getArticleList(5, 1, _setArticleData);
                getHotArticle(5, 1, _setHotArticleData);
                someEffects();
                getArticleList(10, 1, _setMainArticleData);
                signUpAction.checkInput();
                loginAction.checkInput();
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
                    mainArticleBox.innerHTML = renderMainArticle(res.data.records);
                }
            }

            const bindEvents = () => {
                focus.addEventListener('mouseenter', focusMouseIn, false);
                focus.addEventListener('mouseleave', focusMouseOut, false);
                slide_leftArrow.addEventListener('click', sdLeftClick, false);
                slide_rightArrow.addEventListener('click', sdRightClick, false);
                mainNav_ul.addEventListener('click', mainNavClick, false);
                closeFormBtn1.addEventListener('click', signUpAction.closeSignUpBoard, false);
                closeFormBtn2.addEventListener('click', signUpAction.closeSignUpBoard, false);
                openFormBtn.addEventListener('click', signUpAction.openSignUpBoard, false);
                toRegister.addEventListener('click', toRegisterClick, false);
                toLogin.addEventListener('click', toLoginClick, false);
                loginAction.clearPassWordInputEvent;
                loginAction.clearUserNameInputEvent;
                loginAction.hidePwEvent;
                loginAction.showPwEvent;
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

            const toRegisterClick = () => {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }

            const toLoginClick = () => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
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

            init();


        })(document)
})



