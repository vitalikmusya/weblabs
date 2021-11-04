const OPEN_MENU__CLASSNAME = "open-menu"

const headerNavLinks = document.getElementById("header__nav-links")

function openMenu() {
    if (headerNavLinks.classList.contains(OPEN_MENU__CLASSNAME)) {
        headerNavLinks.classList.remove(OPEN_MENU__CLASSNAME)
    } else {
        headerNavLinks.classList.add(OPEN_MENU__CLASSNAME)
    }
}