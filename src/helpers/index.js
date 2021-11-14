
function getCookie(name) {
    let cookie = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return cookie && cookie[2];
}

function setCookie(name, value, days = 0, hours = 0) {
    let date = new Date();
    if (days || hours) {
        date.setTime(
            date.getTime() + hours * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 * days
        );
        document.cookie =
            name + "=" + value + ";path=/;expires=" + date.toGMTString();
    } else {
        document.cookie = name + "=" + value;
    }
}

function deleteAllCookie() {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

async function kickUser() {
    await deleteAllCookie();
    await window.localStorage.clear();
    window.location.href = "/";
}

function isAuthenticated() {
    return (!!getCookie("token"))
}

function headers() {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getCookie("token")
    }
};

export {
    getCookie,
    setCookie,
    isAuthenticated,
    headers,
    kickUser
};
